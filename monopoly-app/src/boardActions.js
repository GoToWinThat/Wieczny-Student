import { AddNewLog, UpdateDices, UpdatePlayerPosition, UpdatePlayerCash, 
    UpdatePlayerUpdateWaitingTurns, UpdatePlayerNewEventCard } from './services/monopoly';

// Throwing dices:
export const throwDicesEvent = (data) =>
{
    // Important parameters:
    const activePlayerIndex = data.data.activePlayerIndex;
    const activePlayer = data.data.players[activePlayerIndex];
    const fields = data.data.fields;
    const dispatch = data.data.dispatch;
    const sayItWell = (number) => (number < 5) ? `${number} oczka` : `${number} oczek`;

    // Updating dices:
    let newDiceState = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    UpdateDices(dispatch, newDiceState); 

    // Updating player position:
    let numberOnDices = newDiceState[0] + newDiceState[1];
    UpdatePlayerPosition(dispatch, activePlayerIndex, numberOnDices);

    // Adding new log and field action:
    let newField = fields[(activePlayer.position + numberOnDices) % fields.length];
    AddNewLog(dispatch, `${activePlayer.name} wyrzuca ${sayItWell(numberOnDices)}` 
     + ` i ląduje na polu ${newField.name}. ${dealWithNewField(newField, numberOnDices, data)}`);
}

// Field action:
function dealWithNewField(newField, numberOnDices, data)
{
    // Parameters:
    const activePlayerIndex = data.data.activePlayerIndex;
    const activePlayer = data.data.players[activePlayerIndex];
    const players = data.data.players;
    const fields = data.data.fields;
    const gainCards = data.data.gainCards;
    const lossCards = data.data.lossCards;
    const dispatch = data.data.dispatch;

    switch(newField.type)
    {
        // If it is a corner field, probably you'll lose some turns...
        case "corner":
            switch(newField.name)
            {
                case "Konsultacje":
                    // IF-STATEMENT WILL BE HERE - player can have special event card...
                    UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 2, true);
                    return `${activePlayer.name} traci 2 kolejki i dostęp do telefonu!`;
                
                case "Stołówka studencka":
                    // IF-STATEMENT WILL BE HERE - player can have special event card...
                    UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 2, false);
                    return `${activePlayer.name} traci 2 kolejki!`;
        
                case "Dziekanat":
                    // IF-STATEMENT WILL BE HERE - player can have special event card...
                    UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 3, true);
                    return `${activePlayer.name} traci 3 kolejki i dostęp do telefonu!`;
                
                default:
                    return "";
            }
        
        // If it is a property field that other player owns, 
        // you'll have to pay him some ECTS points:
        case "property":
            let propertyID = newField.fieldID;
            for (let i = 0; i < players.length; i++)
            {
                if (players[i].name === activePlayer.name) continue;
                for (let j = 0; j < players[i].properties.length; j++)
                {
                    if (players[i].properties[j].fieldID === propertyID)
                    {
                        let cost = newField.rentCosts[players[i].properties[j].estateLevel];
                        UpdatePlayerCash(dispatch, activePlayer.name, -cost);
                        UpdatePlayerCash(dispatch, players[i].name, cost);
                        return `${activePlayer.name} płaci graczowi ${players[i].name}` 
                        + ` kwotę ${cost} ECTS.`;
                    }
                }
            }
            return "";

        // If it is a company field that other player owns,
        // you'll have to pay him some ECTS points - the more fields 
        // with the same name he have, the more you'll have to pay.
        // It also depends on the number on your dices.
        case "company":
            let companyID = newField.fieldID;
            let companyName = newField.name;
            for (let i = 0; i < players.length; i++)
            {
                if (players[i].name === activePlayer.name) continue;
                for (let j = 0; j < players[i].properties.length; j++)
                {
                    if (players[i].properties[j].fieldID === companyID)
                    {
                        let ownedCompanies = 0;
                        for (let k = 0; k < players[i].properties.length; k++)
                        {
                            let fieldName = fields[players[i].properties[k].fieldID].name;
                            if (fieldName === companyName) ownedCompanies++;
                        }

                        // Example: You rolled 5, land on "Winda" and owner has two "Winda" fields.
                        // You have to pay 5 * (3)^(2-1) ECTS.
                        let cost = numberOnDices * Math.pow(3, ownedCompanies - 1);
                        UpdatePlayerCash(dispatch, activePlayer.name, -cost);
                        UpdatePlayerCash(dispatch, players[i].name, cost);
                        return `${activePlayer.name} płaci graczowi ${players[i].name}` 
                        + ` kwotę ${cost} ECTS.`;
                    }
                }
            }
            return "";

        case "event":
            var card;
            switch(newField.name)
            {
                case "Karta zysku":
                    card = gainCards[Math.floor(Math.random() * gainCards.length)];
                    dealWithEventCard(data, card, numberOnDices);
                    return `${activePlayer.name} otrzymuje kartę ${card.cardName.toUpperCase()}.`; 
                
                case "Karta straty":
                    card = lossCards[Math.floor(Math.random() * lossCards.length)];
                    dealWithEventCard(data, card, numberOnDices);
                    return `${activePlayer.name} otrzymuje kartę ${card.cardName.toUpperCase()}.`; 
                
                default:
                    return "";
            }

        default:
            return "";
    }
}

