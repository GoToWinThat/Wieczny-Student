using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Static_Data
{
    public static class MonopolyGameData
    {
        public static readonly List<string> PlayerSignatures = new List<string> { "9772", "9762", "9823", "9784" };
        public static readonly List<string> GameStates = new List<string> {"config","running","over" };
        public static readonly List<string> Color = new List<string> { "111111", "222222", "333333" };
        public static readonly List<string> Nicks = new List<string> { "Keylloger", "Vice", "Okruszek" };
    }
}
