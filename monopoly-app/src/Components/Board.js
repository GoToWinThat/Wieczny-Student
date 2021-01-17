import Field from './Field'
import '../styles/Board.css'
import { BoardCenter } from './BoardCenter';

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { GetFields, GetPlayers, GetGainCards, GetLossCards,
    GetActivePlayerIndex, GetLogs } from '../services/monopolyService';

export const Board = () => {
    const fields = useSelector(state => state.monopolyReducer.monopolyFields);
    const gainCards = useSelector(state => state.monopolyReducer.gainCards);
    const lossCards = useSelector(state => state.monopolyReducer.lossCards);
    const players = useSelector(state => state.monopolyReducer.players);
    const activePlayerIndex = useSelector(state => state.monopolyReducer.activePlayerIndex);
    const logs = useSelector(state => state.monopolyReducer.logs);
    const dispatch = useDispatch();

    try {
        useEffect(() => {
            GetFields(dispatch);
            GetPlayers(dispatch);
            GetGainCards(dispatch);
            GetLossCards(dispatch);
            GetActivePlayerIndex(dispatch);
            GetLogs(dispatch);
        }, [dispatch]);
    } catch {
        console.log("Couldn't call function useEffect() in Board.js!");
    }

    // Eliminate problem with empty lists (it can be too early to render board):
    if (fields === null || fields.length === 0 || players === null 
        || gainCards === null || lossCards === null || activePlayerIndex === null) 
        return null;

    return (
        <div className="board">
            <BoardCenter data={{fields, gainCards, lossCards, players, activePlayerIndex, logs, dispatch}}/>
            <div className="row row-top">
                <div className="col-2 card-deck"><Field players={players} data={fields[20]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[21]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[22]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[23]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[24]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[25]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[26]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[27]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[28]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-top" data={fields[29]}/></div>
                <div className="col-2 card-deck"><Field players={players} data={fields[30]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[19]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[31]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[18]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[32]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[17]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[33]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[16]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[34]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[15]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[35]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[14]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[36]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[13]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[37]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[12]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[38]}/></div>
            </div>
            <div className="row row-center">
                <div className="col card-deck"><Field players={players} rotate="card-left" data={fields[11]}/></div>
                <div className="col-8"></div>
                <div className="col card-deck"><Field players={players} rotate="card-right" data={fields[39]}/></div>
            </div>
            <div className="row row-bottom">
                <div className="col-2 card-deck"><Field players={players} data={fields[10]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[9]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[8]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[7]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[6]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[5]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[4]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[3]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[2]}/></div>
                <div className="col card-deck"><Field players={players} rotate="card-botom" data={fields[1]}/></div>
                <div className="col-2 card-deck"><Field players={players} data={fields[0]}/></div>
            </div>
        </div>

        );
}