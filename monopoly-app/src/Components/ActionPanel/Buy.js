import "../../styles/ActionPanel.css";
import React, { Component } from 'react';
import {Button} from 'react-bootstrap';

class Buy extends Component
{
    constructor(props){
        super(props)
        this.state = {view: 'choice'}
        this.buyButton = this.buyButton.bind(this)
        this.cancelButton = this.cancelButton.bind(this)
    }
    //Actions to change to corrent view
    buyButton()
    {
        this.setState({view: 'bought'})
    }
    cancelButton()
    {
        this.setState({view: 'cancel'})
    }
    //Display corrent panel in render method based on state
    navigator()
    {
        let opt = this.state.view
        if(opt==='choice')return this.choiceView()
        if(opt==='cancel')return this.cancelView()
        if(opt==='bought')return this.bought()
    }
    //Element with question to user to but property
    choiceView()
    {
        return(
            <div>
                <span>Czy chcesz kupić  </span>
                <span style= {{ color: this.props.field.color,fontWeight: 'bold'}} >{this.props.field.name}</span>
                <span> za </span>
                <span style= {{ color: 'red',fontWeight: 'bold'}} >{this.props.field.price} ECTS</span>
                <span>?</span>
                <Button className="yesNoButton" onClick={this.buyButton} >Tak</Button>
                <Button className="yesNoButton" onClick={this.cancelButton} >Nie</Button>
            </div>
        )
    }
    //Empty cancel view
    cancelView(){ return <div></div>}
    //Confirmation massage
    bought()
    {
        return(
            <div>
                <span>Właśnie kupiłeś  </span>
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