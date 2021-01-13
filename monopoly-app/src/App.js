import './App.css';
import { Board } from './components/Board';
import { CardPopover } from './components/ActionPanel/CardPopover'

function App() {
  return (
      <div className="App">
        <CardPopover/>
        <Board/>
      </div>
  );
}

export default App;