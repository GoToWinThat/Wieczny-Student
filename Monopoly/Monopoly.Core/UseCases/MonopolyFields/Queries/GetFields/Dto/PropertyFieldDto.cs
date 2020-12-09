using Domain.Entities;
using Domain.Enums;
using Monopoly.Core.Base.Mappings;
using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto
{
    public class PropertyFieldDto : MonopolyFieldDto, IMapFrom<PropertyField>
    {
        public PropertyColor Color { get; set; }
        public int Price { get; set; }
        public int Mortage { get; set; }
        public int EstatePrice { get; set; }
        public List<int> RentCosts { get; set; }
        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<PropertyField, PropertyFieldDto>()
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.FieldID, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Price, opt => opt.MapFrom(s => s.Price))
                .ForMember(d => d.Mortage, opt => opt.MapFrom(s => s.Mortage))
                .ForMember(d => d.EstatePrice, opt => opt.MapFrom(s => s.EstatePrice))
                .ForMember(d => d.RentCosts, opt => opt.MapFrom(s => s.RentCosts));
        }
    }
}
