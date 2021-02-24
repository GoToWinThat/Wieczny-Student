import { UpdateActivePlayerIndex, AddNewLog } from '../services/monopolyService';
import { canPreventBankrupt, bankrupt } from '../components/Modals/ManageBankrupt'


export const endTurnEvent = (data) =>
{
    const myIndex = data.data.myIndex;
    const activePlayerIndex = data.data.activePlayerIndex;
    const dispatch = data.data.dispatch;
    const players = data.data.players;
    const fields = data.data.fields;
    const gameState = data.data.gameState;

    if (myIndex === activePlayerIndex && gameState != "over")
    {
        if(!canPreventBankrupt(dispatch, players[myIndex], fields))
            bankrupt(dispatch, players[myIndex]);

        UpdateActivePlayerIndex(dispatch, myIndex);
    }

    return;
}

export const EndGameEvent = (players,fields,dispatch) => {


    var winner = players[0];
    var highestScore = 0;

    players.forEach(player =>
    {
        let score = playersTotalCash(player,fields)
        //console.log(`${player.name} z wynikiem ${score}`)
        if(score> highestScore)
        {
            highestScore = score;
            winner = player;
        }
    })
    AddNewLog(dispatch, `Wygrywa gracz ${winner.name}!`)
  }

  const playersTotalCash = (player,fields) => {

    let total = player.cash;

    player.eventCards.forEach(card => total += 10);

    player.properties.forEach(propetry =>
    {
        let field = fields.filter(field => field.fieldID === propetry.fieldID)[0]

        total += propetry.estateLevel * field.estatePrice;
        if(!propetry.mortgaged) total += field.price;

    })
    return total;
  }
