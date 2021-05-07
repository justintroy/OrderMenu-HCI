class MealItem {
  constructor(name, quantity, unit, calories, protein, fat, vitaminA, calcium) {
    Object.assign(this, { name, quantity, unit, calories, protein, fat, vitaminA, calcium })
  }
}

function createItem() {
  return new MealItem(...arguments)
}

//Item data for reference ex. items database (Order matters) 
let items = [
  createItem("spinach", 1, "cup", 23, 3, 0.3, 8100, 93),
  createItem("sweetPotato", 1, " med", 160, 2, 1, 9230, 46),
  createItem("yogurt", 8, "oz", 230, 10, 3, 120, 343),
  createItem("skimMilk", 1, "cup", 85, 8, 0, 500, 302),
  createItem("wholeWheatBread", 1, "slice", 65, 3, 1, 0, 24),
  createItem("brownRice", 1, "cup", 178, 3.8, 0.9, 0, 18),
  createItem("watermelon", 1, "wedge", 110, 2, 1, 2510, 30),
  createItem("papaya", 1, "g", 156, 2.4, 0.4, 7000, 80),
  createItem("tunaInWater", 1, "lb", 575, 126.8, 3.6, 0, 73),
  createItem("lobster", 1, "med", 405, 28.8, 26.6, 984, 190),
];

//Table data (client-side), starts with 0 because the default input value is 0
let tableData = [
  createItem("spinach", 1, "cup", 0, 0, 0, 0, 0),
  createItem("sweetPotato", 1, " med", 0, 0, 0, 0, 0),
  createItem("yogurt", 8, "oz", 0, 0, 0, 0, 0),
  createItem("skimMilk", 1, "cup", 0, 0, 0, 0, 0),
  createItem("wholeWheatBread", 1, "slice", 0, 0, 0, 0, 0),
  createItem("brownRice", 1, "cup", 0, 0, 0, 0, 0),
  createItem("watermelon", 1, "wedge", 0, 0, 0, 0, 0),
  createItem("papaya", 1, "g", 0, 0, 0, 0, 0),
  createItem("tunaInWater", 1, "lb", 0, 0, 0, 0, 0),
  createItem("lobster", 1, "med", 0, 0, 0, 0, 0),
];

//itemID == row
function updateTable(itemID) {
  let tableRow = document.querySelector("table").rows[itemID + 1].cells;
  let lastTableRow = document.querySelector("table").rows[tableData.length + 1].cells;

  //update individual row
  tableRow[2].innerText = `${tableData.find((item) => item.name === items[itemID].name).calories}`
  tableRow[3].innerText = `${tableData.find((item) => item.name === items[itemID].name).protein}`
  tableRow[4].innerText = `${tableData.find((item) => item.name === items[itemID].name).fat}`
  tableRow[5].innerText = `${tableData.find((item) => item.name === items[itemID].name).vitaminA}`
  tableRow[6].innerText = `${tableData.find((item) => item.name === items[itemID].name).calcium}`

  //update total row
  lastTableRow[1].innerText = +(tableData.reduce((a, b) => a + b.calories, 0)).toFixed(2);
  lastTableRow[2].innerText = +(tableData.reduce((a, b) => a + b.protein, 0)).toFixed(2);
  lastTableRow[3].innerText = +(tableData.reduce((a, b) => a + b.fat, 0)).toFixed(2)
  lastTableRow[4].innerText = +(tableData.reduce((a, b) => a + b.vitaminA, 0)).toFixed(2);
  lastTableRow[5].innerText = +(tableData.reduce((a, b) => a + b.calcium, 0)).toFixed(2);
}

function updateTableData(id, value) {
  let tableIndex = tableData.findIndex((i) => i.name === id); //Table data (client-side)
  let itemID = items.findIndex((i) => i.name === id); //Item data ex. items database

  tableData[tableIndex].quantity = +(items[itemID].quantity * value).toFixed(2);
  tableData[tableIndex].calories = +(items[itemID].calories * value).toFixed(2);
  tableData[tableIndex].protein = +(items[itemID].protein * value).toFixed(2);
  tableData[tableIndex].fat = +(items[itemID].fat * value).toFixed(2);
  tableData[tableIndex].vitaminA = +(items[itemID].vitaminA * value).toFixed(2);
  tableData[tableIndex].calcium = +(items[itemID].calcium * value).toFixed(2);

  updateTable(itemID);
}

function resetAllValues() {
  tableData.forEach((item, itemID) => {
    item.quantity = 0;
    item.calories = 0;
    item.protein = 0;
    item.fat = 0;
    item.vitaminA = 0;
    item.calcium = 0;

    updateTable(itemID);
  });
}
