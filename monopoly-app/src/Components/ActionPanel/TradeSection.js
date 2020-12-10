import "../../styles/ActionPanel.css";
import React, { Component } from 'react';

class TradeSection extends Component
{
    constructor(props){
        super(props)
        this.state = this.props.playerData;
    }
    //Create List of properties based on json file and put it into a form with color tag
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
        //Display name, ects, list of fileds, ECTS to exchnage form
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