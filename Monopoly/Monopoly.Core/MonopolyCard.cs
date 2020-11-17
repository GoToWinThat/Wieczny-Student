using System;
using System.Collections.Generic;
using System.Text;

namespace Monopoly.Core
{
    public class MonopolyCard
    {
        public string Name { get; set; }
        public string Price { get; set; }
        public string Owner { get; set; }
        public string Color { get; set; }

        public MonopolyCard(string n, string p, string o, string c)
        {
            Name = n;
            Price = p;
            Owner = o;
            Color = c;
        }
    }
}
