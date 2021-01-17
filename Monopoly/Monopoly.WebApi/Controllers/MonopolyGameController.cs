using Microsoft.AspNetCore.Mvc;
using Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards;
using Monopoly.Core.UseCases.MonopolyCards.Queries.GetLossCards;
using Monopoly.Core.UseCases.MonopolyDices.Commands.UpdateDices;
using Monopoly.Core.UseCases.MonopolyDices.Queries.GetDices;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields;
using Monopoly.Core.UseCases.MonopolyLogs.Commands.AddLog;
using Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdateActivePlayerIndex;
using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetActivePlayer;
using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers;
using System.Threading.Tasks;

namespace Monopoly.WebApi.Controllers
{
    public class MonopolyGameController : ApiControllerBase
    {
        [HttpGet]
        [Route("Fields")]
        public async Task<ActionResult<FieldsVm>> GetFields()
        {
            return await Mediator.Send(new GetMonopolyFieldsQuery());
        }

        [HttpGet]
        [Route("Players")]
        public async Task<ActionResult<PlayersVm>> GetPlayers()
        {
            return await Mediator.Send(new GetMonopolyPlayersQuery());
        }
        [HttpGet]
        [Route("GainCards")]
        public async Task<ActionResult<GainCardsVm>> GetGainCards()
        {
            return await Mediator.Send(new GetMonopolyGainCardsQuery());
        }
        [HttpGet]
        [Route("LossCards")]
        public async Task<ActionResult<LossCardsVm>> GetLossGainCards()
        {
            return await Mediator.Send(new GetMonopolyLossCardsQuery());
        }

        [HttpGet]
        [Route("ActivePlayerIndex")]
        public async Task<ActionResult<int>> GetActivePlayerIndex()
        {
            int playerIndex = await Mediator.Send(new GetActivePlayerIndexQuery());
            await Hub.Clients.All.SendCoreAsync("ActivePlayerIndexMessage", new object[] { playerIndex });
            return playerIndex;
        }
        [HttpPut]
        [Route("UpdatePlayerIndex")]
        public async Task<ActionResult> UpdateActivePlayerIndex(int index)
        {
            await Mediator.Send(new UpdateActivePlayerIndexCommand { Index=index});
            return NoContent();
        }
        [HttpGet]
        [Route("Dices")]
        public async Task<ActionResult<DicesVm>> GetDices()
        {
            return await Mediator.Send(new GetDicesQuery());
        }
        [HttpPut]
        [Route("UpdateDices")]
        public async Task<ActionResult> UpdateDices(UpdateDicesCommand command)
        {
           await Mediator.Send(command);
            return NoContent();
        }
        [HttpGet]
        [Route("Logs")]
        public async Task<ActionResult<LogsVm>> GetLogs()
        {
            
            return await Mediator.Send(new GetLogsQuery());
        }
        [HttpPost]
        [Route("AddLog")]
        public async Task<ActionResult> AddLog(AddLogCommand command)
        {
            await Mediator.Send(command);
            return NoContent();
        }
    }
}
