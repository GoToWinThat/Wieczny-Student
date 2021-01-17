using Domain.Entities.Cards;
using Monopoly.Core.Base.Mappings;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards
{
    public class GainCardDto :IMapFrom<GainCard>
    {
        public int CardID { get; set; }
        public string CardName { get; set; }
        public string Description { get; set; }
        public static void Mapping (MappingProfile profile)
        {
            profile.CreateMap<GainCard, GainCardDto>()
                .ForMember(d => d.CardID, opt => opt.MapFrom(s => s.Id))
                .ForMember(d => d.CardName, opt => opt.MapFrom(s => s.CardName))
                .ForMember(d => d.Description, opt => opt.MapFrom(s => s.Description));
        }
    }
}
