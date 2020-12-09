using System.Collections.Generic;

namespace Domain.Entities
{
    public class MonopolyFieldList
    {
        public string Id { get; set; }
        public IList<MonopolyField> Fields { get; private set; } = new List<MonopolyField>();
    }
}
