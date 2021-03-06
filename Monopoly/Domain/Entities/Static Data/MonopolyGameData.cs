﻿using System;
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
        public static readonly List<string> Color = new List<string> { "purple", "steelblue", "red" };
        public static readonly List<string> Nicks = new List<string> { "BOT 1", "BOT 2", "BOT 3" };
    }
}
