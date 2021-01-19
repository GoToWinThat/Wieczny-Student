using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers.Dto;
using System.Collections.Generic;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers
{
    public class PlayersVm
    {
        public IList<PlayerDto> MonopolyPlayers { get; set; }
    }
}
