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
            <Button id="endTurnButton" onClick={() => endTurnEvent(data)}>
                <span>Zakończ turę</span>
                <Clock/>
            </Button>
        </div>
    );
}

function endTurnEvent(data) 
{
    const activePlayerIndex = data.data.activePlayerIndex;
    const players = data.data.players;
    const dispatch = data.data.dispatch;
    const sayItWell = (number) => (number === 1) ? `${number} kolejkę` : `${number} kolejki`;

    // Throw dices if it haven't happened yet:
    if (thrownDices === false)
        document.getElementById("throwDicesButton").click();

    // Update who's turn is it now and waitToTurns attributes:
    var nextPlayerIndex = (activePlayerIndex + 1) % players.length;
    while (players[nextPlayerIndex].turnsToWait > 0)
    {
        UpdateActivePlayerIndex(dispatch, nextPlayerIndex);
        AddNewLog(dispatch, `Tura gracza ${players[nextPlayerIndex].name}.`);
        AddNewLog(dispatch, `Gracz ${players[nextPlayerIndex].name} musi czekać`
            +` jeszcze ${sayItWell(players[nextPlayerIndex].turnsToWait)}.`);

        if (players[nextPlayerIndex].turnsToWait === 1) 
            UpdatePlayerUpdateWaitingTurns(dispatch, players[nextPlayerIndex].name, -1, false);
        else 
            UpdatePlayerUpdateWaitingTurns(dispatch, players[nextPlayerIndex].name, -1, players[nextPlayerIndex].isInJail);
        nextPlayerIndex = (nextPlayerIndex + 1) % players.length;
    }
    UpdateActivePlayerIndex(dispatch, nextPlayerIndex);
    AddNewLog(dispatch, `Tura gracza ${players[nextPlayerIndex].name}.`);

    // Unlock "Rzuć koścmi" button:
    setThrownDices(false);
}