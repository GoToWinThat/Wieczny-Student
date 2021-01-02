import React, { Component } from 'react';
import Pawns from './Pawns.js'

class CornerField extends Component {
    constructor(props){
        super(props)
        this.id = `cell${this.props.data.fieldID}`
        this.cardclass = `card h-100 w-100`
    }
    render() {
        return (
            <div className="cell" id={this.id}>
                <div className={this.cardclass} style={{backgroundColor: `${this.props.data.color}`}}>
                    <Pawns players={this.props.players} id={this.props.data.fieldID}/>
                    <div className="card-body">
                        <h1 className="card-title card-corner-title">{this.props.data.name}</h1>
                    </div>
                </div>
            </div>
        );
    }
}
export default CornerField;