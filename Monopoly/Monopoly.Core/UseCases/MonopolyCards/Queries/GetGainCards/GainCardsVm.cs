using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards
{
    public class GainCardsVm
    {
        public IList<GainCardDto> GainCards { get; set; }
    }
}
