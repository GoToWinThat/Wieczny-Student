import "../../styles/ActionPanel.css";
import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UpdatePlayerExpandProperty, UpdatePlayerDeleteProperty, 
    UpdatePlayerMortgageProperty, UpdatePlayerCash, AddNewLog } from '../../services/monopoly';


function Manage(props) {
    //Initialized a players property list
    const activePlayerIndex = props.data.activePlayerIndex;
    const activePlayer = props.data.players[activePlayerIndex];
    const fields = props.data.fields;
    const dispatch = props.data.dispatch;

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
        //let hKey=`${field.fieldID} ${field.estateLevel}`
        //debugger;
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
                <td className="d-flex">
                    <div className="propertyBox mt-1" style={{background: fieldNameColor(idx2,field.color) }}/>
                    <span style= {{ color: fieldNameColor(idx2,'black')}} >{field.name}</span> 
                </td>
                <td>{createHouses(idx2)}</td>
                {
                    field.type === "property" ? 
                    <td>
                        <Button size="sm" variant="success" onClick={() => buyHouse(field.fieldID,idx2)}
                            disabled={activePlayer.properties[idx2].estateLevel === 4 
                                || activePlayer.cash < field.estatePrice 
                                || activePlayer.properties[idx2].mortgaged === true
                                || !hasAllPropertiesFromThisColor(field)}> + </Button>
                        <span className="mr-2 ml-2" > {field.estatePrice} ECTS</span>
                        <Button size="sm" variant="danger" onClick={() => sellHouse(field.fieldID,idx2)} 
                            disabled={activePlayer.properties[idx2].estateLevel === 0
                                || activePlayer.properties[idx2].mortgaged === true
                                || !hasAllPropertiesFromThisColor(field)}> - </Button>
                    </td>
                    : 
                    <td></td>
                }
                <td><Button size="sm" variant={mortgageButtonColor(idx2)} onClick={() => mortgageProperty(field.fieldID,idx2)}
                    disabled={hasAnyPropertyFromThisColorOneOrMoreComputers(field) === true}> {field.mortgage} ECTS</Button></td>
                <td><Button size="sm" variant="danger" onClick={() => sellProperty(field.fieldID)}
                    disabled={hasAnyPropertyFromThisColorOneOrMoreComputers(field) === true
                        || activePlayer.properties[idx2].mortgaged === true}> {field.price} ECTS</Button></td>
            </tr>)
            idx++;
            return null;
        });
        return array;
    }

    return (
      <>
        <Modal 
            show={props.show}
            size="lg"
            onHide={props.onHide}
            animation={false}
            centered>
          <Modal.Header closeButton>
            <Modal.Title >Zarządzaj: {activePlayer.cash} ECTS</Modal.Title>
          </Modal.Header>
          <Modal.Body >
            <table className="table text-center">
                <thead>
                <tr>
                    <th scope="col">Nieruchomość</th>
                    <th scope="col">Poziom</th>
                    <th scope="col">Rozbuduj</th>
                    <th scope="col">Zastaw</th>
                    <th scope="col">Sprzedaj</th>
                </tr>
                </thead>
                <tbody>{genPorpTable()}</tbody>
            </table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
export default Manage;