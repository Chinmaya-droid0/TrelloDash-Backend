let draggedCard  = null;

function addTask(id){
    const input = document.getElementById(`${id}-input`);
    const taskText = input.value.trim();
    console.log(taskText);

    if(taskText === ""){
        return;
    }
    
const taskElement = createTaskElement(taskText);

document.getElementById(`${id}-tasks`).appendChild(taskElement);  

input.value = " ";
}

function createTaskElement(taskText){
    const taskElement2 = document.createElement("div");
    taskElement2.textContent = taskText;
    taskElement2.classList.add("task");
    taskElement2.setAttribute("draggable", true);
    taskElement2.addEventListener("dragstart",  dragStart);
    taskElement2.addEventListener("dragend", dragEnd);
    return taskElement2;
}

function dragStart(){
    this.classList.add("dragging");
    draggedCard = this;
}

function dragEnd(){
    this.classList.remove("dragging");
}

const columns = document.querySelectorAll(".column  .tasks");
 columns.forEach((column)=>{
    column.addEventListener("dragover", dragOver);
 }); 

 function dragOver(event){
    event.preventDefault();
    this.appendChild(draggedCard);
 }

