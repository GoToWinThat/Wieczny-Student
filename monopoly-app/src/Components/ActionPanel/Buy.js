import "../../styles/ActionPanel.css";
import React, { useState } from 'react';
import {Button, Modal} from 'react-bootstrap';

function Buy(props) {
    const [show, setShow] = useState(true);
    const [view, setView] = useState('choice');

    const handleClose = () => setShow(false);

    //Display corrent panel in render method based on state
    const navigator = () =>
    {
        let opt = view
        if(opt==='choice')return choiceView()
        if(opt==='cancel')return cancelView()
        if(opt==='bought')return bought()
    }

    //Element with question to user to but property
    const choiceView = () =>
    {
        return(
            <div className="col text-center">
                <span>Czy chcesz kupić  </span>
                <span style= {{ color: props.field.color,fontWeight: 'bold'}} >{props.field.name}</span>
                <span> za </span>
                <span style= {{ color: 'red',fontWeight: 'bold'}} >{props.field.price} ECTS</span>
                <span>?</span>
                <p></p>
                <Button className="ml-5" onClick={() => setView('bought')} >Potwierdź</Button>
            </div>
        )
    }

    //Empty cancel view
    const cancelView = () => { return <div></div>}
    //Confirmation massage
    const bought = () =>
    {
        return(
            <div className="col text-center mb-3 mt-3">
                <span>Właśnie kupiłeś  </span>
                <span style= {{ color: props.field.color,fontWeight: 'bold'}} >{props.field.name}</span>
            </div>
        )
    }


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
            <Modal.Title >Kup Nieruchomość</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{navigator()}</div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
export default Buy;