namespace Domain.Entities.Game
{
    public class PropertyFieldInfo
    {
        public int Id { get; set; }
        public int EstatesBought { get; set; }

        public int? PlayerId { get; set; }
        public Player Player { get; set; }

        public PropertyField PropertyField { get;set;}
    }
}
