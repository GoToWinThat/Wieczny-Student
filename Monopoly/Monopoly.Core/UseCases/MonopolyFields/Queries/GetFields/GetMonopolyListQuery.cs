using MediatR;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Monopoly.Core.Base.Interfaces;
using Domain.Enums;
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
            /*List<PropertyField> PropertyFields1 =
                _context.MonopolyFields.OfType<PropertyField>()
                    .OrderBy(t => t)
                    .ToList();
            var test = PropertyFields1[2];

            int ff = 2;*/
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

            IList<MonopolyFieldDto> allFields = Combine(PropertyFields, CornerFields, EventFields);
            FieldsVm test = new FieldsVm();
            test.MonopolyFields = allFields;
            return test;
        }

        private IList<MonopolyFieldDto> Combine(IList<PropertyFieldDto> p, IList<CornerFieldDto> c, IList<EventFieldDto> e)
        {
            IList<MonopolyFieldDto> allFields = new List<MonopolyFieldDto>();
            foreach(var f in p)
            {
                allFields.Add(f);
            }
            foreach (var f in c)
            {
                allFields.Add(f);
            }
            foreach (var f in e)
            {
                allFields.Add(f);
            }
            return allFields;
        }
    }
}
