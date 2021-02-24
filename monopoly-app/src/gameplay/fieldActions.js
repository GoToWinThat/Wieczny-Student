import { UpdateDices, UpdatePlayerPosition } from '../services/monopolyService';


// Throwing dices:
export const throwDicesEvent = (data) =>
{
    // Parameters:
    const activePlayerIndex = data.data.activePlayerIndex;
    const dispatch = data.data.dispatch;

    // Updating dices:
    let newDiceState = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
    UpdateDices(dispatch, newDiceState);

    // Updating player position:
    let numberOnDices = newDiceState[0] + newDiceState[1];
    UpdatePlayerPosition(dispatch, activePlayerIndex, numberOnDices);

    return;
}