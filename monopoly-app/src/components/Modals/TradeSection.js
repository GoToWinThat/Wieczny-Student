import "../../styles/ActionPanel.css";
import React, { useState } from 'react';

function TradeSection(props) {

    //Handle input form text cash field
    const [inputcash, setInputcash] = useState(0);
    const handleChange = ({ target }) => 
    {
        if(props.activePlayer.cash > target.value)
        {
        setInputcash(target.value);
        selectItem("cash",target.value);
        }
        else  
        {
            setInputcash(props.activePlayer.cash);
            selectItem("cash",props.activePlayer.cash);
        }
    }

    //Adding selected item to transactions in Trade function
    const selectItem = (type,obj) =>
    {
        let item = undefined
        type === "cash" ? item = Number.parseInt(obj) : 
        type === "card" ? item = obj.cardID : 
        item = obj.fieldID;

        let id = ""
        type === "cash" ? id = `${type}${props.activePlayer.name}` : id = `${type}${props.activePlayer.name}${item}`
        
        props.addTransaction({id: id, type: type,playerName: props.activePlayer.name, item: item})
    }

    //Creating header with player name
    const header = () => 
    {
        if(props.changable === true)
        {
            return(
                <div className="playerNameWithArrows">
                    <img className="arrow" onClick={props.previousPlayer} src={`/Assets/General/arrowLeft.svg`} alt="arrow-left"/>
                    <p className="h3" style={{color: props.activePlayer.color}} >{props.activePlayer.name}</p>
                    <img className="arrow" onClick={props.nextPlayer} src={`/Assets/General/arrowRight.svg`} alt="arrow-right"/>
                </div>
            )
        }
        else
        {
            return(<p className="h3 col" style={{color: props.activePlayer.color}} >{props.activePlayer.name}</p>)
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
            let disabledInput = false;
            if(pField.mortgaged === true || pField.estateLevel > 0) disabledInput = true;
            
            fieldsList.push(
                <div className="d-flex" key={pField.fieldID}>
                    <input type='checkbox' onChange={() => selectItem("property",field)} disabled={disabledInput}/>
                    <div className="propertyBox" style={{background: field.color}}/>
                    <span>{field.name}</span>
                    <br/>
                </div>
            )

            return null;
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
                    <input type="checkbox" onChange={() => selectItem("card",card)}/>
                    <span>{card.cardName}</span>
                    <br/>
                </div>
            )

            return null;
        })
        return cardsList;
    }

    const listAll = () => 
    {
        if(props.activePlayer.eventCards.length === 0 && props.activePlayer.properties.length === 0)
            return(<p className="noProperties text-secondary">Gracz nie posiada żadnych kart i nieruchomości.</p>);
        else 
            return(<>{createListOfFields()}{createListOfCards()}</>);
    }

    return(
        <div>
            {header()}
            <p className="h6 col" >{props.activePlayer.cash} ECTS</p>
            {listAll()}
            <div className="tradeCashChangeDiv">
                <input type="text" value={inputcash} onChange={handleChange}/>
                <span> ECTS</span>
            </div>
        </div>
    )

}
export default TradeSection;