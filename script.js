//let draggedCard  = null;
 let rightClickedCard = null;

document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage );
function addTask(id){
    const input = document.getElementById(`${id}-input`);
    const taskText = input.value.trim();
    console.log(taskText);

    if(taskText === ""){
        return;
    }

const taskDate = new Date().toLocaleString();
const taskElement = createTaskElement(taskText, taskDate);

document.getElementById(`${id}-tasks`).appendChild(taskElement);  
upadteTasksCount(id);
saveTasksToLocalStorage(id, taskText, taskDate);
input.value = "";
}

function createTaskElement(taskText, taskDate){
    const taskElement2 = document.createElement("div");
    taskElement2.innerHTML= `<span>${taskText}</span><br><small class="time">${taskDate}</small>`;
    taskElement2.classList.add("task");
    taskElement2.setAttribute("draggable", true);
    taskElement2.addEventListener("dragstart",  dragStart);
    taskElement2.addEventListener("dragend", dragEnd);
    taskElement2.addEventListener("contextmenu", function(event) {
        event.preventDefault();
        rightClickedCard = this;
        showContextMenu(event.pageX, event.pageY);
    })
    return taskElement2;
}

function dragStart(){
    this.classList.add("dragging");
    //draggedCard = this;
}

function dragEnd(){
    this.classList.remove("dragging");
    ["todo", "doing", "done"].forEach((id) => {
        upadteTasksCount(id);
        updateLocalStorage();
    })
}

const columns = document.querySelectorAll(".column  .tasks");
 columns.forEach((column)=>{
    column.addEventListener("dragover", dragOver);
 }); 
 
 function dragOver(event){
    event.preventDefault();
    const draggedCard = document.querySelector(".dragging");
    //this.appendChild(draggedCard); 
    const afterElement = getDragAfterElement(this, event.pageY);

    if(afterElement === null){
        this.appendChild(draggedCard);
    }else{
        this.insertBefore(draggedCard, afterElement); 
    }
 } 

 function getDragAfterElement(container, y) {
      let result;
      return result;
 }

 const contextmenu = document.querySelector(".context-menu");
function showContextMenu(x, y) {
    contextmenu.style.left = `${x}px`;
    contextmenu.style.top = `${y}px`;
    contextmenu.style.display= "block" ;
}

document.addEventListener("click", ()=>{
    contextmenu.style.display= "none";
})

function editTask(){
     if(rightClickedCard != null){
        const newTaskText = prompt("Edit Task -", rightClickedCard.textContent);

    if(newTaskText !== ""){
        rightClickedCard.querySelector("span").textContent = newTaskText;
        updateLocalStorage();
    }
     }
     
}

function deleteTask() {
    if(rightClickedCard !== null){
      const parentColumn = rightClickedCard.closest(".column");
      rightClickedCard.remove();
      if(parentColumn){
        upadteTasksCount(parentColumn.id);
        updateLocalStorage();
      }
    }
}

function upadteTasksCount(id) {
    const count = document.querySelectorAll(`#${id}-tasks .task`).length;
    document.getElementById(`${id}-count`).textContent = count;
}


function saveTasksToLocalStorage(id, taskText, taskDate){
    const tasks = JSON.parse(localStorage.getItem(id)) || [];
    tasks.push({text: taskText, date: taskDate});
    localStorage.setItem(id, JSON.stringify(tasks));
}

function loadTasksFromLocalStorage(){
     ["todo", "doing", "done"].forEach((id)=>{
        const tasks= JSON.parse(localStorage.getItem(id)) || [];
        tasks.forEach(({text, date})=>{
            const taskElement = createTaskElement(text, date);
            document.getElementById(`${id}-tasks`).appendChild(taskElement);
        });
     });
}
function updateLocalStorage(){
    ["todo", "doing", "done"].forEach((id)=>{
        const tasks = [];
        document.querySelectorAll(`#${id}-tasks .task`).forEach((card)=>{
            const taskText = card.querySelector("span").textContent;
            const taskDate = card.querySelector("small").textContent;
            tasks.push({text: taskText, date: taskDate});
        });
        localStorage.setItem(id, JSON.stringify(tasks));
    });
}