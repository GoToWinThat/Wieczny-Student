using Domain.Base;
using Domain.Entities.Game;
using Domain.Enums;
using Domain.Events;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class PropertyField : MonopolyField, IHasDomainEvent
    {
        public PropertyField() { Type = MonopolyFieldType.property; }
        public int Price { get; set; }
        public List<int> RentCosts { get; set; }
        public int EstatePrice { get; set; }
        public int Mortgage { get; set; }
        public int PropertyFieldInfoId { get; set; }
        public PropertyFieldInfo PropertyFieldInfo { get; set; }

        private bool _purchased;
        public bool Purchased
        {
            get => _purchased;
            set
            {
                if (value == true && _purchased == false)
                {
                    DomainEvents.Add(new PropertyFieldPurschasedEvent(this));
                }

                _purchased = value;
            }
        }

        public List<DomainEvent> DomainEvents { get; set; } = new List<DomainEvent>();
    }
}
