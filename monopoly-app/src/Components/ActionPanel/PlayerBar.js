import "../../styles/ActionPanel.css";
import Clock from './Clock';
import PlayerBox from './PlayerBox';
import { Button } from 'react-bootstrap';
import { GetActivePlayerIndex, UpdateActivePlayerIndex } from '../../services/monopoly';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export const PlayerBar = (data) => {
    const activePlayerIndex = useSelector(state => state.monopolyReducer.activePlayerIndex);
    const monopolyPlayers = data.data.players;
    const fields = data.data.fields;
    const cards = data.data.gainCards;
    const dispatch = useDispatch();

    try {
        useEffect(() => { GetActivePlayerIndex(dispatch); }, [dispatch]);
    } catch {
        console.log("Couldn't call function useEffect()!");
    }

    let idx = -1;
    return (
        <div className="playerBar">
            { monopolyPlayers.map(pl => <PlayerBox key={pl.name} player={pl} isActive={++idx === activePlayerIndex} cards={cards} fields={fields}/>) }
            <Button className="endTurnButton" onClick={() => 
                UpdateActivePlayerIndex(dispatch, (activePlayerIndex + 1) % monopolyPlayers.length)}>
                <span>Zakończ turę</span>
                <Clock/>
            </Button>
        </div>
    );
}