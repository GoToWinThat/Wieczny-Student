import "../../Css/ActionPanel.css";

function PlayerBox(props)
{
    let color,background
    let border = `2px solid ${props.player.color}`

    if(props.isActive)
    {
        color = 'white'
        background = props.player.color
    }
    else
    {
        color = props.player.color
        background = 'transparent'
    }
    return(
        <div className="playerBox" style={{ border: border, background: background}}>
            <span style= {{ color: color}} > {props.player.name} </span>
        </div>
    )

}
export default PlayerBox;