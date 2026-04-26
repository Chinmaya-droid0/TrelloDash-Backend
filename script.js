function addTask(id){
    const input = document.getElementById(`${id}-input`);
    const taskText = input.value;
    console.log(taskText);

    if(taskText === " "){
        return;
    }
    
const taskElement = createTaskElement(taskText);

document.getElementById(`${id}-tasks`).appendChild(taskElement);  

input.value = " ";
}

function createTaskElement(taskText){
    const taskElement= document.createElement("div");
    taskElement.textContent = taskText;
    return taskElement;
}