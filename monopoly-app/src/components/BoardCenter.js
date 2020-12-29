import RollDice from './ActionPanel/RollDice'
import PlayerBar from './ActionPanel/PlayerBar'
import ActionOptions from './ActionPanel/ActionOptions'
import Auction from './ActionPanel/Auction'
import '../styles/Board.css'

export const BoardCenter = () => {

    return (
        <div className="board-center">
            <RollDice/>
            <PlayerBar/>
            <ActionOptions/>
            <Auction/>
        </div>
    )
}
