import "../../styles/ActionPanel.css";
import { Button } from 'react-bootstrap';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AddNewLog, GetDices, UpdateDices, UpdatePlayerPosition } from '../../services/monopoly';

export const RollDice = (data) => {
    const dices = useSelector(state => state.monopolyReducer.dices);
    const activePlayerIndex = data.data.activePlayerIndex;
    const activePlayer = data.data.players[activePlayerIndex];
    const dispatch = data.data.dispatch;

    try {
        useEffect(() => { GetDices(dispatch); }, [dispatch]);
    } catch {
        console.log("Couldn't call function useEffect() in RollDice.js!");
    }

    // Eliminate problem with empty "dices" list (it can be too early to render dices):
    if (dices === null || dices.length === 0) return null;

    return (
        <div className="rollDiceComponent">

            <Button className="throwDicesButton" onClick={() => {
                let newDiceState = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
                UpdateDices(dispatch, newDiceState); 

                let numberOnDices = newDiceState[0] + newDiceState[1];
                UpdatePlayerPosition(dispatch, activePlayerIndex, numberOnDices);

                let newPosition = (activePlayer.position + numberOnDices) % data.data.fields.length;
                let newFieldName = data.data.fields[newPosition].name;
                AddNewLog(dispatch, `${activePlayer.name} wyrzuca ${sayItWell(numberOnDices)} i ląduje na polu ${newFieldName}. ` 
                 + `${checkNewField(newFieldName, activePlayer.name)}`);
            }}>Rzuć kośćmi</Button>

            <div className="diceImages">
                <img className="diceImg" src={`/Assets/Dice/dice${dices[0]}.png`} alt="firstdice"/>
                <img className="diceImg" src={`/Assets/Dice/dice${dices[1]}.png`} alt="seconddice"/>
            </div>
        </div>
    );
}
const sayItWell = (number) => (number < 5) ? `${number} oczka` : `${number} oczek`;

// "GO TO JAIL" actions:
function checkNewField(newFieldName, playerName)
{
    switch(newFieldName)
    {
        case "Konsultacje":
            // turns loss implementation will be here
            return `Tym samym ${playerName} traci 2 kolejki!`;
        
        case "Stołówka studencka":
            // turns loss implementation will be here
            return `Tym samym ${playerName} traci 2 kolejki!`;

        case "Dziekanat":
            // turns loss implementation will be here
            return `Tym samym ${playerName} traci 2 kolejki!`;

        default:
            return "";
    }
}