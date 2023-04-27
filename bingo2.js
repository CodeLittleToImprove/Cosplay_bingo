const table = document.querySelector("#tblbingo");

let arr = Array.apply(null, { length: 26 }).map(Number.call, Number);

//elimate 0 from array
arr.shift()

shuffle(arr);

function shuffle(arr) {
	let currentIndex = arr.length, randomIndex;

	while (currentIndex != 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
	}

	return arr;
}
// console.log(arr);

let iterator = 0;

for (i = 0; i < 5; i++)
{
	let tr = document.createElement("tr");
	table.appendChild(tr);

	for(j = 0; j < 5; j++)
	{
		let td = document.createElement("td");
		td.id = arr[iterator].toString()
		td.style.height = "20%"
		td.style.width = "20%"
		td.classList.add("main-table-cell")

		let div = document.createElement("div")
		div.classList.add("cell-format")
		div.textContent = arr[iterator].toString()
		td.appendChild(div)
		tr.appendChild(td);
		iterator++;
	}
}

const cell = document.querySelectorAll(".main-table-cell");
let winningIterator = 0
cell.forEach(e => {
    e.addEventListener("click", () => {
        e.classList.add("strickout");

        if(matchWin()) {
            letter[winningIterator].classList.add("show-bingo");

            winningIterator++;
            if(winningIterator === 5) {
                alert('B I N G O')
                location.reload();
            }
        }
    })
})