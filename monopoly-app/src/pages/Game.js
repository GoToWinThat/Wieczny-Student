import React, { Fragment } from 'react'
import { Board } from '../components/Board'
import { EventCardPopover } from '../components/EventCardPopover'
import Clock from '../components/ActionPanel/Clock'
import {Rules} from '../components/Rules'

export const Game = () => {
    return(
        <Fragment>
            <EventCardPopover/>
            <Board/>
            <Clock typeOfClock="gameClock"/>
            <Rules/>
        </Fragment>
    )
}