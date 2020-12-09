using Domain.Enums;

namespace Domain.Entities
{
    public class EventField : MonopolyField
    {
        public EventField() { Type = MonopolyFieldType.Event; }
    }
}
