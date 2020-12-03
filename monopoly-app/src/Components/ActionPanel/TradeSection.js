import "../../Css/ActionPanel.css";
import React, { Component } from 'react';

class TradeSection extends Component
{
    constructor(props){
        super(props)
        this.state = {
            activePlayer: props.activePlayer,
            playerInfo: {
                name: 'Tomek',
                money: 150,
                color: 'blue',
                properties: [
                {
                    fieldID: 12,
                    type: "property",
                    name: "Laboratorium nr 409 (MS)",
                    color: "lightgreen",
                    price: 100,
                    rents: [10, 20, 30, 40, 50, 60],
                    oneHousePrice: 10
                },
                {
                    fieldID: 6,
                    type: "property",
                    name: "Laboratorium nr 401 (MS)",
                    color: "lightblue",
                    price: 100,
                    rents: [10, 20, 30, 40, 50, 60],
                    oneHousePrice: 10
                },
            ]
            }
        }
    }

    createListOfFields()
    {
        var array = [];
        var porpList = this.state.playerInfo.properties;
        for (var i = 0; i < porpList.length; i++) 
        {
            array.push(
                <div className="propertyRow">
                    <input type='checkbox'/>
                    <div className="propertyBox" style={{background: porpList[i].color }}/>
                    <span>{porpList[i].name} </span>
                    <tr/>
                </div>);
        }
        return array;
    }

    render()
    {
        return(
            <div class="tradeSection">
                <span style={{fontSize: 24,color: this.state.playerInfo.color}} >{this.state.playerInfo.name}</span><tr/>
                <span style={{fontSize: 15}}>{this.state.playerInfo.money} ECTS</span>
                {this.createListOfFields()}
                <input type='text' style={{maxWidth: 50}}/>
                <span> ECTS</span>
            </div>
        )
    }
}
export default TradeSection;