namespace Domain.Entities.Game
{
    public class PropertyFieldInfo
    {
        public int Id { get; set; }
        public int EstateLevel { get; set; }
        public bool Mortgaged { get; set; }
        public int? PlayerId { get; set; }
        public Player Player { get; set; }

        public int? PropertyFieldId { get; set; }
        public PropertyField PropertyField { get;set;}
    }
}
