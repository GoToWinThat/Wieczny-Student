import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Button, FormGroup, Form, FormControl, FormLabel } from 'react-bootstrap'

export const Config = () =>{
    const history = useHistory()
    const [nickname , setNickname] = useState("")
    const [color, setColor] = useState("")
    const [signature, setSignature] = useState("")

    const sendConfig = {
        nickname: nickname,
        color: color,
        signature: signature
    }



    const SendChange = () => {
        console.log(sendConfig)

        history.push({
            pathname: "/game",
        })
    }

    return(
        <div className="config-form h-100">
            <Form>
                <FormGroup>

                    <FormLabel>Enter your nickname</FormLabel>
                    <FormControl
                        type="text"
                        onChange={(e) => {setNickname(e.target.value)}}
                        />

                </FormGroup>

                <FormGroup>
                    <FormLabel>Choose your color pawns</FormLabel>
                    <FormControl
                        type="color"
                        onChange={(e) => {setColor(e.target.value)}}
                    />
                </FormGroup>

                <FormGroup>
                        <Form.Check
                            type={'radio'}
                            id={`default-1`}
                            label="&#9772;"
                            value="9772"
                            name="signature"
                            inline
                            onChange={(e) => setSignature(e.target.value)}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            label="&#9762;"
                            value="9762"
                            name="signature"
                            id={`default-2`}
                            onChange={(e) => setSignature(e.target.value)}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            label="&#9823;"
                            value="9823"
                            name="signature"
                            id={`default-3`}
                            onChange={(e) => setSignature(e.target.value)}
                        />
                        <Form.Check
                            inline
                            type={'radio'}
                            label="&#9784;"
                            value="9784"
                            name="signature"
                            id={`default-4`}
                            onChange={(e) => setSignature(e.target.value)}
                        />

                </FormGroup>

                <FormGroup>
                    <Button onClick={()=> {SendChange()}}>Enter the game !</Button>
                </FormGroup>
            </Form>
        </div>
    )
}

