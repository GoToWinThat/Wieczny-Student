﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Game
{
    public class Dices
    {
        public int Id { get; set; }
        public List<int> DiceValues { get; set; }
    }
}
