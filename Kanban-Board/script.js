const listItems = document.querySelectorAll(".lists");
const cardItems = document.querySelectorAll(".cards");

for(let card of cardItems){
  card.addEventListener("dragstart",dragStart);
  card.addEventListener("dragend",dragEnd);
}

function dragStart(e){
  e.dataTransfer.setData("text/plain",this.id);
}

function dragEnd(){
  console.log("Drag Ended");
}

for(let list of listItems){
  list.addEventListener("dragenter",dragEnter);
  list.addEventListener("dragover",dragOver);
  list.addEventListener("dragleave",dragLeave);
  list.addEventListener("drop",dragDrop);
}

function dragEnter(e){
  e.preventDefault();
  this.classList.add("over");
}

function dragOver(e){
  e.preventDefault();
}

function dragLeave(e){
  this.classList.remove("over");
}

function dragDrop(e){
  const id = e.dataTransfer.getData("text/plain");
  const card = document.getElementById(id);
  this.appendChild(card);
  this.classList.remove("over");
}