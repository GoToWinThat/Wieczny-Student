using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyDices.Queries.GetDices
{
    public class GetDicesQuery :IRequest<DicesVm> {}
    public class GetDicesQueryHandler : IRequestHandler<GetDicesQuery, DicesVm>
    {
        private IApplicationDbContext _context;
        private IMapper _mapper;

        public GetDicesQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<DicesVm> Handle(GetDicesQuery request, CancellationToken cancellationToken)
        {
            var dicesDb = await _context.Dices
                    .ProjectTo<DicesDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken);
            return new DicesVm
            {
                Dices = dicesDb.Dices
            };
        }
    }
}

