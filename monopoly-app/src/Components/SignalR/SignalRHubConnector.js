import {SignalRHubConfiguration} from './SignalRHubConfiguration.js';
import { useDispatch } from 'react-redux';

const SignalRHubConnector = () => {
  const dispatch = useDispatch();
  const hubConnection = SignalRHubConfiguration('https://localhost:44358/monopolyhub', dispatch)
  setTimeout(() => hubConnection.invoke('GetPlayers', "xd").catch(err => console.error(err)), 1000)

  return null
}

export default SignalRHubConnector;