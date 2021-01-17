﻿using Domain.Entities;
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

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerUpdateWaitingTurns
{
    public class UpdatePlayerWaitingsTurnsCommand : IRequest
    {
        public string Name { get; set; }
        public int DeltaTurns { get; set; }
        public bool IsInJail { get; set; }
    }
    public class UpdatePlayerWaitingsTurnsCommandHandler : IRequestHandler<UpdatePlayerWaitingsTurnsCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerWaitingsTurnsCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerWaitingsTurnsCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Players.Where(p => p.Name == request.Name).FirstAsync();

            if (entity == null)
            {
                throw new NotFoundException(nameof(Player), request.Name);
            }

            entity.TurnsToWait += request.DeltaTurns;
            entity.IsInJail = request.IsInJail;

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
