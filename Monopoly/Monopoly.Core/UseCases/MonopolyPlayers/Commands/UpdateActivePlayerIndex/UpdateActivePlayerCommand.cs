using Domain.Entities.Game;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Exceptions;
using Monopoly.Core.Base.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdateActivePlayerIndex
{
    public class UpdateActivePlayerIndexCommand : IRequest
    {
        public int Index { get; set; }
    }
    public class UpdateActivePlayerIndexCommandHandler : IRequestHandler<UpdateActivePlayerIndexCommand>
    {
        private IApplicationDbContext _context;

        public UpdateActivePlayerIndexCommandHandler(IApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<Unit> Handle(UpdateActivePlayerIndexCommand request, CancellationToken cancellationToken)
        {
            var entity = await _context.GameInfo.FirstOrDefaultAsync();
            //zmiana na false thrown dices
            //Jezeli indeks nalezy do bota
            //if BOT - islogged


            if (entity == null)
            {
                throw new NotFoundException(nameof(GameInfo), request.Index);
            }

            entity.ActivePlayerIndex = request.Index;
            MonopolyAI.MonopolyAI.ProcessBot(entity.ActivePlayerIndex,cancellationToken);

            await _context.SaveChangesAsync(cancellationToken);
            return Unit.Value;
        }
    }
}
