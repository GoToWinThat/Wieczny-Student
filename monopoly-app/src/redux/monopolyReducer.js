const initialState = { monopolyFields: [], gainCards: [], 
    lossCards: [], players: [], dices: [], activePlayerIndex: null, 
    logs: [], currentCard: { cardName: "", description: ""} }

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
    UPDATE_PLAYER_EXPAND_PROPERTY: 'UPDATE_PLAYER_EXPAND_PROPERTY',
    UPDATE_PLAYER_MORTGAGE_PROPERTY: 'UPDATE_PLAYER_MORTGAGE_PROPERTY',
    UPDATE_PLAYER_NEW_EVENT_CARD: 'UPDATE_PLAYER_NEW_EVENT_CARD',
    UPDATE_PLAYER_DELETE_EVENT_CARD: 'UPDATE_PLAYER_DELETE_EVENT_CARD',
    UPDATE_PLAYER_UPDATE_WAITING_TURNS: 'UPDATE_PLAYER_UPDATE_WAITING_TURNS',
    UPDATE_PLAYER_UPDATE_BANKRUPT: 'UPDATE_PLAYER_UPDATE_BANKRUPT',

    SET_LOGS: 'SET_LOGS',
    ADD_NEW_LOG: 'ADD_NEW_LOG',

    // LOCAL ONLY - THERE IS NO NECESSITY TO IMPLEMENT IT IN API:
    UPDATE_CURRENT_CARD: 'UPDATE_CURRENT_CARD'
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
    updatePlayerPosition: payload => ({ type: ActionTypes.UPDATE_PLAYER_POSITION, payload }),

    createPlayer: payload => ({ type: ActionTypes.CREATE_PLAYER, payload }),
    deletePlayer: payload => ({ type: ActionTypes.DELETE_PLAYER, payload }),
    updatePlayerCash: payload => ({ type: ActionTypes.UPDATE_PLAYER_CASH, payload }),
    updatePlayerNewProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_NEW_PROPERTY, payload }),
    updatePlayerDeleteProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_DELETE_PROPERTY, payload }),
    updatePlayerExpandProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_EXPAND_PROPERTY, payload }),
    updatePlayerMortgageProperty: payload => ({ type: ActionTypes.UPDATE_PLAYER_MORTGAGE_PROPERTY, payload }),
    updatePlayerNewEventCard: payload => ({ type: ActionTypes.UPDATE_PLAYER_NEW_EVENT_CARD, payload }),
    updatePlayerDeleteEventCard: payload => ({ type: ActionTypes.UPDATE_PLAYER_DELETE_EVENT_CARD, payload }),
    updatePlayerUpdateWaitingTurns: payload => ({ type: ActionTypes.UPDATE_PLAYER_UPDATE_WAITING_TURNS, payload }),
    updatePlayerUpdateBankrupt: payload => ({ type: ActionTypes.UPDATE_PLAYER_UPDATE_BANKRUPT, payload }),

    setLogs: payload => ({ type: ActionTypes.SET_LOGS, payload }),
    addNewLog: payload => ({ type: ActionTypes.ADD_NEW_LOG, payload }),

    updateCurrentEventCard: payload => ({ type: ActionTypes.UPDATE_CURRENT_CARD, payload })
}

