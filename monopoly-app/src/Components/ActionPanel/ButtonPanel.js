import "../../styles/ActionPanel.css";
import { Button, ButtonGroup } from 'react-bootstrap';
import { thrownDices } from "../../boardActions";

function ButtonPanel(props)
{
    //Just display of all possible actions in ActionPanel
    return(
      <ButtonGroup>
        <Button id="buyButton" onClick={() => props.changeView('buy')} 
          disabled={(isAbleToBuy(props.data) === false) || (thrownDices === false)}>Kup</Button>
        <Button id="manageButton" onClick={() => props.changeView('manage')}>Zarządzaj</Button>
        <Button id="tradeButton" onClick={() => props.changeView('trade')}>Handluj</Button>
      </ButtonGroup>
    )

}
export default ButtonPanel;

const isAbleToBuy = (data) => {
  const activePlayerIndex = data.activePlayerIndex;
  const activePlayer = data.players[activePlayerIndex];
  const players = data.players;
  const fields = data.fields;
  const currentField = fields[activePlayer.position];

  // You can't buy corner and event fields:
  if (currentField.type === "corner" || currentField.type === "event") return false;

  // You can't buy fields that are already bought:
  for (let i = 0; i < players.length; i++)
    for (let j = 0; j < players[i].properties.length; j++)
      if (players[i].properties[j].fieldID === currentField.fieldID) 
        return false;
  
  // You can't buy anything when you don't have enough money:
  if (activePlayer.cash < currentField.price) return false;

  return true;
}