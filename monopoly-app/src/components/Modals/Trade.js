import "../../styles/Modals.css";
import React, { useState } from 'react';
import TradeSection from "./TradeSection";
import {Modal, Button} from 'react-bootstrap';
import { UpdatePlayerDeleteProperty, UpdatePlayerCash, UpdatePlayerDeleteEventCard,
  UpdatePlayerAddEventCard, UpdatePlayerNewProperty } from '../../services/monopolyService';

function Trade(props) {
  const dispatch = props.data.dispatch;
  const data = {fields: props.data.fields, cards: props.data.gainCards};
  const activePlayer = props.data.players[props.data.activePlayerIndex];
  const otherPlayers = [];


  
  const trade = props.data.trade;   // ACTUAL TRANSACTION STATE



  props.data.players.map(player => {
    if(player.name !== activePlayer.name && player.isBankrupt !== true)
      otherPlayers.push(player);
    return null;
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
      return null;
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

  const closeWindow = () =>
  {
    setTransactionState([]);
    props.onHide();
  }

  //Execute all transaction and update store
  const exchange = () =>
  {
    if (transactionState.length > 0)
      //AddNewLog(dispatch, `Doszło do wymiany między ${activePlayer.name} i ${otherPlayers[tradePlayerIdx].name}:`);
    transactionState.forEach(t =>{

      let secondPlayer = undefined;
      t.playerName === activePlayer.name
      ? secondPlayer = otherPlayers[tradePlayerIdx] : secondPlayer = activePlayer

      if(t.type === "cash")
      {
        UpdatePlayerCash(dispatch,t.playerName,-t.item);
        UpdatePlayerCash(dispatch,secondPlayer.name,t.item);
        //AddNewLog(dispatch, `- ${secondPlayer.name} otrzymał ${t.item} ECTS`);
      }
      else if(t.type === "property")
      {
        UpdatePlayerDeleteProperty(dispatch,t.playerName,t.item);
        UpdatePlayerNewProperty(dispatch,secondPlayer.name,t.item);
        //AddNewLog(dispatch, `- ${secondPlayer.name} posiada teraz pole ${data.fields[t.item].name}`);
      }
      else //if(t.type === "card")
      {
        UpdatePlayerDeleteEventCard(dispatch,t.playerName,t.item);
        UpdatePlayerAddEventCard(dispatch,secondPlayer.name,t.item)
        //AddNewLog(dispatch, `- ${secondPlayer.name} posiada teraz kartę ${data.cards[t.item].cardName}`);
      }
    })
    closeWindow()
  }

  return (
    <Modal
      show={props.show}
      onHide={closeWindow}
      animation={false}
      centered
      id="tradeModal"
    >
      <Modal.Header closeButton onMouseDown={(e) => e.preventDefault()}>
        <Modal.Title>Handluj</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="d-flex">
          <tbody>
            <tr className="align-top">
              <th className="tradePlayerColumn">
                <TradeSection
                  data={data}
                  activePlayer={activePlayer}
                  changable={false}
                  addTransaction={addTransaction}/>
              </th>
              <th className="tradeArrowColumn">&#x21c4;</th>
              <th className="tradePlayerColumn">
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
        <Button onClick={exchange} className="confirmButton" variant="primary"
          onMouseDown={(e) => e.preventDefault()}>Potwierdź</Button>
      </Modal.Body>
    </Modal>
  );
  }
export default Trade;