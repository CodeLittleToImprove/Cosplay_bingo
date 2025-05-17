// let language;
// if (navigator.languages.includes("de") || navigator.languages.includes("de-DE")) {
// 	// console.log("deutsch");
// 	language = "de";
// }
// else {
// 	// console.log("english");
// 	language = "en";
// }

let language = "en";
let link;
// Define the size of the bingo board
const rows = 5;
const cols = 5;

const words = [
	{ de: "Oldschool Anime Character", en: "old-school anime character" },
	{ de: "Computergenerierte Stimme", en: "computer generated voice" },
	{ de: "Dein Lieblingscharakter ", en: "your favorite character" },
	{ de: "Hintergrundcharakter", en: "background character" },
	{ de: "Geschlechtertausch", en: "genderswap" },
	{ de: "Gruppencosplay", en: "group cosplay " },
	{ de: "Toter Charakter", en: "dead Character" },
	{ de: "Eltern Rip", en: "parents rip" },
	{ de: "Wem ist sicher kalt", en: "someone who is definitely cold" },
	{ de: "Charakter den du nicht kennst", en: "a character that you dont know" },
	{ de: "Flauschig", en: "fluffy" },
	{ de: "Kawaii", en: "kawaii" },
	{ de: "Wem ist sicher warm", en: "someone who is definitely warm" },
	{ de: "Physikalisch unmögliche Haare", en: "physical impossible hair" },
	{ de: "Gender Fragezeichen", en: "What is your Gender" },
	{ de: "Zeitreisender", en: "timetraveller" },
	{ de: "Anime dass dich zum weinen gebracht hat", en: "anime that made you cry" },
	{ de: "Dein Anime Schwarm", en: "your anime crush" },
	{ de: "Cosplay Zwilling oder gleiches Shirt ", en: "cosplay twin or same shirt" },
	{ de: "Cosplayer mit Kontaktlinsen", en: "cosplayer with contact lenses" },
	{ de: "Cyberpunk Edgerunner", en: "Cyberpunk Edgerunner" },
	{ de: "Bocchi the rock", en: "Bocchi the rock" },
	{ de: "Satoru Gojo", en: "Satoru Gojo" },
	{ de: "Aufwendiges Cosplay", en: "High effort Cosplay" },
	{ de: "Spy X Family", en: "Spy X Family" }
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
		let lang = language === "de" ? "de" : "en";
		cell.textContent = words[numbers[index]][lang];
		index++;
	}
}


function copyToClipboard(text) {
	// Create a temporary input element
	let tempInput = document.createElement("textarea");
	tempInput.value = text;
	document.body.appendChild(tempInput);

	// Select the text and copy it
	tempInput.select();
	document.execCommand("copy");

	// Remove the temporary input element
	document.body.removeChild(tempInput);
}

// Function, to open ContextModal 
let modal = document.getElementById("context_Modal");
let closeButton = document.querySelector(".close");

const button2 = document.getElementById("modal-button2");

function handleButton2Click() {
	// console.log("test");
	const url = button2.dataset.url;
	if (!url) {
		return;
	}
	window.open(url, '_blank');
}

button2.addEventListener("click", () => handleButton2Click());


function openContextModal(title, text, button1Text, button2Text, url, word, lang) {
	document.getElementById("modal-title").textContent = title;
	document.getElementById("modal-text").textContent = text;
	document.getElementById("modal-button1").textContent = button1Text;
	button2.textContent = button2Text;
	button2.dataset.url = url;
	// // Add a click event listener to the first button
	// let button1 = document.getElementById("modal-button1");
	// button1.addEventListener("click", function () {
	// 	copyToClipboard("#" + word + "JD");
	// 	button1.style.backgroundColor = "red";
	// 	setTimeout(function () {
	// 		button1.style.backgroundColor = "";
	// 	}, 500);
	// });
	modal.style.display = "block";
}

// Function to close any modal window
function closeModal() {
	var modals = document.querySelectorAll('.modal');
	modals.forEach(function (modal) {
		modal.style.display = 'none';
	});
}

// Event-Listener, to close any modal window
var closeButtons = document.querySelectorAll('.close');
closeButtons.forEach(function (closeButton) {
	closeButton.addEventListener('click', closeModal);
});

// Event-Listener, to close any modal window when clicking outside of it
window.addEventListener('click', function (event) {
	var modals = document.querySelectorAll('.modal');
	modals.forEach(function (modal) {
		if (event.target == modal) {
			closeModal();
		}
	});
});

// Function to show the tutorial modal window
function showTutorialModal() {
	var tutorialModal = document.getElementById("tutorial-modal");
	tutorialModal.style.display = "block";

	// Event-Listener, to close tutorial modal window
	var tutorialModalCloseButton = document.getElementById("tutorial-modal-close");
	tutorialModalCloseButton.addEventListener("click", function () {
		tutorialModal.style.display = "none";
		localStorage.setItem("tutorialModalShown", true);
	});
}

// When site is finished loaded, check if tutorial modal window already shown
window.addEventListener("DOMContentLoaded", function () {
	var tutorialModalShown = localStorage.getItem("tutorialModalShown");
	if (!tutorialModalShown) {
		showTutorialModal();
	}
});

// Open Tutorial Modal via helper Button 
const helperButton = document.getElementById("tutorial-button");
helperButton.addEventListener("click", () => {
	showTutorialModal();;
});

function handleHashtagGeneration(cell) {
	let word = cell.textContent.trim();
	let lang = language === "de" ? "de" : "en";
	let index = words.findIndex(w => w[lang] === word);
	let hashtag = words[index].en;
	link = "https://www.instagram.com/explore/tags/" + encodeURIComponent(hashtag.replace(/\s+/g, "")) + "JD";
	switch (lang) {
		case 'de':
			openContextModal(hashtag, "Verwenden Sie diesen Hashtag auf Instagram #" + hashtag.replace(/\s+/g, "") + "JD", "Hashtags in die Zwischenablage kopieren", "Diesen Hashtag auf Instagram ansehen", link, word);
			break;
		default:
			openContextModal(hashtag, "Use this Hashtag on Instagram #" + hashtag.replace(/\s+/g, "") + "JD", "Copy hashtags to clipboard", "View this Hashtag on Instagram", link, word);
	}


	// // Handle click events for modal buttons old
	// let button1 = document.getElementById("modal-button1");
	// button1.addEventListener("click", function () {
	// 	copyToClipboard("#" + hashtag + "JD");
	// 	button1.style.backgroundColor = "red";
	// 	setTimeout(function () {
	// 		button1.style.backgroundColor = "";
	// 	}, 1000);
	// });

	// Add a click event listener to the first button
	let button1 = document.getElementById("modal-button1");
	button1.addEventListener("click", function () {
		let textToCopy = "#" + hashtag.replace(/\s+/g, "") + "JD #" + "cosplaybingojapanday";
		copyToClipboard(textToCopy);
		console.log(textToCopy);
		button1.style.backgroundColor = "red";
		setTimeout(function () {
			button1.style.backgroundColor = "";
		}, 1000);
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
			handleHashtagGeneration(cell);
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
					handleHashtagGeneration(cell);
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
			cell.textContent = words[newNumbers[index]][language];
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
