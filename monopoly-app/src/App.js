import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import {Game} from './pages/Game'
import {Config} from './pages/Config'
import SignalRHubConnector from './components/SignalR/SignalRHubConnector';
import { useSelector } from 'react-redux';

function App() {
  //config  running
  const config = useSelector(state => state.gameState)
  return (

      <BrowserRouter>
        <div className="App">
          {config === "running" ? <Route path="/" exact component={Config}/> :<Route path='/' exact component={Game}/> }

          {/* <Route path="/" exact component={Config}/>
          <Route path='/game' exact component={Game}/> */}
          <SignalRHubConnector/>
        </div>
      </BrowserRouter>
  );
}


export default App;