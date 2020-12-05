using Domain.Entities;
using Domain.Enums;
using Monopoly.Core.Base.Mappings;
using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto
{
    public class MonopolyFieldDto 
    {
        public int FieldID { get; set; }
        public MonopolyFieldType Type { get; set; }
        public string Name { get; set; }      
    }
}
