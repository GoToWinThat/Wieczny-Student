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
                <div className="d-flex" key={i}>
                    <input className="mt-1 mr-2" type='checkbox'/>
                    <div className="propertyBox" style={{background: porpList[i].color }}/>
                    <span>{porpList[i].name} </span>
                    <br/>
                </div>);
        }
        return array;
    }

    createListOfCards()
    {
        var array = [];
        var cardList = this.state.playerInfo.cards;
        for (var i = 0; i < cardList.length; i++) 
        {
            array.push(
                <div className="d-flex" key={i}>
                    <input className="mt-1 mr-2"  type='checkbox'/>
                    <span>{cardList[i]} </span>
                    <br/>
                </div>);
        }
        return array;
    }

    getPlayerName() {
        if(this.props.dropdown){
            return(<div className="d-flex">
                        <img className="arrow mt-2 ml-3" src={`/Assets/General/arrowLeft.svg`} alt="arrow-left"/>
                        <p className="h3 col text-center" style={{color: this.state.playerInfo.color}} >{this.state.playerInfo.name}</p>
                        <img className="arrow mt-2 mr-3" src={`/Assets/General/arrowRight.svg`} alt="arrow-right"/>
                    </div>
            )
        }else{
            return(<p className="h3 col text-center" style={{color: this.state.playerInfo.color}} >{this.state.playerInfo.name}</p>)
        }

    }

    render()
    {
        //Display name, ects, list of fileds, ECTS to exchnage form
        return(
            <div>
                {this.getPlayerName()}
                <p className="h6 col text-center mb-3" >{this.state.playerInfo.money} ECTS</p>
                <hr/>
                {this.createListOfFields()}
                <hr/>
                {this.createListOfCards()}
                <div className="mt-3 mb-3 col text-center">
                    <input  type='text' style={{maxWidth: 50}}/>
                    <span> ECTS</span>
                </div>
                
            </div>
        )
    }
}
export default TradeSection;