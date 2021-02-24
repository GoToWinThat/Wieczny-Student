using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards
{
    public class GetMonopolyGainCardsQuery : IRequest<GainCardsVm>{}
    public class GetMonopolyGainCardsHandler : IRequestHandler<GetMonopolyGainCardsQuery, GainCardsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetMonopolyGainCardsHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GainCardsVm> Handle(GetMonopolyGainCardsQuery request, CancellationToken cancellationToken)
        {
            return new GainCardsVm
            {
                GainCards = await _context.GainCards.ProjectTo<GainCardDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.CardID)
                    .ToListAsync(cancellationToken)
            };
        }
    }

}
