using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Game
{
    public class GameInfo
    {
        public int Id { get; set; }
        public int ActivePlayerIndex { get; set; }
        public bool GameStarted { get; set; }
    }
}
