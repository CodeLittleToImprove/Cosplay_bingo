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
	"night life",
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

let modal = document.getElementById("context_Modal");
let closeButton = document.querySelector(".close");

// Function, to open ContextModal 
function openContextModal(title, text, button1Text, button2Text, link) {
	document.getElementById("modal-title").textContent = title;
	document.getElementById("modal-text").textContent = text;
	document.getElementById("modal-button1").textContent = button1Text;
	document.getElementById("modal-button2").textContent = button2Text;
	let button2 = document.getElementById("modal-button2");
	button2.textContent = button2Text;
	if (link) {
		button2.addEventListener("click", () => {
			window.location.href = link;
		});
	}
	modal.style.display = "block";
}

// // Event-Listener, to close ContextModal
// closeButton.addEventListener("click", () => {
// 	modal.style.display = "none";
// });

// Funktion zum Schließen des Modal-Fensters
function closeModal() {
	var modals = document.querySelectorAll('.modal');
	modals.forEach(function(modal) {
	  modal.style.display = 'none';
	});
  }
  
  // Event-Listener, to close Modal
  var closeButtons = document.querySelectorAll('.close');
  closeButtons.forEach(function(closeButton) {
	closeButton.addEventListener('click', closeModal);
  });

  
function showExplanationModal() {
	let explanationModal = document.getElementById("bingo-modal");
	console.log("inShowExplanationmodal");
	explanationModal.style.display = "block";
}

window.addEventListener("DOMContentLoaded", function () {
	let explanationModalShown = localStorage.getItem("explanationModalShown");
	if (!explanationModalShown) {
		showExplanationModal();
		localStorage.setItem("explanationModalShown", true);
		console.log("auf true gesetzt");
	}
});

// Prüfen, ob das Modal-Fenster bereits angezeigt wurde
var bingoModalShown = localStorage.getItem('bingoModalShown');

if (!bingoModalShown) {
  // Modal-Fenster anzeigen
  var bingoModal = document.getElementById('bingo-modal');
  bingoModal.style.display = 'block';
  
  // Event-Listener für das Schließen des Modals hinzufügen
  var bingoModalCloseButton = document.getElementById('bingo-modal-close');
  bingoModalCloseButton.addEventListener('click', function() {
    bingoModal.style.display = 'none';
    localStorage.setItem('bingoModalShown', true);
  });
}


// Handle clicks on the cells
for (let row of table.rows) {
	for (let cell of row.cells) {
		let touchstartX = null;
		let touchstartY = null;
		let touchendX = null;
		let touchendY = null;

		// Handle click event
		cell.addEventListener("click", () => {
			if (!isMobileDevice()) {
				cell.classList.toggle("marked");
				saveState();
			}
		});

		// Handle double click event
		cell.addEventListener("dblclick", () => {
			let word = cell.textContent;
			let link = "https://www.instagram.com/explore/tags/" + encodeURIComponent(word.replace(/\s/g, ""));
			openContextModal("Bingo Wort", "Definition von " + word, "Button 1", "Button 2", link);

		});

		// Handle touch events
		cell.addEventListener("touchstart", (event) => {
			if (isMobileDevice()) {
				touchstartX = event.changedTouches[0].clientX;
				touchstartY = event.changedTouches[0].clientY;
			}
		});

		cell.addEventListener("touchend", (event) => {
			if (isMobileDevice()) {
				touchendX = event.changedTouches[0].clientX;
				touchendY = event.changedTouches[0].clientY;

				// Calculate touch distance
				let touchDistance = Math.sqrt(Math.pow(touchendX - touchstartX, 2) + Math.pow(touchendY - touchstartY, 2));

				if (touchDistance < 20) { // erhöhter Schwellenwert für Single-Touch-Event
					// Single touch event detected
					if (!cell.classList.contains("marked")) {
						cell.classList.add("marked");
						saveState();
					} else {
						cell.classList.remove("marked");
						saveState();
					}
				} else if (touchDistance < 100) { // erhöhter Schwellenwert für Double-Touch-Event
					// Double touch event detected
					let word = cell.textContent;
					openContextModal("Bingo Wort", "Definition von " + word, "Button 1", "Button 2");
				}
			}
		});
	}
}



// Check if the device is a mobile device
function isMobileDevice() {
	return typeof window.orientation !== "undefined" || navigator.userAgent.indexOf('Android') !== -1 || navigator.userAgent.indexOf('iOS') !== -1;
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
