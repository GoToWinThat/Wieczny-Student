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

function TradeOfert(props) {
    const trade = props.data.trade; 
  const dispatch = props.data.dispatch;
  const data = { fields: props.data.fields, cards: props.data.gainCards };
   const activePlayer = props.data.players.filter(player => player.id===trade.fromID+1)[0]
    const tradePlayers = props.data.players.filter(player => player.id===trade.directID+1)[0]
    const myIndex = props.myIndex;
  const [show, setShow] = useState(false);


  useEffect(() => {
    if(trade.status) setShow(true);

  }, [trade])


  const exchange = () => {

    if (trade.transaction.length > 0)
      //AddNewLog(dispatch, `Doszło do wymiany między ${activePlayer.name} i ${otherPlayers[tradePlayerIdx].name}:`);
      trade.transaction.forEach((t) => {
          let secondPlayer = undefined;
          let firstPlayer = undefined;
          if( t.playerId === activePlayer.id)
          {
            firstPlayer = activePlayer;
            secondPlayer = tradePlayers;
          }else{

            firstPlayer = tradePlayers;
            secondPlayer = activePlayer;
          }
          
        if (t.type === "cash") {
          UpdatePlayerCash(dispatch, firstPlayer.name, -t.value);
          UpdatePlayerCash(dispatch, secondPlayer.name, t.value);
          //AddNewLog(dispatch, `- ${secondPlayer.name} otrzymał ${t.item} ECTS`);
        } else if (t.type === "property") {
          UpdatePlayerDeleteProperty(dispatch, firstPlayer.name, t.value);
          UpdatePlayerNewProperty(dispatch, secondPlayer.name, t.value);
          //AddNewLog(dispatch, `- ${secondPlayer.name} posiada teraz pole ${data.fields[t.item].name}`);
        } //if(t.type === "card")
        else {
          UpdatePlayerDeleteEventCard(dispatch, firstPlayer.name, t.value);
          UpdatePlayerAddEventCard(dispatch, secondPlayer.name, t.value);
          //AddNewLog(dispatch, `- ${secondPlayer.name} posiada teraz kartę ${data.cards[t.item].cardName}`);
        }
      });
      let json = {
        status: false,
        fromID: -1,
        directID: -1,
        transaction: "",
      };
      
      AddTrade(dispatch,json);
      setShow(false);
      
  };

  const closeWindow = () => {
    let json = {
        status: false,
        fromID: -1,
        directID: -1,
        transaction: "",
      };
      AddTrade(dispatch,json);
    setShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={closeWindow}
      animation={false}
      backdrop="static"
      centered
      id="tradeModal"
    >
      <Modal.Header
        closeButton
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
                  //addTransaction={addTransaction}
                  isBlocked={true}
                  //checked={trade.transaction}
                />
              </th>
              <th className="tradeArrowColumn">&#x21c4;</th>
              <th className="tradePlayerColumn">
                <TradeSection
                  data={data}
                  activePlayer={tradePlayers}
                  //addTransaction={addTransaction}
                  changable={false}
                  isBlocked={true}
                  //checked={trade.transaction}
                />
              </th>
            </tr>
          </tbody>
        </table>
        <Button
          onClick={exchange}
          className="confirmButton"
          variant="primary"
          onMouseDown={(e) => e.preventDefault()}
        >
         Potwierdź
        </Button>
      </Modal.Body>
    </Modal>
  );
}
export default TradeOfert;
