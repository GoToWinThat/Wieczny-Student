import RollDice from './ActionPanel/RollDice'
import PlayerBar from './ActionPanel/PlayerBar'
import ActionOptions from './ActionPanel/ActionOptions'
import '../styles/Board.css'
import LogBox from './ActionPanel/LogBox'

export const BoardCenter = () => {

    return (
        <div className="board-center">
            <PlayerBar/>
            <ActionOptions/>
            <LogBox/>
            <RollDice/>
        </div>
    )
}
