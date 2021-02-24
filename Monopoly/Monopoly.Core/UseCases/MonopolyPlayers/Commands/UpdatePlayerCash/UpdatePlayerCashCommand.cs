using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerCash
{
    public class UpdatePlayerCashCommand : IRequest
    {
        public string Name { get; set; }
        public int DeltaCash { get; set; }
    }
    public class UpdatePlayerCashCommandHandler : IRequestHandler<UpdatePlayerCashCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerCashCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerCashCommand request, CancellationToken cancellationToken)
        {
            var ent4ity = _context.Players.ToList();
            var entity = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.Cash += request.DeltaCash;
            if(entity.Cash<0)
            {
                entity.Cash = 0;
            }

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
