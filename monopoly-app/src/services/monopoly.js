import { ActionCreators } from "../redux/monopolyReducer";
import { staticData, dynamicData } from '../monopolyhome';

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
        //await axiosInstanceDynamicData.put('', activePlayerIndex);
        dispatch(ActionCreators.updateActivePlayerIndex(activePlayerIndex));
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
        //await axiosInstanceDynamicData.put('', dices);
        dispatch(ActionCreators.updateDices(dices));
    } catch {
        console.log("Dices couldn't be updated!");
    }
}

export const UpdatePlayerPosition = async (dispatch, playerIndex, deltaPosition) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerPosition({activePlayerIndex: playerIndex, deltaPosition: deltaPosition}));
    } catch {
        console.log("Player's position couldn't be updated!");
    }
}

export const UpdatePlayerCash = async (dispatch, playerName, deltaCash) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerCash({playerName, deltaCash}));
    } catch {
        console.log("Player's cash couldn't be updated!");
    }
}

export const CreatePlayer = async (dispatch, playerName, signature, color) => {
    try {
        //const {dynamicData} = await axiosInstanceDynamicData.post('', player);
        dispatch(ActionCreators.createPlayer({playerName, signature, color}));
    } catch {
        console.log("Player couldn't be created!");
    }
}

export const DeletePlayer = async (dispatch, playerName) => {
    try {
        //await axiosInstanceDynamicData.delete(`/${playerName}`);
        dispatch(ActionCreators.deletePlayer(playerName));
    } catch {
        console.log("Player couldn't be deleted!");
    }
}

export const UpdatePlayerNewProperty = async (dispatch, playerName, fieldID) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerNewProperty({playerName, fieldID}));
    } catch {
        console.log("Player couldn't buy new property!");
    }
}

export const UpdatePlayerDeleteProperty = async (dispatch, playerName, fieldID) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerDeleteProperty({playerName, fieldID}));
    } catch {
        console.log("Player couldn't get rid of his property!");
    }
}

export const UpdatePlayerExpandProperty = async (dispatch, playerName, fieldID, deltaEstateLevel) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerExpandProperty({playerName, fieldID, deltaEstateLevel}));
    } catch {
        console.log("Player's property couldn't be expanded / reduced!");
    }
}

export const UpdatePlayerMortgageProperty = async (dispatch, playerName, fieldID) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerMortgageProperty({playerName, fieldID}));
    } catch {
        console.log("Player's property couldn't be mortgaged / unmortgaged!");
    }
}

export const updatePlayerNewEventCard = async (dispatch, playerName, cardID) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerNewEventCard({playerName, cardID}));
    } catch {
        console.log("Player couldn't get new event card!");
    }
}

export const updatePlayerDeleteEventCard = async (dispatch, playerName, cardID) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerDeleteEventCard({playerName, cardID}));
    } catch {
        console.log("Player couldn't delete event card!");
    }
}

export const updatePlayerGoToJail = async (dispatch, playerName) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerGoToJail(playerName));
    } catch {
        console.log("Player couldn't go to jail / go out from jail!");
    }
}

export const updatePlayerUpdateWaitingTurns = async (dispatch, playerName, turns) => {
    try {
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.updatePlayerUpdateWaitingTurns({playerName, turns}));
    } catch {
        console.log("Player couldn't go to jail / go out from jail!");
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
        //await axiosInstanceDynamicData...
        dispatch(ActionCreators.addNewLog(newLog));
    } catch {
        console.log("Logs couldn't be set!");
    }
}