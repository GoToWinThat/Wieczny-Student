using Microsoft.AspNetCore.Mvc;
using Monopoly.Core.UseCases.MonopolyCards.Queries.GetGainCards;
using Monopoly.Core.UseCases.MonopolyCards.Queries.GetLossCards;
using Monopoly.Core.UseCases.MonopolyDices.Commands.UpdateDices;
using Monopoly.Core.UseCases.MonopolyDices.Queries.GetDices;
using Monopoly.Core.UseCases.MonopolyDices.Queries.GetTrade;
using Monopoly.Core.UseCases.MonopolyFields.Queries.GetFields;
using Monopoly.Core.UseCases.MonopolyGame.Commands.AddTrade;
using Monopoly.Core.UseCases.MonopolyGame.Queries.GetGameState;
using Monopoly.Core.UseCases.MonopolyLogs.Commands.AddLog;
using Monopoly.Core.UseCases.MonopolyLogs.Queries.GetLogs;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdateActivePlayerIndex;
using Monopoly.Core.UseCases.MonopolyPlayers.Commands.UpdatePlayerReadiness;
using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetActivePlayer;
using Monopoly.Core.UseCases.MonopolyPlayers.Queries.GetPlayers;
using System;
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
            return playerIndex;
        }
        [HttpPut]
        [Route("UpdateActivePlayerIndex")]
        public async Task<ActionResult> UpdateActivePlayerIndex(UpdateActivePlayerIndexCommand command)
        {
            Tuple<bool, bool> result = await Mediator.Send(command);
            //Jezeli skonczyl sie czas to koniec gry
            if (result.Item2)
            {
                await Hub.Clients.All.SendCoreAsync("GetGameState", new object[] { "GetGameState" });
            }
            else
            {
                //Jezeli grał bot aktualizujemy
                if (result.Item1)
                {
                    await Hub.Clients.All.SendCoreAsync("GetDices", new object[] { "GetDices" });
                    await Hub.Clients.All.SendCoreAsync("GetGameState", new object[] { "GetGameState" });
                }
               
            }
            await Hub.Clients.All.SendCoreAsync("GetLogs", new object[] { "GetLogs" });
            await Hub.Clients.All.SendCoreAsync("GetActivePlayerIndex", new object[] { "GetActivePlayerIndex" });
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
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
           await Hub.Clients.All.SendCoreAsync("GetDices", new object[] { "GetDices" });
           await Hub.Clients.All.SendCoreAsync("GetLogs", new object[] { "GetLogs" });
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
            await Hub.Clients.All.SendCoreAsync("GetLogs", new object[] { "GetLogs" });
            return NoContent();
        }
        [HttpGet]
        [Route("GameState")]
        public async Task<ActionResult<GameStateVm>> GetGameState()
        {
            return await Mediator.Send(new GetGameStateQuery());
        }

        [HttpPut]
        [Route("UpdatePlayerReadiness")]
        public async Task<ActionResult> UpdatePlayerReadiness(UpdatePlayerReadinessCommand command)
        {
            var isGameStarted = await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetPlayers", new object[] { "GetPlayers" });
            if(isGameStarted==true)
            {
                await Hub.Clients.All.SendCoreAsync("GetGameState", new object[] { "GetGameState" });
            }
            await Hub.Clients.All.SendCoreAsync("GetLogs", new object[] { "GetLogs" });
            return NoContent();
        }

        [HttpPost]
        [Route("AddTrade")]
        public async Task<ActionResult> AddTrade(AddTradeCommand command)
        {
            await Mediator.Send(command);
            await Hub.Clients.All.SendCoreAsync("GetTrade", new object[] { "GetTrade" });
            await Hub.Clients.All.SendCoreAsync("GetLogs", new object[] { "GetLogs" });
            return NoContent();
        }
        [HttpGet]
        [Route("GetTrade")]
        public async Task<ActionResult<TradeVm>> GetTrade()
        {
            return await Mediator.Send(new GetTradeQuery());
        }
    }
}
