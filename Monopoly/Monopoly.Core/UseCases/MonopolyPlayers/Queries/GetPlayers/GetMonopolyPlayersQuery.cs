using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Monopoly.Core.Base.Interfaces;
using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers.Dto;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers
{
    public class GetMonopolyPlayersQuery : IRequest<PlayersVm> { }
    public class GetMonopolyPlayersQueryHandler : IRequestHandler<GetMonopolyPlayersQuery, PlayersVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetMonopolyPlayersQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }
        public async Task<PlayersVm> Handle(GetMonopolyPlayersQuery request, CancellationToken cancellationToken)
        {
            return new PlayersVm
            {
                MonopolyPlayers = await _context.Players.ProjectTo<PlayerDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.Name)
                    .ToListAsync(cancellationToken)
        };
        }
    }
}
