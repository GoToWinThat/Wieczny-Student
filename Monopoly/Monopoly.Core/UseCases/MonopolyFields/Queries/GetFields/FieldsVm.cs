using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto;
using System.Collections.Generic;


namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields
{
    public class FieldsVm
    {
        public IList<MonopolyFieldDto> MonopolyFields { get; set; }
    }
}
