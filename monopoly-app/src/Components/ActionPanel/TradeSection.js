import "../../styles/ActionPanel.css";
import React, { useState } from 'react';

function TradeSection(props) {

    var currentPlayer = {};
    const [playerId, setPlayerId] = useState(0);

    const header = () => 
    {
        if(props.activePlayer === undefined)
        {
            let len = props.otherPlayers.length;
            currentPlayer = props.otherPlayers[playerId];
            const nextPlayer = () => {setPlayerId((playerId+1)%len)}
            const previousPlayer = () => {setPlayerId(playerId === 0 ? len-1 : (playerId-1)%len)}

            return(
                <div className="d-flex">
                    <img className="arrow mt-2 ml-3" onClick={previousPlayer} src={`/Assets/General/arrowLeft.svg`} alt="arrow-left"/>
                    <p className="h3 col text-center" style={{color: currentPlayer.color}} >{currentPlayer.name}</p>
                    <img className="arrow mt-2 mr-3" onClick={nextPlayer} src={`/Assets/General/arrowRight.svg`} alt="arrow-right"/>
                </div>
            )
        }
        else
        {
            currentPlayer = props.activePlayer;
            return(<p className="h3 col text-center" style={{color: currentPlayer.color}} >{currentPlayer.name}</p>)
        }

    }
    //Create List of properties based on json file and put it into a form with color tag
    const createListOfFields = () =>
    {
        let fieldsList = [];
        if(currentPlayer.properties.length !== 0) fieldsList.push(<hr key={2000}/>);
        currentPlayer.properties.map( pField => 
        {
            let field = props.data.fields[pField.fieldID]
            fieldsList.push(
                <div className="d-flex" key={pField.fieldID}>
                    <input className="mt-1 mr-2" type='checkbox'/>
                    <div className="propertyBox mt-1" style={{background: field.color }}/>
                    <span>{field.name} </span>
                    <br/>
                </div>
            )
        })
        return fieldsList;
    }

    const createListOfCards = () =>
    {
        let cardsList = [];
        let idx = 0;

        if(currentPlayer.eventCards.length !== 0) cardsList.push(<hr key={1000}/>);
        currentPlayer.eventCards.map( pCard => 
        {
            let card = props.data.cards[pCard.cardID]
            idx++;
            cardsList.push(
                <div className="d-flex" key={idx}>
                    <input className="mt-1 mr-2"  type='checkbox'/>
                    <span>{card.cardName} </span>
                    <br/>
                </div>
            )
        })
        return cardsList;
    }

    const listAll = () => 
    {
        debugger;
        if(currentPlayer.eventCards.length === 0 && currentPlayer.properties.length === 0)
            return(<p className="text-secondary  px-1">Gracz nie posiada żadnych kart i nieruchomości.</p>);
        else 
            return(<>{createListOfFields()}{createListOfCards()}</>);
    }

    return(
        <div>
            {header()}
            <p className="h6 col text-center mb-3" >{currentPlayer.cash} ECTS</p>
            {listAll()}
            <div className="mt-3 mb-3 col text-center">
                <input  type='text' style={{maxWidth: 50}}/>
                <span> ECTS</span>
            </div>
        </div>
    )

}
export default TradeSection;