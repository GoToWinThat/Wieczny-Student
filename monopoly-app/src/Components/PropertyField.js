import React, { Component } from 'react';

class PropertyField extends Component {
    constructor(props){
        super(props)

        this.id = `cell${this.props.data.fieldID}`
        this.cardclass = `card h-100 w-100 ${this.props.rotate}`
        this.name = this.props.data.name
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
            <div className="cell" id={this.id}>
                <div className={this.cardclass}>
                    <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}></div>
                    <div className="card-body">
                    <div className="card-title">{this.ShortenWords()}</div>
                    <div className="card-text">{this.props.data.price}$</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PropertyField;