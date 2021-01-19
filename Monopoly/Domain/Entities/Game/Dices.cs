using System.Collections.Generic;

namespace Domain.Entities.Game
{
    public class Dices
    {
        public int Id { get; set; }
        public List<int> DiceValues { get; set; }
    }
}
