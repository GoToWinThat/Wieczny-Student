using Domain.Entities;
using Monopoly.Core.Base.Mappings;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto
{
    public class CornerFieldDto : MonopolyFieldDto, IMapFrom<CornerField>
    {
        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<CornerField, CornerFieldDto>()
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.FieldID, opt => opt.MapFrom(s => s.MonopolyID))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Color, opt => opt.MapFrom(s => s.Color)); 
        }
    }
}
