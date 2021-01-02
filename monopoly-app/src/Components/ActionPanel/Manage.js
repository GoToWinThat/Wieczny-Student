import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {Button, Modal} from 'react-bootstrap';
import { UpdatePlayerExpandProperty,UpdatePlayerDeleteProperty,UpdatePlayerMortgageProperty } from '../../services/monopoly';


function Manage(props) {
    //Initialized a players property list
    const logInPlayerIndx = 0;
    const logInPlayer = props.data.players[logInPlayerIndx];
    const [show, setShow] = useState(true);
    const dispatch = useDispatch();

    const playersProperties = () => 
    {
        var fieldArray = [];
        logInPlayer.properties.map(
            field => fieldArray.push(props.data.fields[field.fieldID]) 
        )
        return fieldArray;
    }
    const properties = playersProperties()
    
    //const [properties, setProperties] = useState(playersProperties());
    const handleClose = () => setShow(false);

    //Method which increment numer of houses and check if can do it
    const buyHouse = (fieldId,idx) =>
    {
        if(logInPlayer.properties[idx].estateLevel < 4)
            UpdatePlayerExpandProperty(dispatch,logInPlayer.name,fieldId,1);
    }

    const sellHouse = (fieldId,idx) =>
    {
        if(logInPlayer.properties[idx].estateLevel > 0)
            UpdatePlayerExpandProperty(dispatch,logInPlayer.name,fieldId,-1);
    }

    const sellProperty = (fieldId) =>
    {
        debugger;
        //UpdatePlayerDeleteProperty(dispatch,logInPlayer.name,fieldId)
    }

    const mortageProperty = (fieldId) =>
    {
        UpdatePlayerMortgageProperty(dispatch,logInPlayer.name,fieldId);
    }

    const mortageButtonColor = (idx) => 
    {
        if(logInPlayer.properties[idx].mortgaged) return "success";
        else return "danger";
    }
    //Method to create n number of houses icon
    const createHouses = (propNum) =>
    {
        var array = [];
        let hKey=`${logInPlayer.properties[propNum].name} ${propNum}`
        if(logInPlayer.properties[propNum].estateLevel > 3)
        {
            array.push( <img key={hKey} className="houses" src={`/Assets/Houses/redHouse.svg`} alt={"..."}/>);
        } 
        else 
        {
            for (var j = 0; j < logInPlayer.properties[propNum].estateLevel; j++) 
            {
                array.push( <img key={hKey} className="houses" src={`/Assets/Houses/greenHouse.svg`} alt={"..."}/>);
            }
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
                <th scope="row" style= {{ color: field.color}}>{field.name}</th>
                <td>{createHouses(idx)}</td>
                <td>
                    <Button size="sm" variant="success" onClick={() => buyHouse(field.fieldID,idx2)}>+</Button>
                    <span className="mr-2 ml-2" > {field.estatePrice} ECTS</span>
                    <Button size="sm" variant="danger" onClick={() => sellHouse(field.fieldID,idx2)}> - </Button>
                </td>
                <td><Button size="sm" variant={mortageButtonColor(idx2)} onClick={() => mortageProperty(field.fieldID)}> {field.mortgage} ECTS</Button></td>
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