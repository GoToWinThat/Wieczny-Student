import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import { Game } from './pages/Game'
import { Config } from './pages/Config'
import SignalRHubConnector from './components/SignalR/SignalRHubConnector';
import { useSelector } from 'react-redux';

function App() {
  return (
      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Config}/>
          <Route path='/game' exact component={Game}/>
          <SignalRHubConnector/>
        </div>
      </BrowserRouter>
  );
}


export default App;

/*
const gameState = useSelector(state => state.monopolyReducer.gameState);
<div className="App">
{gameState === "config" ? <Config/> : <Game/>}
<SignalRHubConnector/>
</div>
*/