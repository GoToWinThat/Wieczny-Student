import { RollDice } from './ActionPanel/RollDice'
import { PlayerBar } from './ActionPanel/PlayerBar'
import ActionOptions from './ActionPanel/ActionOptions'
import '../styles/Board.css'

export const BoardCenter = (players) => {
    return (
        <div className="board-center">
            <PlayerBar players={players.players}/>
            <ActionOptions/>
            <RollDice/>
        </div>
    )
}
