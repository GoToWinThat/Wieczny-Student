import {
  UpdatePlayerExpandProperty,
  UpdatePlayerDeleteProperty,
  UpdatePlayerMortgageProperty,
  UpdatePlayerCash
} from "../../services/monopolyService";

// Selling owned property:
export const sellProperty = (fieldId, activePlayer, fields, dispatch) => {
  let currentField = fields[fieldId];
  UpdatePlayerDeleteProperty(dispatch, activePlayer.name, fieldId);
  UpdatePlayerCash(dispatch, activePlayer.name, parseInt(currentField.price));
  // AddNewLog(
  //   dispatch,
  //   `${activePlayer.name} sprzedaje ${currentField.name} za ${currentField.price} ECTS.`
  // );
};

// Mortgaging / unmortgaging owned property:
export const mortgageProperty = (dispatch, activePlayer, fields, idx) => {
  let multiplier;
  let fieldId = activePlayer.properties[idx].fieldID;
  let currentField = fields[fieldId];
  if (activePlayer.properties[idx].mortgaged) {
    // Add new log about unmortgaging property:
    // AddNewLog(
    //   dispatch,
    //   `${activePlayer.name} odkupuje ${currentField.name} od banku za ${currentField.mortgage} ECTS.`
    // );
    multiplier = -1;
  } else {
    // Add new log about mortgaging property:
    // AddNewLog(
    //   dispatch,
    //   `${activePlayer.name} oddaje ${currentField.name} pod zastaw za ${currentField.mortgage} ECTS.`
    // );
    multiplier = 1;
  }

  // Mortgage / unmortgage property, update cash:
  UpdatePlayerMortgageProperty(dispatch, activePlayer.name, fieldId);
  UpdatePlayerCash(
    dispatch,
    activePlayer.name,
    parseInt(fields[fieldId].mortgage) * multiplier
  );
};

// Incrementing amount of computers if it is possible:
export const buyHouse = (dispatch, activePlayer, fields, idx) => {
  let fieldId = activePlayer.properties[idx].fieldID;
  if (activePlayer.properties[idx].estateLevel < 4) {
    // Add new log about expanding property:
    // AddNewLog(
    //   dispatch,
      `${activePlayer.name} rozbudowuje ${
        fields[activePlayer.properties[idx].fieldID].name
      }.` +
        ` - aktualny poziom: ${showEstateLevel(
          activePlayer.properties[idx].estateLevel + 1
        )}`
    //);

    // Expand property, decrement cash:
    UpdatePlayerExpandProperty(dispatch, activePlayer.name, fieldId, 1);
    UpdatePlayerCash(dispatch, activePlayer.name, -fields[fieldId].estatePrice);
  }
};

// Decrementing amount of computers if it is possible:
export const sellHouse = (dispatch, activePlayer, fields, idx) => {
  let fieldId = activePlayer.properties[idx].fieldID;
  if (activePlayer.properties[idx].estateLevel > 0) {
    // Add new log about "shrinking" property:
    // AddNewLog(
    //   dispatch,
    //   `${activePlayer.name} demontuje ${
    //     fields[activePlayer.properties[idx].fieldID].name
    //   }.` +
    //     ` - aktualny poziom: ${showEstateLevel(
    //       activePlayer.properties[idx].estateLevel - 1
    //     )}`
    // );

    // "Shrink" property, increment cash (50% of price):
    UpdatePlayerExpandProperty(dispatch, activePlayer.name, fieldId, -1);
    UpdatePlayerCash(
      dispatch,
      activePlayer.name,
      Math.floor(fields[fieldId].estatePrice / 2)
    );
  }
};
const showEstateLevel = (estateLevel) =>
  estateLevel < 4 ? `${estateLevel} PC` : `SERWER`;
