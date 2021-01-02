import React, { Component } from 'react';
import '../styles/EastateLevel.css'
class PopoverEstateLevel extends Component {

    easte(estateLevel){
        const level = []
        if(estateLevel === 4){
            level.push(<img src={`/Assets/Houses/server.svg`} alt="server"/>)
        }else{

            for (let i = 0; i < estateLevel; i++) {
                level.push(<img src={`/Assets/Houses/computer.svg`} alt="PC"/>)
            }
        }
        return level
    }

    render() {
        const eastateLevel =
        <div className="eastateLevel">
            {this.props.players.map((player) => {
                return player.properties.map((property) => {
                    if(property.fieldID === this.props.id)
                        return this.easte(property.estateLevel)
                    else
                        return null
                })

            })}
        </div>

        return eastateLevel
    }
}
export default PopoverEstateLevel;

