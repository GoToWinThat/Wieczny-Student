import "../../styles/Modals.css";
import React, { useState,useEffect } from "react";
import TradeSection from "./TradeSection";
import { Modal, Button } from "react-bootstrap";
import {
  UpdatePlayerDeleteProperty,
  UpdatePlayerCash,
  UpdatePlayerDeleteEventCard,
  UpdatePlayerAddEventCard,
  UpdatePlayerNewProperty,
  AddTrade
} from "../../services/monopolyService";

function Trade(props) {
  const dispatch = props.data.dispatch;
  const data = { fields: props.data.fields, cards: props.data.gainCards };
  const activePlayer = props.data.players[props.data.activePlayerIndex];
  const otherPlayers = [];
  const trade = props.data.trade; // ACTUAL TRANSACTION STATE

  props.data.players.map((player) => {
    if (player.name !== activePlayer.name && player.isBankrupt !== true)
      otherPlayers.push(player);
    return null;
  });

  const [tradePlayerIdx, setTradePlayerIdx] = useState(0);
  const [transactionState, setTransactionState] = useState([]);
  const [isBlocked, setIsBlocked] = useState(false);

  //Add transaction to transactionState based on types
  const addTransaction = (trans) => {
    let add = true;
    transactionState.forEach((element) => {
      if (element.id === trans.id) {
        setTransactionState(transactionState.filter((t) => t !== element));
        element.type !== "cash" ? (add = false) : (add = true);
      }
      return null;
    });
    if (add) setTransactionState((oldArray) => [...oldArray, trans]);
  };

  const nextPlayer = () => {
    setTradePlayerIdx((tradePlayerIdx + 1) % otherPlayers.length);
  };

  const previousPlayer = () => {
    let len = otherPlayers.length;
    setTradePlayerIdx(tradePlayerIdx === 0 ? len - 1 : tradePlayerIdx - 1);
  };

  const closeWindow = () => {
    setTransactionState([]);
    props.onHide();
  };

  useEffect(() => {
    if(!trade.status) setIsBlocked(false);
    props.onHide();
  }, [trade])

  const sendOffert = () => {
    
    setIsBlocked(true);
    let json = {
      status: true,
      fromID: activePlayer.id - 1,
      directID: otherPlayers[tradePlayerIdx].id-1,
      transaction: "",
    };
    // transactionState.forEach(trans =>
    //   {
    //     let tab = json.transaction;
    //     let row = {playerId: trans.playerId, type: trans.type, value: trans.item};
    //     tab.push(row);
    //     json.transaction = tab;
    //     console.log(trans.item);
    // });
    debugger;
    AddTrade(dispatch,json);
  };


  return (
    <Modal
      show={props.show}
      onHide={closeWindow}
      animation={false}
      backdrop="static"
      centered
      id="tradeModal"
    >
      <Modal.Header
        closeButton={!isBlocked}
        onMouseDown={(e) => e.preventDefault()}
      >
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
                  addTransaction={addTransaction}
                  isBlocked={isBlocked}
                />
              </th>
              <th className="tradeArrowColumn">&#x21c4;</th>
              <th className="tradePlayerColumn">
                <TradeSection
                  data={data}
                  activePlayer={otherPlayers[tradePlayerIdx]}
                  changable={true}
                  previousPlayer={previousPlayer}
                  nextPlayer={nextPlayer}
                  addTransaction={addTransaction}
                  isBlocked={isBlocked}
                />
              </th>
            </tr>
          </tbody>
        </table>
        <Button
          onClick={sendOffert}
          className="confirmButton"
          variant={isBlocked ? "secondary" : "primary"}
          onMouseDown={(e) => e.preventDefault()}
          disabled={isBlocked}
        >
          {isBlocked ? "Czekam na odpowiedź..." : "Wyślij"}
        </Button>
      </Modal.Body>
    </Modal>
  );
}
export default Trade;
