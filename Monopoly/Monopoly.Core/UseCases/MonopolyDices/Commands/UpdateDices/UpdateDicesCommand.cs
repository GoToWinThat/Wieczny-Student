using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyDices.Commands.UpdateDices
{
    public class UpdateDicesCommand : IRequest
    {
        public List<int> Dices { get; set; }
    }
    public class UpdateDicesCommandHandler : IRequestHandler<UpdateDicesCommand>
    {
        private IApplicationDbContext _context;

        public UpdateDicesCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdateDicesCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.Dices.FirstOrDefaultAsync();
            //zmiana na danym graczu propercji throwndices na true

            if (entity == null)
            {
                throw new NotFoundException(nameof(GameInfo), request.Dices);
            }

            entity.DiceValues = request.Dices;

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
