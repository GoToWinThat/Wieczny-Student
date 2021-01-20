import React, { Fragment } from 'react'
import { Board } from '../components/Board'
import { EventCardPopover } from '../components/EventCardPopover'
import GameClock from '../components/ActionPanel/GameClock'
import {Rules} from '../components/Rules'

export const Game = () => {
    return(
        <Fragment>
            <EventCardPopover/>
            <Board/>
            <GameClock/>
            <Rules/>
        </Fragment>
    )
}