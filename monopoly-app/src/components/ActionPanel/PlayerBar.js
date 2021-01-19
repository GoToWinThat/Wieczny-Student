import "../../styles/ActionPanel.css";
import React from 'react';
import Clock from './Clock';
import PlayerBox from './PlayerBox';
import {endTurnEvent} from '../../gameplay/turnActions';

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
            <Clock data={data.data} typeOfClock="turnClock" endTurnEvent={() => endTurnEvent(data)}/>
        </div>
    );
}