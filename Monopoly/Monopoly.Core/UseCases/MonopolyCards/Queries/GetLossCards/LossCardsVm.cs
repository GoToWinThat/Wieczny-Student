using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetLossCards
{
    public class LossCardsVm
    {
        public IList<LossCardDto> LossCards { get; set; }
    }
}
