using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyGame.Commands.AddTrade
{
    public class AddTradeCommand : IRequest
    {
        public int Id { get; set; }
        public int FromId { get; set; }
        public int DirectId { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public int Value { get; set; }
    }
    public class AddTradeCommandHandler : IRequestHandler<AddTradeCommand>
    {
        private IApplicationDbContext _context;

        public AddTradeCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(AddTradeCommand request, CancellationToken cancellationToken)
        {
            if( !_context.TradeInfos.Any())
            {
                _context.TradeInfos.Add(new Domain.Entities.Game.TradeInfo
                {
                    Id=1,
                    FromId=request.FromId,
                    DirectId=request.FromId,
                    Status=request.Status,
                    Type=request.Type,
                    Value=request.Value
                });
            }
            else
            {
                var entity = await _context.TradeInfos.ToListAsync(cancellationToken);
                if (entity == null)
                {
                    throw new NotFoundException(nameof(TradeInfo));
                }
            }
            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
