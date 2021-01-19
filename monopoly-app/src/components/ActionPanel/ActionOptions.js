import React, { useState,useEffect } from 'react';
import "../../styles/ActionPanel.css";
import Buy from '../Modals/Buy'
import Manage from '../Modals/Manage'
import ButtonPanel from './ButtonPanel'
import Trade from '../Modals/Trade'

function ActionOptions(props) 
{
    const [showBuy, setShowBuy] = useState(false);
    const [showManage, setShowManage] = useState(false);
    const [showTrade, setShowTrade] = useState(false);

    useEffect(() => {
        closeView()
    }, [props.data.activePlayerIndex])

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