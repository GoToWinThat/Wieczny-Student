import React, { Component } from 'react';
import CornerField from './CornerField'
import PropertyField from './PropertyField'
import EventField from './EventField'
import '../Css/Field.css'

class Field extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Content type = {this.props.data.type} data={this.props.data}/>
        );
    }
}

const Content = ({type, data}) =>{
    switch (type){
        default:
        case 'event':
            return(
                    <EventField data={data}/>
            );
        case 'property' :
            return(
                    <PropertyField data={data}/>
            );
        case 'corner':
            return(
                    <CornerField data={data}/>
            );
    }
}

export default Field;