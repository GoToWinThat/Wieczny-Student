using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs
{
    public class GetLogsQuery : IRequest<LogsVm> { }
    public class GetLogsQueryHandler : IRequestHandler<GetLogsQuery, LogsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetLogsQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<LogsVm> Handle(GetLogsQuery request, CancellationToken cancellationToken)
        {
            return new LogsVm
            {
                Logs = await _context.Logs
                    .ProjectTo<LogDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Id)
                    .ToListAsync(cancellationToken)
        };
        }
    }
}
