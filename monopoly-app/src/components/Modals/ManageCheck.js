// Checking if player has all properties from one color - only then he/she can expand it
export const hasAllPropertiesFromThisColor = (field, fields, properties) => {
  let color = field.color;
  let ownedProperties = 0;
  for (let i = 0; i < properties.length; i++)
    if (fields[properties[i].fieldID].color === color) ownedProperties++;

  let totalProperties = 0;
  for (let i = 0; i < fields.length; i++)
    if (fields[i].color === color) totalProperties++;

  return ownedProperties === totalProperties;
};

// Checking if player has at least one computer in his fields - you can't expand
// field when you don't have properties from one color so you can't also sell
// property if something has already been expanded
export const hasAnyPropertyFromThisColorOneOrMoreComputers = (
  field,
  fields,
  properties,
  activePlayer
) => {
  if (!hasAllPropertiesFromThisColor(field, fields, properties)) return false;

  let color = field.color;
  let thisFieldFromPlayersPropertiesList;
  for (let i = 0; i < properties.length; i++) {
    if (properties[i].color === color) {
      thisFieldFromPlayersPropertiesList = activePlayer.properties.find(
        (element) => element.fieldID === properties[i].fieldID
      );
      if (thisFieldFromPlayersPropertiesList.estateLevel > 0) return true;
    }
  }
  return false;
};

// Checking if player has at least one field mortgaged - you can't expand 
// field when you don't have properties from one color; mortgaged property is
// not yours for now
export const isAnyPropertyFromThisColorMortgaged = ( field, fields, properties, activePlayer) => {
  if (!hasAllPropertiesFromThisColor(field, fields, properties)) return false;

  let color = field.color;
  let thisFieldFromPlayersPropertiesList;
  for (let i = 0; i < properties.length; i++)
  {
      if (properties[i].color === color)
      {
          thisFieldFromPlayersPropertiesList = activePlayer.properties.find(
              element => element.fieldID === properties[i].fieldID);
          if (thisFieldFromPlayersPropertiesList.mortgaged === true) return true;
      }
  }
  return false;
}

export const hasAnyComputer = (activePlayer) => 
{
    let result = false;
    activePlayer.properties.forEach(field => {
        if(field.estateLevel > 0) result = true;
    })
    return result;
}

export const hasAnyProperties = (activePlayer) => 
{
    if(activePlayer.properties.length > 0) return true;
    return false;
}