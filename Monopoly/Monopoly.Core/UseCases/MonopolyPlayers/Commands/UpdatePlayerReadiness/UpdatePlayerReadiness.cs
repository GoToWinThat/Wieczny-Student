using Domain.Entities;
using Domain.Entities.Static_Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using Monopoly.Core.GameClock;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerReadiness
{
    public class UpdatePlayerReadinessCommand : IRequest<bool>
    {
        public string Name{ get; set; }
    }
    public class UpdatePlayerReadinessCommandHandler : IRequestHandler<UpdatePlayerReadinessCommand,bool>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerReadinessCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(UpdatePlayerReadinessCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.IsReady = !entity.IsReady;


            await _context.SaveChangesAsync(cancellationToken);
            return await CheckStartGame(_context,cancellationToken );
        }
        private async Task<bool> CheckStartGame(IApplicationDbContext context,CancellationToken cancellationToken)
        {
            var players = await _context.Players.ToListAsync(cancellationToken);
            var isGameStarted = true;
            foreach (var p in players)
            {
                if (p.IsLogged == true && p.IsReady!=true)
                {
                    isGameStarted = false;
                }
            }
            //gra sie zaczyna
            if (isGameStarted)
            {
                //zmieniamy stan
                var gameInfo = await _context.GameInfo.FirstAsync(cancellationToken);
                gameInfo.GameState = MonopolyGameData.GameStates[1];
                //zapisujemy
                await context.SaveChangesAsync(cancellationToken);
                //ustawic boty
                var playersBots = await _context.Players.ToListAsync(cancellationToken);
                int counter = 0;
                foreach (var p in playersBots)
                {
                    if (p.IsLogged == false)
                    {
                        p.Name = MonopolyGameData.Nicks[counter];
                        p.HubConnectionId = "1";
                        p.Signature = MonopolyGameData.PlayerSignatures[counter];
                        p.Color = MonopolyGameData.Color[counter];
                        counter++;
                    }
                }
                if(counter>0)
                {
                    await context.SaveChangesAsync(cancellationToken);
                }
                GameTimer.SetGameTimer(context, cancellationToken);           
            }
            return isGameStarted;
        }
    }
}
