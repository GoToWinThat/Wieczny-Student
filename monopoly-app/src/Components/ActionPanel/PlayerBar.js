import "../../styles/ActionPanel.css";
import Clock from './Clock';
import PlayerBox from './PlayerBox';
import { Button } from 'react-bootstrap';
import { UpdateActivePlayerIndex, AddNewLog, UpdatePlayerUpdateWaitingTurns } from '../../services/monopoly';
import React from 'react';
import { setThrownDices, thrownDices } from "../../boardActions";

export const PlayerBar = (data) => {
    const activePlayerIndex = data.data.activePlayerIndex;
    const players = data.data.players;
    const fields = data.data.fields;
    const cards = data.data.gainCards;

    let idx = -1;
    return (
        <div className="playerBar">
            <div className="playerBarInnerDiv">
                { players.map(pl => <PlayerBox key={pl.name} player={pl} isActive={++idx === activePlayerIndex} cards={cards} fields={fields}/>) }
            </div>
            <Clock endTurnEvent={() => endTurnEvent(data)}/>
        </div>
    );
}

function endTurnEvent(data) 
{
    const activePlayerIndex = data.data.activePlayerIndex;
    const players = data.data.players;
    const dispatch = data.data.dispatch;
    const sayItWell = (number) => (number === 1) ? `ostatnią kolejkę` : `jeszcze ${number} kolejki`;

    // Throw dices if it haven't happened yet:
    if (thrownDices === false)
        document.getElementById("throwDicesButton").click();

    // Update who's turn is it now and waitToTurns attributes:
    var nextPlayerIndex = (activePlayerIndex + 1) % players.length;
    var waitingArray = returnWaitingArray(players);
    while (waitingArray[nextPlayerIndex] > 0)
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
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }
    UpdateActivePlayerIndex(dispatch, nextPlayerIndex);
    AddNewLog(dispatch, `Tura gracza ${players[nextPlayerIndex].name}.`);

    // Unlock "Rzuć koścmi" button:
    setThrownDices(false);
}

function returnWaitingArray(players)
{
    let tmp = [];
    for (let i = 0; i < players.length; i++) 
        tmp.push(players[i].turnsToWait);
    return tmp;
}