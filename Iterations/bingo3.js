// working !!

// Define the size of the bingo board
const rows = 5;
const cols = 5;

// Generate an array of unique random numbers
let numbers = JSON.parse(localStorage.getItem("bingoNumbers")) || generateNumbers();
if (!localStorage.getItem("bingoNumbers")) {
    localStorage.setItem("bingoNumbers", JSON.stringify(numbers));
}

// Fill the bingo board with the generated numbers
let index = 0;
let table = document.getElementById("bingo-board");
for (let row of table.rows) {
    for (let cell of row.cells) {
        cell.textContent = numbers[index];
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
            if (cell.classList.contains("marked")) {
                state.push(1);
            } else {
                state.push(0);
            }
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
                if (state[index] === 1) {
                    cell.classList.add("marked");
                } else {
                    cell.classList.remove("marked");
                }
                index++;
            }
        }
    }
}

function generateNumbers() {
    let numbers = [];
    while (numbers.length < rows * cols) {
        let num = Math.floor(Math.random() * (rows * cols)) + 1;
        if (!numbers.includes(num)) {
            numbers.push(num);
        }
    }
    return numbers;
}

loadState();

