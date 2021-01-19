import {SignalRHubConfiguration} from './SignalRHubConfiguration.js';
import { useDispatch } from 'react-redux';

const SignalRHubConnector = () => {
  const dispatch = useDispatch();
  const hubConnection = SignalRHubConfiguration('https://localhost:44358/monopolyhub', dispatch)
  setTimeout(() =>{ 
    hubConnection.invoke('GetPlayers', "").catch(err => console.error(err));
    //hubConnection.invoke('GetLogs', "").catch(err => console.error(err));
    //hubConnection.invoke('GetDices', "").catch(err => console.error(err));
    //hubConnection.invoke('GetActivePlayerIndex', "").catch(err => console.error(err));
    //hubConnection.invoke('GetGameState', "").catch(err => console.error(err));
  }, 1000)

  return null
}

export default SignalRHubConnector;