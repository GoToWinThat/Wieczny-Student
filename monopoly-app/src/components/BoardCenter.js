import { RollDice } from './ActionPanel/RollDice'
import { PlayerBar } from './ActionPanel/PlayerBar'
import ActionOptions from './ActionPanel/ActionOptions'
import '../styles/Board.css'
import { LogBox } from './ActionPanel/LogBox'

export const BoardCenter = (data) => {
    return (
        <div className="boardCenter">
            <PlayerBar data={data.data}/>
            <ActionOptions data={data.data}/>
            <LogBox data={data.data}/>
            <RollDice data={data.data}/>
        </div>
    )
}
