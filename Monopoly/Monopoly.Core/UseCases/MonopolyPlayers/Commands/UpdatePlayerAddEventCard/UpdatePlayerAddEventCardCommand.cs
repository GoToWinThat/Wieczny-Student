using Domain.Entities;
using Domain.Entities.Cards;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerAddEventCard
{
    public class UpdatePlayerAddEventCardCommand : IRequest
    {
        public string Name { get; set; }
        public int CardId { get; set; }
    }
    public class UpdatePlayerAddEventCardCommandHandler : IRequestHandler<UpdatePlayerAddEventCardCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerAddEventCardCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerAddEventCardCommand request, CancellationToken cancellationToken)
        {
            var entityPlayer = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();
            var entityCard = await _context.Cards.Where(p => p.CardIdNumber == request.CardId).FirstAsync();
            if (entityPlayer == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }
            if (entityCard == null)
            {
                throw new NotFoundException(nameof(Card), request.CardId);
            }

            if (entityPlayer.Cards==null)
            {
                entityPlayer.Cards = new List<Card> { entityCard };
            }
            else
            {
                entityPlayer.Cards.Add(entityCard);
            }


            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
