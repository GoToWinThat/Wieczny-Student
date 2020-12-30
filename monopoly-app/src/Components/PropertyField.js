import React, { Component } from 'react';
import {Popover, OverlayTrigger} from 'react-bootstrap'
import Pawns from './Pawns.js'

class PropertyField extends Component {
    constructor(props){
        super(props)

        this.id = `cell${this.props.data.fieldID}`
        this.cardclass = `card h-100 w-100 ${this.props.rotate}`
        this.name = this.props.data.name
        this.popoverRotare = this.props.rotate.split('-')[1]
        this.popover = (
            <Popover id="popover-card">
                <Popover.Content>
                    <div className="card card-popover">
                            <div className="card-header" style={{backgroundColor:`${this.props.data.color}`, fontSize: "0.5em"}}>
                                {this.name}
                            </div>
                            <div className="card-body">
                            <div className="card-title">Cena {this.props.data.price} ECTS</div>
                                <p className="card-text card-text-rentCost">Czynsz {this.props.data.rentCosts[0]} ECTS</p>
                                <p className="card-text card-text-rentCost">Z jednym PC {this.props.data.rentCosts[1]} ECTS</p>
                                <p className="card-text card-text-rentCost">Z dwoma PC {this.props.data.rentCosts[2]} ECTS</p>
                                <p className="card-text card-text-rentCost">Z trzema PC {this.props.data.rentCosts[3]} ECTS</p>
                                <p className="card-text card-text-rentCost">Z serwerem {this.props.data.rentCosts[4]} ECTS</p>
                                <p className="card-text card-text-rentCost">Koszt PC {this.props.data.estatePrice} ECTS</p>
                                <p className="card-text card-text-rentCost">Zastaw {this.props.data.mortgage} ECTS</p>
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

    ShortenWords(){
        if(this.name.includes("Laboratorium"))
            return this.name.replace("Laboratorium", "Lab.")
        else if (this.name.includes("Sala wykładowa"))
            return this.name.replace("Sala wykładowa", "Sala wyk.")
        else if (this.name.includes("Pracownia fizyczna"))
            return this.name.replace("Pracownia fizyczna", "Prac.")
        else if (this.name.includes("Biblioteka wydziałowa"))
            return this.name.replace("Biblioteka wydziałowa", "Bib. wydz.")
        else if (this.name.includes("Biblioteka główna"))
            return this.name.replace("Biblioteka główna", "Bib. głów.")
        else
            return this.name
    }
    render() {
        return (
            <OverlayTrigger trigger={["hover","focus"]} placement={this.ChangePopoveRotarion()} overlay={this.popover}>
                <div className="cell" id={this.id}>
                    <div className={this.cardclass}>
                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}>
                            <Pawns players={this.props.players} id={this.props.data.fieldID}/>
                        </div>
                        <div className="card-body">
                        <div className="card-title">{this.ShortenWords()}</div>
                        <div className="card-text">{this.props.data.price} ECTS</div>
                        </div>
                    </div>
                </div>
            </OverlayTrigger>
        );
    }
}

export default PropertyField;