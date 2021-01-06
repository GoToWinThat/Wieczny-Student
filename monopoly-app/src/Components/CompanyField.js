import React, { Component } from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap'
import Pawns from './Pawns.js'
import FieldIsBought from './FieldIsBought'

class CompanyField extends Component {
    constructor(props){
        super(props)
        this.id = `cell${this.props.data.fieldID}`
        this.idname = `cell${this.props.data.fieldID}name`
        this.idpositionholder = `cell${this.props.data.fieldID}positionholder`
        this.idanchor = `cell${this.props.data.fieldID}anchor`
        this.cardclass = `card h-100 w-100 ${this.props.rotate}`
        this.img = this.props.data.name === "Winda" ? "/Assets/Fields/shift-fill.svg" : "/Assets/Fields/door-open.svg"

        this.popoverRotare = this.props.rotate.split('-')[1]
        this.popover = (
            <Popover className="fade" id="popover-card">
                <Popover.Content>
                    <div className="card card-popover">
                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}>
                            {this.props.data.name}
                        </div>
                        <div className="card-body">
                            <div className="card-title">Cena {this.props.data.price} ECTS</div>
                            <img className="img-eventField" src={this.img} alt="..."></img>
                            <p className="card-text">Zastaw {this.props.data.mortgage} ECTS</p>
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
            <OverlayTrigger
                trigger={["hover","focus"]}
                placement={this.ChangePopoveRotarion()}
                overlay={this.popover}
                transition={false}
                >
                <div className="cell" id={this.id} style={{backgroundColor: `${this.props.data.color}`}}>
                    <div className={this.cardclass}>
                        <Pawns players={this.props.players} id={this.props.data.fieldID}/>
                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}></div>
                        <div className="card-body" style={{justifyContent: "space-between"}}>
                            <FieldIsBought players={this.props.players} id={this.props.data.fieldID} />
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