import React, { Component } from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap'

class CompanyField extends Component {
    constructor(props){
        super(props)
        this.id = `cell${this.props.data.fieldID}`
        this.idname = `cell${this.props.data.fieldID}name`
        this.idpositionholder = `cell${this.props.data.fieldID}positionholder`
        this.idanchor = `cell${this.props.data.fieldID}anchor`
        this.cardclass = `card h-100 w-100 ${this.props.rotate}`

        this.popoverRotare = this.props.rotate.split('-')[1]
        this.popover = (
            <Popover id="popover-card">
                <Popover.Content>
                    <div className="card card-popover">
                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}></div>
                        <div className="card-body">
                            <div className="card-title" style={{paddingTop: `1.5em`}}>{this.props.data.name}</div>
                        </div>
                    </div>
                </Popover.Content>
            </Popover>
        )
    }

    ChangePopoveRotarion(){
        switch(this.popoverRotare){
            case "left":
                return "right"
            case "right":
                return "left"
            case "top":
                return  "bottom"
            case "bottom":
                return "top"
            default:
                return "top"
        }
    }

    render() {
        return (
            <OverlayTrigger trigger="hover" placement={this.ChangePopoveRotarion()} overlay={this.popover}>
                <div className="cell" id={this.id} style={{backgroundColor: `${this.props.data.color}`}}>
                    <div className={this.cardclass}>
                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}></div>
                        <div className="card-body">
                            <div className="card-title">{this.props.data.name}</div>
                            <div className="card-text ">{this.props.data.price} ECTS</div>
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        );
    }
}

export default CompanyField;