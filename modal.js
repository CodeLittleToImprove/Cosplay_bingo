const modalBtn = document.getElementById("modalBtn");
const modalWrapper = document.getElementById("modalWrapper");
const closeBtn = document.getElementById("closeBtn");

modalBtn.addEventListener("click", function() {
  modalWrapper.style.display = "block";
});

closeBtn.addEventListener("click", function() {
  modalWrapper.style.display = "none";
});
