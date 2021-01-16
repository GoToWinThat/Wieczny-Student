import { UpdatePlayerUpdateBankrupt,UpdatePlayerDeleteProperty,UpdatePlayerDeleteEventCard, AddNewLog, UpdatePlayerExpandProperty,UpdatePlayerCash,UpdatePlayerMortgageProperty } from "../../../services/monopolyService";
import { endTurnEvent } from "../../../gameplay/turnActions";

export const bankrupt = (dispatch,activePlayer,fields,props) => 
{

    //if(canPreventBankrupt(dispatch,activePlayer,fields)) return;
    // Removing properties and cards:
    for (let i = 0; i < activePlayer.properties.length; i++)
        UpdatePlayerDeleteProperty(dispatch, activePlayer.name, activePlayer.properties[i].fieldID);
    for (let i = 0; i < activePlayer.eventCards.length; i++)
        UpdatePlayerDeleteEventCard(dispatch, activePlayer.name, activePlayer.eventCards[i].cardID);

    // set isBankrupt true, inform about bankrupting, close modal, next turn,
    // prevent moving the pawn (if player bankrupted not in his turn, he will not throw dices,
    // so they will be thrown automatically in endTurnEvent)
    AddNewLog(dispatch,`${activePlayer.name} właśnie zbankrutował !!!`)
    UpdatePlayerUpdateBankrupt(dispatch, activePlayer.name);
    endTurnEvent(props);
}

const canPreventBankrupt = (dispatch,activePlayer,fields) => 
{
    var cash = activePlayer.cash;
    if(hasAnyComputer(activePlayer)) cash = sellComputers(dispatch,activePlayer,fields,cash);
    if(hasAnyProperties(activePlayer)) {
        if(isMortgageEnough(activePlayer,fields)) cash = mortgageFields(dispatch,activePlayer,fields,cash);
        else cash = sellFields(dispatch,activePlayer,fields,cash);
    }
    if(cash >= 0 ) return true;
    else return false;
}

const hasAnyComputer = (activePlayer) => 
{
    let result = false;
    activePlayer.properties.forEach(field => {
        if(field.estateLevel > 0) result = true;
    })
    return result;
}

const hasAnyProperties = (activePlayer) => 
{
    if(activePlayer.properties.length > 0) return true;
    return false;
}

const isMortgageEnough = (activePlayer,fields) =>
{
    let sum = 0;
    activePlayer.properties.forEach(field => {
        let thisField = getFieldOfId(field.fieldID, fields);
        sum += thisField.mortgage;
    })

    if(sum + activePlayer.cash < 0) return false;
    else return true;
}

const sellComputers = (dispatch,activePlayer,fields,cash) => 
{   
    activePlayer.properties.forEach(field => {
        for (let i = 0; i < field.estateLevel; i++) {
            if(cash < 0) {
                let thisField = getFieldOfId(field.fieldID, fields);
                let num = Math.floor(thisField.estatePrice/2);
                UpdatePlayerExpandProperty(dispatch, activePlayer.name, field.fieldID, -1);
                UpdatePlayerCash( dispatch, activePlayer.name,num);
                cash += num;
            }
        }
    });
    return cash;
}

const sellFields = (dispatch,activePlayer,fields,cash) => 
{
    activePlayer.properties.forEach(field => {

        if(cash < 0) {
            let thisField = getFieldOfId(field.fieldID, fields);
            UpdatePlayerDeleteProperty(dispatch, activePlayer.name, thisField.fieldID);
            UpdatePlayerCash( dispatch, activePlayer.name,thisField.price);
            cash += thisField.price;
        }
    });
    return cash;
}

const mortgageFields = (dispatch,activePlayer,fields,cash) => 
{
    debugger;
    activePlayer.properties.forEach(field => {

        if(cash < 0) {
            let thisField = getFieldOfId(field.fieldID, fields);
            UpdatePlayerMortgageProperty(dispatch, activePlayer.name, thisField.fieldID);
            UpdatePlayerCash(
              dispatch,
              activePlayer.name,
              thisField.mortgage
            );
            cash += thisField.mortgage;
        }
    });
    return cash;
}

const getFieldOfId = (id,fields) =>
{
    let result = {}
    fields.forEach(field => field.fieldID === id ? result = field : null)
    return result;
}