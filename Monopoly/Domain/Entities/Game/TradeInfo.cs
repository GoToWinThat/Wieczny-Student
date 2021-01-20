using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities.Game
{
    public class TradeInfo
    {
        public int Id { get; set; }
        public int FromId { get; set; }
        public int DirectId {get;set;}
        public bool Status { get; set; }
        public string Transaction { get; set; }
    }
}
