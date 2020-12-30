import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import TradeSection from "./TradeSection";
import {Modal, Button} from 'react-bootstrap';


function Trade() {
    const [show, setShow] = useState(true);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [state, setState] = useState({
        currentPlayer: {
            activePlayer: false,
            playerInfo: {
                name: 'Tomek',
                money: 150,
                color: 'blue',
                cards: ["Opuść Konsultacje!","Opuść Dziekanat!"],
                properties: [
                {
                    fieldID: 12,
                    type: "property",
                    name: "Laboratorium nr 409 (MS)",
                    color: "lightgreen",
                    price: 100,
                    rents: [10, 20, 30, 40, 50, 60],
                    oneHousePrice: 10
                },
                {
                    fieldID: 24,
                    type: "property",
                    name: "Sala nr 310 (LB)",
                    color: "purple",
                    price: 100,
                    rents: [10, 20, 30, 40, 50, 60],
                    oneHousePrice: 10
                },
                
            ]
            }
        },
        otherPlayer: 
        {
            activePlayer: true,
            playerInfo: {
                name: 'Maria',
                money: 120,
                color: 'orange',
                cards: ["Opuść Konsultacje!"],
                properties: [
                {
                    fieldID: 19,
                    type: "property",
                    name: "Sala nr 507 (MS)",
                    color: "brown",
                    price: 100,
                    rents: [10, 20, 30, 40, 50, 60],
                    oneHousePrice: 10
                },
                {
                    fieldID: 6,
                    type: "property",
                    name: "Laboratorium nr 401 (MS)",
                    color: "lightblue",
                    price: 100,
                    rents: [10, 20, 30, 40, 50, 60],
                    oneHousePrice: 10
                },
            ]
            }
        }
    
    });
  
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
            <Modal.Title >Handluj</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <tr/>
            <table className="d-flex justify-content-center">
                <th><TradeSection playerData={state.currentPlayer} dropdown={false}/></th>
                <th style={{fontSize: 30}}>&#xa0; &#x21c4; &#xa0; </th>
                <th><TradeSection playerData={state.otherPlayer} dropdown={true}/></th>
            </table>
            <Button className="col-2 offset-5 justify-content-center mt-2" variant="primary">Potwierdź</Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
export default Trade;