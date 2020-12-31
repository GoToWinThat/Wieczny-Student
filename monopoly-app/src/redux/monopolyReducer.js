const initialState = { monopolyFields: [], gainCards: [], lossCards: [], players: [], dices: [], activePlayerIndex: 0 }

export const ActionTypes = { 
    SET_FIELDS: 'SET_FIELDS', 
    SET_GAINCARDS: 'SET_GAINCARDS',
    SET_LOSSCARDS: 'SET_LOSSCARDS',
    SET_PLAYERS: 'SET_PLAYERS',

    SET_ACTIVE_PLAYER_INDEX: 'SET_ACTIVE_PLAYER_INDEX',
    UPDATE_ACTIVE_PLAYER_INDEX: 'UPDATE_ACTIVE_PLAYER_INDEX',

    SET_DICES: 'SET_DICES',
    UPDATE_DICES: 'UPDATE_DICES',
    UPDATE_PLAYER_POSITION: 'UPDATE_PLAYER_POSITION',

    CREATE_PLAYER: 'CREATE_PLAYER', 
    DELETE_PLAYER: 'DELETE_PLAYER',
    UPDATE_PLAYER_CASH: 'UPDATE_PLAYER_CASH',
    UPDATE_PLAYER_NEW_PROPERTY: 'UPDATE_PLAYER_NEW_PROPERTY',
    UPDATE_PLAYER_DELETE_PROPERTY: 'UPDATE_PLAYER_DELETE_PROPERTY',
    UPDATE_PLAYER_UPDATE_PROPERTY: 'UPDATE_PLAYER_UPDATE_PROPERTY'
}

export const ActionCreators = {
    setFields: payload => ({ type: ActionTypes.SET_FIELDS, payload }),
    setGainCards: payload => ({ type: ActionTypes.SET_GAINCARDS, payload }),
    setLossCards: payload => ({ type: ActionTypes.SET_LOSSCARDS, payload }),
    setPlayers: payload => ({ type: ActionTypes.SET_PLAYERS, payload }),

    setActivePlayerIndex: payload => ({ type: ActionTypes.SET_ACTIVE_PLAYER_INDEX, payload }),
    updateActivePlayerIndex: payload => ({ type: ActionTypes.UPDATE_ACTIVE_PLAYER_INDEX, payload }),

    setDices: payload => ({ type: ActionTypes.SET_DICES, payload }),
    updateDices: payload => ({ type: ActionTypes.UPDATE_DICES, payload }),

    createPlayer: payload => ({ type: ActionTypes.CREATE_PLAYER, payload }),
    deletePlayer: payload => ({ type: ActionTypes.DELETE_PLAYER, payload }),
    updatePlayerCash: payload => ({ type: ActionTypes.UPDATE_PLAYER_CASH, payload }),
    updatePlayerPosition: payload => ({ type: ActionTypes.UPDATE_PLAYER_POSITION, payload }),
    updatePlayerNewProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_NEW_PROPERTY, payload }),
    updatePlayerDeleteProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_DELETE_PROPERTY, payload }),
    updatePlayerUpdateProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_UPDATE_PROPERTY, payload })
}

export default function MonopolyReducer(state = initialState, action) {
    switch (action.type) {

        // get all the fields (property, event and corner ones) and set them in "fields" list
        case ActionTypes.SET_FIELDS:
            return { ...state, monopolyFields: [...action.payload.monopolyFields] };

        // get all gain cards and set them in "gainCards" list
        case ActionTypes.SET_GAINCARDS:
            return { ...state, gainCards: [...action.payload.gainCards] };

        // get all loss cards and set them in "lossCards" list
        case ActionTypes.SET_LOSSCARDS:
            return { ...state, lossCards: [...action.payload.lossCards] };

        // get all the players and set them in "players" list
        case ActionTypes.SET_PLAYERS:
            return { ...state, players: [...action.payload.players] };



        // change index of player that has a turn at the moment:
        case ActionTypes.SET_ACTIVE_PLAYER_INDEX:
            return { ...state, activePlayerIndex: action.payload.activePlayerIndex };

        // change index of player that has a turn at the moment:
        case ActionTypes.UPDATE_ACTIVE_PLAYER_INDEX:
            state.activePlayerIndex = action.payload
            return state



        // get current dices view and set it in "dices" list
        case ActionTypes.SET_DICES:
            return { ...state, dices: [...action.payload.dices] };

        // update dices:
        case ActionTypes.UPDATE_DICES:
            state.dices = action.payload
            return state

        // change player's position on the board
        case ActionTypes.UPDATE_PLAYER_POSITION:
            for (let i = 0; i < state.players.length; i++)
                if (i === action.payload.activePlayerIndex)
                    state.players[i].position = (state.players[i].position 
                        + action.payload.dices[0] + action.payload.dices[1]) % 40;
            return state
        


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
            return { ...state, players: [...state.players] };

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