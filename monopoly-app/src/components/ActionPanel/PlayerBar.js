import "../../styles/ActionPanel.css";
import React from 'react';
import TurnClock from './TurnClock';
import PlayerBox from './PlayerBox';
import {endTurnEvent} from '../../gameplay/turnActions';

export const PlayerBar = (data) => {
    
    const activePlayerIndex = data.data.activePlayerIndex;
    const players = data.data.players;
    const fields = data.data.fields;
    const cards = data.data.gainCards;
    const myIndex = data.data.myIndex;

    let idx = -1;
    return (
        <div className="playerBar">
            <div className="playerBarInnerDiv">
                { players.map(pl => <PlayerBox key={pl.name} player={pl} isActive={++idx === activePlayerIndex} cards={cards} fields={fields}/>) }
            </div>
            <TurnClock activePlayerIndex={activePlayerIndex} typeOfClock="turnClock" endTurnEvent={() => endTurnEvent(data)}  myIndex={myIndex}/>
        </div>
    );
}