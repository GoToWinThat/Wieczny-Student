import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import {Button,Modal} from 'react-bootstrap';


function Manage() {
    const [show, setShow] = useState(true);
    const [properties, setProperties] = useState([
        {
            fieldID: 12,
            type: "property",
            name: "Laboratorium nr 409 (MS)",
            color: "lightgreen",
            price: 100,
            rents: [10, 20, 30, 40, 50, 60],
            oneHousePrice: 5,
            numOfHouses: 2
        },
        {
            fieldID: 24,
            type: "property",
            name: "Sala nr 310 (LB)",
            color: "purple",
            price: 100,
            rents: [10, 20, 30, 40, 50, 60],
            oneHousePrice: 10,
            numOfHouses: 1
        },
        {
            fieldID: 23,
            type: "property",
            name: "Bibioteka Wydziałowa",
            color: "orange",
            price: 100,
            rents: [10, 20, 30, 40, 50, 60],
            oneHousePrice: 12,
            numOfHouses: 0
        }

    ]);

    const handleClose = () => setShow(false);

    //Method whitch increment numer of houses and check if can do it
    const buyHouse = (num) =>
    {
        let array = [...properties];
        if(array[num].numOfHouses < 5)
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
        var array = [];
        if(properties[propNum].numOfHouses > 4)
        {
            array.push( <img className="houses" src={`/Assets/Houses/redHouse.svg`}/>);
        } 
        else 
        {
            for (var j = 0; j < properties[propNum].numOfHouses; j++) 
            {
                array.push( <img className="houses" src={`/Assets/Houses/greenHouse.svg`}/>);
            }
        }
        
        return array;
    }

    const genPorpTable = () =>{

        var array = [];
        for (var i = 0; i < properties.length; i++) 
        {   
            let ii = i;
            array.push(
                <div className="mb-3">
                    <span style= {{ color: properties[i].color}} >{properties[i].name}</span>
                    {createHouses(i)}
                    <div style= {{ float: 'right'}}>
                        <Button onClick={() => buyHouse(ii)} size="sm" variant="success" >+</Button>
                        <span className="mr-2 ml-2" > {properties[i].oneHousePrice} </span>
                        <Button onClick={() => sellHouse(ii)}  size="sm" variant="danger" className="mr-2" > - </Button> 
                        <Button onClick={() => sellProperty(ii)}  size="sm" variant="danger"> Sprzedaj </Button>
                    </div>

                </div>
                );
        }
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
        >
          <Modal.Header closeButton>
            <Modal.Title >Zarządzaj</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {genPorpTable()}
          </Modal.Body>
        </Modal>
      </>
    );
  }
export default Manage;