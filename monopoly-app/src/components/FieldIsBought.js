import React, { Component } from 'react';

class FieldIsBought extends Component {
    render() {
        const isbought =
        <div className="field-is-bought">
            {this.props.players.map((player) => {
                return player.properties.map((property,i) => {
                    if(property.fieldID === this.props.id)
                        return <div className="hej" style={{position: "absolute",top: "0", left: "0",backgroundColor: `${player.color}`, opacity: "0.2", width: "100%", height: "100%", justifyContent: "space-between", zIndex: "4"}}>elooo</div>


                    else
                        return null
                })

            })}
        </div>

        return(isbought)
    }
}
export default FieldIsBought;

{/* <div className="hej" style={{position: "absolute",top: "0", left: "0",backgroundColor: "red", opacity: "1", width: "100%", height: "100%", justifyContent: "space-between", zIndex: "4"}}>elooo</div> */}
