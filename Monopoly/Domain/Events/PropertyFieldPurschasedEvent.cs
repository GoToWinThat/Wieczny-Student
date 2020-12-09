using Domain.Base;
using Domain.Entities;

namespace Domain.Events
{
    public class PropertyFieldPurschasedEvent : DomainEvent
    {
        public PropertyFieldPurschasedEvent(PropertyField field)
        {
            this.Field = field;
        }

        public PropertyField Field { get; private set; }
    }
}
