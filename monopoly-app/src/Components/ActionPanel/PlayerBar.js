import "../../styles/ActionPanel.css";
import Clock from './Clock';
import PlayerBox from './PlayerBox';
import { Button } from 'react-bootstrap';
import { UpdateActivePlayerIndex, AddNewLog } from '../../services/monopoly';
import React from 'react';
import { setThrownDices } from "../../boardActions";

export const PlayerBar = (data) => {
    const activePlayerIndex = data.data.activePlayerIndex;
    const monopolyPlayers = data.data.players;
    const fields = data.data.fields;
    const cards = data.data.gainCards;
    const dispatch = data.data.dispatch;

    let idx = -1;
    return (
        <div className="playerBar">
            <div className="playerBarInnerDiv">
                { monopolyPlayers.map(pl => <PlayerBox key={pl.name} player={pl} isActive={++idx === activePlayerIndex} cards={cards} fields={fields}/>) }
            </div>
            <Button id="endTurnButton" onClick={() => {
                // Update who's turn is it now:
                let nextPlayerIndex = (activePlayerIndex + 1) % monopolyPlayers.length;
                UpdateActivePlayerIndex(dispatch, nextPlayerIndex);
                AddNewLog(dispatch, `Tura gracza ${data.data.players[nextPlayerIndex].name}.`);

                // Unlock "Rzuć koścmi" button:
                setThrownDices(false);
                }}>
                <span>Zakończ turę</span>
                <Clock/>
            </Button>
        </div>
    );
}