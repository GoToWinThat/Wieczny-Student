import { RollDice } from './ActionPanel/RollDice'
import { PlayerBar } from './ActionPanel/PlayerBar'
import ActionOptions from './ActionPanel/ActionOptions'
import '../styles/Board.css'
import LogBox from './ActionPanel/LogBox'

export const BoardCenter = (data) => {
    return (
        <div className="board-center">
            <PlayerBar data={data.data}/>
            <ActionOptions data={data.data}/>
            <LogBox/>
            <RollDice/>
        </div>
    )
}
