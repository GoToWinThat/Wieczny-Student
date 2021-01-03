import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import TradeSection from "./TradeSection";
import {Modal, Button} from 'react-bootstrap';


function Trade(props) {
    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);
    const activePlayer = props.data.players[props.data.activePlayerIndex];
    const otherPlayers = [];
    const data = {fields: props.data.fields, cards: props.data.gainCards};
    
    props.data.players.map(player => {
      if(player.name != activePlayer.name)
        otherPlayers.push(player);
    })

    return (
      <>
        <Modal
          show={show}
          size="lg"
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title >Handluj</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <table className="d-flex justify-content-center align-top">
              <tbody>
                <tr>
                  <th><TradeSection data={data} activePlayer={activePlayer}/></th>
                  <th style={{fontSize: 30}}>&#xa0; &#x21c4; &#xa0; </th>
                  <th><TradeSection data={data} otherPlayers={otherPlayers}/></th>
                </tr>
              </tbody>
            </table>
            <Button className="col-2 offset-5 justify-content-center mt-2" variant="primary">Potwierdź</Button>
          </Modal.Body>
        </Modal>
      </>
    );
  }
export default Trade;