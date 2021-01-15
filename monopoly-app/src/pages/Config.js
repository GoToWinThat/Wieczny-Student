import React from 'react'
import { useHistory } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export const Config = () =>{
    const history = useHistory()
    return(
        <div className="config-form">
            <h1>Config</h1>
            <Button onClick={()=> {history.push({
                pathname: "/game",
            })}}></Button>
        </div>
    )
}