export default function MonopolyReducer(state = initialState, action) {
    switch (action.type) {

        // get all the fields (property, event and corner ones) and set them in "fields" list
        case ActionTypes.SET_FIELDS:
            return { ...state, monopolyFields: [...action.payload.monopolyFields].sort((a,b) => a.fieldID - b.fieldID) }

        // get all gain cards and set them in "gainCards" list
        case ActionTypes.SET_GAINCARDS:
            return { ...state, gainCards: [...action.payload.gainCards] }

        // get all loss cards and set them in "lossCards" list
        case ActionTypes.SET_LOSSCARDS:
            return { ...state, lossCards: [...action.payload.lossCards] }

        // get all the players and set them in "players" list
        case ActionTypes.SET_PLAYERS:
            return { ...state, players: [...action.payload.players] }

        // change index of player that has a turn at the moment:
        case ActionTypes.SET_ACTIVE_PLAYER_INDEX:
            return { ...state, activePlayerIndex: action.payload.activePlayerIndex }

        // change index of player that has a turn at the moment:
        case ActionTypes.UPDATE_ACTIVE_PLAYER_INDEX:
            return { ...state, activePlayerIndex: action.payload.activePlayerIndex }

        // get current dices view and set it in "dices" list
        case ActionTypes.SET_DICES:
            return { ...state, dices: [...action.payload.dices] }

        // update dices:
        case ActionTypes.UPDATE_DICES:
            return { ...state, dices: action.payload.dices }

        // change player's position on the board
        case ActionTypes.UPDATE_PLAYER_POSITION:
            let i = -1;
            return { ...state, players: state.players.map(player => {
                ++i;
                if (i !== action.payload.activePlayerIndex) return player
                return { ...player, position: (player.position + action.payload.deltaPosition) % state.monopolyFields.length }
                }
            )}

        // increase or decrease (if on payload there is negative number) player's cash
        case ActionTypes.UPDATE_PLAYER_CASH: 
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, cash: player.cash + action.payload.deltaCash }
                })
            }

        // add property at the end of the player's properties list
        case ActionTypes.UPDATE_PLAYER_NEW_PROPERTY:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, properties: [...player.properties, 
                        {
                            "fieldID": action.payload.fieldID, 
                            "estateLevel": 0, 
                            "mortgaged": false
                        }
                    ]}
                })
            }

        // delete property from player's properties list
        case ActionTypes.UPDATE_PLAYER_DELETE_PROPERTY:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    let tmp = []
                    for (let i = 0; i < player.properties.length; i++)
                        if (player.properties[i].fieldID !== action.payload.fieldID) 
                            tmp.push(player.properties[i]);
                    return { ...player, properties: [...tmp] }
                })
            }

        // update amount of computers that certain property have
        case ActionTypes.UPDATE_PLAYER_EXPAND_PROPERTY:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, 
                        properties: player.properties.map(property => {
                            if (property.fieldID !== action.payload.fieldID) return property
                            return { ...property, estateLevel: property.estateLevel + action.payload.deltaEstateLevel}
                        }) 
                    }
                })
            }

        // update state if property is mortgaged or not
        case ActionTypes.UPDATE_PLAYER_MORTGAGE_PROPERTY:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, 
                        properties: player.properties.map(property => {
                            if (property.fieldID !== action.payload.fieldID) return property
                            return { ...property, mortgaged: !property.mortgaged}
                        }) 
                    }
                })
            }

        // add event card to player
        case ActionTypes.UPDATE_PLAYER_NEW_EVENT_CARD:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, eventCards: [...player.eventCards, 
                        {
                            "cardID": action.payload.cardID
                        }
                    ]}
                })
            }

        // delete event card from player
        case ActionTypes.UPDATE_PLAYER_DELETE_EVENT_CARD:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    let tmp = []
                    for (let i = 0; i < player.eventCards.length; i++)
                        if (player.eventCards[i].cardID !== action.payload.cardID) 
                            tmp.push(player.eventCards[i]);
                    return { ...player, eventCards: [...tmp] }
                })
            }

        // change amount of turns that the player has to wait and update state of being in jail
        case ActionTypes.UPDATE_PLAYER_UPDATE_WAITING_TURNS:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, isInJail: action.payload.isInJail,
                        turnsToWait: player.turnsToWait + action.payload.deltaTurns }
                })
            }

        // change player's bankrupt status:
        case ActionTypes.UPDATE_PLAYER_UPDATE_BANKRUPT:
            return { ...state, 
                players: state.players.map(player => {
                    if (player.name !== action.payload.playerName) return player
                    return { ...player, isBankrupt: true }
                })
            }

        // add player at the end of the list
        case ActionTypes.CREATE_PLAYER:
            return { ...state, players: [...state.players, 
                {
                    "name": action.payload.playerName,
                    "cash": 500,
                    "signature": action.payload.signature,
                    "color": action.payload.color,
                    "properties": [],
                    "eventCards": [],
                    "position": 0,
                    "isInJail": false,
                    "turnsToWait": 0,
                    "isBankrupt": false,
                    "isReady": false
                }
            ]}

        // delete player from the list (eg. if he logged out)
        case ActionTypes.DELETE_PLAYER:
            let tmp = []
            for (let i = 0; i < state.players.length; i++)
                if (state.players[i].name !== action.payload.playerName) 
                    tmp.push(state.players[i]);
            return { ...state, players: [...tmp] }


        // get all logs and set them in "logs" list    
        case ActionTypes.SET_LOGS:
            return { ...state, logs: [...action.payload.logs] }

        // add new log to "logs" list
        case ActionTypes.ADD_NEW_LOG:
            return { ...state, logs: [...state.logs, action.payload.newLog] }

        // local function setting current event card:
        case ActionTypes.UPDATE_CURRENT_CARD:
            return { ...state, currentCard: { cardName: action.payload.cardName, 
                description: action.payload.description} }

        default:
            return state;
    }
}