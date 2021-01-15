import { UpdateActivePlayerIndex, AddNewLog, UpdatePlayerUpdateWaitingTurns } from '../services/monopolyService';
import { setThrownDices, thrownDices, throwDicesEvent } from "./fieldActions";

export const endTurnEvent = (data) =>
{
    const activePlayerIndex = data.data.activePlayerIndex;
    const players = data.data.players;
    const dispatch = data.data.dispatch;
    const sayItWell = (number) => (number === 1) ? `ostatnią kolejkę` : `jeszcze ${number} kolejki`;

    // Throw dices if it haven't happened yet:
    if (thrownDices === false)
        throwDicesEvent(data);

    // Update who's turn is it now:
    var nextPlayerIndex = (activePlayerIndex + 1) % players.length;

    // Deal with players who have to wait a turn and those who have already bankrupted:
    var waitingArray = returnWaitingArray(players);
    while (waitingArray[nextPlayerIndex] > 0 || players[nextPlayerIndex].isBankrupt === true)
    {
        if (players[nextPlayerIndex].isBankrupt === false) // so he has to wait only few turns, not forever
        {
            // Add log about necessity of waiting:
            AddNewLog(dispatch, `Tura gracza ${players[nextPlayerIndex].name}.`);
            AddNewLog(dispatch, `Gracz ${players[nextPlayerIndex].name} czeka`
                +` ${sayItWell(waitingArray[nextPlayerIndex])}.`);

            // Update API:
            if (players[nextPlayerIndex].turnsToWait === 1) 
                UpdatePlayerUpdateWaitingTurns(dispatch, players[nextPlayerIndex].name, -1, false);
            else 
                UpdatePlayerUpdateWaitingTurns(dispatch, players[nextPlayerIndex].name, -1, players[nextPlayerIndex].isInJail);
            
            // Update local temporary data:
            waitingArray[nextPlayerIndex]--;
        }

        // Update again who's turn is it now:
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }

    // Beginning of new turn:
    UpdateActivePlayerIndex(dispatch, nextPlayerIndex);
    AddNewLog(dispatch, `Tura gracza ${players[nextPlayerIndex].name}.`);
    setThrownDices(false);

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
        AddNewLog(dispatch, `Wygrywa gracz ${players[nextPlayerIndex].name}.`);
        // change "gameOver" to "true", block all buttons, etc.
    }
}