import React, { Component } from 'react';

class EventField extends Component {
    constructor(props){
        super(props)
        this.id = `cell${this.props.data.fieldID}`
        this.idname = `cell${this.props.data.fieldID}name`
        this.idpositionholder = `cell${this.props.data.fieldID}positionholder`
        this.idanchor = `cell${this.props.data.fieldID}anchor`
        if(this.props.rotate)
            this.rotation = "cell horizontal-field"
        else
            this.rotation = "cell vertical-field"
    }
    render() {
        return (
            <td className={this.rotation} id={this.id}>
                <div id={this.idanchor} className="cell-anchor"></div>
                <div id={this.idpositionholder} className="cell-position-holder"></div>
                <div id={this.idname} className="cell-name">{this.props.data.name}</div>
            </td>
        );
    }
}

export default EventField;