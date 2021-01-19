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

namespace Monopoly.Core.UseCases.MonopolyGame.GetGameState
{
    public class GetGameStateQuery : IRequest<GameStateVm> { }
    public class GetGameStateQueryHandler : IRequestHandler<GetGameStateQuery, GameStateVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetGameStateQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<GameStateVm> Handle(GetGameStateQuery request, CancellationToken cancellationToken)
        {
            return new GameStateVm
            {
                GameState = await _context.GameInfo
                    .ProjectTo<GameStateDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(cancellationToken)
            };
        }
    }
}
