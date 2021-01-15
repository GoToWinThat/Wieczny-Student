
import React, {Fragment} from 'react'
import {Board} from '../components/Board'
import { CardPopover } from '../components/ActionPanel/CardPopover'

export const Game = () => {
    return(
        <Fragment>
            <CardPopover/>
            <Board/>
        </Fragment>
    )
}