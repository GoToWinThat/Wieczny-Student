import React, { Component } from 'react';

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
                    <div className="card-body">
                    <h1 className="card-title" style={{fontSize: `1em`, textAlign: `center`, paddingTop: `2em`}}>{this.props.data.name}</h1>
                    </div>
                </div>
            </div>
        );
    }
}
export default CornerField;