using Domain.Entities.Game;
using Monopoly.Core.Base.Mappings;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyGame.GetGameState
{
    public class GameStateDto: IMapFrom<GameInfo>
    {
        public string GameState { get; set; }
        public int TurnClock { get; set; }
        public int GameClock { get; set; }
        public static void Mapping(MappingProfile profile)
        {
            profile.CreateMap<GameInfo, GameStateDto>()
                .ForMember(d => d.GameState, opt => opt.MapFrom(s => s.GameState))
                .ForMember(d => d.TurnClock, opt => opt.MapFrom(s => s.TurnClock))
                .ForMember(d => d.GameClock, opt => opt.MapFrom(s => s.GameClock));
        }
    }
}
