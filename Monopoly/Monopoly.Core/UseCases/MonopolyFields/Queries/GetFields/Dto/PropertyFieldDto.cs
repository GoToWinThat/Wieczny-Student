using Domain.Entities;
using Monopoly.Core.Base.Mappings;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto
{
    public class PropertyFieldDto : MonopolyFieldDto, IMapFrom<PropertyField>
    {
        [JsonProperty(Order = -10)]
        public int Price { get; set; }
        [JsonProperty(Order = -7)]
        public List<int> RentCosts { get; set; }
        [JsonProperty(Order = -6)]
        public int EstatePrice { get; set; }
        [JsonProperty(Order = -5)]
        public int Mortage { get; set; }

        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<PropertyField, PropertyFieldDto>()
                .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
                .ForMember(d => d.FieldID, opt => opt.MapFrom(s => s.MonopolyID))
                .ForMember(d => d.Name, opt => opt.MapFrom(s => s.Name))
                .ForMember(d => d.Color, opt => opt.MapFrom(s => s.Color))
                .ForMember(d => d.Price, opt => opt.MapFrom(s => s.Price))
                .ForMember(d => d.Mortage, opt => opt.MapFrom(s => s.Mortgage))
                .ForMember(d => d.EstatePrice, opt => opt.MapFrom(s => s.EstatePrice))
                .ForMember(d => d.RentCosts, opt => opt.MapFrom(s => s.RentCosts));
        }
    }
}
