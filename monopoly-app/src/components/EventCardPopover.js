import React from "react"
import { Toast } from 'react-bootstrap'
import '../styles/EventCardPopover.css'
import { useSelector, useDispatch } from 'react-redux'
import { UpdateCurrentEventCard } from '../services/monopolyService'


export const EventCardPopover = () =>
{
    const currentCard = useSelector(state => state.monopolyReducer.currentCard);
    const dispatch = useDispatch();

    return(
        <div className="popover-card-alert">
            <Toast
            className="fade popover-toast-card-alert "
            show={currentCard.cardName !== ""}
            onClose={() => UpdateCurrentEventCard(dispatch, { cardName: "", description: ""})}
            transition={false}
            onMouseDown={(e) => e.preventDefault()}
            delay={8000}
            autohide
            >
                <Toast.Header>
                    <strong>Otrzymujesz kartę:</strong>
                </Toast.Header>
                    <Toast.Body>
                        <div className="card card-popover">
                            <div className="card-body">
                                <div className="card-title">{currentCard.cardName}</div>
                                <div className="card-text">{currentCard.description}</div>
                                <div></div>
                            </div>
                        </div>
                </Toast.Body>
            </Toast>
        </div>
    )
}