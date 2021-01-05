import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UpdatePlayerExpandProperty, UpdatePlayerDeleteProperty, 
    UpdatePlayerMortgageProperty, UpdatePlayerCash, AddNewLog } from '../../services/monopoly';


function Manage(props) {
    //Initialized a players property list
    const activePlayerIndex = props.data.activePlayerIndex;
    const activePlayer = props.data.players[activePlayerIndex];
    const fields = props.data.fields;
    const dispatch = props.data.dispatch;
    const [show, setShow] = useState(true);

    const playersProperties = () => 
    {
        var fieldArray = [];
        activePlayer.properties.map(
            field => fieldArray.push(props.data.fields[field.fieldID])
        )
        return fieldArray;
    }
    const properties = playersProperties()
    
    const handleClose = () => setShow(false);

    const showEstateLevel = (estateLevel) => (estateLevel < 4) ? `${estateLevel} PC` : `SERWER`;

    // Incrementing amount of computers if it is possible:
    const buyHouse = (fieldId,idx) =>
    {
        if(activePlayer.properties[idx].estateLevel < 4)
        {
            AddNewLog(dispatch, `${activePlayer.name} rozbudowuje ${fields[activePlayer.properties[idx].fieldID].name}.`
            + ` - aktualny poziom: ${showEstateLevel(activePlayer.properties[idx].estateLevel + 1)}`);
            UpdatePlayerExpandProperty(dispatch, activePlayer.name, fieldId, 1);
            UpdatePlayerCash(dispatch,activePlayer.name, -fields[fieldId].estatePrice);
        }
    }

    // Decrementing amount of computers if it is possible:
    const sellHouse = (fieldId,idx) =>
    {
        if(activePlayer.properties[idx].estateLevel > 0)
        {
            AddNewLog(dispatch, `${activePlayer.name} demontuje ${fields[activePlayer.properties[idx].fieldID].name}.`
            + ` - aktualny poziom: ${showEstateLevel(activePlayer.properties[idx].estateLevel - 1)}`);
            UpdatePlayerExpandProperty(dispatch, activePlayer.name, fieldId, -1);
            UpdatePlayerCash(dispatch,activePlayer.name, fields[fieldId].estatePrice);
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
            AddNewLog(dispatch, `${activePlayer.name} odkupuje ${currentField.name} od banku za ${currentField.mortgage} ECTS.`);
            multiplier = -1;
        }
        else 
        {
            AddNewLog(dispatch, `${activePlayer.name} oddaje ${currentField.name} pod zastaw za ${currentField.mortgage} ECTS.`);
            multiplier = 1;
        }
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
        let hKey=`${activePlayer.properties[propNum].name} ${propNum}`
        if (activePlayer.properties[propNum].estateLevel > 3)
            array.push( <img key={hKey} className="houses" src={`/Assets/Houses/server.svg`} alt="server"/>); 
        else 
        {
            for (var j = 0; j < activePlayer.properties[propNum].estateLevel; j++) 
                array.push( <img key={hKey} className="houses" src={`/Assets/Houses/computer.svg`} alt="computer"/>);
        }
        return array;
    }

    //Generate table for panel
    const genPorpTable = () =>{

        var array = [];
        let idx = 0
        properties.map(field => {
            let idx2 = idx
            array.push(
            <tr key={idx2}>
                <th scope="row" style= {{ color: fieldNameColor(idx2,field.color)}}>{field.name}</th>
                <td>{createHouses(idx)}</td>
                {
                    field.type === "property" ? 
                    <td>
                        <Button size="sm" variant="success" onClick={() => buyHouse(field.fieldID,idx2)}>+</Button>
                        <span className="mr-2 ml-2" > {field.estatePrice} ECTS</span>
                        <Button size="sm" variant="danger" onClick={() => sellHouse(field.fieldID,idx2)}> - </Button>
                    </td>
                    : 
                    <td></td>
                }
                <td><Button size="sm" variant={mortgageButtonColor(idx2)} onClick={() => mortgageProperty(field.fieldID,idx2)}> {field.mortgage} ECTS</Button></td>
                <td><Button size="sm" variant="danger" onClick={() => sellProperty(field.fieldID)}> {field.price} ECTS</Button></td>
            </tr>)
            idx++;
            return null;
        });
        return array;
    }

    return (
      <>
        <Modal 
            show={show} 
            size="lg" 
            onHide={handleClose} 
            backdrop="static" 
            keyboard={false} 
            centered>
          <Modal.Header closeButton>
            <Modal.Title >Zarządzaj</Modal.Title>
          </Modal.Header>
          <Modal.Body>
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