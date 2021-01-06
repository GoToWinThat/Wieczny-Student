import React, { Component, createRef } from 'react';
import {Popover, OverlayTrigger, Overlay} from 'react-bootstrap'
import FieldIsBought from './FieldIsBought'
import Pawns from './Pawns.js'
import PopoverEstateLevel from './PopoverEstateLevel'

class PropertyField extends Component {
    constructor(props){
        super(props)

        this.id = `cell${this.props.data.fieldID}`
        this.cardclass = `card h-100 w-100 ${this.props.rotate}`
        this.name = this.props.data.name
        this.popoverRotare = this.props.rotate.split('-')[1]
    }

    GetPopOver(){
        return(
            <Popover className="fade" id="popover-card" >
                <Popover.Content>
                    <div className="card card-popover">

                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}>
                            {this.name}

                        </div>
                        <div className="card-body">
                            <div className="card-title">Cena {this.props.data.price} ECTS</div>
                            <PopoverEstateLevel players={this.props.players} id={this.props.data.fieldID}/>
                            <div className="card-text-details">
                                <p>Czynsz</p>
                                <p>{this.props.data.rentCosts[0]} ECTS</p>
                            </div>
                            <div className="card-text-details">
                                <p>Z jednym PC</p>
                                <p>{this.props.data.rentCosts[1]} ECTS</p>
                            </div>
                            <div className="card-text-details">
                                <p>Z dwoma PC</p>
                                <p>{this.props.data.rentCosts[2]} ECTS</p>
                            </div>
                            <div className="card-text-details">
                                <p>Z trzema PC</p>
                                <p>{this.props.data.rentCosts[3]} ECTS</p>
                            </div>
                            <div className="card-text-details">
                                <p>Z serwerem</p>
                                <p>{this.props.data.rentCosts[4]} ECTS</p>
                            </div>
                            <div className="card-text-details">
                                <p>Koszt jednego PC</p>
                                <p>{this.props.data.estatePrice} ECTS</p>
                            </div>
                            <div className="card-text-details">
                                <p>Zastaw</p>
                                <p>{this.props.data.mortgage} ECTS</p>
                            </div>
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
            return this.name.replace("Sala wykładowa", "Sala")
        else if (this.name.includes("Pracownia fizyczna"))
            return this.name.replace("Pracownia fizyczna", "Prac. fiz.")
        else if (this.name.includes("Biblioteka wydziałowa"))
            return this.name.replace("Biblioteka wydziałowa", "Bib. wydz.")
        else if (this.name.includes("Biblioteka główna"))
            return this.name.replace("Biblioteka główna", "Bib. głów.")
        else
            return this.name
    }



    render() {
        return (
            <OverlayTrigger
                trigger={["hover","focus"]}
                placement={this.ChangePopoveRotarion()}
                overlay={this.GetPopOver()}
                transition={false}
            >

                <div className="cell" id={this.id}>
                    <div className={this.cardclass}>
                        <Pawns players={this.props.players} id={this.props.data.fieldID}/>
                        <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}/>
                        <div className="card-body" style={{justifyContent: "space-between"}}>
                            <FieldIsBought players={this.props.players} id={this.props.data.fieldID}/>

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