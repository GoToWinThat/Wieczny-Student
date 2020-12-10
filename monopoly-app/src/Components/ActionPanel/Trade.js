import "../../styles/ActionPanel.css";
import React, { Component } from 'react';
import TradeSection from "./TradeSection";

class Trade extends Component
{
    constructor(props){
        super(props)
        //Sample date to change with api querry
        this.state = {
            currentPlayer: {
                activePlayer: false,
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
                        fieldID: 24,
                        type: "property",
                        name: "Sala nr 310 (LB)",
                        color: "purple",
                        price: 100,
                        rents: [10, 20, 30, 40, 50, 60],
                        oneHousePrice: 10
                    },
                    
                ]
                }
            },
            otherPlayer: 
            {
                activePlayer: true,
                playerInfo: {
                    name: 'Maria',
                    money: 120,
                    color: 'orange',
                    properties: [
                    {
                        fieldID: 19,
                        type: "property",
                        name: "Sala nr 507 (MS)",
                        color: "brown",
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
    }

    render()
    {
        //Creating a table with to sections
        return(
            <div>
                <tr/>
                <table className="tradeTable">
                    <th><TradeSection playerData={this.state.currentPlayer}/></th>
                    <th style={{fontSize: 30}}>&#xa0; &#x21c4; &#xa0; </th>
                    <th><TradeSection playerData={this.state.otherPlayer}/></th>
                </table>
                <button style={{margin: 10}}>Potwierdź</button>
            </div>
        )
    }
}
export default Trade;