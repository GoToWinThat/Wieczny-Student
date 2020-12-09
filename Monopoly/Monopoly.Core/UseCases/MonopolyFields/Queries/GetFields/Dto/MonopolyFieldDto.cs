using Domain.Enums;
using Newtonsoft.Json;

namespace Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields.Dto
{
    public class MonopolyFieldDto
    {
        [JsonProperty(Order = int.MinValue)]
        public int FieldID { get; set; }

        [JsonProperty(Order = int.MinValue)]
        public MonopolyFieldType Type { get; set; }

        [JsonProperty(Order = int.MinValue)]
        public string Name { get; set; }
    }
}
