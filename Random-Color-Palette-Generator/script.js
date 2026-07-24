const generateBtn = document.getElementById("generate-btn");
const colorPalettes = document.querySelector(".color-palettes");

generateBtn.addEventListener("click",generateColorPalettes);

colorPalettes.addEventListener("click",function(e){
  if(e.target.classList.contains("copy-btn")){
    const hexColor = e.target.previousElementSibling.textContent;
    navigator.clipboard.writeText(hexColor)
   .then(() => {showSuccess(e.target)})
   .catch((error) => {console.log(error)})
  }
  else if(e.target.classList.contains("colors")){
    const hexColor = e.target.nextElementSibling.querySelector(".copy-text").textContent;
    navigator.clipboard
    .writeText(hexColor)
    .then(() => {showSuccess(e.target.nextElementSibling.querySelector(".copy-btn"))})
    .catch((error) => {console.log(error)})
  }
})

function showSuccess(element){
  element.classList.remove("far","fa-copy");
  element.classList.add("fas","fa-check");
  element.style.color = "#48bb78";

  setTimeout(()=>{
    element.classList.add("fas","fa-check");
    element.classList.add("far","fa-copy");
    element.style.color = "";
  },1500);
}
function generateColorPalettes(){
  const colorsArray = [];
  for(let i=0;i<5;i++){
    colorsArray.push(generateRandomColors());
  }
  displayColors(colorsArray);
}

function generateRandomColors(){
  const letters = "0123456789ABCDEF";
  let hexCode = "#";
  for(let i=0;i<6;i++){
    hexCode += letters[Math.floor(Math.random()*16)];
  }
  return hexCode;
}

function displayColors(colors){
  const colorsContainer = document.querySelectorAll(".colors-container");
  colorsContainer.forEach((box,index) => {
    const color = colors[index];
    const colorDiv = box.querySelector(".colors");
    const hexValue = box.querySelector(".copy-text");
    colorDiv.style.backgroundColor = color;
    hexValue.textContent = color;
  })
}