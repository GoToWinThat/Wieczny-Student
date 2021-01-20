using Domain.Entities;
using Domain.Entities.Static_Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerUpdateBankrupt
{
    public class UpdatePlayerBankruptCommand : IRequest<bool>
    {
        public string Name { get; set; }
    }
    public class UpdatePlayerBankruptCommandHandler : IRequestHandler<UpdatePlayerBankruptCommand,bool>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerBankruptCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<bool> Handle(UpdatePlayerBankruptCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.IsBankrupt = !entity.IsBankrupt;

            await _context.SaveChangesAsync(cancellationToken);
            return await CheckEndGame(cancellationToken);
        }
        private async Task<bool> CheckEndGame(CancellationToken cancellationToken)
        {
            var players = await _context.Players.ToListAsync(cancellationToken);
            var isGameOver = false;
            var counter = 0;
            foreach (var p in players)
            {
                if (p.IsBankrupt == true)
                {
                    counter++;
                }
            }
            if (counter >= 3)
            {
                var gameInfo = await _context.GameInfo.FirstAsync(cancellationToken);
                gameInfo.GameState = MonopolyGameData.GameStates[2];
                isGameOver = true;
            }
            return isGameOver;
        }
    }
}
