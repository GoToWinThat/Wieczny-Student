import { ActionCreators } from "../redux/monopolyReducer";
//import * as axios from 'axios';
import {data} from '../monopolyhome';

//const axiosInstanceFields  = axios.create({ baseURL: 'https://localhost:44358/api/monopolyhome' })
//const axiosInstancePlayers = axios.create({ baseURL: 'https://localhost:44358/players' })

export const GetFields = async (dispatch) => {
    try {
        //const {data} = await axiosInstanceFields.get();
        dispatch(ActionCreators.setFields(data));
    } catch {
        console.log("Fields couldn't be set!");
    }
}

export const GetPlayers = async (dispatch) => {
    try {
        //const {data} = await axiosInstancePlayers.get();
        dispatch(ActionCreators.setPlayers(data));
    } catch {
        console.log("Players couldn't be set!");
    }
}

export const GetGainCards = async (dispatch) => {
    try {
        //const {data} = await axiosInstancePlayers.get();
        dispatch(ActionCreators.setGainCards(data));
    } catch {
        console.log("Gain Cards couldn't be set!");
    }
}

export const GetLossCards = async (dispatch) => {
    try {
        //const {data} = await axiosInstancePlayers.get();
        dispatch(ActionCreators.setLossCards(data));
    } catch {
        console.log("Loss Cards couldn't be set!");
    }
}

export const GetDices = async (dispatch) => {
    try {
        //const {data} = await axiosInstancePlayers.get();
        dispatch(ActionCreators.setDices(data));
    } catch {
        console.log("Dices couldn't be set!");
    }
}

export const UpdateDices = async (dispatch, dices) => {
    try {
        //await axiosInstanceDices.put('', dices);
        dispatch(ActionCreators.updateDices(dices));
    } catch {
        console.log("Dices couldn't be updated!");
    }
}

export const UpdatePlayerPosition = async (dispatch, player, dices) => {
    try {
        //await axiosInstancePlayers.put('', player, dices);
        dispatch(ActionCreators.updatePlayerPosition(player, dices));
    } catch {
        console.log("Player's position couldn't be updated!");
    }
}


/*
export const CreatePlayer = async (dispatch, player) => {
    try {
        const {data} = await axiosInstance.post('', player);
        dispatch(ActionCreators.createPlayer(player));
    } catch {
        console.log("Player couldn't be created!");
    }
}


export const DeletePlayer = async (dispatch, player) => {
    try {
        await axiosInstancePlayers.delete(`/${player.name}`);
        dispatch(ActionCreators.deletePlayer(player));
    } catch {
        console.log("Player couldn't be deleted!");
    }
}


export const UpdatePlayerCash = async (dispatch, player) => {
    try {
        await axiosInstancePlayers.put('', player);
        dispatch(ActionCreators.updatePlayerCash(player));
    } catch {
        console.log("Player's cash couldn't be updated!");
    }
}

export const UpdatePlayerNewProperty = async (dispatch, player) => {
    try {
        await axiosInstancePlayers.put('', player);
        dispatch(ActionCreators.updatePlayerNewProperty(player));
    } catch {
        console.log("Player couldn't buy new property!");
    }
}

export const UpdatePlayerDeleteProperty = async (dispatch, player) => {
    try {
        await axiosInstancePlayers.delete(`/${player.name}`);
        dispatch(ActionCreators.updatePlayerDeleteProperty(player));
    } catch {
        console.log("Player couldn't get rid of his property!");
    }
}

export const UpdatePlayerUpdateProperty = async (dispatch, player) => {
    try {
        await axiosInstancePlayers.put('', player);
        dispatch(ActionCreators.updatePlayerUpdateProperty(player));
    } catch {
        console.log("Player's property couldn't be updated!");
    }
}
*/