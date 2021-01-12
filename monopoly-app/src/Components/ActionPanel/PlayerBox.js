import "../../styles/ActionPanel.css";
import {Button,Popover,OverlayTrigger} from 'react-bootstrap';

function PlayerBox(props)
{
    //Function switch color and background of a PlayerBox based on active state
    //Each player have a unique color and name
    let color,background,border

    const listOfFields = () =>{

        var fieldArray = [];
        if(props.player.properties.length === 0) return null;

        fieldArray.push(<h6 key={1000}>Nieruchomości</h6>)
        props.player.properties.map(field =>
            fieldArray.push(
                <div key={field.fieldID} className="propertyRow">
                    <div className="propertyBox mt-1" style={{background: props.fields[field.fieldID].color }}/>
                    <span>{props.fields[field.fieldID].name} </span>
                    <br/>
                </div>
            )
        )
        return fieldArray;
    }

    const ListOfCards = () =>
    {
        var cardsArray = [];
        if(props.player.eventCards.length === 0) return null;

        cardsArray.push(<h6 key={2000}>Karty</h6>)
        props.player.eventCards.map(card =>
            cardsArray.push(
                <div key={card.cardID} className="d-flex">
                    <span>{props.cards[card.cardID].cardName} </span>
                    <br/>
                </div>
            )
        )
        return cardsArray;
    }

    const playersOwnsList = () =>
    {
        let fieldsList = listOfFields()
        let cardsList = ListOfCards()
        if(fieldsList === null && cardsList === null )
            return(<p className="text-secondary w-100 px-1">Gracz nie posiada żadnych kart i nieruchomości.</p>)
        else if(fieldsList === null || cardsList === null )
            return(<div>{fieldsList}{cardsList}</div>)
        else
            return(<div>{fieldsList}<hr/>{cardsList}</div>)
    }

    if(props.player.isBankrupt)
    {
        color = 'gray'
        background = 'transparent'
        border = `0.2em solid gray`
    }
    else if(props.isActive)
    {
        color = 'white'
        background = props.player.color
        border = `0.2em solid ${props.player.color}`
    }
    else
    {
        color = props.player.color
        background = 'transparent'
        border = `0.2em solid ${props.player.color}`
    }

    const playerBoxCash = () => props.player.isBankrupt ? "*Bankrupt*" : `${props.player.cash}  ECTS`

    return(
        <OverlayTrigger
            trigger={["hover","focus"]}
            placement='bottom'
            animation={false}
            transition={false}
            overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Content>
                        {playersOwnsList()}
                    </Popover.Content>
                </Popover>
            }
            >
            <Button
                className="playerBox"
                variant="secondary"
                style={{ border: border, background: background, color: color}}
                onMouseDown={(e) => e.preventDefault()}>
                    <span className="playerBoxName">{props.player.name}</span>
                    <br/>
                    <span className="playerBoxCash">{playerBoxCash()}</span>
            </Button>
        </OverlayTrigger>

    )

}
export default PlayerBox;
