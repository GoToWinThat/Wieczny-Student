import "../../styles/ActionPanel.css";
import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetDices, UpdateDices, GetActivePlayerIndex, UpdatePlayerPosition } from '../../services/monopoly';

export const RollDice = () => {
    const dices = useSelector(state => state.monopolyReducer.dices);
    const activePlayerIndex = useSelector(state => state.monopolyReducer.activePlayerIndex);
    const dispatch = useDispatch();

    try {
        useEffect(() => { GetDices(dispatch); GetActivePlayerIndex(dispatch); }, [dispatch]);
    } catch {
        console.log("Couldn't call function useEffect()!");
    }

    // Eliminate problem with empty "dices" list (it can be too early to render dices):
    if (dices === null || dices.length === 0) return null;

    return (
        <div className="rollDiceComponent">
            <Button className="throwDicesButton" onClick={() => {
                let newDiceState = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
                UpdateDices(dispatch, newDiceState); 
                UpdatePlayerPosition(dispatch, activePlayerIndex, newDiceState)}}>Rzuć kośćmi</Button>
            <div className="diceImages">
                <img className="diceImg" src={`/Assets/Dice/dice${dices[0]}.png`} alt="firstdice"/>
                <img className="diceImg" src={`/Assets/Dice/dice${dices[1]}.png`} alt="seconddice"/>
            </div>
        </div>
    );
}