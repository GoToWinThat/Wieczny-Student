using Domain.Entities;
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

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerUpdateBankrupt
{
    public class UpdatePlayerBankruptCommand : IRequest
    {
        public string Name { get; set; }
    }
    public class UpdatePlayerBankruptCommandHandler : IRequestHandler<UpdatePlayerBankruptCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerBankruptCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerBankruptCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.IsBrankrupt = !entity.IsBrankrupt;

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
