import { ActionCreators } from "../redux/monopolyReducer";

import * as axios from 'axios';
const axiosGameURL = 'https://localhost:44358/api/monopolygame/';
const axiosPlayerURL = 'https://localhost:44358/api/monopolyplayer/';

export const GetFields = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'fields').then(
            tmp => dispatch(ActionCreators.setFields(tmp.data)));
    } catch { console.log("Fields couldn't be set!"); }
}

export const GetPlayers = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'players').then(
           tmp => dispatch(ActionCreators.setPlayers(tmp.data)));
    } catch {
        console.log("Players couldn't be set!"); }
}

export const GetGainCards = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'gaincards').then(
            tmp => dispatch(ActionCreators.setGainCards(tmp.data)));
    } catch { console.log("Gain Cards couldn't be set!"); }
}

export const GetLossCards = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'losscards').then(
            tmp => dispatch(ActionCreators.setLossCards(tmp.data)));
    } catch { console.log("Loss Cards couldn't be set!"); }
}



export const GetGameState = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'gamestate').then(
            tmp => dispatch(ActionCreators.setGameState(tmp.data)));
    } catch { console.log("Game State couldn't be set!"); }
}

export const GetMyIndex = async (dispatch) => {
    try {
        axios.get(axiosPlayerURL + 'myindex').then(
            tmp => dispatch(ActionCreators.setMyIndex(tmp.data)));
    } catch { console.log("My Index couldn't be set!"); }
}



export const GetActivePlayerIndex = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'activeplayerindex').then(
            tmp => dispatch(ActionCreators.setActivePlayerIndex(tmp.data)));
    } catch { console.log("ActivePlayerIndex couldn't be set!"); }
}

export const UpdateActivePlayerIndex = async (dispatch, activePlayerIndex) => {
    try {
        axios.put(axiosGameURL + 'UpdateActivePlayerIndex', 
            {"index": activePlayerIndex}).then(
            dispatch(ActionCreators.updateActivePlayerIndex({activePlayerIndex})));
    } catch { console.log("ActivePlayerIndex couldn't be updated!"); }
}



export const GetDices = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'dices').then(
            tmp => dispatch(ActionCreators.setDices(tmp.data)));
    } catch { console.log("Dices couldn't be set!"); }
}

export const UpdateDices = async (dispatch, dices) => {
    try {
        axios.put(axiosGameURL + 'UpdateDices', {"dices": dices}).then(
            dispatch(ActionCreators.updateDices({dices})));
    } catch { console.log("Dices couldn't be updated!"); }
}



export const CreatePlayer = async (dispatch, playerName, signature, color, hubID) => {
    try {
        axios.post(axiosPlayerURL + 'LogNewPlayer', 
            {"name": playerName, "signature": signature, "color": color, 
            "hubConnectionID": hubID}).then(
            tmp => dispatch(ActionCreators.setMyIndex(tmp.data)));
    } catch { console.log("Player couldn't be created!"); }
}



export const UpdatePlayerPosition = async (dispatch, activePlayerIndex, deltaPosition) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerPosition', 
            {"activePlayerIndex": activePlayerIndex, "deltaPosition": deltaPosition}).then(
            dispatch(ActionCreators.updatePlayerPosition({activePlayerIndex, deltaPosition})));
    } catch { console.log("Player's position couldn't be updated!"); }
}

export const UpdatePlayerCash = async (dispatch, playerName, deltaCash) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerCash', 
            {"name": playerName, "deltaCash": deltaCash}).then(
            dispatch(ActionCreators.updatePlayerCash({playerName, deltaCash})));
    } catch { console.log("Player's cash couldn't be updated!"); }
}

export const UpdatePlayerWaitingTurns = async (dispatch, playerName, deltaTurns, isInJail) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerWaitingTurns', 
            {"name": playerName, "deltaTurns": deltaTurns, "isInJail": isInJail}).then(
            dispatch(ActionCreators.updatePlayerWaitingTurns({playerName, deltaTurns, isInJail})));
    } catch { console.log("Player's Waiting Turns couldn't be updated!"); }
}

export const UpdatePlayerBankrupt = async (dispatch, playerName) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerBankrupt', 
            {"name": playerName}).then(
            dispatch(ActionCreators.updatePlayerBankrupt({playerName})));
    } catch { console.log("Player's Bankrupt Status couldn't be updated!"); }
}

