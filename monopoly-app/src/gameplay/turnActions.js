import { UpdateActivePlayerIndex, UpdatePlayerWaitingTurns,AddNewLog } from '../services/monopolyService';
import { canPreventBankrupt, bankrupt } from '../components/Modals/ManageBankrupt'


export const endTurnEvent = (data) =>
{
    const myIndex = data.data.myIndex;
    const dispatch = data.data.dispatch;


    if (data.data.activePlayerIndex == data.data.myIndex)
    UpdateActivePlayerIndex(dispatch, myIndex);
    
    return;

    const sayItWell = (number) => (number === 1) ? `ostatnią kolejkę` : `jeszcze ${number} kolejki`;

    //Check if player is bancrupt
    if (myIndex === activePlayerIndex)
        if(!canPreventBankrupt(dispatch, players[myIndex], fields))
            bankrupt(dispatch, players[myIndex])

    // Throw dices if it haven't happened yet:
    //if (players[data.data.myIndex].thrownDices === false) throwDicesEvent(data);

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

    // Beginning of new turn:
    UpdateActivePlayerIndex(dispatch, nextPlayerIndex);
    //AddNewLog(dispatch, `Tura gracza ${players[nextPlayerIndex].name}.`);

    // Check if this player won:
    GameOver(dispatch, players, nextPlayerIndex);
}

// Making "waiting array" for automatic updating players' "turnsToWait" attributes:
function returnWaitingArray(players)
{
    let tmp = [];
    for (let i = 0; i < players.length; i++)
        tmp.push(players[i].turnsToWait);
    return tmp;
}

// Checking if current player is a winner:
function GameOver(dispatch, players, nextPlayerIndex)
{
    let tmp = 0;
    for (let i = 0; i < players.length; i++)
        if (players[i].cash >= 0)
            tmp++;

    if (tmp === 1)
    {
        //AddNewLog(dispatch, `Wygrywa gracz ${players[nextPlayerIndex].name}.`);
        // change "gameOver" to "true", block all buttons, etc.
    }
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
    AddNewLog(dispatch, `Wygrał ${winner.name} z wynikiem ${highestScore}`)
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
