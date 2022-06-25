const hamMenu = document.querySelector("#bar-menu");
const sidebar = document.querySelector(".sidebar");
const btnClose = document.querySelector("#close-btn");

hamMenu.addEventListener("click", function () {
  sidebar.classList.toggle("clicked");
});

btnClose.addEventListener("click", function () {
  sidebar.classList.remove("clicked");
});
