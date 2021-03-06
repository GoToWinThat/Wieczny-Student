import "../../styles/ActionPanel.css";
import { Button, ButtonGroup } from 'react-bootstrap';

function ButtonPanel(props)
{
  console.log(props.data);
    //Just display of all possible actions in ActionPanel
    return(
      <ButtonGroup>
        <Button id="buyButton" onClick={() => props.openView('buy')}
          disabled={(isAbleToBuy(props.data) === false)
            || (props.data.players[props.data.myIndex].thrownDices === false)
            || (props.data.activePlayerIndex !== props.data.myIndex)
            || (props.data.gameState.gameState != "running")}
          onMouseDown={(e) => e.preventDefault()}>Kup</Button>
        <Button id="manageButton" onClick={() => props.openView('manage')}
          disabled={props.data.activePlayerIndex !== props.data.myIndex
            || (props.data.gameState.gameState != "running")}
          onMouseDown={(e) => e.preventDefault()}>Zarządzaj</Button>
        <Button id="tradeButton" onClick={() => props.openView('trade')}
          disabled={props.data.activePlayerIndex !== props.data.myIndex
            || (props.data.gameState.gameState != "running")}
          onMouseDown={(e) => e.preventDefault()}>Handluj</Button>
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