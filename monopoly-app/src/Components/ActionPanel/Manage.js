import "../../styles/ActionPanel.css";
import React, { Component } from 'react';

class Manage extends Component
{
    constructor(props){
        super(props)
        //We can implement houses: 0,hotels: 0 as well 
        this.state = {houses: 0}
        this.addHouse = this.addHouse.bind(this) 
    }
    //Method to create n number of houses icon
    createHouses()
    {
        var array = [];
        for (var i = 0; i < this.state.houses; i++) 
        {
            array.push( <img className="houses" src={`/Assets/Houses/greenHouse.png`}/>);
        }
        return array;
    }
    //Method whitch increment numer of houses and check if can do it
    addHouse()
    {
        this.setState(prevState => {

            let num = prevState.houses;
            if(prevState.houses<4)
             num += 1;
            return {houses: num}
          })
    }

    render()
    {
        return(
            <div className="manageTable">
                <span style= {{ color: this.props.field.color,fontWeight: 'bold'}} >{this.props.field.name}</span>
                <span > : </span>
                {this.createHouses()}
                <button className="yesNoButton" onClick={this.addHouse}>
                    <span>Kup dom za  </span>
                    <span style= {{ color: 'red',fontWeight: 'bold'}} >{this.props.field.oneHousePrice} ECTS</span>
                </button>
            </div>
        )
    }
}
export default Manage;