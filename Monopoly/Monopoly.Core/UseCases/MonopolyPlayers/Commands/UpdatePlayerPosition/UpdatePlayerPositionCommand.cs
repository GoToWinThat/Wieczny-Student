using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerPosition
{
    
     public class UpdatePlayerPositionCommand : IRequest
     {
        public int ActivePlayerIndex { get; set; }
        public int DeltaPosition { get; set; }
     }
    public class UpdatePlayerPositionCommandHandler : IRequestHandler<UpdatePlayerPositionCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerPositionCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerPositionCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Include(s => s.PropertyFieldInfos).Include(p => p.Cards).Where(p => p.Id == request.ActivePlayerIndex + 1).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.ActivePlayerIndex + 1);
            }

            entity.Position = (entity.Position + request.DeltaPosition) % 40;


            MonopolyAI.MonopolyAI.NewPositionAction(entity, _context, cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
