using Domain.Entities;
using Domain.Entities.Cards;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerDeleteEventCard
{
    public class UpdatePlayerDeleteEventCardCommand : IRequest
    {
        public string PlayerName { get; set; }
        public string CardName { get; set; }
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
            var entityPlayer = await _context.Players.Where(p => p.Name == request.PlayerName).FirstAsync();
            var entityCard = await _context.Cards.Where(p => p.CardName == request.CardName).FirstAsync();
            if (entityPlayer == null)
            {
                throw new NotFoundException(nameof(Player), request.PlayerName);
            }
            if (entityCard == null)
            {
                throw new NotFoundException(nameof(Card), request.CardName);
            }

            entityPlayer.Cards.Remove(entityCard);

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
