using Domain.Entities;
using Monopoly.Core.Base.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto
{
    public class CornerFieldDto : MonopolyFieldDto, IMapFrom<CornerField>
    {
        public void Mapping(MappingProfile profile)
        {
            profile.CreateMap<CornerField, CornerFieldDto>()
                .ForSourceMember(x => x.Created, opt => opt.DoNotValidate())
                .ForSourceMember(x => x.CreatedBy, opt => opt.DoNotValidate())
                .ForSourceMember(x => x.LastModified, opt => opt.DoNotValidate())
                .ForSourceMember(x => x.LastModifiedBy, opt => opt.DoNotValidate())
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.FieldID, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name));
        }
    }
}
