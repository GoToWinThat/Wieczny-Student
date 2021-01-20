using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetLossCards
{
    public class LossCardsVm
    {
        public IList<LossCardDto> LossCards { get; set; }
    }
}
