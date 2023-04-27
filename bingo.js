let bingoBoard = [];

function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generateBoard() {
  const min = 1;
  const max = 75;
  const usedNumbers = new Set();

  for (let i = 0; i < 5; i++) {
    const row = [];
    for (let j = 0; j < 5; j++) {
      let randomNumber = generateRandomNumber(min, max);
      while (usedNumbers.has(randomNumber)) {
        randomNumber = generateRandomNumber(min, max);
      }
      usedNumbers.add(randomNumber);
      row.push(randomNumber);
    }
    bingoBoard.push(row);
  }
}

function saveState() {
  localStorage.setItem("bingoBoard", JSON.stringify(bingoBoard));
}

function loadState() {
  const savedBoard = localStorage.getItem("bingoBoard");
  if (savedBoard) {
    bingoBoard = JSON.parse(savedBoard);
  }
}

function initBoard() {
  const boardContainer = document.querySelector("#board");
  boardContainer.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    const rowContainer = document.createElement("div");
    rowContainer.classList.add("row");

    for (let j = 0; j < 5; j++) {
      const cellContainer = document.createElement("div");
      cellContainer.classList.add("cell");
      cellContainer.dataset.index = i * 5 + j;

      const numberContainer = document.createElement("div");
      numberContainer.classList.add("number");
      numberContainer.textContent = bingoBoard[i][j];

      cellContainer.appendChild(numberContainer);
      rowContainer.appendChild(cellContainer);
    }
    boardContainer.appendChild(rowContainer);
  }
}

let boardState = new Array(25).fill(false);

function markCell() {
  // toggle the 'marked' class on the clicked cell
  this.classList.toggle('marked');
  
  // get the index of the clicked cell
  const cellIndex = parseInt(this.dataset.index);
  
  // update the board state with the new marked status of the cell
  boardState[cellIndex] = this.classList.contains('marked');
  saveState();
}

// add click event listeners to all the cells
const cells = document.querySelectorAll('.cell');
cells.forEach(cell => cell.addEventListener('click', markCell));

function loadMarks() {
  const savedMarks = JSON.parse(localStorage.getItem("boardState")) || {};
  for (let i = 0; i < cells.length; i++) {
    if (savedMarks[i]) {
      cells[i].classList.add("marked");
      boardState[i] = true;
    }
  }
}

generateBoard();
saveState();
loadState();
initBoard();
loadMarks();
