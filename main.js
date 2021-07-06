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
  createItem("Spinach", 1, "cup", 23, 3, 0.3, 8100, 93),
  createItem("Sweet Potato", 1, " med", 160, 2, 1, 9230, 46),
  createItem("Yogurt", 8, "oz", 230, 10, 3, 120, 343),
  createItem("Skim Milk", 1, "cup", 85, 8, 0, 500, 302),
  createItem("Whole Wheat Bread", 1, "slice", 65, 3, 1, 0, 24),
  createItem("Brown Rice", 1, "cup", 178, 3.8, 0.9, 0, 18),
  createItem("Watermelon", 1, "wedge", 110, 2, 1, 2510, 30),
  createItem("Papaya", 1, "g", 156, 2.4, 0.4, 7000, 80),
  createItem("Tuna In Water", 1, "lb", 575, 126.8, 3.6, 0, 73),
  createItem("Lobster", 1, "med", 405, 28.8, 26.6, 984, 190),
];

//Table data (client-side), starts with 0 because the default input value is 0
let tableData = [
  createItem("Spinach", 1, "cup", 0, 0, 0, 0, 0),
  createItem("Sweet Potato", 1, " med", 0, 0, 0, 0, 0),
  createItem("Yogurt", 8, "oz", 0, 0, 0, 0, 0),
  createItem("Skim Milk", 1, "cup", 0, 0, 0, 0, 0),
  createItem("Whole Wheat Bread", 1, "slice", 0, 0, 0, 0, 0),
  createItem("Brown Rice", 1, "cup", 0, 0, 0, 0, 0),
  createItem("Watermelon", 1, "wedge", 0, 0, 0, 0, 0),
  createItem("Papaya", 1, "g", 0, 0, 0, 0, 0),
  createItem("Tuna In Water", 1, "lb", 0, 0, 0, 0, 0),
  createItem("Lobster", 1, "med", 0, 0, 0, 0, 0),
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


function showModal() {
  let total = Array.from(document.querySelector("table").rows[tableData.length + 1].cells).slice(1);
  if (document.querySelector('#name').value === '') {
    $('#missingNameErrorModal').modal('show')
    return
  }
  $(`#${total.reduce((sum, v) => sum + +v.textContent, 0) > 0 ? 'confirmation' : 'error'}Modal`).modal('show');
}

window.jsPDF = window.jspdf.jsPDF;

function generatePDF(e) {
  const doc = new jsPDF();

  const header = Array.from(document.querySelector("table").rows[0].cells).map((x) => x.innerText);
  const body = Array.from(
    tableData
      .filter(x => x.calories > 0)
      .map((x) => {
        let data = Object.values(x);
        data.splice(1, 2, `${data[1]} ${data[2]}`);
        return data;
      })
  );
  let total = Array.from(document.querySelector("table").rows[tableData.length + 1].cells).slice(1).map(t => t.innerText);
  let footer = ['Total: ', '', ...total]


  let logo = new Image();
  logo.src = "images/logo.png";
  doc.addImage(logo, "PNG", 15, 5, 7, 7);

  doc.setFontSize(15);
  doc.setFont("helvetica", "normal");
  doc.text("Balmonte & Marilao", 23, 10);
  doc.setLineWidth(1);
  doc.setDrawColor(15, 15, 15);
  doc.line(15, 15, 195, 15, "DF");
  
  let userName = document.getElementById("name").value;

  doc.setFontSize(15);
  doc.setFont("helvetica", "normal");
  doc.text(`${userName}'s meal`, 15, 30);

  doc.setFontSize(25);
  doc.setFont("helvetica", "bold");
  doc.text(`Nutritional  Content`, 15, 40);

  doc.autoTable({
    head: [header],
    body: body,
    foot: [footer],
    startY: 46,
  });

  doc.save("Report-Summary.pdf");

}