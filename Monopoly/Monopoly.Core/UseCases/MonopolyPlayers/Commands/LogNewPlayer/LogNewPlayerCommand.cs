using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.LogNewPlayer
{
    public class LogNewPlayerCommand : IRequest<int>
    {
        public string Name { get; set; }
        public string HubConnectionId { get; set; }
        public string Signature { get; set; }
        public string Color { get; set; }
    }
    public class LogNewPlayerCommandHandler : IRequestHandler<LogNewPlayerCommand,int>
    {
        private IApplicationDbContext _context;

        public LogNewPlayerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<int> Handle(LogNewPlayerCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.IsLogged == false).FirstAsync(cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.Name = request.Name;
            entity.HubConnectionId = request.HubConnectionId;
            entity.Signature = request.Signature;
            entity.Color = request.Color;
            entity.IsLogged = true;

            await _context.SaveChangesAsync(cancellationToken);
            return entity.Id;
        }
    }
}
