using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerNewProperty
{
    public class UpdatePlayerNewPropertyCommand : IRequest
    {
        public string Name { get; set; }
        public int FieldId { get; set; }
    }
    public class UpdatePlayerNewPropertyCommandHandler : IRequestHandler<UpdatePlayerNewPropertyCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerNewPropertyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerNewPropertyCommand request, CancellationToken cancellationToken)
        {
            var entityPlayer = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();
           // var entityFields = await _context.PropertyFieldInfos.Where(p => p.PropertyFieldId == request.FieldId).FirstAsync();
            if (entityPlayer == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }



            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
