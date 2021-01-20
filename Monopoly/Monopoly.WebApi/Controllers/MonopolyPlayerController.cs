using Microsoft.AspNetCore.Mvc;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.LogNewPlayer;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerAddEventCard;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerCash;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerDeleteEventCard;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerDeleteProperty;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerExpandProperty;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerMortgageProperty;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerNewProperty;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerPosition;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerUpdateBankrupt;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerUpdateWaitingTurns;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Controllers
{
    public class MonopolyPlayerController : ApiControllerBase
    {
        [HttpPut]
        [Route("UpdatePlayerPosition")]
        public async Task<ActionResult> UpdatePlayerPosition(UpdatePlayerPositionCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }
        [HttpPut]
        [Route("UpdatePlayerCash")]
        public async Task<ActionResult> UpdatePlayerCash(UpdatePlayerCashCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }

        [HttpPost]
        [Route("LogNewPlayer")]
        public async Task<ActionResult<int>> LogNewPlayer(LogNewPlayerCommand command)
        {
            int addedPlayerIndex= await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return addedPlayerIndex;
        }


        [HttpPut]
        [Route("UpdatePlayerNewProperty")]
        public async Task<ActionResult> UpdatePlayerNewProperty(UpdatePlayerNewPropertyCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }
        [HttpDelete]
        [Route("UpdatePlayerDeleteProperty")]
        public async Task<ActionResult> UpdatePlayerDeleteProperty(UpdatePlayerDeletePropertyCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }
        [HttpPut]
        [Route("UpdatePlayerExpandProperty")]
        public async Task<ActionResult> UpdatePlayerExpandProperty(UpdatePlayerExpandPropertyCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }
        [HttpPut]
        [Route("UpdatePlayerMortgageProperty")]
        public async Task<ActionResult> UpdatePlayerMortgageProperty(UpdatePlayerMortgagePropertyCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }

        [HttpPut]
        [Route("UpdatePlayerAddEventCard")]
        public async Task<ActionResult> UpdatePlayerAddEventCard(UpdatePlayerAddEventCardCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }
        [HttpDelete]
        [Route("UpdatePlayerDeleteEventCard")]
        public async Task<ActionResult> UpdatePlayerDeleteEventCard(UpdatePlayerDeleteEventCardCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }
        [HttpPut]
        [Route("UpdatePlayerWaitingTurns")]
        public async Task<ActionResult> UpdatePlayerWaitingTurns(UpdatePlayerWaitingTurnsCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            return NoContent();
        }

        [HttpPut]
        [Route("UpdatePlayerBankrupt")]
        public async Task<ActionResult> UpdatePlayerBankrupt(UpdatePlayerBankruptCommand command)
        {
            var isGameOver = await Mediator.Send(command);
            if (isGameOver == true)
            {
                await Hub.Clients.All.SendCoreAsync("GetGameState", new object[] { "GetGameState" });
            }
            else
            {
                await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            }
            return NoContent();
        }
    }
}
