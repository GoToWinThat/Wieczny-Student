import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { UpdatePlayerNewProperty, UpdatePlayerCash } from '../../services/monopoly';

function Buy(props) {
  const [show, setShow] = useState(true);
  const activePlayer = props.data.players[props.data.activePlayerIndex];
  const currentField = props.data.fields[activePlayer.position];
  const handleClose = () => setShow(false);
  
  const buyProperty = () => 
  {
    UpdatePlayerNewProperty(props.data.dispatch,activePlayer.name,currentField.fieldID);
    UpdatePlayerCash(props.data.dispatch,activePlayer.name,-currentField.price)
    handleClose();
  }

  return (
    <Modal
      show={show}
      size="lg"
      onHide={handleClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title >Kup Nieruchomość</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col text-center">
          <span>Czy chcesz kupić  </span>
          <span style= {{ color: currentField.color,fontWeight: 'bold'}} >{currentField.name}</span>
          <span> za </span>
          <span style= {{ color: 'red',fontWeight: 'bold'}} >{currentField.price} ECTS</span>
          <span>?</span>
          <p></p>
          <Button className="ml-5" onClick={buyProperty} >Potwierdź</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default Buy;