// Event field action:
function dealWithEventCard(data, card, numberOnDices)
{
    // Parameters:
    const activePlayerIndex = data.data.activePlayerIndex;
    const activePlayer = data.data.players[activePlayerIndex];
    const players = data.data.players;
    const fields = data.data.fields;
    const dispatch = data.data.dispatch;

    // Pop-up with cardName and description shows; 
    // if cardID is 0, 1 or 8 there is also opportunity to sell it.
    // There also should be "OK" button on it and then code from below will be launched.

    var newPosition, currentPosition;
    switch(card.cardName)
    {
        // GAIN CARDS:
        case "Pierwszeństwo w dziekanacie":
            UpdatePlayerNewEventCard(dispatch, activePlayer.name, card.cardID);
            break;
        
        case "Oświecenie na konsultacjach":
            UpdatePlayerNewEventCard(dispatch, activePlayer.name, card.cardID);
            break;

        case "Wygrana w konkursie":
            UpdatePlayerCash(dispatch, activePlayer.name, 50);
            break;

        case "ECTSobranie":
            UpdatePlayerCash(dispatch, activePlayer.name, 30);
            break;

        case "Miss RMS / Mister RMS":
            UpdatePlayerCash(dispatch, activePlayer.name, 10);
            break;

        case "Urodziny":
            for (let i = 0; i < players.length; i++)
            {
                if (players[i].name === activePlayer.name 
                    || players[i].isInJail === true) continue;
                UpdatePlayerCash(dispatch, players[i].name, -5);
                UpdatePlayerCash(dispatch, activePlayer.name, 5);
            }
            break;

        case "Wyróżnienie przez dziekana":
            UpdatePlayerCash(dispatch, activePlayer.name, 100);
            break;

        case "Szczęśliwy traf":
            UpdatePlayerCash(dispatch, activePlayer.name, 20);
            break;

        case "Znajomości na stołówce":
            UpdatePlayerNewEventCard(dispatch, activePlayer.name, card.cardID);
            break;

        case "O, pinć ECTSów!":
            UpdatePlayerCash(dispatch, activePlayer.name, 5);
            break;


        // LOSS CARDS:
        case "Zapomniany klucz":
            newPosition = fields.find(field => field.name === "Portiernia").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            break; 

        case "Zapłata rachunków":
            for (let i = 0; i < activePlayer.properties.length; i++)
                UpdatePlayerCash(dispatch, activePlayer.name, -10);
            break;

        case "Warunek":
            UpdatePlayerCash(dispatch, activePlayer.name, -30);
            break;

        case "Formalności":
            newPosition = fields.find(field => field.name === "Dziekanat").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 3, true);
            break; 

        case "Douczanie się":
            newPosition = fields.find(field => field.name === "Konsultacje").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 2, true);
            break; 

        case "Głód":
            newPosition = fields.find(field => field.name === "Stołówka studencka").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 2, false);
            break; 

        case "Spłata pożyczki":
            UpdatePlayerCash(dispatch, activePlayer.name, -20);
            break;

        case "Gdybym był bogaty":
            for (let i = 0; i < players.length; i++)
            {
                if (players[i].name === activePlayer.name 
                    || players[i].isInJail === true) continue;
                UpdatePlayerCash(dispatch, players[i].name, 5);
                UpdatePlayerCash(dispatch, activePlayer.name, -5);
            }
            break;

        case "Dziura w kieszeni":
            UpdatePlayerCash(dispatch, activePlayer.name, -5);
            break;

        case "Spóźnienie": 
            UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 1, false);
            break;

        default:
            break;
    }
}