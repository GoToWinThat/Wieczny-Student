namespace Domain.Entities.Game
{
    public class GameInfo
    {
        public int Id { get; set; }
        public int ActivePlayerIndex { get; set; }
        public int TurnClock { get; set; }
        public int GameClock { get; set; }
        public string GameState{ get; set; }
    }
}
