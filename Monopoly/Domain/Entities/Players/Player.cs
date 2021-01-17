using Domain.Entities.Cards;
using Domain.Entities.Game;
using Domain.Enums;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Player
    {
        public int Id { get; set; }
        public int Cash { get; set; }
        public string Signature { get; set; } 
        public MonopolyColor Color { get; set; }
        public string Name { get; set; }
        public ICollection<PropertyFieldInfo> PropertyFieldInfos { get; set; }
        public ICollection<Card> Cards { get; set; }
        public int Position { get; set; }
        public bool IsInJail { get; set; }
        public int TurnsToWait { get; set; }
        public bool IsBrankrupt { get; set; }
        public bool IsLogged { get; set; }
    }
}
