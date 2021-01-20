using Domain.Entities;
using Domain.Entities.Game;
using Domain.Entities.Static_Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
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
        public async Task<Tuple<bool,bool>> Handle(UpdateActivePlayerIndexCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.GameInfo.FirstOrDefaultAsync();
            var players = await _context.Players.ToListAsync(cancellationToken);

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
            entity.ActivePlayerIndex = (request.Index + 1) % 4;

            foreach (var p in players)
            {
                p.ThrownDices = false;
            }
            if(entity.GameState == MonopolyGameData.GameStates[2])
            {
                isGameOver = true;
            }

            await _context.SaveChangesAsync(cancellationToken);
            return new Tuple<bool, bool>(wasBotPlaying, isGameOver);
        }
    }
}
