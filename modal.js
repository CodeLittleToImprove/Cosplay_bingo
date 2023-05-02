var bingoCells = document.querySelectorAll(".bingo-cell");
bingoCells.forEach(function(cell) {
    cell.addEventListener("long-press", function() {
        var modal = document.getElementById("myModal");
        modal.style.display = "block";
    });
});

const felder = document.querySelectorAll('td');
const modalWrapper = document.getElementById("modalWrapper");
const closeBtn = document.querySelector(".close-btn");
const modalContent = document.querySelector(".modal-content");

felder.forEach(feld => {
  feld.addEventListener("touchstart", function(event) {
    event.preventDefault();
    this.classList.add("selected");
    fetch("modal.html")
      .then(response => response.text())
      .then(data => {
        modalContent.innerHTML = data;
        modalWrapper.style.display = "block";
      })
      .catch(error => {
        console.log(error);
      });
  });

  feld.addEventListener("touchend", function(event) {
    event.preventDefault();
    this.classList.remove("selected");
    modalWrapper.style.display = "none";
  });
});

closeBtn.addEventListener("click", function() {
  modalWrapper.style.display = "none";
});
