import { ActionCreators } from "../redux/monopolyReducer";
import { staticData, dynamicData } from '../monopolyData';

//import * as axios from 'axios';
//const axiosInstanceStaticData  = axios.create({ baseURL: 'https://localhost:44358/api/monopolyhome' })
//const axiosInstanceDynamicData = axios.create({ baseURL: 'https://localhost:44358/api/monopolygame' })

export const GetFields = async (dispatch) => {
    try {
        //const {staticData} = await axiosInstanceStaticData.get();
        dispatch(ActionCreators.setFields(staticData));
    } catch {
        console.log("Fields couldn't be set!");
    }
}

export const GetPlayers = async (dispatch) => {
    try {
        //const {dynamicData} = await axiosInstanceDynamicData.get();
        dispatch(ActionCreators.setPlayers(dynamicData));
    } catch {
        console.log("Players couldn't be set!");
    }
}

export const GetGainCards = async (dispatch) => {
    try {
        //const {staticData} = await axiosInstanceStaticData.get();
        dispatch(ActionCreators.setGainCards(staticData));
    } catch {
        console.log("Gain Cards couldn't be set!");
    }
}

export const GetLossCards = async (dispatch) => {
    try {
        //const {staticData} = await axiosInstanceStaticData.get();
        dispatch(ActionCreators.setLossCards(staticData));
    } catch {
        console.log("Loss Cards couldn't be set!");
    }
}

export const GetActivePlayerIndex = async (dispatch) => {
    try {
        //const {dynamicData} = await axiosInstanceDynamicData.get();
        dispatch(ActionCreators.setActivePlayerIndex(dynamicData));
    } catch {
        console.log("ActivePlayerIndex couldn't be set!");
    }
}

export const UpdateActivePlayerIndex = async (dispatch, activePlayerIndex) => {
    try {
        //await axiosInstanceDynamicData.put('UpdateActivePlayerIndex', JSON.stringify({activePlayerIndex}));
        dispatch(ActionCreators.updateActivePlayerIndex({activePlayerIndex}));
    } catch {
        console.log("ActivePlayerIndex couldn't be updated!");
    }
}

export const GetDices = async (dispatch) => {
    try {
        //const {dynamicData} = await axiosInstanceDynamicData.get();
        dispatch(ActionCreators.setDices(dynamicData));
    } catch {
        console.log("Dices couldn't be set!");
    }
}

export const UpdateDices = async (dispatch, dices) => {
    try {
        //await axiosInstanceDynamicData.put('UpdateDices', JSON.stringify({dices}));
        dispatch(ActionCreators.updateDices({dices}));
    } catch {
        console.log("Dices couldn't be updated!");
    }
}

export const UpdatePlayerPosition = async (dispatch, activePlayerIndex, deltaPosition) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerPosition', JSON.stringify({activePlayerIndex, deltaPosition}));
        dispatch(ActionCreators.updatePlayerPosition({activePlayerIndex, deltaPosition}));
    } catch {
        console.log("Player's position couldn't be updated!");
    }
}

export const UpdatePlayerCash = async (dispatch, playerName, deltaCash) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerCash', JSON.stringify({playerName, deltaCash}));
        dispatch(ActionCreators.updatePlayerCash({playerName, deltaCash}));
    } catch {
        console.log("Player's cash couldn't be updated!");
    }
}

export const CreatePlayer = async (dispatch, playerName, signature, color) => {
    try {
        //await axiosInstanceDynamicData.put('CreatePlayer', JSON.stringify({playerName, signature, color}));
        dispatch(ActionCreators.createPlayer({playerName, signature, color}));
    } catch {
        console.log("Player couldn't be created!");
    }
}

export const DeletePlayer = async (dispatch, playerName) => {
    try {
        //await axiosInstanceDynamicData.put('DeletePlayer', JSON.stringify({playerName}));
        dispatch(ActionCreators.deletePlayer({playerName}));
    } catch {
        console.log("Player couldn't be deleted!");
    }
}

export const UpdatePlayerNewProperty = async (dispatch, playerName, fieldID) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerNewProperty', JSON.stringify({playerName, fieldID}));
        dispatch(ActionCreators.updatePlayerNewProperty({playerName, fieldID}));
    } catch {
        console.log("Player couldn't buy new property!");
    }
}

export const UpdatePlayerDeleteProperty = async (dispatch, playerName, fieldID) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerDeleteProperty', JSON.stringify({playerName, fieldID}));
        dispatch(ActionCreators.updatePlayerDeleteProperty({playerName, fieldID}));
    } catch {
        console.log("Player couldn't get rid of his property!");
    }
}

export const UpdatePlayerExpandProperty = async (dispatch, playerName, fieldID, deltaEstateLevel) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerExpandProperty', JSON.stringify({playerName, fieldID, deltaEstateLevel}));
        dispatch(ActionCreators.updatePlayerExpandProperty({playerName, fieldID, deltaEstateLevel}));
    } catch {
        console.log("Player's property couldn't be expanded / reduced!");
    }
}

export const UpdatePlayerMortgageProperty = async (dispatch, playerName, fieldID) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerMortgageProperty', JSON.stringify({playerName, fieldID}));
        dispatch(ActionCreators.updatePlayerMortgageProperty({playerName, fieldID}));
    } catch {
        console.log("Player's property couldn't be mortgaged / unmortgaged!");
    }
}

export const UpdatePlayerNewEventCard = async (dispatch, playerName, cardID) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerNewEventCard', JSON.stringify({playerName, cardID}));
        dispatch(ActionCreators.updatePlayerNewEventCard({playerName, cardID}));
    } catch {
        console.log("Player couldn't get new event card!");
    }
}

export const UpdatePlayerDeleteEventCard = async (dispatch, playerName, cardID) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerDeleteEventCard',  JSON.stringify({playerName, cardID}));
        dispatch(ActionCreators.updatePlayerDeleteEventCard({playerName, cardID}));
    } catch {
        console.log("Player couldn't delete event card!");
    }
}

export const UpdatePlayerUpdateWaitingTurns = async (dispatch, playerName, deltaTurns, isInJail) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerUpdateWaitingTurns',  JSON.stringify({playerName, deltaTurns, isInJail}));
        dispatch(ActionCreators.updatePlayerUpdateWaitingTurns({playerName, deltaTurns, isInJail}));
    } catch {
        console.log("Player's Waiting Turns couldn't be updated!");
    }
}

export const UpdatePlayerUpdateBankrupt = async (dispatch, playerName) => {
    try {
        //await axiosInstanceDynamicData.put('UpdatePlayerUpdateBankrupt',  JSON.stringify({playerName}));
        dispatch(ActionCreators.updatePlayerUpdateBankrupt({playerName}));
    } catch {
        console.log("Player's Bankrupt Status couldn't be updated!");
    }
}

export const GetLogs = async (dispatch) => {
    try {
        //const {dynamicData} = await axiosInstanceDynamicData.get();
        dispatch(ActionCreators.setLogs(dynamicData));
    } catch {
        console.log("Logs couldn't be set!");
    }
}

export const AddNewLog = async (dispatch, newLog) => {
    try {
        //await axiosInstanceDynamicData.put('AddNewLog', JSON.stringify({newLog}));
        dispatch(ActionCreators.addNewLog({newLog}));
    } catch {
        console.log("Logs couldn't be updated!");
    }
}


// LOCAL:
export const UpdateCurrentEventCard = async (dispatch, eventCard) => {
    try { dispatch(ActionCreators.updateCurrentEventCard(
        {cardName: eventCard.cardName, description: eventCard.description}))}
    catch { console.log("Event card couldn't be updated!")}
}