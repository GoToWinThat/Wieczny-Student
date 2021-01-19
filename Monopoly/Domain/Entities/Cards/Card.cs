using System.Collections.Generic;

namespace Domain.Entities.Cards
{
    public class Card
    {
        public int Id { get; set; }
        public int CardIdNumber { get; set; }
        public string Type { get; set; }
        public string CardName { get; set; }
        public string Description { get; set; }
        public ICollection<Player> Players { get; set; }
    }
}
