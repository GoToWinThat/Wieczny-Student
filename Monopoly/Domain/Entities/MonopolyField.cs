using Domain.Base;
using Domain.Enums;
using Domain.Events;
using System;
using System.Collections.Generic;
using System.Text;

namespace Domain.Entities
{
    public class MonopolyField : AuditableEntity
    {
        public int Id { get; set; }
        public MonopolyFieldType Type { get; init;  }
        public string Name { get; set; }

    }
}
