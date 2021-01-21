import React, { Component } from 'react';
import '../styles/Field.css'
class PopoverEstateLevel extends Component {

    easte(estateLevel, i){
        const level = []
        if(estateLevel === 4){
            level.push(<img key={i} src={`/Assets/Houses/server.svg`} alt="server"/>)
        }else{

            for (let i = 0; i < estateLevel; i++) {
                level.push(<img key={i} src={`/Assets/Houses/computer.svg`} alt="PC"/>)
            }
        }
        return level
    }

    render() {
        const eastateLevel =
        <div className="eastateLevel">
            {this.props.players.map((player) => {
                return player.properties.map((property, i) => {
                    if(property.fieldID === this.props.id)
                        return this.easte(property.estateLevel, i)
                    else
                        return null
                })

            })}
        </div>

        return eastateLevel
    }
}
export default PopoverEstateLevel;

