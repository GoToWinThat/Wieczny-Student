import React, { Component } from 'react';

class PropertyField extends Component {
    constructor(props){
        super(props)
        this.Hname = this.props.data.name.split("nr")
        this.id = `cell${this.props.data.fieldID}`
        this.idname = `cell${this.props.data.fieldID}name`
        this.idpositionholder = `cell${this.props.data.fieldID}positionholder`
        this.idanchor = `cell${this.props.data.fieldID}anchor`
    }

    render() {
        return (
            <td className="cell board" id={this.id} style={{backgroundColor: `${this.props.data.color}`}}>
                <div id={this.idanchor} className="cell-anchor"></div>
                <div id={this.idpositionholder} className="cell-position-holder"></div>
                <div id={this.idname} className="cell-name2">{this.Hname[0]}</div>
                <div id={this.idname} className="cell-name">{this.Hname[1]}</div>
            </td>
        );
    }
}

export default PropertyField;