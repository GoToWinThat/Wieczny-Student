using Domain.Entities.Game;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Player
    {
        public int Id { get; set; }
        public string Nick { get; set; }
        public int Cash { get; set; }
        public ICollection<PropertyFieldInfo> PropertyFieldInfos { get; set; } 
    }
}
