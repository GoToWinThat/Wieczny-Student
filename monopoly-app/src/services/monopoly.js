// TO DO: FIX CREATE/DELETE/UPDATE FUNCTIONS AFTER LOCALHOST WILL HAVE GOOD URLS

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

/*
export const GetPlayers = async (dispatch) => {
    try {
        const {data} = await axiosInstancePlayers.get();
        dispatch(ActionCreators.setPlayers(data));
    } catch {
        console.log("Players couldn't be set!");
    }
}

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