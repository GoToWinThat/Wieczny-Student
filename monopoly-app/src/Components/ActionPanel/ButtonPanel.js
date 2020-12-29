import "../../styles/ActionPanel.css";
import {Button,ButtonGroup} from 'react-bootstrap';

function ButtonPanel(props)
{
    //Just dusplay of all possible actions in ActionPanel
    return(
      <ButtonGroup className="mb-2 mt-5">
        <Button onClick={() => props.changeView('buy')}>Kup</Button>
        <Button onClick={() => props.changeView('manage')}>Zarządzaj</Button>
        <Button onClick={() => props.changeView('trade')}>Handluj</Button>
      </ButtonGroup>
    )

}
export default ButtonPanel;