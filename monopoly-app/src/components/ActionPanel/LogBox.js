import {Button,Popover,OverlayTrigger} from 'react-bootstrap';
import "../../styles/ActionPanel.css";

function LogBox()
{
    const logs = [
        "Tomek rzucił 6",
        "Tomek kupił Bibioteka wydziałowa",
        "Franek rzucił 3",
        "Franek dostał karte ucieczki z konsultacji",
        "Angela rzuciła 6",
        "Angela kupił Bibioteka wydziałowa",
        "Franek rzucił 3",
        "Franek dostał karte ucieczki z konsultacji",
        "Angela rzuciła 6",
        "Angela kupiła Bibioteka wydziałowa",
        "Franek rzucił 3",
        "Franek dostał karte ucieczki z konsultacji"]

    const genLogs = () => 
    {
        let allLogs = ""
        for (var i = 0; i < logs.length; i++) 
        {
            allLogs += logs[i] + '\n'
        }
        return allLogs;
    }

    // const addLog = (log) => 
    // {
    //     logs.push(log)

    // }

    return(
        <div className="d-flex justify-content-center">
            <p 
            className="logBox overflow-auto border border-dark rounded"
            >
                {genLogs()}
            </p>
        </div>
    )

}
export default LogBox;