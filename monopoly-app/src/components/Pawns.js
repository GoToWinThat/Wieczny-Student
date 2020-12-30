import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';
import '../styles/Pawns.css'

class Pawns extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const pawns =
        <div className="players-pawns">
            {this.props.players.map((player,i) => {
                if(player.position === this.props.id)
                    return <span style={{color: `${player.color}`, fontSize: "1.8em"}}>{String.fromCharCode(player.signature)}</span>
                else
                    return null
            })}
        </div>

        return(
            pawns
        )
    }
}
//balwan    radioactive     Knight      pawn        pióro
// &#9731;  &#9762;         &#9822;     &#9823;     &#10002;

//whitespace
// &#8203;

{/* <Badge pill variant="primary" key={i} style={{backgroundColor: `${player.color}`, margin: "0.3em"}}>&#9731;</Badge> */}

//, position: "absolute", top: `${30}px`, left: `${(i+1) * 10}px`
export default Pawns;