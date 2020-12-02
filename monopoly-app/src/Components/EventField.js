import React, { Component } from 'react';

class EventField extends Component {
    constructor(props){
        super(props)
        this.id = `cell${this.props.data.fieldID}`
        this.idname = `cell${this.props.data.fieldID}name`
        this.idpositionholder = `cell${this.props.data.fieldID}positionholder`
        this.idanchor = `cell${this.props.data.fieldID}anchor`
        this.cardclass = `card h-100 w-100 ${this.props.rotate}`
    }
    render() {
        return (
            <div className="cell" id={this.id}>
                <div className={this.cardclass}>
                    <div className="card-header" style={{backgroundColor:`${this.props.data.color}`}}></div>
                    <div className="card-body">
                        <div className="card-title" style={{paddingTop: `1.5em`}}>{this.props.data.name}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default EventField;