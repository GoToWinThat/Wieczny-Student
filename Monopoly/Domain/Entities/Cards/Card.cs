using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Cards
{
    public class Card
    {
        public int Id { get; set; }
        public string Type { get; set; }
        public string CardName { get; set; }
        public string Description { get; set; }
        public int? PlayerId { get; set; }
        public Player Player { get; set; }
    }
}
