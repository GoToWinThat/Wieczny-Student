using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers
{
    public class PlayersVm
    {
        public IList<PlayerDto> MonopolyPlayers { get; set; }
    }
}
