window.addEventListener("load", () => {
	const table = document.querySelector("#tblbingo");
	const letter = document.querySelectorAll(".letters-bingo");
});
	const winningPositions = [
	  [0, 1, 2, 3, 4],
	  [5, 6, 7, 8, 9],
	  [10, 11, 12, 13, 14],
	  [15, 16, 17, 18, 19],
	  [20, 21, 22, 23, 24],
	  [0, 5, 10, 15, 20],
	  [1, 6, 11, 16, 21],
	  [2, 7, 12, 17, 22],
	  [3, 8, 13, 18, 23],
	  [4, 9, 14, 19, 24],
	];
  
	let arr;
  
	if (localStorage.getItem("bingoBoard")) {
	  arr = JSON.parse(localStorage.getItem("bingoBoard"));
	} else {
	  arr = Array.from({ length: 25 }, (_, i) => i + 1);
	  shuffle(arr);
	}
  
	let iterator = 0;
  
	for (i = 0; i < 5; i++) {
	  let tr = document.createElement("tr");
	  table.appendChild(tr);
  
	  for (j = 0; j < 5; j++) {
		let td = document.createElement("td");
		td.id = arr[iterator].toString();
		td.style.height = "100px";
		td.style.width = "100px";
		td.classList.add("main-table-cell");
  
		let div = document.createElement("div");
		div.classList.add("cell-format");
		div.textContent = arr[iterator].toString();
		td.appendChild(div);
		tr.appendChild(td);
		iterator++;
	  }
	}
  
	const cell = document.querySelectorAll(".main-table-cell");
	let winningIterator = 0;
  
	cell.forEach((e) => {
	  e.addEventListener("click", () => {
		e.classList.add("strickout");
  
		if (matchWin()) {
		  letter[winningIterator].classList.add("show-bingo");
  
		  winningIterator++;
		  if (winningIterator === 5) {
			alert("B I N G O");
			location.reload();
		  }
		}
	  });
	});
  
	function matchWin() {
	  const cell = document.querySelectorAll(".main-table-cell");
  
	  return winningPositions.some((combination) => {
		let ite = 0;
		combination.forEach((index) => {
		  if (cell[index].classList.contains("strickout")) ite++;
		});
  
		if (ite === 5) {
		  let indexWin = winningPositions.indexOf(combination);
		  winningPositions.splice(indexWin, 1);
		}
  
		return combination.every((index) => {
		  return cell[index].classList.contains("strickout");
		});
	  });
	}
  
	// Save the state of the board when refreshed
	window.addEventListener("beforeunload", () => {
	  const cell = document.querySelectorAll(".main-table-cell");
	  const hasStrickout = Array.from(cell).some((c) =>
		c.classList.contains("strickout")
	  );
  
	  if (!hasStrickout) {
		const cellState = Array.from(cell).map((c) => {
		  if (c.classList.contains("strickout")) {
			return 1;
		  } else {
			return 0;
		  }
		});
		localStorage.setItem("cellState", JSON.stringify(cellState));
    }
  });

  // Load the state of the board if available
  window.addEventListener("DOMContentLoaded", () => {
    const cellState = localStorage.getItem("cellState");
    if (cellState) {
      const cell = document.querySelectorAll(".main-table-cell");
      const state = JSON.parse(cellState);
      state.forEach((s, i) => {
        if (s === 1) {
          cell[i].classList.add("strickout");
        }
      });
    }
  });

  