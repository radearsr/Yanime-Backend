const hamMenu = document.querySelector("#bar-menu");
const sidebar = document.querySelector(".sidebar");
const btnClose = document.querySelector("#close-btn");


hamMenu.addEventListener("click", () => {
  sidebar.classList.toggle("clicked");
});

btnClose.addEventListener("click", () => {
  sidebar.classList.remove("clicked");
});
