import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';
import { UpdatePlayerNewProperty, UpdatePlayerCash, AddNewLog } from '../../services/monopoly';

function Buy(props) {
  const activePlayer = props.data.players[props.data.activePlayerIndex];
  const currentField = props.data.fields[activePlayer.position];
  const dispatch = props.data.dispatch;

  const buyProperty = () => 
  {
    UpdatePlayerNewProperty(dispatch, activePlayer.name, currentField.fieldID);
    UpdatePlayerCash(dispatch, activePlayer.name, -currentField.price);
    AddNewLog(dispatch, `${activePlayer.name} kupuje ${currentField.name} za ${currentField.price} ECTS.`);
    props.onHide();
  }

  return (
    <Modal
      show={props.show}
      size="lg"
      onHide={props.onHide}
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