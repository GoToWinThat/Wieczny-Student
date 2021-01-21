import { UpdateActivePlayerIndex } from '../services/monopolyService';
import { canPreventBankrupt, bankrupt } from '../components/Modals/ManageBankrupt'

export const endTurnEvent = (data) =>
{
    const myIndex = data.data.myIndex;
    const activePlayerIndex = data.data.activePlayerIndex;
    const dispatch = data.data.dispatch;
    const players = data.data.players;
    const fields = data.data.fields;
    const gameState = data.data.gameState;

    if (myIndex === activePlayerIndex && gameState != "over")
    {
        if(!canPreventBankrupt(dispatch, players[myIndex], fields))
            bankrupt(dispatch, players[myIndex]);

        UpdateActivePlayerIndex(dispatch, myIndex);
    }

    return;
}