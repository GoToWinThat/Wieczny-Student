using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyDices.Commands.UpdateDices
{
    public class UpdateDicesCommand : IRequest
    {
        public List<int> Dices { get; set; }
    }
    public class UpdateDicesCommandHandler : IRequestHandler<UpdateDicesCommand>
    {
        private IApplicationDbContext _context;

        public UpdateDicesCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdateDicesCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Dices.FirstOrDefaultAsync();

            //zmiana na danym graczu propercji throwndices na true

            if (entity == null)
            {
                throw new NotFoundException(nameof(GameInfo), request.Dices);
            }

            entity.DiceValues = request.Dices;

            var players = _context.Players;
            var index = _context.GameInfo.FirstOrDefault().ActivePlayerIndex;
            var player = players.Where(p => p.Id == index + 1).First();
            player.ThrownDices = true;

            // Reward for this lap:
            var dicesCount = entity.DiceValues[0] + entity.DiceValues[1];
            if (player.Position + dicesCount >= 40)
            {
                player.Cash += 30;
                _context.Logs.Add(new Log { LogInfo = $"{player.Name} przechodzi przez portiernię. Otrzymuje 30 ECTS." });
            }

            // New log:
            _context.Logs.Add(new Log { LogInfo = $"{player.Name} wyrzuca {entity.DiceValues[0] + entity.DiceValues[1]} oczek." });

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
