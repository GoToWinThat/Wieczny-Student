import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import TradeSection from "./TradeSection";
import {Modal, Button} from 'react-bootstrap';
import { UpdatePlayerDeleteProperty, UpdatePlayerCash,UpdatePlayerDeleteEventCard,
  UpdatePlayerNewEventCard,UpdatePlayerNewProperty} from '../../services/monopoly';

function Trade(props) {
  const dispatch = props.data.dispatch;
  const data = {fields: props.data.fields, cards: props.data.gainCards};
  const activePlayer = props.data.players[props.data.activePlayerIndex];
  const otherPlayers = [];

  props.data.players.map(player => {
    if(player.name !== activePlayer.name)
      otherPlayers.push(player);
  })

  const [tradePlayerIdx, setTradePlayerIdx] = useState(0);
  const [transactionState, setTransactionState] = useState([]);

  //Add transaction to transactionState based on types
  const addTransaction = (trans) => 
  {
    let add = true;
    transactionState.forEach(element => {
      if(element.id === trans.id)
      {
        setTransactionState(transactionState.filter(t => t !== element));
        element.type !== "cash" ? add = false : add = true;
      }
    });
    if(add) setTransactionState(oldArray => [...oldArray, trans])
  }

  const nextPlayer = () => 
  {
    setTradePlayerIdx((tradePlayerIdx+1)%otherPlayers.length)
  }

  const previousPlayer = () => 
  {
    let len = otherPlayers.length
    setTradePlayerIdx( 
      tradePlayerIdx === 0
      ? len-1
      : (tradePlayerIdx-1))
  }

  //Execute all transaction and update store
  const exchange = () => 
  {
    transactionState.forEach(t =>{
      
      let secondPlayer = undefined;
      t.playerName === activePlayer.name 
      ? secondPlayer = otherPlayers[tradePlayerIdx] : secondPlayer = activePlayer

      if(t.type === "cash") 
      {
        UpdatePlayerCash(dispatch,t.playerName,-t.item);
        UpdatePlayerCash(dispatch,secondPlayer.name,t.item);
      }
      if(t.type === "property") 
      {
        UpdatePlayerDeleteProperty(dispatch,t.playerName,t.item);
        UpdatePlayerNewProperty(dispatch,secondPlayer.name,t.item);
      }
      if(t.type === "card")
      {
        UpdatePlayerDeleteEventCard(dispatch,t.playerName,t.item);
        UpdatePlayerNewEventCard(dispatch,secondPlayer.name,t.item)
      }

    })
    setTransactionState([]);
    props.onHide();
  }

  return (
    <Modal
      show={props.show}
      size="lg"
      onHide={props.onHide}
      animation={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Handluj</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="d-flex justify-content-center ">
          <tbody>
            <tr className="align-top">
              <th>
                <TradeSection 
                  data={data} 
                  activePlayer={activePlayer} 
                  changable={false}
                  addTransaction={addTransaction}/>
              </th>
              <th style={{fontSize: 30}}>&#xa0; &#x21c4; &#xa0; </th>
              <th>
                <TradeSection 
                  data={data} 
                  activePlayer={otherPlayers[tradePlayerIdx]} 
                  changable={true} 
                  previousPlayer={previousPlayer} 
                  nextPlayer={nextPlayer}
                  addTransaction={addTransaction}/>
              </th>
            </tr>
          </tbody>
        </table>
        <Button onClick={exchange} className="col-2 offset-5 justify-content-center mt-2" variant="primary">Potwierdź</Button>
      </Modal.Body>
    </Modal>
  );
  }
export default Trade;