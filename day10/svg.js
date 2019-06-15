const svg = document.querySelector("svg");
const svgPath = document.querySelector("svg path");
const body = document.querySelector("body");
const h1 = document.querySelector("h1")
function changeMode() {
  svgPath.classList.toggle("dark");
  svg.classList.toggle("dark");
  body.classList.toggle("dark");
  h1.classList.toggle("dark")?h1.innerText = "Moon Mode":h1.innerText = "Sun Mode"

}
svg.addEventListener("click", changeMode);
