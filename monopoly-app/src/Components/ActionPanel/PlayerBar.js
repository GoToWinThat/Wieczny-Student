import React, { Component } from 'react';
import "../../Css/ActionPanel.css";
import PlayerBox from './PlayerBox';

class PlayerBar extends Component 
{
    //Class use to track current active player and ending player's turn
    constructor(props){
        super(props)
        //Sample JSON format
        this.state = {activePlayer: 0, players: [
            {name: 'Tomek',color: 'blue'},
            {name: 'Franek',color: 'green'},
            {name: 'Alicja',color: 'red'},
            {name: 'Maria',color: 'orange'}
            
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
                <button className="endTurnButton" onClick={this.endTurn} >Zakończ Ture</button>
            </div>
        );
    }
    
}
export default PlayerBar;