import { AddNewLog, UpdateDices, UpdatePlayerPosition, UpdatePlayerCash,
    UpdatePlayerUpdateWaitingTurns, UpdatePlayerNewEventCard, 
    UpdatePlayerDeleteEventCard, UpdateCurrentEventCard } from '../services/monopolyService';

// Parameters:
export var thrownDices = false;
export const setThrownDices = (newValue) => thrownDices = newValue;

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
    setThrownDices(true);

    // Updating player position:
    let numberOnDices = newDiceState[0] + newDiceState[1];
    UpdatePlayerPosition(dispatch, activePlayerIndex, numberOnDices);

    // Adding new logs:
    let newPosition = (activePlayer.position + numberOnDices) % fields.length;
    let newField = fields[newPosition];
    AddNewLog(dispatch, `${activePlayer.name} wyrzuca ${sayItWell(numberOnDices)}.`);
    AddNewLog(dispatch, `${activePlayer.name} ląduje na polu ${newField.name}.`);

    // Updating cash if it is time for it:
    if (newPosition < activePlayer.position) // for example if player is on 35 and then on 1
    {
        UpdatePlayerCash(dispatch, activePlayer.name, 30);
        AddNewLog(dispatch, `${activePlayer.name} przechodzi przez portiernię. Otrzymuje 30 ECTS.`)
    }

    // Specific field action:
    dealWithNewField(newField, numberOnDices, data);
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
        // If it is a corner field, you'll lose some turns
        // unless you have special card.
        case "corner":
            switch(newField.name)
            {
                case "Konsultacje":
                    for(let i = 0; i < activePlayer.eventCards.length; i++)
                    {
                        if (activePlayer.eventCards[i].cardID === 1)
                        {
                            UpdatePlayerDeleteEventCard(dispatch, activePlayer.name, 1);
                            AddNewLog(dispatch, `${activePlayer.name} używa karty ${gainCards[1].cardName.toUpperCase()}!`);
                            return;
                        }
                    }
                    UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 2, true);
                    AddNewLog(dispatch, `${activePlayer.name} traci 2 kolejki i dostęp do telefonu!`);
                    return;

                case "Stołówka studencka":
                    for(let i = 0; i < activePlayer.eventCards.length; i++)
                    {
                        if (activePlayer.eventCards[i].cardID === 8)
                        {
                            UpdatePlayerDeleteEventCard(dispatch, activePlayer.name, 8);
                            AddNewLog(dispatch, `${activePlayer.name} używa karty ${gainCards[8].cardName.toUpperCase()}!`);
                            return;
                        }
                    }
                    UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 2, false);
                    AddNewLog(dispatch, `${activePlayer.name} traci 2 kolejki!`);
                    return;

                case "Dziekanat":
                    for(let i = 0; i < activePlayer.eventCards.length; i++)
                    {
                        if (activePlayer.eventCards[i].cardID === 0)
                        {
                            UpdatePlayerDeleteEventCard(dispatch, activePlayer.name, 0);
                            AddNewLog(dispatch, `${activePlayer.name} używa karty ${gainCards[0].cardName.toUpperCase()}!`);
                            return;
                        }
                    }
                    UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 3, true);
                    AddNewLog(dispatch, `${activePlayer.name} traci 3 kolejki i dostęp do telefonu!`);
                    return;

                default:
                    return;
            }

        // If it is a property field that other player owns,
        // you'll have to pay him some ECTS points.
        case "property":
            let propertyID = newField.fieldID;
            for (let i = 0; i < players.length; i++)
            {
                // Ignore current player:
                if (players[i].name === activePlayer.name) continue;

                for (let j = 0; j < players[i].properties.length; j++)
                {
                    if (players[i].properties[j].fieldID === propertyID)
                    {
                        // Ignore if field is mortgaged:
                        if (players[i].properties[j].mortgaged === true) break;

                        let cost = newField.rentCosts[players[i].properties[j].estateLevel];
                        UpdatePlayerCash(dispatch, activePlayer.name, -cost);
                        UpdatePlayerCash(dispatch, players[i].name, cost);
                        AddNewLog(dispatch, `${activePlayer.name} płaci graczowi ${players[i].name}`
                        + ` kwotę ${cost} ECTS.`);
                        break;
                    }
                }
            }
            return;

        // If it is a company field that other player owns,
        // you'll have to pay him some ECTS points - the more fields
        // with the same name he have, the more you'll have to pay.
        // It also depends on the number on your dices.
        case "company":
            let companyID = newField.fieldID;
            let companyName = newField.name;
            for (let i = 0; i < players.length; i++)
            {
                // Ignore current player:
                if (players[i].name === activePlayer.name) continue;

                for (let j = 0; j < players[i].properties.length; j++)
                {
                    if (players[i].properties[j].fieldID === companyID)
                    {
                        // Ignore if field is mortgaged:
                        if (players[i].properties[j].mortgaged === true) break;

                        // Count how many companies with this name player have:
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
                        AddNewLog(dispatch, `${activePlayer.name} płaci graczowi ${players[i].name}`
                        + ` kwotę ${cost} ECTS.`);
                        break;
                    }
                }
            }
            return;

        // If it is an event field, you'll gain some money or lose it.
        // You can also gain special card and be safe on the corners.
        case "event":
            var card;
            switch(newField.name)
            {
                case "Karta zysku":
                    card = gainCards[Math.floor(Math.random() * gainCards.length)];
                    AddNewLog(dispatch, `${activePlayer.name} otrzymuje kartę`
                    + ` ${card.cardName.toUpperCase()}.`);
                    dealWithEventCard(data, card, numberOnDices);
                    return;

                case "Karta straty":
                    card = lossCards[Math.floor(Math.random() * lossCards.length)];
                    AddNewLog(dispatch, `${activePlayer.name} otrzymuje kartę`
                    + ` ${card.cardName.toUpperCase()}.`);
                    dealWithEventCard(data, card, numberOnDices);
                    return;

                default:
                    return;
            }

        default:
            return;
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

    // Pop-up with cardName and description shows:
    UpdateCurrentEventCard(dispatch, card);

    var newPosition, currentPosition, anotherNewField;
    switch(card.cardName)
    {
        // GAIN CARDS:
        case "Pierwszeństwo w dziekanacie":
            for(let i = 0; i < activePlayer.eventCards.length; i++)
            {
                if (activePlayer.eventCards[i].cardID === 0)
                {
                    AddNewLog(dispatch, `${activePlayer.name} wymienia duplikat na 20 ECTS!`);
                    UpdatePlayerCash(dispatch, activePlayer.name, 20);
                    return;
                }
            }
            UpdatePlayerNewEventCard(dispatch, activePlayer.name, card.cardID);
            return;

        case "Oświecenie na konsultacjach":
            for(let i = 0; i < activePlayer.eventCards.length; i++)
            {
                if (activePlayer.eventCards[i].cardID === 1)
                {
                    AddNewLog(dispatch, `${activePlayer.name} wymienia duplikat na 20 ECTS!`);
                    UpdatePlayerCash(dispatch, activePlayer.name, 20);
                    return;
                }
            }
            UpdatePlayerNewEventCard(dispatch, activePlayer.name, card.cardID);
            return;

        case "Wygrana w konkursie":
            UpdatePlayerCash(dispatch, activePlayer.name, 50);
            return;

        case "ECTSobranie":
            UpdatePlayerCash(dispatch, activePlayer.name, 30);
            return;

        case "Miss RMS / Mister RMS":
            UpdatePlayerCash(dispatch, activePlayer.name, 10);
            return;

        case "Urodziny":
            for (let i = 0; i < players.length; i++)
            {
                if (players[i].name === activePlayer.name
                    || players[i].isInJail === true
                    || players[i].isBankrupt === true) continue;
                UpdatePlayerCash(dispatch, players[i].name, -5);
                UpdatePlayerCash(dispatch, activePlayer.name, 5);
            }
            return;

        case "Wyróżnienie przez dziekana":
            UpdatePlayerCash(dispatch, activePlayer.name, 100);
            return;

        case "Szczęśliwy traf":
            UpdatePlayerCash(dispatch, activePlayer.name, 20);
            return;

        case "Znajomości na stołówce":
            for(let i = 0; i < activePlayer.eventCards.length; i++)
            {
                if (activePlayer.eventCards[i].cardID === 8)
                {
                    AddNewLog(dispatch, `${activePlayer.name} wymienia duplikat na 20 ECTS!`);
                    UpdatePlayerCash(dispatch, activePlayer.name, 20);
                    return;
                }
            }
            UpdatePlayerNewEventCard(dispatch, activePlayer.name, card.cardID);
            return;

        case "O, pinć ECTSów!":
            UpdatePlayerCash(dispatch, activePlayer.name, 5);
            return;


        // LOSS CARDS:
        case "Zapomniany klucz":
            newPosition = fields.find(field => field.name === "Portiernia").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            anotherNewField = fields[newPosition];
            AddNewLog(dispatch, `${activePlayer.name} ląduje na polu ${anotherNewField.name}.`);
            dealWithNewField(anotherNewField, 0, data);
            return;

        case "Zapłata rachunków":
            for (let i = 0; i < activePlayer.properties.length; i++)
                UpdatePlayerCash(dispatch, activePlayer.name, -10);
            return;

        case "Warunek":
            UpdatePlayerCash(dispatch, activePlayer.name, -30);
            return;

        case "Formalności":
            newPosition = fields.find(field => field.name === "Dziekanat").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            anotherNewField = fields[newPosition];
            AddNewLog(dispatch, `${activePlayer.name} ląduje na polu ${anotherNewField.name}.`);
            dealWithNewField(anotherNewField, 0, data);
            return;

        case "Douczanie się":
            newPosition = fields.find(field => field.name === "Konsultacje").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            anotherNewField = fields[newPosition];
            AddNewLog(dispatch, `${activePlayer.name} ląduje na polu ${anotherNewField.name}.`);
            dealWithNewField(anotherNewField, 0, data);
            return;

        case "Głód":
            newPosition = fields.find(field => field.name === "Stołówka studencka").fieldID;
            currentPosition = (activePlayer.position + numberOnDices) % fields.length;
            UpdatePlayerPosition(dispatch, activePlayerIndex, newPosition - currentPosition);
            anotherNewField = fields[newPosition];
            AddNewLog(dispatch, `${activePlayer.name} ląduje na polu ${anotherNewField.name}.`);
            dealWithNewField(anotherNewField, 0, data);
            return;

        case "Spłata pożyczki":
            UpdatePlayerCash(dispatch, activePlayer.name, -20);
            return;

        case "Gdybym był bogaty":
            for (let i = 0; i < players.length; i++)
            {
                if (players[i].name === activePlayer.name
                    || players[i].isInJail === true
                    || players[i].isBankrupt === true) continue;
                UpdatePlayerCash(dispatch, players[i].name, 5);
                UpdatePlayerCash(dispatch, activePlayer.name, -5);
            }
            return;

        case "Dziura w kieszeni":
            UpdatePlayerCash(dispatch, activePlayer.name, -5);
            return;

        case "Spóźnienie":
            UpdatePlayerUpdateWaitingTurns(dispatch, activePlayer.name, 1, false);
            return;

        default:
            return;
    }
}