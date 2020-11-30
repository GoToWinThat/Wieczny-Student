import React, { Component } from 'react';
import CornerField from './CornerField'
import PropertyField from './PropertyField'
import EventField from './EventField'
import CompanyField from './CompanyField'
import '../Css/Field.css'

class Field extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <Content type = {this.props.data.type} data={this.props.data} rotation={this.props.rotate}/>
        );
    }
}

const Content = ({type, data, rotation}) =>{
    switch (type){
        default:
        case 'event':
            return(
                    <EventField rotate={rotation} data={data}/>
            );
        case 'property' :
            return(
                    <PropertyField rotate={rotation} data={data}/>
            );
        case 'corner':
            return(
                    <CornerField data={data}/>
            );
        case 'company':
            return(
                    <CompanyField rotate={rotation} data={data}/>
            )
    }
}

export default Field;