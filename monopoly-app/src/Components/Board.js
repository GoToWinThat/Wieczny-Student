import React, { Component } from 'react';
import Field from './Field'
import {data} from '../Data'
import {Container, Row} from 'react-bootstrap'
import BoardCenter from "./BoardCenter";

class Board extends Component 
{
    GenerateBoardRows(start,stop,rotation)
    {
        var fields = <div></div>
        if(!rotation)
        {
            fields = data.slice(start,stop).map(field => 
                <Field rotate={rotation} data={field}/>)
        } 
        else
        {
            fields = data.slice(start,stop).map(field => 
                <div><Field rotate={rotation} data={field}/><tr/></div>)
        }
        return fields;
    }

    render() {
        return (
            <Container>
                <Row >
                    <div>{this.GenerateBoardRows(0,11,false)}</div>
                </Row>
                <Row >
                    <div>{this.GenerateBoardRows(11,20,true)}</div>
                    <BoardCenter/>
                    <div>{this.GenerateBoardRows(31,40,true)}</div>
                </Row>
                <Row >
                    <div>{this.GenerateBoardRows(20,31,false)}</div>
                </Row>
            </Container>
        );
    }  
}

export default Board