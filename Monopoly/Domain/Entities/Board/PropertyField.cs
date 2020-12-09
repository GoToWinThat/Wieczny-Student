using Domain.Base;
using Domain.Entities.Game;
using Domain.Enums;
using Domain.Events;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class PropertyField : MonopolyField, IHasDomainEvent
    {
        public PropertyField() { Type = MonopolyFieldType.Property; }
        public PropertyColor Color { get; set; }
        public int Price { get; set; }
        public int Mortage { get; set; }
        public int EstatePrice { get; set; }
        public List<int> RentCosts { get; set; }
        public int PropertyFieldInfoRef { get; set; }
        public PropertyFieldInfo PropertyFieldInfo { get; set; }

        private bool _purschased;
        public bool Purschased
        {
            get => _purschased;
            set
            {
                if (value == true && _purschased == false)
                {
                    DomainEvents.Add(new PropertyFieldPurschasedEvent(this));
                }

                _purschased = value;
            }
        }

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
