import "../../Css/ActionPanel.css";
import React, { Component } from 'react';
import TradeSection from "./TradeSection";

class Trade extends Component
{
    constructor(props){
        super(props)
        this.state = {houses: 0}
    }

  

    render()
    {
        return(
            <div>
                <tr/>
                <table className="tradeTable">
                    <th><TradeSection/></th>
                    <th style={{fontSize: 30}}>&#xa0; &#x21c4; &#xa0; </th>
                    <th><TradeSection/></th>
                </table>
                <button style={{margin: 10}}>Potwierdź</button>
            </div>
        )
    }
}
export default Trade;