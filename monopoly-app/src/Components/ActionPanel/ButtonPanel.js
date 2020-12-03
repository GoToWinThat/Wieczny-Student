import "../../Css/ActionPanel.css";

function ButtonPanel(props)
{
    //Just dusplay of all possible actions in ActionPanel
    return(
        <div className="actionOptions">
            <button className="actionsButton" onClick={() => props.changeView('buy')} >Kup</button>
            <button className="actionsButton" onClick={() => props.changeView('manage')} >Zarządzaj</button>
            <button className="actionsButton" onClick={() => props.changeView('trade')} >Handluj</button>
        </div>
    )

}
export default ButtonPanel;