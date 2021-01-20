﻿using Domain.Entities;
using Domain.Entities.Game;
using Domain.Entities.Static_Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdateActivePlayerIndex
{
    public class UpdateActivePlayerIndexCommand : IRequest<Tuple<bool, bool>>
    {
        public int Index { get; set; }
    }
    public class UpdateActivePlayerIndexCommandHandler : IRequestHandler<UpdateActivePlayerIndexCommand, Tuple<bool, bool>>
    {
        private IApplicationDbContext _context;

        public UpdateActivePlayerIndexCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Tuple<bool, bool>> Handle(UpdateActivePlayerIndexCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.GameInfo.FirstOrDefaultAsync();
            var players = await _context.Players.OrderBy(p => p.Id).ToListAsync(cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(GameInfo), request.Index);
            }
            if (players == null)
            {
                throw new NotFoundException(nameof(Player), request.Index);
            }

            bool isGameOver = false;
            bool wasBotPlaying = false;

            int index = (request.Index + 1) % 4;
            bool isOver = false;

            var activePlayer = await _context.Players
                .Include(s => s.PropertyFieldInfos)
                .Include(p => p.Cards)
                .Where(p => p.Id == request.Index + 1)
                .FirstAsync();

            if (!activePlayer.ThrownDices)
            {
                MonopolyAI.MonopolyAI.AutoThrow(activePlayer, _context, cancellationToken);
            }

            while (isOver == false)
            {
                foreach (var p in players)
                {
                    if (p.Id == (index + 1))
                    {
                        if (p.IsBankrupt == true)
                        {
                            index = (index + 1) % 4;
                            continue;
                        }
                        if (p.TurnsToWait > 0)
                        {
                            p.TurnsToWait = p.TurnsToWait - 1;
                            if (p.TurnsToWait - 1 == 0)
                            {
                                p.IsInJail = false;
                            }
                            index = (index + 1) % 4;
                            continue;
                        }
                        if (p.IsBankrupt == false && p.TurnsToWait == 0 && p.IsLogged == true)
                        {
                            entity.ActivePlayerIndex = (index) % 4;
                            isOver = true;
                            break;
                        }
                    }
                    else
                    {
                        continue;
                    }
                }
            }

            foreach (var p in players)
            {
                p.ThrownDices = false;
            }
            if (entity.GameState == MonopolyGameData.GameStates[2])
            {
                isGameOver = true;
            }

            await _context.SaveChangesAsync(cancellationToken);
            return new Tuple<bool, bool>(wasBotPlaying, isGameOver);
        }
    }
}
