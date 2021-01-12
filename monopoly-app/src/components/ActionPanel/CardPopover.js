import React, { useState } from "react"
import {Toast} from 'react-bootstrap'
import {CARD} from '../../gameplay/fieldActions'
import '../../styles/CardPopover.css'


export const CardPopover = () =>
{

    const [show, setShow] = useState(CARD.show)
    const toggleShow = () => {setShow(!show); CARD.show = false};


    return(
        <div className="popover-card-alert">

            <Toast
            className="fade popover-toast-card-alert "
            show={CARD.show}
            onClose={toggleShow}
            transition={false}
            >
                <Toast.Header>
                    <strong className="mr-auto">Dostałeś kartę !!</strong>
                </Toast.Header>
                    <Toast.Body>
                        <div className="card card-popover">
                            <div className="card-body">
                                <div className="card-title">{CARD.card.cardName}</div>
                                <div className="card-text">{CARD.card.description}</div>
                            </div>
                        </div>
                </Toast.Body>
            </Toast>
        </div>

    )
}
