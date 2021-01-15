import './App.css';
import {BrowserRouter,Route, Switch} from 'react-router-dom'
import {Game} from './pages/Game'
import {Config} from './pages/Config'

function App() {
  return (

      <BrowserRouter>
        <div className="App">
          <Route path="/" exact component={Config}/>
          <Route path='/game' exact component={Game}/>
        </div>
      </BrowserRouter>
  );
}


export default App;