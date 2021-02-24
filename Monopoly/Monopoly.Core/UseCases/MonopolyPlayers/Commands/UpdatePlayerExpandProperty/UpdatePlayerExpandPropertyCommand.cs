using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerExpandProperty
{
    public class UpdatePlayerExpandPropertyCommand : IRequest
    {
        public string Name { get; set; }
        public int FieldId { get; set; }
        public int DeltaEstateLevel { get; set; }
    }
    public class UpdatePlayerExpandPropertyCommandHandler : IRequestHandler<UpdatePlayerExpandPropertyCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerExpandPropertyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerExpandPropertyCommand request, CancellationToken cancellationToken)
        {
            var entityFields = await _context.PropertyFieldInfos.Include(pp => pp.PropertyField)
                .Where(p => p.PropertyField.MonopolyID == request.FieldId)
                .Where(p=>p.Player.Name==request.Name)
                .FirstAsync(cancellationToken);

            if (entityFields == null)
            {
                throw new NotFoundException(nameof(PropertyFieldInfo), request.FieldId);
            }

            entityFields.EstateLevel += request.DeltaEstateLevel;
            if(entityFields.EstateLevel<0)
            {
                entityFields.EstateLevel = 0;
            }

            var players = _context.Players;
            var index = _context.GameInfo.FirstOrDefault().ActivePlayerIndex;
            var player = players.Where(p => p.Id == index + 1).First();
            if (request.DeltaEstateLevel > 0)
                _context.Logs.Add(new Log { LogInfo = $"{player.Name} rozbudowuje {entityFields.PropertyField.Name}" });
            else
                _context.Logs.Add(new Log { LogInfo = $"{player.Name} demontowuje {entityFields.PropertyField.Name}" });

            await _context.SaveChangesAsync(cancellationToken);

            return Unit.Value;
        }
    }
}
