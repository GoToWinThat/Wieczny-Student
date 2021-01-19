using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards
{
    public class GainCardsVm
    {
        public IList<GainCardDto> GainCards { get; set; }
    }
}
