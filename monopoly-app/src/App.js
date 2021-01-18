import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import {Game} from './pages/Game'
import {Config} from './pages/Config'
import SignalRHubConnector from './components/SignalR/SignalRHubConnector';

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