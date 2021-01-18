import "../../styles/ActionPanel.css";
import React from "react";
import { Button, Modal } from "react-bootstrap";
import { generateTableOfFields } from "./ManageFunctions/ManageTable";
import "../../styles/Modals.css";
import {surrender} from './ManageFunctions/ManageBankrupt'


function Manage(props) {
  //Initialized a players property list
  const activePlayerIndex = props.data.activePlayerIndex;
  const activePlayer = props.data.players[activePlayerIndex];
  const fields = props.data.fields;
  const dispatch = props.data.dispatch;
  var isCashNegative = activePlayer.cash >= 0 ? true : false;

  const playersProperties = () => {
    var fieldArray = [];
    activePlayer.properties.map((field) =>
      fieldArray.push(props.data.fields[field.fieldID])
    );
    return fieldArray;
  };
  const properties = playersProperties();

  const isModalOpen = () =>
  {
      if (isCashNegative) return props.show
      else return true;
  }

  return (
    <Modal
      show={isModalOpen()}
      onHide={props.onHide}
      animation={false}
      backdrop="static"
      id="manageModal"
    >
      <Modal.Header
        closeButton={isCashNegative}
        onMouseDown={(e) => e.preventDefault()}
      >
        <Modal.Title>Zarządzaj (masz: {activePlayer.cash} ECTS)</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table text-center">
          <thead>
            <tr>
              <th id="manageColumn1" scope="col">Nieruchomość</th>
              <th id="manageColumn2" scope="col">Poziom</th>
              <th id="manageColumn3" scope="col">Rozbuduj</th>
              <th id="manageColumn4" scope="col">Zastaw</th>
              <th id="manageColumn5" scope="col">Sprzedaj</th>
            </tr>
          </thead>
          <tbody>
            {generateTableOfFields(dispatch, activePlayer, fields, properties)}
          </tbody>
        </table>
      </Modal.Body>
      <Button
        id="bankruptButton"
        variant="secondary"
        onClick={() => surrender(dispatch,activePlayer,props)}
        onMouseDown={(e) => e.preventDefault()}
      >
        ZBANKRUTUJ
      </Button>
    </Modal>
  );
}
export default Manage;
