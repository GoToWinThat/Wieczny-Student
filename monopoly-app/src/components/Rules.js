import { render } from "@testing-library/react";
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import '../styles/Rules.css'

export const Rules = () => {
    const [show, setShow] = useState(false);

  return (
    <div>
        <Button id="rulesButton" onClick={() => setShow(true)}>Instrukcja</Button>
        
      <Modal
        show={show}
        onHide={() => setShow(false)}
        animation={false}
        id="buyModal"
      >
        <Modal.Header closeButton onMouseDown={(e) => e.preventDefault()}>
          <Modal.Title>Instrukcja</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col text-center">
            <p>Instrukcja tutaj</p>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
