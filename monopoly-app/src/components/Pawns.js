import React, { Component } from 'react';
import { Badge } from 'react-bootstrap';

class Pawns extends Component {
    constructor(props){
        super(props)
    }

    render() {
        const pawns =
        <div className="players-pawns">
            {this.props.players.map((player,i) => {
                if(player.position === this.props.id)
                    return <Badge pill variant="primary" key={i} style={{backgroundColor: `${player.color}`, position: "absolute", top: `${30}px`, left: `${(i+1) * 10}px`}}>&#8203;</Badge>
                else
                    return null
            })}
        </div>

        return(
            pawns
        )
    }
}
// {this.props.players.players.map((player,i) => {
//     if(player.id === this.props.id)
//         return <Badge pill variant="primary" style={{backgroundColor: `${player.color}`, position: "absolute", top: `${this.state.top}px`, left: `${this.state.left}px`}}>&#8203;</Badge>
//     else
//         return null
// })}

export default Pawns;