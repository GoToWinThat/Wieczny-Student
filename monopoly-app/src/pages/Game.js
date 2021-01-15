import React, { Fragment } from 'react'
import { Board } from '../components/Board'
import { CardPopover } from '../components/ActionPanel/CardPopover'
import Clock from '../components/ActionPanel/Clock'


export const Game = () => {
    return(
        <Fragment>
            <CardPopover/>
            <Board/>
            <Clock typeOfClock="gameClock"/>
        </Fragment>
    )
}