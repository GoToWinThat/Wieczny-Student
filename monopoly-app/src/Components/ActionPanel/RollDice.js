import React, { Component } from 'react';
import "../../Css/ActionPanel.css";

class RollDice extends Component 
{
    constructor(props){
        super(props)
        this.state = {roll: [1,1]}
        this.throwDices = this.throwDices.bind(this) 
    }

    throwDices()
    {
        //Genarate random numbers
        var firstRoll = Math.floor(Math.random() * 6) + 1;
        var secondRoll = Math.floor(Math.random() * 6) + 1;

        //Changing a state
        this.setState({roll: [firstRoll,secondRoll]})

        //To Do: Send roll state to api
    }

    render() {
        return (
            <div>
                <button className="throwDicesButton" onClick={this.throwDices} >Roll Dice</button>
                <img className="diceImg" src={`/Assets/Dice/dice${this.state.roll[0]}.png`}/>
                <img className="diceImg" src={`/Assets/Dice/dice${this.state.roll[1]}.png`}/>
            </div>
        );
    }
    
}
export default RollDice;