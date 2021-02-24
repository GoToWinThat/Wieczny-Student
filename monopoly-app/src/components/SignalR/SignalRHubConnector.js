import { SignalRHubConfiguration } from './SignalRHubConfiguration.js';
import { useDispatch } from 'react-redux';

const SignalRHubConnector = () => {
  const dispatch = useDispatch();
  SignalRHubConfiguration('https://localhost:44358/monopolyhub', dispatch);
  //SignalRHubConfiguration('https://monopolyapi.azurewebsites.net/monopolyhub', dispatch);
  return null;
}
export default SignalRHubConnector;