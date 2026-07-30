/*
FLOW:
Page Loads → Select All Cards & Lists → Attach Drag Events to Cards (dragstart, dragend) → Attach Drop Zone Events to Lists (dragenter, dragover, dragleave, drop)

User Starts Dragging a Card → dragStart() → Store Card ID using dataTransfer

User Drags Over a List → dragEnter() → Prevent Default → Highlight List ("over" Class)
                       → dragOver() → Prevent Default (Allows Dropping)

User Leaves the List Without Dropping → dragLeave() → Remove Highlight

User Drops the Card → dragDrop() → Get Card ID from dataTransfer → Find Card Element → Append Card to Target List → Remove Highlight

Drag Ends → dragEnd() → Log "Drag Ended"
*/
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