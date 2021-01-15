import React, { Component } from 'react';
import '../styles/FieldIsBought.css'

class FieldIsBought extends Component {
    render() {
        const isbought =
        <div className="field-is-bought">
            {this.props.players.map((player) => {
                return player.properties.map((property, i) => {

                    if (property.fieldID === this.props.id) return  <React.Fragment key={i}>
                        <div key={i} className="field-is-bought-colored" style={{backgroundColor: `${player.color}`}}></div>
                        {property.mortgaged ? <img src={`/Assets/Fields/bug-fill.svg`} alt="bug"></img> : null}
                    </React.Fragment>
                    else return null
                })
            })}
        </div>
        return(isbought)
    }
}

export default FieldIsBought;
