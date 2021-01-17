using Domain.Entities;
using Domain.Entities.Game;
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

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerExpandProperty
{
    public class UpdatePlayerExpandPropertyCommand : IRequest
    {
        public string Name { get; set; }
        public int FieldId { get; set; }
        public int DeltaEstateLevel { get; set; }
    }
    public class UpdatePlayerExpandPropertyCommandHandler : IRequestHandler<UpdatePlayerExpandPropertyCommand>
    {
        private IApplicationDbContext _context;

        public UpdatePlayerExpandPropertyCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdatePlayerExpandPropertyCommand request, CancellationToken cancellationToken)
        {
            var entityFields = await _context.PropertyFieldInfos.Where(p => p.PropertyField.MonopolyID == request.FieldId)
                .Where(p=>p.Player.Name==request.Name).FirstAsync();

            if (entityFields == null)
            {
                throw new NotFoundException(nameof(PropertyFieldInfo), request.FieldId);
            }
            entityFields.EstateLevel += request.DeltaEstateLevel;


            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
