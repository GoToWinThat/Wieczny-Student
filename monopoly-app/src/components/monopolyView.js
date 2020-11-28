// This file was created only for testing

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetFields, GetPlayers } from '../services/monopoly';

export const MonopolyView = () => {
    const eventFields = useSelector(state => state.monopolyReducer.eventFields);
    const propertyFields = useSelector(state => state.monopolyReducer.propertyFields);
    const cornerFields = useSelector(state => state.monopolyReducer.cornerFields);
    const players = useSelector(state => state.monopolyReducer.players);
    const dispatch = useDispatch();


    useEffect(() => { GetFields(dispatch); GetPlayers(dispatch); }, [dispatch]);

    return <table style={{border: "1px solid black", margin: "5px"}}>
        <tbody>
            <tr key="EVENTS"><td style={{fontWeight: "bold"}}>EVENT FIELDS</td></tr>
            { 
                eventFields.map(n => <tr key={n.fieldID}><td>[{n.fieldID}] {n.name}</td></tr>)
            }
            <tr style={{height: "20px"}}></tr>
            <tr key="PROPERTIES"><td style={{fontWeight: "bold"}}>PROPERTY FIELDS</td></tr>
            {
                propertyFields.map(n => <tr key={n.fieldID} style={{backgroundColor: n.color}}><td>[{n.fieldID}] {n.name} ({n.price} ECTS)</td></tr>) 
            }
            <tr style={{height: "20px"}}></tr>
            <tr key="CORNERS"><td style={{fontWeight: "bold"}}>CORNER FIELDS</td></tr>
            {
                cornerFields.map(n => <tr key={n.fieldID}><td>[{n.fieldID}] {n.name}</td></tr>) 
            }
            <tr style={{height: "20px"}}></tr>
            <tr key="PLAYERS"><td style={{fontWeight: "bold"}}>PLAYERS</td></tr>
            {
                players.map(n => <tr key={n.name}><td key={n.name}>{n.name}, {n.cash}, {n.signature}</td></tr>) 
            }
        </tbody>
    </table>
}