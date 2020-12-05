using Domain.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Entities
{
    public class MonopolyFieldList : AuditableEntity
    {
        public string Id { get; set; }
        public IList<MonopolyField> Fields { get; private set; } = new List<MonopolyField>();
    }
}
