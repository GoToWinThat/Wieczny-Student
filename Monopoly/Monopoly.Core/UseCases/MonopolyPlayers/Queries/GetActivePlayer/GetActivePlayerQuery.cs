using Domain.Entities.Static_Data;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetActivePlayer
{
    public class GetActivePlayerIndexQuery: IRequest<int>{}
    public class GetActivePlayerIndexQueryHandler : IRequestHandler<GetActivePlayerIndexQuery, int>
    {
        private readonly IApplicationDbContext _context;
        public GetActivePlayerIndexQueryHandler(IApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int> Handle(GetActivePlayerIndexQuery request, CancellationToken cancellationToken)
        {
            var gameInfo = await _context.GameInfo.FirstOrDefaultAsync();
            return gameInfo.ActivePlayerIndex;
        }
    }

}
