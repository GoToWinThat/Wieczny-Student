import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap'
import { GetPlayers, CreatePlayer } from '../services/monopolyService'
import { useSelector, useDispatch } from 'react-redux'
import '../styles/Config.css'

export const Config = () => {
    const history = useHistory()
    const [nickname , setNickname] = useState("")
    const [color, setColor] = useState("#000000")
    const [signature, setSignature] = useState("")
    const [confirmed, setConfirmed] = useState(false);

    const players = useSelector(state => state.monopolyReducer.players);
    const dispatch = useDispatch();
    try { useEffect(() => { GetPlayers(dispatch); }, [dispatch]); } 
    catch { console.log("Couldn't call function GetPlayers in Config.js!"); }

    const NewPlayer = () => {
        CreatePlayer(dispatch, nickname, signature, color);
        setConfirmed(true);
    }

    const GetReady = () => {
        // change isReady state, wait until other players get ready...
        // if all players are ready, API sends gameState="running" 
        // and the line below is called...


        history.push({ pathname: "/game" })
    }

    return(
        <div id="config-form">
            <div id="currentPlayers">
                <p id="currentPlayersTitle">OBECNI GRACZE</p>
                <div id="currentPlayersList">
                    {(players.length > 0) ? players.map((player, i) => 
                        <div key={i} style={{color: `${player.color}`, 
                             border: `solid ${player.isReady === true ? "green" : "white"}`}}>
                        <span>{String.fromCharCode(player.signature)}</span>
                        <span>{player.name}</span>
                        </div>
                    ) : <p id="noPlayersSubtitle">Brak graczy w sesji</p>}
                </div>
            </div>
            <Form>
                <FormGroup>
                    <FormLabel>Wybierz nick:</FormLabel>
                    <FormControl disabled={confirmed} type="text" maxLength="8" onChange={(e) => {setNickname(e.target.value)}}/>
                </FormGroup>

                <FormGroup>
                    <FormLabel>Wybierz kolor pionka:</FormLabel>
                    <FormControl disabled={confirmed} type="color" onChange={(e) => {setColor(e.target.value)}} />
                </FormGroup>

                <FormGroup>
                    <div>Wybierz kształt pionka:</div>
                        <Form.Check
                            type={'radio'}
                            id={`default-1`}
                            label="&#9772;"
                            value="9772"
                            name="signature"
                            inline
                            onChange={(e) => setSignature(e.target.value)}
                            disabled={confirmed}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            label="&#9762;"
                            value="9762"
                            name="signature"
                            id={`default-2`}
                            onChange={(e) => setSignature(e.target.value)}
                            disabled={confirmed}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            label="&#9823;"
                            value="9823"
                            name="signature"
                            id={`default-3`}
                            onChange={(e) => setSignature(e.target.value)}
                            disabled={confirmed}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            label="&#9784;"
                            value="9784"
                            name="signature"
                            id={`default-4`}
                            onChange={(e) => setSignature(e.target.value)}
                            disabled={confirmed}
                        />

                </FormGroup>
            </Form>

            <Button id="ConfigConfirmButton" hidden={confirmed} 
                onClick={()=> {NewPlayer()}} onMouseDown={(e) => e.preventDefault()}
                disabled={nickname === "" || signature === ""}>Zatwierdź</Button>
            <Button id="ConfigReadyButton" hidden={!confirmed} onClick={()=> {GetReady()}} 
                 onMouseDown={(e) => e.preventDefault()}>Gotowy do gry</Button>
        </div>
    )
}

