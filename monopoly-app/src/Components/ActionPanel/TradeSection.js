import "../../styles/ActionPanel.css";
import React, { useState } from 'react';

function TradeSection(props) {

    //Handle input form text cash field
    const [inputcash, setInputcash] = useState(0);
    const handleChange = ({ target }) => 
    {
        setInputcash(target.value);
        selectItem("cash",target.value);
    }

    //Adding selected item to transactions in Trade function
    const selectItem = (type,obj) =>
    {
        let item = undefined
        type === "cash" ? item = Number.parseInt(obj) : 
        type === "card" ? item = obj.cardID : 
        item = obj.fieldID;

        let id = ""
        type ==! "cash" ? id = `${type}${props.activePlayer.name}${item}`
        : id = `${type}${props.activePlayer.name}`

        props.addTransaction({id: id, type: type,playerName: props.activePlayer.name, item: item})
    }

    //Creating header with player name
    const header = () => 
    {
        if(props.changable === true)
        {
            return(
                <div className="d-flex">
                    <img className="arrow mt-2 ml-3" onClick={props.previousPlayer} src={`/Assets/General/arrowLeft.svg`} alt="arrow-left"/>
                    <p className="h3 col text-center" style={{color: props.activePlayer.color}} >{props.activePlayer.name}</p>
                    <img className="arrow mt-2 mr-3" onClick={props.nextPlayer} src={`/Assets/General/arrowRight.svg`} alt="arrow-right"/>
                </div>
            )
        }
        else
        {
            return(<p className="h3 col text-center" style={{color: props.activePlayer.color}} >{props.activePlayer.name}</p>)
        }

    }
    //Create List of properties based on json file and put it into a form with color tag
    const createListOfFields = () =>
    {
        let fieldsList = [];
        if(props.activePlayer.properties.length !== 0) fieldsList.push(<hr key={2000}/>);
        props.activePlayer.properties.map( pField => 
        {
            let field = props.data.fields[pField.fieldID]
            fieldsList.push(
                <div className="d-flex" key={pField.fieldID}>
                    <input className="mt-1 mr-2" type='checkbox' onChange={() => selectItem("property",field)}/>
                    <div className="propertyBox mt-1" style={{background: field.color }}/>
                    <span>{field.name} </span>
                    <br/>
                </div>
            )
        })
        return fieldsList;
    }

    //Creating listo of cards
    const createListOfCards = () =>
    {
        let cardsList = [];
        let idx = 0;

        if(props.activePlayer.eventCards.length !== 0) cardsList.push(<hr key={1000}/>);
        props.activePlayer.eventCards.map( pCard => 
        {
            let card = props.data.cards[pCard.cardID]
            idx++;
            cardsList.push(
                <div className="d-flex" key={idx}>
                    <input className="mt-1 mr-2"  type='checkbox' onChange={() => selectItem("card",card)}/>
                    <span>{card.cardName} </span>
                    <br/>
                </div>
            )
        })
        return cardsList;
    }

    const listAll = () => 
    {
        if(props.activePlayer.eventCards.length === 0 && props.activePlayer.properties.length === 0)
            return(<p className="text-secondary  px-1">Gracz nie posiada żadnych kart i nieruchomości.</p>);
        else 
            return(<>{createListOfFields()}{createListOfCards()}</>);
    }

    return(
        <div>
            {header()}
            <p className="h6 col text-center mb-3" >{props.activePlayer.cash} ECTS</p>
            {listAll()}
            <div className="mt-3 mb-3 col text-center">
                <input  type='text' style={{maxWidth: 50}} value={inputcash} onChange={handleChange}/>
                <span> ECTS</span>
            </div>
        </div>
    )

}
export default TradeSection;