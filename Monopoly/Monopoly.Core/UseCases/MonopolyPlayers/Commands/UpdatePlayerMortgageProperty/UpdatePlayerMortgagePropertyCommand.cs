using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerMortgageProperty
{
    public class UpdatePlayerMortgagePropertyCommand : IRequest
    {
        public string Name { get; set; }
        public int FieldId { get; set; }
    }
    public class UpdatePlayerMortgagePropertyCommandHandler : IRequestHandler<UpdatePlayerMortgagePropertyCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerMortgagePropertyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerMortgagePropertyCommand request, CancellationToken cancellationToken)
        {
            var entityFields = await _context.PropertyFieldInfos.Include(pp => pp.PropertyField)
                .Where(p => p.PropertyField.MonopolyID == request.FieldId)
                .Where(p => p.Player.Name == request.Name).FirstAsync();


            if (entityFields == null)
            {
                throw new NotFoundException(nameof(PropertyFieldInfo), request.FieldId);
            }

            entityFields.Mortgaged = !entityFields.Mortgaged;

            var players = _context.Players;
            var index = _context.GameInfo.FirstOrDefault().ActivePlayerIndex;
            var player = players.Where(p => p.Id == index + 1).First();
            if (entityFields.Mortgaged)
                _context.Logs.Add(new Log { LogInfo = $"{player.Name} oddaje {entityFields.PropertyField.Name} pod zastaw za {entityFields.PropertyField.Mortgage} ECTS." });
            else
                _context.Logs.Add(new Log { LogInfo = $"{player.Name} odkupuje {entityFields.PropertyField.Name} od banku za {entityFields.PropertyField.Mortgage} ECTS." });

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
