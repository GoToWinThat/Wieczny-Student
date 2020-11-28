// TESTS WITH WEBAPI ARE REQUIRED HERE! UPDATES MIGHT NOT WORK BECAUSE OF ACTION.PAYLOAD'S ATTRIBUTES

const initialState = { 
    eventFields: [], 
    propertyFields: [], 
    cornerFields: [], 
    players: [] 
}

export const ActionTypes = { 
    SET_FIELDS: 'SET_FIELDS', 
    SET_PLAYERS: 'SET_PLAYERS',
    CREATE_PLAYER: 'CREATE_PLAYER', 
    DELETE_PLAYER: 'DELETE_PLAYER',
    UPDATE_PLAYER_CASH: 'UPDATE_PLAYER_CASH',
    UPDATE_PLAYER_NEW_PROPERTY: 'UPDATE_PLAYER_NEW_PROPERTY',
    UPDATE_PLAYER_DELETE_PROPERTY: 'UPDATE_PLAYER_DELETE_PROPERTY',
    UPDATE_PLAYER_UPDATE_PROPERTY: 'UPDATE_PLAYER_UPDATE_PROPERTY'
}

export const ActionCreators = {
    setFields: payload => ({ type: ActionTypes.SET_FIELDS, payload }),
    setPlayers: payload => ({ type: ActionTypes.SET_PLAYERS, payload }),
    createPlayer: payload => ({ type: ActionTypes.CREATE_PLAYER, payload }),
    deletePlayer: payload => ({ type: ActionTypes.DELETE_PLAYER, payload }),
    updatePlayerCash: payload => ({ type: ActionTypes.UPDATE_PLAYER_CASH, payload }),
    updatePlayerNewProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_NEW_PROPERTY, payload }),
    updatePlayerDeleteProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_DELETE_PROPERTY, payload }),
    updatePlayerUpdateProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_UPDATE_PROPERTY, payload })
}

export default function MonopolyReducer(state = initialState, action) {
    switch (action.type) {

        // get all the fields (property, event and corner ones) and set them in "fields" list
        case ActionTypes.SET_FIELDS:
            return { ...state, eventFields: [...action.payload.eventFields],
                               propertyFields: [...action.payload.propertyFields],
                               cornerFields: [...action.payload.cornerFields] };

        // get all the players and set them in "players" list
        case ActionTypes.SET_PLAYERS:
            return { ...state, players: [...action.payload] };

        // add player at the end of the list
        case ActionTypes.CREATE_PLAYER:
            return { ...state, players: [...state.players, action.payload] };

        // delete player from the list (eg. if he logged out)
        case ActionTypes.DELETE_PLAYER:
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].name === action.payload.name) {
                    state.players.splice(i, 1);
                    break;
                }
            return { ...state, players: [...state.players, action.payload] };

        // increase or decrease (if on payload there is negative number) player's cash
        case ActionTypes.UPDATE_PLAYER_CASH: 
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].name === action.payload.name)
                    state.players[i].cash += action.payload.cash;
            return { ...state, players: [...state.players] }
        
        // add property at the end of the player's properties list
        case ActionTypes.UPDATE_PLAYER_NEW_PROPERTY:
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].name === action.payload.name)
                    state.players[i].properties = [...state.players[i].properties, action.payload.property]
            return { ...state, players: [...state.players] }

        // delete property from player's properties list
        case ActionTypes.UPDATE_PLAYER_DELETE_PROPERTY:
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].name === action.payload.name)
                    for (let j = 0; j < state.players[i].properties.length; j++)
                        if (state.players[i].properties[j].id === action.payload.propertyId) {
                            state.players[i].properties.splice(j, 1);
                            break;
                        }
            return { ...state, players: [...state.players] }

        // update amount of houses that certain property have
        case ActionTypes.UPDATE_PLAYER_UPDATE_PROPERTY:
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].name === action.payload.name)
                    for (let j = 0; j < state.players[i].properties.length; j++)
                        if (state.players[i].properties[j].id === action.payload.propertyId) {
                            state.players[i].properties[j].houses += action.payload.houses;
                            break;
                        }
            return { ...state, players: [...state.players] }
        default:
            return state;
    }
}