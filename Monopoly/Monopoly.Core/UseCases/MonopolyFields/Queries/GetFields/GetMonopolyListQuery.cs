using MediatR;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Monopoly.Core.Base.Interfaces;
using Domain.Entities;
using System.Collections.Generic;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields
{
    public class GetMonopolyFieldsQuery : IRequest<FieldsVm> {}
    public class GetTodosQueryHandler : IRequestHandler<GetMonopolyFieldsQuery, FieldsVm>
    {
        private readonly IApplicationDbContext _context;
        private readonly IMapper _mapper;

        public GetTodosQueryHandler(IApplicationDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<FieldsVm> Handle(GetMonopolyFieldsQuery request, CancellationToken cancellationToken)
        {
            return new FieldsVm
            {
                MonopolyFields = await GetFields(cancellationToken)
            };
        }

        private async Task<IList<MonopolyFieldDto>> GetFields(CancellationToken cancellationToken)
        {
            IList<PropertyFieldDto> PropertyFields =
                await _context.MonopolyFields.OfType<PropertyField>()
                    .ProjectTo<PropertyFieldDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.FieldID)
                    .ToListAsync(cancellationToken);

            IList<CornerFieldDto> CornerFields =
                  await _context.MonopolyFields.OfType<CornerField>()
                      .ProjectTo<CornerFieldDto>(_mapper.ConfigurationProvider)
                      .OrderBy(t => t.FieldID)
                      .ToListAsync(cancellationToken);

            IList<EventFieldDto> EventFields =
                await _context.MonopolyFields.OfType<EventField>()
                    .ProjectTo<EventFieldDto>(_mapper.ConfigurationProvider)
                    .OrderBy(t => t.FieldID)
                    .ToListAsync(cancellationToken);
            return PropertyFields.Cast<MonopolyFieldDto>()
                    .Concat(CornerFields.Cast<MonopolyFieldDto>())
                    .Concat(EventFields.Cast<MonopolyFieldDto>()).ToList();
        }
    }
}
