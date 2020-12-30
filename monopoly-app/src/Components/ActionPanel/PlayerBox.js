import "../../styles/ActionPanel.css";
import {Button,Popover,OverlayTrigger} from 'react-bootstrap';

function PlayerBox(props)
{
    //Function switch color and background of a PlayerBox based on active state
    //Each player have a unique color and name
    let color,background
    let border = `2px solid ${props.player.color}`
    const porpList = [
        {
            fieldID: 12,
            type: "property",
            name: "Laboratorium nr 409 (MS)",
            color: "lightgreen",
            price: 100,
            rents: [10, 20, 30, 40, 50, 60],
            oneHousePrice: 10
        },
        {
            fieldID: 24,
            type: "property",
            name: "Sala nr 310 (LB)",
            color: "purple",
            price: 100,
            rents: [10, 20, 30, 40, 50, 60],
            oneHousePrice: 10
        },

    ]
    const cadrsList = ["Opuść Konsultacje!","Opuść Dziekanat!"]

    const listOfPorp = () =>{
        var array = [];
        for (var i = 0; i < porpList.length; i++)
        {
            array.push(
                <div className="propertyRow">
                    <div className="propertyBox" style={{background: porpList[i].color }}/>
                    <span>{porpList[i].name} </span>
                    <tr/>
                </div>);
        }
        return (array)
    }

    const ListOfCards = () => 
    {
        var array = [];
        for (var i = 0; i < cadrsList.length; i++) 
        {
            array.push(
                <div className="d-flex">
                    <span>{cadrsList[i]} </span>
                    <tr/>
                </div>);
        }
        return array;
    }

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
            trigger={["hover","focus"]}
            placement='bottom'
            overlay={
                <Popover id={`popover-positioned-bottom`}>
                    <Popover.Content>
                        <h6>Nieruchomości</h6>
                        {listOfPorp()}
                        <hr/>
                        <h6>Karty</h6>
                        {ListOfCards()}
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
