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
      <Modal.Body >
        <div className="col text-center ">
          <div className="d-flex justify-content-center mb-4">
            <span>Czy chcesz kupić  </span>
            <div className="propertyBox mt-1" style={{background: currentField.color }}/>
            <span>{currentField.name} za </span>
            <span style= {{ color: 'red'}} > &nbsp;{currentField.price} ECTS</span>
            <span>?</span>
          </div>
          
          <Button className="ml-5" onClick={buyProperty} >Potwierdź</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default Buy;