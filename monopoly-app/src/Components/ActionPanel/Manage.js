import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';


function Manage(props) {
    //Initialized a players property list
    const logInPlayerIndx = 0;
    const logInPlayer = props.data.players[logInPlayerIndx];
    const playersProperties = () => 
    {
        var fieldArray = [];
        logInPlayer.properties.map(
            field => fieldArray.push(props.data.fields[field.fieldID]) 
        )
        return fieldArray;
    }

    const [show, setShow] = useState(true);
    const [properties, setProperties] = useState(playersProperties());
    const handleClose = () => setShow(false);

    //Method which increment numer of houses and check if can do it
    const buyHouse = (num) =>
    {
        let array = [...properties];
        if(array[num].numOfHouses < 4)
        {
            array[num].numOfHouses += 1;
            setProperties(array);
        }
    }

    const sellHouse = (num) =>
    {
        let array = [...properties];
        if(array[num].numOfHouses > 0)
        {
            array[num].numOfHouses -= 1;
            setProperties(array);
        }
    }

    const sellProperty = (num) =>
    {
        let array = [...properties];
        array.splice(num, 1);
        setProperties(array);
    }

    //Method to create n number of houses icon
    const createHouses = (propNum) =>
    {
        debugger;
        var array = [];
        if(logInPlayer.properties[propNum].estateLevel > 3)
        {
            array.push( <img className="houses" src={`/Assets/Houses/redHouse.svg`} alt={"..."}/>);
        } 
        else 
        {
            for (var j = 0; j < logInPlayer.properties[propNum].estateLevel; j++) 
            {
                array.push( <img className="houses" src={`/Assets/Houses/greenHouse.svg`} alt={"..."}/>);
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
            <tr>
                <th scope="row" style= {{ color: field.color}}>{field.name}</th>
                <td>{createHouses(idx)}</td>
                <td>
                    <Button size="sm" variant="success" onClick={() => buyHouse(idx2)}>+</Button>
                    <span className="mr-2 ml-2" > {field.estatePrice} ECTS</span>
                    <Button size="sm" variant="danger" onClick={() => sellHouse(idx2)}> - </Button>
                </td>
                <td><Button size="sm" variant="danger"> {field.mortgage} ECTS</Button></td>
                <td><Button size="sm" variant="danger" onClick={() => sellProperty(idx2)}> {field.price} ECTS</Button></td>
            </tr>)
            idx++;
            return null;
        });
        return array;
    }

    return (
      <>
        <Modal show={show} size="lg" onHide={handleClose} backdrop="static" keyboard={false} >
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
                <tbody>
                {genPorpTable()}
                </tbody>
            </table>
          </Modal.Body>
        </Modal>
      </>
    );
  }
export default Manage;