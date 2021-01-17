using Microsoft.AspNetCore.Mvc;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.DeleteLoggedPlayer;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.LogNewPlayer;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerCash;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerPosition;
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
            return NoContent();
        }
        [HttpPut]
        [Route("UpdatePlayerCash")]
        public async Task<ActionResult> UpdatePlayerCash(UpdatePlayerCashCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpPost]
        [Route("LogNewPlayer")]
        public async Task<ActionResult> LogNewPlayer(LogNewPlayerCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        [HttpDelete]
        [Route("DeleteLoggedPlayer")]
        public async Task<ActionResult> DeleteLoggedPlayer(DeleteLoggedPlayerCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }

        /*[HttpPut]
        [Route("UpdatePlayerNewProperty")]
        public async Task<ActionResult> UpdatePlayerNewProperty(UpdatePlayerNewPropertyCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }*/
    }
}