export const UpdatePlayerReadiness = async (dispatch, playerName) => {
    try {
        axios.put(axiosGameURL + 'UpdatePlayerReadiness', 
            {"name": playerName}).then(
            dispatch(ActionCreators.updatePlayerReadiness({playerName})));
    } catch { console.log("Player's Readiness Status couldn't be updated!"); }
}



export const UpdatePlayerNewProperty = async (dispatch, playerName, fieldID) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerNewProperty', 
            {"name": playerName, "fieldID": fieldID}).then(
            dispatch(ActionCreators.updatePlayerNewProperty({playerName, fieldID})));
    } catch { console.log("Player couldn't buy new property!"); }
}

export const UpdatePlayerDeleteProperty = async (dispatch, playerName, fieldID) => {
    try {
        axios.delete(axiosPlayerURL + 'UpdatePlayerDeleteProperty', 
            {"name": playerName, "fieldID": fieldID}).then(
            dispatch(ActionCreators.updatePlayerDeleteProperty({playerName, fieldID})));
    } catch { console.log("Player couldn't get rid of his property!"); }
}

export const UpdatePlayerExpandProperty = async (dispatch, playerName, fieldID, deltaEstateLevel) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerNewProperty', 
            {"name": playerName, "fieldID": fieldID, "deltaEstateLevel": deltaEstateLevel}).then(
            dispatch(ActionCreators.updatePlayerExpandProperty({playerName, fieldID, deltaEstateLevel})));
    } catch { console.log("Player's property couldn't be expanded / reduced!");}
}

export const UpdatePlayerMortgageProperty = async (dispatch, playerName, fieldID) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerNewProperty', 
            {"name": playerName, "fieldID": fieldID}).then(
            dispatch(ActionCreators.updatePlayerMortgageProperty({playerName, fieldID})));
    } catch { console.log("Player's property couldn't be mortgaged / unmortgaged!"); }
}



export const UpdatePlayerAddEventCard = async (dispatch, playerName, cardID) => {
    try {
        axios.put(axiosPlayerURL + 'UpdatePlayerAddEventCard', 
            {"name": playerName, "cardID": cardID}).then(
            dispatch(ActionCreators.updatePlayerAddEventCard({playerName, cardID})));
    } catch { console.log("Player couldn't get new event card!"); }
}

export const UpdatePlayerDeleteEventCard = async (dispatch, playerName, cardID) => {
    try {
        axios.delete(axiosPlayerURL + 'UpdatePlayerDeleteEventCard', 
            {"name": playerName, "cardID": cardID}).then(
            dispatch(ActionCreators.updatePlayerDeleteEventCard({playerName, cardID})));
    } catch { console.log("Player couldn't delete event card!"); }
}

export const AddTrade = async (dispatch, trade) => {
    try {
        console.log(trade)
        debugger
        axios.post(axiosGameURL + 'AddTrade',
        {"fromId":trade.fromId,"directId":trade.directId,"status":trade.status,"transaction":trade.transaction})
        .then(dispatch(ActionCreators.addTrade(trade)));
    } catch { console.log("Current Trade State couldn't be updated!"); }
}

export const GetLogs = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'logs').then(
            tmp => dispatch(ActionCreators.setLogs(tmp.data)));
    } catch { console.log("Logs couldn't be set!"); }
}

export const AddNewLog = async (dispatch, newLog) => {
    try {
        axios.post(axiosGameURL + 'AddLog', {"newLog": newLog}).then(
            dispatch(ActionCreators.addNewLog({newLog})));
    } catch { console.log("Logs couldn't be updated!"); }
}



export const GetTrade = async (dispatch) => {
    try {
        axios.get(axiosGameURL + 'GetTrade').then(
            tmp => dispatch(ActionCreators.setTrade(tmp.data)));
    } catch { console.log("Current Trade State couldn't be set!"); }
}



export const SetHubId = async (dispatch, hubID) => { dispatch(ActionCreators.setHubID(hubID)); }


// LOCAL:
export const UpdateCurrentEventCard = async (dispatch, eventCard) => {
    try { dispatch(ActionCreators.updateCurrentEventCard(
        {cardName: eventCard.cardName, description: eventCard.description}))}
    catch { console.log("Event card couldn't be updated!")}
}