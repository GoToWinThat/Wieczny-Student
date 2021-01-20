using Domain.Entities;
using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerDeleteProperty
{
     public class UpdatePlayerDeletePropertyCommand : IRequest
    {
        public string Name { get; set; }
        public int FieldId { get; set; }
    }
    public class UpdatePlayerDeletePropertyCommandHandler : IRequestHandler<UpdatePlayerDeletePropertyCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerDeletePropertyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerDeletePropertyCommand request, CancellationToken cancellationToken)
        {
            var entityPlayer = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();
            var entityFields = await _context.PropertyFieldInfos.Include(pp => pp.PropertyField).Where(p => p.PropertyField.MonopolyID == request.FieldId).FirstAsync();

            if (entityPlayer == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }
            if (entityFields == null)
            {
                throw new NotFoundException(nameof(PropertyFieldInfo), request.FieldId);
            }

            entityFields.Player = null;
            entityFields.PlayerId = null;

            _context.Logs.Add(new Log { LogInfo = $"{entityPlayer.Name} sprzedaje {entityFields.PropertyField.Name} za {entityFields.PropertyField.Price} ECTS." });

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
