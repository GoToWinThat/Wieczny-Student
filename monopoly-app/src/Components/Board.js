import Field from './Field'
import RollDice from './ActionPanel/RollDice'
import PlayerBar from './ActionPanel/PlayerBar'
import ActionOptions from './ActionPanel/ActionOptions'
import Auction from './ActionPanel/Auction'
import '../styles/Board.css'

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetFields } from '../services/monopoly';

export const Board = () => {
    const fields = useSelector(state => state.monopolyReducer.monopolyFields);
    const dispatch = useDispatch();

    
    // recently it looks like Board is called twice if everything is okay,
    // but refreshing page causes dispatch bug in which GetFields is not
    // called at all so fields is an empty list :(
    console.log(fields); 


    try {
        useEffect(() => GetFields(dispatch), [dispatch]);
    } catch { 
        console.log("Couldn't call function useEffect()!") 
    }

        return (
            <div className="container-fluid content-row">
                <div className="row row-top" >
                    <div className="col-2 card-deck"><Field data={fields[20]}/></div>
                    <div className="col card-deck"><Field rotate="card-top" data={fields[21]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[22]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[23]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[24]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[25]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[26]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[27]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[28]}/></div>
                    <div className="col card-deck"><Field rotate="card-top"data={fields[29]}/></div>
                    <div className="col-2 card-deck"><Field data={fields[30]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[19]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[31]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[18]}/></div>
                    <div className="col-8"><PlayerBar/></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[32]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[17]}/></div>
                    <div className="col-8"><RollDice/></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[33]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[16]}/></div>
                    <div className="col-8"><ActionOptions/></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[34]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[15]}/></div>
                    <div className="col-8"><Auction/></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[35]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[14]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[36]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[13]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[37]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[12]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[38]}/></div>
                </div>
                <div className="row row-center">
                    <div className="col card-deck"><Field rotate="card-left" data={fields[11]}/></div>
                    <div className="col-8"></div>
                    <div className="col card-deck"><Field rotate="card-right" data={fields[39]}/></div>
                </div>
                <div className="row row-bottom" >
                    <div className="col-2 card-deck"><Field data={fields[10]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[9]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[8]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[7]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[6]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[5]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[4]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[3]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[2]}/></div>
                    <div className="col card-deck"><Field rotate="card-botom"data={fields[1]}/></div>
                    <div className="col-2 card-deck"><Field data={fields[0]}/></div>
                </div>
            </div>

        );
}