using Domain.Entities.Cards;
using Domain.Entities.Game;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Player
    {
        public int Id { get; set; }
        public string HubConnectionId { get; set; }
        public int Cash { get; set; }
        public string Signature { get; set; } 
        public string Color { get; set; }
        public string Name { get; set; }
        public int Position { get; set; }
        public int TurnsToWait { get; set; }
        public bool IsInJail { get; set; }
        public bool IsBankrupt { get; set; }
        public bool IsLogged { get; set; }
        public bool IsReady { get; set; }
        public bool ThrownDices { get; set; }
        public ICollection<PropertyFieldInfo> PropertyFieldInfos { get; set; }
        public ICollection<Card> Cards { get; set; }
    }
}
