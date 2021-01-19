import {sellProperty,mortgageProperty,buyHouse,sellHouse} from './ManageFunc'
import {hasAllPropertiesFromThisColor,hasAnyPropertyFromThisColorOneOrMoreComputers ,isAnyPropertyFromThisColorMortgaged} from './ManageCheck'
import { Button } from 'react-bootstrap';

//Method to create n number of houses icon
const createHouses = (activePlayer,idx) =>
{
    var array = [];
    let field = activePlayer.properties[idx];
    if (field.estateLevel > 3)
        array.push( <img key={field.fieldID} className="houses" src={`/Assets/Houses/server.svg`} alt="server"/>); 
    else 
    {
        for (var j = 0; j < field.estateLevel; j++) 
            array.push( <img key={j} className="houses" src={`/Assets/Houses/computer.svg`} alt="computer"/>);
    }
    return array;
} 

const mortgageButtonColor = (activePlayer,idx) => 
{
    if (activePlayer.properties[idx].mortgaged) return "success";
    else return "danger";
}

const fieldNameColor = (activePlayer,idx, color) => 
{
    let field = activePlayer.properties[idx];
    if (field.mortgaged) return 'gray';
    else return color;
}

//Generate table for panel
export const generateTableOfFields = (dispatch,activePlayer,fields,properties) =>{

  var array = [];
  let idx = 0
  properties.map(field => {
      let idx2 = idx
      let fKey = `${field.fieldID} ${field.estateLevel}`
      array.push(
        <tr key={fKey}>
          <td className="text-left">
            <div className="d-flex">
              <div
                className="propertyBox"
                style={{ background: fieldNameColor(activePlayer, idx2, field.color) }}
                />
              <span style={{ color: fieldNameColor(activePlayer, idx2, "black") }}>
                {field.name}
              </span>
            </div>
          </td>
          <td>{createHouses(activePlayer, idx2)}</td>
          {field.type === "property" ? (
            <td className="manageExpandCell">
              <Button
                variant="success"
                onClick={() => buyHouse(dispatch, activePlayer, fields, idx2)}
                disabled={
                  activePlayer.properties[idx2].estateLevel === 4 ||
                  activePlayer.cash < field.estatePrice ||
                  activePlayer.properties[idx2].mortgaged === true ||
                  !hasAllPropertiesFromThisColor(field, fields, properties) || 
                  isAnyPropertyFromThisColorMortgaged(field, fields, properties, activePlayer) === true
                }
                onMouseDown={(e) => e.preventDefault()}
              >
              {" "}+{" "}
              </Button>
              <span>{field.estatePrice} ECTS</span>
              <Button
                variant="danger"
                onClick={() => sellHouse(dispatch, activePlayer, fields, idx2)}
                disabled={
                  activePlayer.properties[idx2].estateLevel === 0 ||
                  activePlayer.properties[idx2].mortgaged === true ||
                  !hasAllPropertiesFromThisColor(field, fields, properties)
                }
                onMouseDown={(e) => e.preventDefault()}
              >
              {" "}-{" "}
              </Button>
            </td>
          ) : (
            <td></td>
          )}
          <td>
            <Button
              variant={mortgageButtonColor(activePlayer, idx2)}
              onClick={() => mortgageProperty(dispatch, activePlayer, fields, idx2)}
              disabled={
                hasAnyPropertyFromThisColorOneOrMoreComputers(
                  field,
                  fields,
                  properties,
                  activePlayer
                ) === true || 
                (activePlayer.cash < field.mortgage  &&  activePlayer.properties[idx2].mortgaged === true)}
                onMouseDown={(e) => e.preventDefault()}> 
                {field.mortgage} ECTS
            </Button>
          </td>
          <td>
            <Button
              variant="danger"
              onClick={() => sellProperty(field.fieldID, activePlayer, fields, dispatch)}
              disabled={
                hasAnyPropertyFromThisColorOneOrMoreComputers(
                  field,
                  fields,
                  properties,
                  activePlayer
                ) === true || activePlayer.properties[idx2].mortgaged === true
              }
              onMouseDown={(e) => e.preventDefault()}
            >
            {" "}{field.price} ECTS
            </Button>
          </td>
        </tr>
      );
      idx++;
      return null;
  });
  return array;
}