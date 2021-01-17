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

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.DeleteLoggedPlayer
{
    public class DeleteLoggedPlayerCommand : IRequest
    {
        public string Name { get; set; }
    }
    public class DeleteLoggedPlayerCommandHandler : IRequestHandler<DeleteLoggedPlayerCommand>
    {
        private IApplicationDbContext _context;

        public DeleteLoggedPlayerCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(DeleteLoggedPlayerCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity = new Player
            {
                Cash = 1000,
                Signature = "0000",
                Color = MonopolyColor.blue,
                Name="",
                Position = 0,
                IsInJail = false,
                TurnsToWait = 0,
                IsBankrupt = false,
                IsLogged = false,
            };

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
