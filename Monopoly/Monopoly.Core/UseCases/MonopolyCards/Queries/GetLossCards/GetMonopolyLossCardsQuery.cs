using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using Monopoly.Core.UseCases.MonopolyCards.Queries.GetLossCards;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards
{
    public class GetMonopolyLossCardsQuery : IRequest<LossCardsVm> {}
    public class GetMonopolyLossCardsHandler : IRequestHandler<GetMonopolyLossCardsQuery, LossCardsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;
        public GetMonopolyLossCardsHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<LossCardsVm> Handle(GetMonopolyLossCardsQuery request, CancellationToken cancellationToken)
        {
            return new LossCardsVm
            {
                LossCards = await _context.LossCards.ProjectTo<LossCardDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.CardID)
                    .ToListAsync(cancellationToken)
            };
        }
    }

}
