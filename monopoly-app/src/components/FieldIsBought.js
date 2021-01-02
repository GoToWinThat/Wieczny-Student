import React, { Component } from 'react';
import '../styles/FieldIsBought.css'

class FieldIsBought extends Component {
    render() {
        const isbought =
        <div className="field-is-bought">
            {this.props.players.map((player) => {
                return player.properties.map((property,i) => {
                    if(property.fieldID === this.props.id)
                        return <div className="field-is-bought" style={{backgroundColor: `${player.color}`}}></div>
                    else
                        return null
                })

            })}
        </div>

        return(isbought)
    }
}
export default FieldIsBought;

