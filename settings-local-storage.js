if (localStorage.getItem("colour-theme") == null) {
  localStorage.setItem("colour-theme", "forest-green");
}
let colorTheme;
if (localStorage.getItem("colour-theme") != null) {
  colorTheme = localStorage.getItem("colour-theme");
}

const bodyElement = document.querySelector(".body-element");
bodyElement.dataset.theme = colorTheme;


