// THIS FILE CONSISTS OF TESTING DATASETS FOR GETTING DATA; 
// THEY NEED TO BE DELETED LATER AND THE COMMENTED CODE NEEDS TO BE UNCOMMENTED!

// Probably update functions should have three parameters (dispatch, player, property/cash), not only two



import { ActionCreators } from "../redux/monopolyReducer";
//import * as axios from 'axios';

//const axiosInstance = axios.create({
//    baseURL: 'https://localhost:5001/monopoly'
//})

export const GetFields = async (dispatch) => {
    try {
        const response = { 
            eventFields: [
                { 
                    fieldID: 5, 
                    name: "ProfitField" 
                },
                { 
                    fieldID: 7, 
                    name: "LossField" 
                }
            ],
            propertyFields: [
                {
                    fieldID: 2,
                    name: "Laboratorium",
                    color: "purple",
                    price: 80,
                    housePriceInit: 10,
                    },
                    {
                    fieldID: 3,
                    name: "Sala wykładowa",
                    color: "yellow",
                    price: 100,
                    housePriceInit: 15,
                    }
            ],
            cornerFields: [
                {
                    fieldID: 10,
                    name: "Dziekanat"
                }
            ]
        };

        dispatch(ActionCreators.setFields(response));


        //const {data} = await axiosInstance.get();
        //dispatch(ActionCreators.setFields(data));
    } catch {
        console.log("Fields couldn't be setted!");
    }
}

export const GetPlayers = async (dispatch) => {
    try {
        const response = [ 
                { 
                    name: "Artur",
                    cash: 1000,
                    signature: "WashingMachine",
                    properties: [
                        { fieldID: 2, houses: 3 },
                        { fieldID: 3, houses: 4 }
                    ]
                },
                { 
                    name: "Łukasz",
                    cash: 1000,
                    signature: "Car",
                    properties: [
                        { fieldID: 4, houses: 0 },
                        { fieldID: 6, houses: 1 }
                    ]
                }
        ];

        //const {data} = await axiosInstance.get();
        //dispatch(ActionCreators.setPlayers(data));
        dispatch(ActionCreators.setPlayers(response));
    } catch {
        console.log("Players couldn't be setted!");
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
        await axiosInstance.delete(`/${player.name}`);
        dispatch(ActionCreators.deletePlayer(player));
    } catch {
        console.log("Player couldn't be deleted!");
    }
}


export const UpdatePlayerCash = async (dispatch, player) => {
    try {
        await axiosInstance.put('', player);
        dispatch(ActionCreators.updatePlayerCash(player));
    } catch {
        console.log("Player's cash couldn't be updated!");
    }
}

export const UpdatePlayerNewProperty = async (dispatch, player) => {
    try {
        await axiosInstance.put('', player);
        dispatch(ActionCreators.updatePlayerNewProperty(player));
    } catch {
        console.log("Player couldn't buy new property!");
    }
}

export const UpdatePlayerDeleteProperty = async (dispatch, player) => {
    try {
        await axiosInstance.delete(`/${player.name}`);
        dispatch(ActionCreators.updatePlayerDeleteProperty(player));
    } catch {
        console.log("Player couldn't get rid of his property!");
    }
}

export const UpdatePlayerUpdateProperty = async (dispatch, player) => {
    try {
        await axiosInstance.put('', player);
        dispatch(ActionCreators.updatePlayerUpdateProperty(player));
    } catch {
        console.log("Player's property couldn't be updated!");
    }
}

*/