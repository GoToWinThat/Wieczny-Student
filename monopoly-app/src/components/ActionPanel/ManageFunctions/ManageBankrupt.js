import { UpdatePlayerUpdateBankrupt,UpdatePlayerDeleteProperty,UpdatePlayerDeleteEventCard } from "../../../services/monopolyService";
import { endTurnEvent } from "../../../gameplay/turnActions";

export const bankrupt = (props,activePlayer) => 
{
    const dispatch = props.data.dispatch;
    // Removing properties and cards:
    for (let i = 0; i < activePlayer.properties.length; i++)
        UpdatePlayerDeleteProperty(dispatch, activePlayer.name, activePlayer.properties[i].fieldID);
    for (let i = 0; i < activePlayer.eventCards.length; i++)
        UpdatePlayerDeleteEventCard(dispatch, activePlayer.name, activePlayer.eventCards[i].cardID);

    // set isBankrupt true, inform about bankrupting, close modal, next turn,
    // prevent moving the pawn (if player bankrupted not in his turn, he will not throw dices,
    // so they will be thrown automatically in endTurnEvent)
    UpdatePlayerUpdateBankrupt(dispatch, activePlayer.name);
    endTurnEvent(props);
}