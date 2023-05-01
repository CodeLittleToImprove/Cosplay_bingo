// Define the size of the bingo board
const rows = 5;
const cols = 5;

// Define the list of words for the bingo board
const words = [
  "nature",
  "drawing",
  "length",
  "inspector",
  "excitement",
  "instruction",
  "sample",
  "control",
  "membership",
  "refrigerator",
  "committee",
  "surgery",
  "negotiation",
  "goal",
  "location",
  "definition of meoww meow meow meo meow",
  "computer",
  "historian",
  "investment",
  "night",
  "writer",
  "safety",
  "pollution",
  "year",
  "thanks"
];

// Generate an array of unique random numbers
let numbers = [];
while (numbers.length < rows * cols) {
  let num = Math.floor(Math.random() * words.length);
  if (!numbers.includes(num)) {
    numbers.push(num);
  }
}

// Fill the bingo board with the generated words
let index = 0;
let table = document.getElementById("bingo-board");
for (let row of table.rows) {
  for (let cell of row.cells) {
    cell.textContent = words[numbers[index]];
    index++;
  }
}

// Handle clicks on the cells
for (let row of table.rows) {
  for (let cell of row.cells) {
    cell.addEventListener("click", () => {
      cell.classList.toggle("marked");
      saveState();
    });
  }
}

// Save and load the state of the bingo board
function saveState() {
  let state = [];
  for (let row of table.rows) {
    for (let cell of row.cells) {
      let cellState = { marked: cell.classList.contains("marked"), word: cell.textContent };
      state.push(cellState);
    }
  }
  localStorage.setItem("bingoState", JSON.stringify(state));
}

function loadState() {
  let state = JSON.parse(localStorage.getItem("bingoState"));
  if (state) {
    let index = 0;
    for (let row of table.rows) {
      for (let cell of row.cells) {
        let cellState = state[index];
        if (cellState.marked) {
          cell.classList.add("marked");
        } else {
          cell.classList.remove("marked");
        }
        cell.textContent = cellState.word;
        index++;
      }
    }
  }
}

loadState();

// Handle click on reset button
let resetBtn = document.getElementById("reset-button");
resetBtn.addEventListener("click", () => {
  // Generate a new array of unique random numbers
  let newNumbers = [];
  while (newNumbers.length < rows * cols) {
    let num = Math.floor(Math.random() * words.length);
    if (!newNumbers.includes(num)) {
      newNumbers.push(num);
    }
  }
  // Fill the bingo board with the new generated words
  let index = 0;
  for (let row of table.rows) {
    for (let cell of row.cells) {
      cell.textContent = words[newNumbers[index]];
      cell.classList.remove("marked");
      index++;
    }
  }
  // Save the new state
  saveState();
});

/* Custom Function to adjust font size based on word length and cell height based on number of rows */
function adjustCellSize() {
    let cells = document.getElementsByTagName("td");
    let cellHeight = table.offsetHeight / rows; // calculate height of each cell based on number of rows

    for (let cell of cells) {
        let wordLength = cell.textContent.length;

        if (wordLength <= 5) {
            cell.style.fontSize = "30px";
        } else if (wordLength <= 8) {
            cell.style.fontSize = "24px";
        } else {
            cell.style.fontSize = "20px";
        }

        // cell.style.height = cellHeight + "px"; // set height of each cell
    }
}

/* Apply custom function to all td elements on page load */
window.onload = function () {
    const tds = document.querySelectorAll("td");
    for (const td of tds) {
        adjustCellSize(td);
    }
};
