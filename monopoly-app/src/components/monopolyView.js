// This file was created only for testing

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetFields, GetPlayers } from '../services/monopoly';

export const MonopolyView = () => {
    const fields = useSelector(state => state.monopolyReducer.monopolyFields);
    //const players = useSelector(state => state.monopolyReducer.players);
    const dispatch = useDispatch();

    try {
        useEffect(() => GetFields(dispatch), [dispatch]);
        //GetPlayers(dispatch); 
    } catch { 
        console.log("Couldn't call function useEffect()!") 
    }

    return <table style={{border: "1px solid black", margin: "5px"}}>
        <tbody>
            <tr key="EVENTS"><td style={{fontWeight: "bold"}}>EVENT FIELDS</td></tr>
            { 
                fields.map(n => <tr key={n.fieldID}><td>[{n.fieldID}] {n.name}</td></tr>)
            }
        </tbody>
    </table>
}

/*
    <tr style={{height: "20px"}}></tr>
    <tr key="PLAYERS"><td style={{fontWeight: "bold"}}>PLAYERS</td></tr>
    {
        players.map(n => <tr key={n.name}><td key={n.name}>{n.name}, {n.cash}, {n.signature}</td></tr>) 
    }
*/