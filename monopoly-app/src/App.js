import './App.css';
import { Game } from './pages/Game'
import { Config } from './pages/Config'
import SignalRHubConnector from './components/SignalR/SignalRHubConnector';
import { useSelector } from 'react-redux';

function App() {
  const gameState = useSelector(state => state.monopolyReducer.gameState);
  return (
    <div className="App">
      {gameState === "config" ? <Config/> : <Game/>}
      <SignalRHubConnector/>
    </div>
  );
}


export default App;