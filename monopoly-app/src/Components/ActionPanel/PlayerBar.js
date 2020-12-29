import React, { Component } from 'react';
import "../../styles/ActionPanel.css";
import Clock from './Clock';
import PlayerBox from './PlayerBox';
import {Button} from 'react-bootstrap';

class PlayerBar extends Component 
{
    //Class use to track current active player and ending player's turn
    constructor(props){
        super(props)
        //Sample JSON format
        this.state = {activePlayer: 0, players: [
            {name: 'Tomek',color: 'blue',cash: 1500},
            {name: 'Franek',color: 'green',cash: 1400},
            {name: 'Alicja',color: 'red',cash: 680},
            {name: 'Maria',color: 'orange',cash: 700}
            
        ]}
        this.endTurn = this.endTurn.bind(this) 
    }

    endTurn()
    {
        //Changing a state
        this.setState(prevState => {
            
            //Disable current active player and activate next one in the array
            let newActivePlayer;

            if(prevState.activePlayer + 1 >= prevState.players.length)
                newActivePlayer =  0;
            else 
                newActivePlayer =  prevState.activePlayer + 1;

            return {activePlayer: newActivePlayer}
          })
    }

    createBoxes()
    {   
        let idx = -1;
        let active = false;
        
        //Map thru players to create boxes
        const boxes = this.state.players.map(pl => 
        {
            //idx tracks current player in map function and activate only one of them
            idx++;
            if(idx === this.state.activePlayer) active = true
            else active = false
            return (<PlayerBox player={pl} isActive={active}/>)
        })
          
        return(boxes)
    }

    render() {

        return (
            <div className="playerBar">
                {this.createBoxes()}
                <Button className="endTurnButton" onClick={this.endTurn} >
                    <span>Zakończ Ture</span>
                    <Clock/>
                </Button>
            </div>
        );
    }
    
}
export default PlayerBar;