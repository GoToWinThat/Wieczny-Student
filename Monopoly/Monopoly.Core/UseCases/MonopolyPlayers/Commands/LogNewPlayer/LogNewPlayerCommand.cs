using Domain.Entities;
using Domain.Enums;
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

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.LogNewPlayer
{
    public class LogNewPlayerCommand : IRequest
    {
        public string Name { get; set; }//artur
        public string Signature { get; set; }//1
        public MonopolyColor Color { get; set; }//red
    }
    public class LogNewPlayerCommandHandler : IRequestHandler<LogNewPlayerCommand>
    {
        private IApplicationDbContext _context;

        public LogNewPlayerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(LogNewPlayerCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.IsLogged == false).FirstAsync(cancellationToken: cancellationToken);

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.Name = request.Name;
            entity.Signature = request.Signature;
            entity.Color = request.Color;
            entity.IsLogged = true;

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
