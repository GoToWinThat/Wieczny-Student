import React, { Component } from 'react';
import '../styles/Pawns.css'

class Pawns extends Component {
    render() {
        const pawns =
        <div className="players-pawns">
            {this.props.players.map((player,i) => {
                if(player.position === this.props.id && player.isBankrupt === false)
                    return <span key={i} style={{color: `${player.color}`}}>{String.fromCharCode(player.signature)}</span>
                else
                    return null
            })}
        </div>

        return(pawns)
    }
}
//balwan    radioactive     Knight      pawn        pióro
// &#9731;  &#9762;         &#9822;     &#9823;     &#10002;

//whitespace
// &#8203;

export default Pawns;