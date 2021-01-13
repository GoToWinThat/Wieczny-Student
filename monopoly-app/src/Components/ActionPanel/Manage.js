import "../../styles/Modals.css";
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UpdatePlayerExpandProperty, UpdatePlayerDeleteProperty, 
    UpdatePlayerMortgageProperty, UpdatePlayerCash, 
    UpdatePlayerUpdateBankrupt, AddNewLog, UpdatePlayerDeleteEventCard } from '../../services/monopolyService';
import {endTurnEvent} from '../../gameplay/turnActions';


function Manage(props) {
    //Initialized a players property list
    const activePlayerIndex = props.data.activePlayerIndex;
    const activePlayer = props.data.players[activePlayerIndex];
    const fields = props.data.fields;
    const dispatch = props.data.dispatch;
    var isCashNegative = activePlayer.cash >= 0 ? true : false;

    const playersProperties = () => 
    {
        var fieldArray = [];
        activePlayer.properties.map(
            field => fieldArray.push(props.data.fields[field.fieldID])
        )
        return fieldArray;
    }
    const properties = playersProperties();
    
    // Checking if player has all properties from one color - only then he/she can expand it
    const hasAllPropertiesFromThisColor = (field) => {
        let color = field.color;
        let ownedProperties = 0;
        for (let i = 0; i < properties.length; i++)
            if (fields[properties[i].fieldID].color === color)
                ownedProperties++;
        
        let totalProperties = 0;
        for (let i = 0; i < fields.length; i++)
            if (fields[i].color === color)
                totalProperties++;

        return ownedProperties === totalProperties;
    }

    // Checking if player has at least one computer in his fields - you can't expand 
    // field when you don't have properties from one color so you can't also sell 
    // property if something has already been expanded
    const hasAnyPropertyFromThisColorOneOrMoreComputers = (field) => {
        if (!hasAllPropertiesFromThisColor(field)) return false;

        let color = field.color;
        let thisFieldFromPlayersPropertiesList;
        for (let i = 0; i < properties.length; i++)
        {
            if (properties[i].color === color)
            {
                thisFieldFromPlayersPropertiesList = activePlayer.properties.find(
                    element => element.fieldID === properties[i].fieldID);
                if (thisFieldFromPlayersPropertiesList.estateLevel > 0) return true;
            }
        }
        return false;
    }

    // Checking if player has at least one field mortgaged - you can't expand 
    // field when you don't have properties from one color; mortgaged property is
    // not yours for now
    const isAnyPropertyFromThisColorMortgaged = (field) => {
        if (!hasAllPropertiesFromThisColor(field)) return false;

        let color = field.color;
        let thisFieldFromPlayersPropertiesList;
        for (let i = 0; i < properties.length; i++)
        {
            if (properties[i].color === color)
            {
                thisFieldFromPlayersPropertiesList = activePlayer.properties.find(
                    element => element.fieldID === properties[i].fieldID);
                if (thisFieldFromPlayersPropertiesList.mortgaged === true) return true;
            }
        }
        return false;
    }


    const showEstateLevel = (estateLevel) => (estateLevel < 4) ? `${estateLevel} PC` : `SERWER`;

    // Incrementing amount of computers if it is possible:
    const buyHouse = (fieldId,idx) =>
    {
        if(activePlayer.properties[idx].estateLevel < 4)
        {
            // Add new log about expanding property:
            AddNewLog(dispatch, `${activePlayer.name} rozbudowuje ${fields[activePlayer.properties[idx].fieldID].name}.`
            + ` - aktualny poziom: ${showEstateLevel(activePlayer.properties[idx].estateLevel + 1)}`);

            // Expand property, decrement cash:
            UpdatePlayerExpandProperty(dispatch, activePlayer.name, fieldId, 1);
            UpdatePlayerCash(dispatch,activePlayer.name, -fields[fieldId].estatePrice);
        }
    }

    // Decrementing amount of computers if it is possible:
    const sellHouse = (fieldId,idx) =>
    {
        if(activePlayer.properties[idx].estateLevel > 0)
        {
            // Add new log about "shrinking" property:
            AddNewLog(dispatch, `${activePlayer.name} demontuje ${fields[activePlayer.properties[idx].fieldID].name}.`
            + ` - aktualny poziom: ${showEstateLevel(activePlayer.properties[idx].estateLevel - 1)}`);

            // "Shrink" property, increment cash (50% of price):
            UpdatePlayerExpandProperty(dispatch, activePlayer.name, fieldId, -1);
            UpdatePlayerCash(dispatch,activePlayer.name, Math.floor(fields[fieldId].estatePrice / 2));
        }
    }

    // Selling owned property:
    const sellProperty = (fieldId) =>
    {
        let currentField = fields[fieldId];
        UpdatePlayerDeleteProperty(dispatch, activePlayer.name,fieldId);
        UpdatePlayerCash(dispatch, activePlayer.name, parseInt(currentField.price));
        AddNewLog(dispatch, `${activePlayer.name} sprzedaje ${currentField.name} za ${currentField.price} ECTS.`);
    }

    // Mortgaging / unmortgaging owned property:
    const mortgageProperty = (fieldId, idx) =>
    {
        let multiplier;
        let currentField = fields[fieldId];
        if (activePlayer.properties[idx].mortgaged) 
        {
            // Add new log about unmortgaging property:
            AddNewLog(dispatch, `${activePlayer.name} odkupuje ${currentField.name} od banku za ${currentField.mortgage} ECTS.`);
            multiplier = -1;
        }
        else 
        {
            // Add new log about mortgaging property:
            AddNewLog(dispatch, `${activePlayer.name} oddaje ${currentField.name} pod zastaw za ${currentField.mortgage} ECTS.`);
            multiplier = 1;
        }

        // Mortgage / unmortgage property, update cash:
        UpdatePlayerMortgageProperty(dispatch, activePlayer.name, fieldId);
        UpdatePlayerCash(dispatch, activePlayer.name, parseInt(fields[fieldId].mortgage) * multiplier);
    }

    const mortgageButtonColor = (idx) => 
    {
        if (activePlayer.properties[idx].mortgaged) return "success";
        else return "danger";
    }

    const fieldNameColor = (idx, color) => 
    {
        let field = activePlayer.properties[idx];
        if (field.mortgaged) return 'gray';
        else return color;
    }


    //Method to create n number of houses icon
    const createHouses = (propNum) =>
    {
        var array = [];
        let field = activePlayer.properties[propNum];
        if (field.estateLevel > 3)
            array.push( <img key={field.fieldID} className="houses" src={`/Assets/Houses/server.svg`} alt="server"/>); 
        else 
        {
            for (var j = 0; j < field.estateLevel; j++) 
                array.push( <img key={j} className="houses" src={`/Assets/Houses/computer.svg`} alt="computer"/>);
        }
        return array;
    }

    //Generate table for panel
    const genPorpTable = () =>{

        var array = [];
        let idx = 0
        properties.map(field => {
            let idx2 = idx
            let fKey = `${field.fieldID} ${field.estateLevel}`
            array.push(
            <tr key={fKey}>
                <td className="text-left">
                    <div className="d-flex">
                        <div className="propertyBox" style={{background: fieldNameColor(idx2,field.color) }}/>
                        <span style= {{ color: fieldNameColor(idx2,'black')}} >{field.name}</span> 
                    </div>
                </td>
                <td>{createHouses(idx2)}</td>
                {
                    field.type === "property" ? 
                    <td className="manageExpandCell">
                        <Button variant="success" onClick={() => buyHouse(field.fieldID,idx2)}
                            disabled={activePlayer.properties[idx2].estateLevel === 4 
                                || activePlayer.cash < field.estatePrice 
                                || activePlayer.properties[idx2].mortgaged === true
                                || !hasAllPropertiesFromThisColor(field)
                                || isAnyPropertyFromThisColorMortgaged(field) === true}
                                onMouseDown={(e) => e.preventDefault()}> + </Button>
                        <span>{field.estatePrice} ECTS</span>
                        <Button variant="danger" onClick={() => sellHouse(field.fieldID,idx2)} 
                            disabled={activePlayer.properties[idx2].estateLevel === 0
                                || activePlayer.properties[idx2].mortgaged === true
                                || !hasAllPropertiesFromThisColor(field)}
                                onMouseDown={(e) => e.preventDefault()}> - </Button>
                    </td>
                    : 
                    <td></td>
                }
                <td><Button variant={mortgageButtonColor(idx2)} onClick={() => mortgageProperty(field.fieldID,idx2)}
                    disabled={hasAnyPropertyFromThisColorOneOrMoreComputers(field) === true 
                        || (activePlayer.cash < field.mortgage 
                        &&  activePlayer.properties[idx2].mortgaged === true)}
                        onMouseDown={(e) => e.preventDefault()}> {field.mortgage} ECTS</Button></td>
                <td><Button variant="danger" onClick={() => sellProperty(field.fieldID)}
                    disabled={hasAnyPropertyFromThisColorOneOrMoreComputers(field) === true
                        || activePlayer.properties[idx2].mortgaged === true}
                        onMouseDown={(e) => e.preventDefault()}> {field.price} ECTS</Button></td>
            </tr>)
            idx++;
            return null;
        });
        return array;
    }

    const bankruptMode = () =>
    {
        return <Button id="bankruptButton" variant="secondary" 
            onClick={Bankrupt} onMouseDown={(e) => e.preventDefault()}>ZBANKRUTUJ</Button>
    }
    const isModalOpen = () =>
    {
        if (isCashNegative) return props.show
        else return true;
    }
    const Bankrupt = () => 
    {
        // Removing properties and cards:
        for (let i = 0; i < activePlayer.properties.length; i++)
            UpdatePlayerDeleteProperty(dispatch, activePlayer.name, activePlayer.properties[i].fieldID);
        for (let i = 0; i < activePlayer.eventCards.length; i++)
            UpdatePlayerDeleteEventCard(dispatch, activePlayer.name, activePlayer.eventCards[i].cardID);

        // set isBankrupt true, inform about bankrupting, close modal, next turn,
        // prevent moving the pawn (if player bankrupted not in his turn, he will not throw dices,
        // so they will be thrown automatically in endTurnEvent)
        UpdatePlayerUpdateBankrupt(dispatch, activePlayer.name);
        endTurnEvent(props);
    }

    return (
      <>
        <Modal 
            show={isModalOpen()}
            onHide={props.onHide}
            animation={false}
            backdrop='static'
            id="manageModal">
          <Modal.Header closeButton={isCashNegative} onMouseDown={(e) => e.preventDefault()}>
            <Modal.Title>Zarządzaj (masz: {activePlayer.cash} ECTS)</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <table className="table text-center">
                <thead>
                <tr>
                    <th id="manageColumn1" scope="col">Nieruchomość</th>
                    <th id="manageColumn2" scope="col">Poziom</th>
                    <th id="manageColumn3" scope="col">Rozbuduj</th>
                    <th id="manageColumn4" scope="col">Zastaw</th>
                    <th id="manageColumn5" scope="col">Sprzedaj</th>
                </tr>
                </thead>
                <tbody>{genPorpTable()}</tbody>
            </table>
          </Modal.Body>
          {isCashNegative ? null : bankruptMode()}
        </Modal>
      </>
    );
  }
export default Manage;