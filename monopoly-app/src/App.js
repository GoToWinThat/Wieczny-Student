import './App.css';
import Field from './Components/Field'
import {data} from './Data'

function App() {
  return (
      <div className="App">
        <table>
          <tbody>
            <tr>
              <Field data={data[4]}/>
              <Field data={data[0]}/>
              <Field data={data[2]}/>
              <Field data={data[3]}/>
            </tr>
            <tr>
              <Field data={data[4]}/>
              <Field data={data[0]}/>
              <Field data={data[2]}/>
              <Field data={data[3]}/>
            </tr>
          </tbody>
        </table>
      </div>
  );
}

export default App;