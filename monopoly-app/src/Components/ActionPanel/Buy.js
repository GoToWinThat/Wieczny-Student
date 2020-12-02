import "../../Css/ActionPanel.css";
import React, { Component } from 'react';

class Buy extends Component
{
    constructor(props){
        super(props)
        this.state = {view: 'choice'}
        this.buyButton = this.buyButton.bind(this)
        this.cancelButton = this.cancelButton.bind(this)
    }

    buyButton()
    {
        this.setState({view: 'bought'})
    }
    cancelButton()
    {
        this.setState({view: 'cancel'})
    }
    navigator()
    {
        let opt = this.state.view
        if(opt==='choice')return this.choiceView()
        if(opt==='cancel')return this.cancelView()
        if(opt==='bought')return this.bought()
    }

    choiceView()
    {
        return(
            <div>
                <span>Do you want buy  </span>
                <span style= {{ color: this.props.field.color,fontWeight: 'bold'}} >{this.props.field.name}</span>
                <span> for </span>
                <span style= {{ color: 'red',fontWeight: 'bold'}} >{this.props.field.price}$</span>
                <span>?</span>
                <button className="yesNoButton" onClick={this.buyButton} >Yes</button>
                <button className="yesNoButton" onClick={this.cancelButton} >No</button>
            </div>
        )
    }
    cancelView(){ return <div></div>}
    bought()
    {
        return(
            <div>
                <span>You just bought a  </span>
                <span style= {{ color: this.props.field.color,fontWeight: 'bold'}} >{this.props.field.name}</span>
            </div>
        )
    }
    render()
    {
        return(<div>{this.navigator()}</div>)
    }
}
export default Buy;