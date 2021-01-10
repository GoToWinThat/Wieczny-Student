import "../../styles/ActionPanel.css";
import React from 'react';
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
      onHide={props.onHide}
      backdrop="static"
      keyboard={false}
      id="buyModal"
    >
      <Modal.Header closeButton onMouseDown={(e) => e.preventDefault()}>
        <Modal.Title >Kup nieruchomość</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <div className="col text-center">
          <div id="buyQuestion">
            <span>Czy chcesz kupić</span>
            <span>
              <span className="propertyBox" style={{background: currentField.color}}/>
              {currentField.name}
            </span>
            <span>
              <span>&nbsp;za</span>
              <span style={{ color: 'red', fontWeight: 'bold'}}>&nbsp;{currentField.price} ECTS</span>
              <span>?</span>
            </span>
          </div> 
          <Button className="confirmButton" onClick={buyProperty}
            onMouseDown={(e) => e.preventDefault()}>Potwierdź</Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
export default Buy;