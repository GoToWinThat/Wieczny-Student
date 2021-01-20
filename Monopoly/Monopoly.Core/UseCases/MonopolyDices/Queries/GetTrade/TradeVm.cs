using Domain.Entities.Game;
using Monopoly.Core.Base.Mappings;

namespace Monopoly.Core.UseCases.MonopolyDices.Queries.GetTrade
{
    public class TradeVm:IMapFrom<TradeInfo>
    {
        public int FromId { get; set; }
        public int DirectId { get; set; }
        public string Status { get; set; }
        public string Type { get; set; }
        public int Value { get; set; }
        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<TradeInfo, TradeVm>()
               .ForMember(d => d.FromId, opt => opt.MapFrom(s => s.FromId))
               .ForMember(d => d.DirectId, opt => opt.MapFrom(s => s.DirectId))
               .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status))
               .ForMember(d => d.Type, opt => opt.MapFrom(s => s.Type))
               .ForMember(d => d.Value, opt => opt.MapFrom(s => s.Value));
        }
    }
}
