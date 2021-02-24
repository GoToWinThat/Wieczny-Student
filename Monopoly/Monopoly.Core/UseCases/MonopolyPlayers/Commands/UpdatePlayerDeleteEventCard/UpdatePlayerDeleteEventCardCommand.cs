using Domain.Entities;
using Domain.Entities.Cards;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerDeleteEventCard
{
    public class UpdatePlayerDeleteEventCardCommand : IRequest
    {
        public string Name { get; set; }
        public int CardId { get; set; }
    }
    public class UpdatePlayerDeleteEventCardCommandHandler : IRequestHandler<UpdatePlayerDeleteEventCardCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerDeleteEventCardCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerDeleteEventCardCommand request, CancellationToken cancellationToken)
        {
            var entityPlayer = await _context.Players.Include(p => p.Cards).Where(p => p.Name == request.Name).FirstAsync();
            var entityCard = await _context.Cards.Where(p => p.CardIdNumber == request.CardId).FirstAsync();

            if (entityPlayer == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }
            if (entityCard == null)
            {
                throw new NotFoundException(nameof(Card), request.CardId);
            }

            if (entityPlayer.Cards == null)
            {
                throw new NotFoundException(nameof(Card), request.CardId);
            }

            if (entityPlayer.Cards.Contains(entityCard))
            {
                entityPlayer.Cards.Remove(entityCard);
            }

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
