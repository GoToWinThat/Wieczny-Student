import React, { Component } from 'react';
import "../../Css/ActionPanel.css";
import Buy from './Buy'
import Manage from './Manage'
import ButttonPanel from './ButtonPanel'

class ActionOptions extends Component 
{
    constructor(props){
        super(props)
        //Sample JSON format
        this.state = {option: 'menu', field: {
            fieldID: 12,
            type: "property",
            name: "Laboratorium nr 409 (MS)",
            color: "lightgreen",
            price: 100,
            rents: [10, 20, 30, 40, 50, 60],
            oneHousePrice: 10
        }}
        this.changeView = this.changeView.bind(this)
    }

    navigator()
    {
        let opt = this.state.option
        if(opt === 'buy') 
            return <Buy field={this.state.field} backToMenu={() => this.changeView('menu')}/>;
        if(opt === 'trade') return <h3>Trade</h3>;
        if(opt === 'manage') 
            return <Manage field={this.state.field} backToMenu={() => this.changeView('menu')}/>;
    }
    changeView(view)
    {
        this.setState({option: view}) 
    }
    render() {

        return (
        <div>
            <ButttonPanel changeView={this.changeView}/>
            {this.navigator()}
        </div>)
    }

}
export default ActionOptions;