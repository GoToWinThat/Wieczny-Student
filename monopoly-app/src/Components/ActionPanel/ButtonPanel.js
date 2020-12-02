import "../../Css/ActionPanel.css";

function ButtonPanel(props)
{
    return(
        <div className="actionOptions">
            <button className="actionsButton" onClick={() => props.changeView('buy')} >Buy</button>
            <button className="actionsButton" onClick={() => props.changeView('manage')} >Manage</button>
            <button className="actionsButton" onClick={() => props.changeView('trade')} >Trade</button>
        </div>
    )

}
export default ButtonPanel;