using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyDices.Queries.GetTrade
{
    public class GetTradeQuery: IRequest<TradeVm> {}
    public class GetTradeQueryHandle : IRequestHandler<GetTradeQuery, TradeVm>
    {
        private IApplicationDbContext _context;
        private IMapper _mapper;

        public GetTradeQueryHandle(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<TradeVm> Handle(GetTradeQuery request, CancellationToken cancellationToken)
        {
            return await _context.TradeInfos.ProjectTo<TradeVm>(_mapper.ConfigurationProvider)
                    .LastOrDefaultAsync(cancellationToken);
        }
    }

}
