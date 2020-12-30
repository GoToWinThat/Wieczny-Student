import "../../styles/ActionPanel.css";
import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetDices, UpdateDices } from '../../services/monopoly';

export const RollDice = () => {
    const dices = useSelector(state => state.monopolyReducer.dices);
    const dispatch = useDispatch();

    try {
        useEffect(() => { GetDices(dispatch); }, [dispatch]);
    } catch {
        console.log("Couldn't call function useEffect()!");
    }

    // Eliminate problem with empty "dices" list (it can be too early to render dices):
    if (dices === null || dices.length === 0) return null;

    return (
        <div>
            <Button className="throwDicesButton" onClick={() => UpdateDices(dispatch, 
                [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1])}>Rzuć kośćmi</Button>
            <img className="diceImg" src={`/Assets/Dice/dice${dices[0]}.png`}/>
            <img className="diceImg" src={`/Assets/Dice/dice${dices[1]}.png`}/>
        </div>
    );
}