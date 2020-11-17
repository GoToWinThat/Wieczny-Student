using Monopoly.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Models
{
    public class MonopolyVM
    {
        public List<string> Data { get; set; } = new List<string>();
        public MonopolyVM(List<MonopolyCard> mc)
        {
            foreach(var m in mc)
            {
                Data.Add($"{m.Name}, {m.Owner}, {m.Price}, {m.Color}");
            }
        }
    }
}
