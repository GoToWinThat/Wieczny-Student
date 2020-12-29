import "../../styles/ActionPanel.css";
import {Button,Popover,OverlayTrigger} from 'react-bootstrap';

function PlayerBox(props)
{
    //Function switch color and background of a PlayerBox based on active state 
    //Each player have a unique color and name
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
        <OverlayTrigger
            trigger='hover'
            placement='bottom'
            overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Content>
                        <strong>Karty</strong> Check this info.
                        <hr/>
                        <strong>Nieruchomości</strong> Check this info.
                    </Popover.Content>
                </Popover>
            }
            >
            <Button 
                className="playerBox" 
                variant="secondary" 
                style={{ border: border, background: background}}
                >
                    <span style= {{ color: color}} > {props.player.name}:  {props.player.cash} ECTS</span>
            </Button>
        </OverlayTrigger>
        
    )

}
export default PlayerBox;
