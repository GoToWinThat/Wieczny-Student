import React, { Component } from 'react';
import "../../styles/ActionPanel.css";
import Buy from './Buy'
import Manage from './Manage'
import ButttonPanel from './ButtonPanel'
import Trade from './Trade'

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
    //Display corrent panel in render method based on state
    navigator()
    {
        let opt = this.state.option
        if(opt === 'buy') 
            return <Buy field={this.state.field}/>;
        if(opt === 'trade') 
            return <Trade/>;
        if(opt === 'manage') 
            return <Manage field={this.state.field}/>;
    }
    //Method to change state and then change a view in navigator
    changeView(view)
    {
        this.setState({option: view}) 
    }
    //Button panel responsible for change view with a event and current active panel
    render() {

        return (
        <div>
            <ButttonPanel changeView={this.changeView}/>
            {this.navigator()}
        </div>)
    }

}
export default ActionOptions;