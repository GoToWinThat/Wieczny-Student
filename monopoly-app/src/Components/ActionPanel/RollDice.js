import "../../styles/ActionPanel.css";
import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GetDices } from '../../services/monopolyService';
import { thrownDices, throwDicesEvent } from '../../gameplay/fieldActions';

export const RollDice = (data) => {
    const dices = useSelector(state => state.monopolyReducer.dices);
    const dispatch = data.data.dispatch;

    try { useEffect(() => { GetDices(dispatch); }, [dispatch]); } catch {
        console.log("Couldn't call function useEffect() in RollDice.js!"); }

    // Eliminate problem with empty "dices" list (it can be too early to render dices):
    if (dices === null || dices.length === 0) return null;

    return (
        <div className="rollDiceComponent">
            <Button id="throwDicesButton" disabled={thrownDices} 
            onClick={() => throwDicesEvent(data)} onMouseDown={(e) => e.preventDefault()}>Rzuć kośćmi</Button>
            <div className="diceImages">
                <img className="diceImg" src={`/Assets/Dice/dice${dices[0]}.png`} alt="firstdice"/>
                <img className="diceImg" src={`/Assets/Dice/dice${dices[1]}.png`} alt="seconddice"/>
            </div>
        </div>
    );
}