import "../../Css/ActionPanel.css";
import React, { Component } from 'react';

class Auction extends Component
{
    constructor(props){
        super(props)
        this.state = {
            activeMassage: 0,
            massages: ["Licytuje Sala nr 315 (LB)"],
            player: {name: "Tomek",color: 'blue'},
            price: 150,
            field: {name: "Sala nr 315 (LB)",color: 'purple'},
            newPrice: 0
        }
        this.startAuction = this.startAuction.bind(this) 
        this.bid = this.bid.bind(this)
        this.inputChange = this.inputChange.bind(this)
    }
    //Create massage stack with current data
    createMassages(player,price)
    {
        const newMassages = [
        `${player} oferuje ${price} ECTS`,
        `Po raz pierwszy...`,
        `Po raz drugi...`,
        `Po raz trzeci...`,
        ` ${this.state.field.name} sprzedana za ${price} ECTS`
        ]
        this.setState({massages: newMassages}) 
    }
    //Count down function with option to reset counter and start over
    startAuction()
    {   //Sample data TO DELETE
        this.createMassages("Tomek",150)
        setTimeout(()=> 
        {
            this.setState(prevState => 
            {
                let num = prevState.activeMassage + 1
                return({activeMassage: num })
            })
            if(this.state.activeMassage < 4)
                this.startAuction(); 
        },
        2500)
    }
    //Making A Bid with player name and price
    bid()
    {
        if(this.state.newPrice > this.state.price)
        {
            //Sample data TO DELETE
            this.createMassages("Maria",this.state.newPrice)
            this.setState({activeMassage: 0,player: {name: "Maria",color: 'orange'}}) 
        }
    }
    //To handle text form change filed
    inputChange(event)
    {
        const {name,value} = event.target
        this.setState({[name]: value})
    }

    render()
    {
        return(
            <div className="auction">
                <span style={{color: this.state.player.color,fontSize: 24}}>{this.state.massages[this.state.activeMassage]}</span><tr/>
                <input 
                    type='number' 
                    name="newPrice" 
                    style={{maxWidth: 50}} 
                    value={this.state.newPrice} 
                    onChange={this.inputChange}/>
                <span> ECTS</span>
                <button style={{margin: 10}} onClick={this.bid}>Licytuj</button>
                <button style={{margin: 10}} onClick={this.startAuction}>Rozpocznij</button>
            </div>
        )
    }
}
export default Auction;