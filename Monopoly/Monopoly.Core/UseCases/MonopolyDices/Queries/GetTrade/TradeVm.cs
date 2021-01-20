using Domain.Entities.Game;
using Monopoly.Core.Base.Mappings;

namespace Monopoly.Core.UseCases.MonopolyDices.Queries.GetTrade
{
    public class TradeVm:IMapFrom<TradeInfo>
    {
        public int FromId { get; set; }
        public int DirectId { get; set; }
        public bool Status { get; set; }
        public string Transaction { get; set; }
        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<TradeInfo, TradeVm>()
               .ForMember(d => d.FromId, opt => opt.MapFrom(s => s.FromId))
               .ForMember(d => d.DirectId, opt => opt.MapFrom(s => s.DirectId))
               .ForMember(d => d.Status, opt => opt.MapFrom(s => s.Status))
               .ForMember(d => d.Transaction, opt => opt.MapFrom(s => s.Transaction));
        }
    }
}
