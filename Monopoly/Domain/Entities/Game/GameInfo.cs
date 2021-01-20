namespace Domain.Entities.Game
{
    public class GameInfo
    {
        public int Id { get; set; }
        public int ActivePlayerIndex { get; set; }
        public int TurnClock { get; set; }//30s
        public int GameClock { get; set; }//20:00
        public string GameState{ get; set; }
    }
}
