import React, { Component } from 'react';
import CornerField from './CornerField'
import PropertyField from './PropertyField'
import EventField from './EventField'
import CompanyField from './CompanyField'
import '../../styles/Field.css'

class Field extends Component {
    render() {
        return (
            <Content players={this.props.players} type={this.props.data.type} data={this.props.data} rotation={this.props.rotate}/>
        );
    }
}

const Content = ({type, data, rotation, players}) =>{
    switch (type){
        default:
        case 'event':
            return(
                    <EventField players={players} rotate={rotation} data={data}/>
            );
        case 'property' :
            return(
                    <PropertyField players={players} rotate={rotation} data={data}/>
            );
        case 'corner':
            return(
                    <CornerField players={players} data={data}/>
            );
        case 'company':
            return(
                    <CompanyField players={players} rotate={rotation} data={data}/>
            )
    }
}

export default Field;