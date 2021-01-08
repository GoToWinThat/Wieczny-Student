import React, { useState } from 'react';
import "../../styles/ActionPanel.css";
import Buy from './Buy'
import Manage from './Manage'
import ButtonPanel from './ButtonPanel'
import Trade from './Trade'

// class ActionOptions extends Component
// {
//     constructor(props){
//         super(props)
//         //Sample JSON format
//         this.state = {option: 'menu'}
//         this.changeView = this.changeView.bind(this)
//     }
//     //Display corrent panel in render method based on state
//     navigator()
//     {
//         let opt = this.state.option
//         if(opt === 'buy')
//             return <Buy data={this.props.data}/>;
//         if(opt === 'trade')
//             return <Trade data={this.props.data}/>;
//         if(opt === 'manage')
//             return <Manage data={this.props.data}/>;
//     }
//     //Method to change state and then change a view in navigator
//     changeView(view)
//     {
//         this.setState({option: view})
//     }
//     //Button panel responsible for change view with a event and current active panel
//     render() {

//         return (
//         <div className="actionOptions">
//             <ButtonPanel data={this.props.data} changeView={this.changeView}/>
//             {this.navigator()}
//         </div>)
//     }

// }
function ActionOptions(props) 
{
    const [showBuy, setShowBuy] = useState(false);
    const [showManage, setShowManage] = useState(false);
    const [showTrade, setShowTrade] = useState(false);

    const openView = (view) =>
    {
        if(view === 'buy') setShowBuy(true);
        if(view === 'manage') setShowManage(true);
        if(view === 'trade') setShowTrade(true);
    }

    const closeView = () =>
    {
        setShowBuy(false);
        setShowManage(false);
        setShowTrade(false);
    }

    return (
        <div className="actionOptions">
            <ButtonPanel data={props.data} openView={openView} />
            <Buy data={props.data} onHide={closeView} show={showBuy}/>
            <Manage data={props.data} onHide={closeView} show={showManage}/>
            <Trade data={props.data} onHide={closeView} show={showTrade}/>
        </div>)

}
export default ActionOptions;