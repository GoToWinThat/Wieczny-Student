using Domain.Enums;

namespace Domain.Entities
{
    public class MonopolyField
    {
        public int Id { get; set; }
        public MonopolyFieldType Type { get; init;  }
        public string Name { get; set; }
    }
}
