const taskInput = document.querySelector(".todo-input input");
const addButton = document.querySelector(".todo-input button");
const taskList = document.querySelector(".task-list");
const taskCount = document.querySelector(".task-count");
const searchInput = document.querySelector(".search-box input");

loadTasks();
updateTaskCount();


loadTasks();
updateTaskCount();

// Add a new task 
addButton.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task.");
        return; 
    }

    createTask(taskText);
    
    saveTasks();

    updateTaskCount();

    taskInput.value = "";
    taskInput.focus();
});

// Create a task
function createTask(taskText, completed) {

    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
    <span class="task-text">${taskText}</span>

    <div class="task-actions">
       <button class="complete-btn">${completed ? "Undo" : "Complete"}</button>
       <button class="edit-btn">Edit</button>
       <button class="delete-btn">Delete</button>
    </div>
`;

taskList.appendChild(li);

}


// Complete or delete a task
taskList.addEventListener("click", function (event) {

    const clickedButton = event.target;

    // complete a task
    if (clickedButton.classList.contains("complete-btn")) {

        const task = clickedButton.closest("li");

        task.classList.toggle("completed");

        if (task.classList.contains("completed")) {
            clickedButton.textContent = "Undo";
        } else {
            clickedButton.textContent = "Complete";
        }

        saveTasks();
    }

    // Edit a task
    if (clickedButton.classList.contains("edit-btn")) {

        const task = clickedButton.closest("li"); 

        const taskText = task.querySelector(".task-text");

        const currentText = taskText.textContent; 

        const newText = prompt("Edit your task:", currentText);

        if (newText === null || newText.trim() === "") {
            return;
        } 

        taskText.textContent = newText.trim();
        saveTasks();
    }

    

    // delete a task
    if (clickedButton.classList.contains("delete-btn")) {

        const task = clickedButton.closest("li");

        task.remove();

        saveTasks();

        updateTaskCount();
    }
});

// Add task when Enter key is pressed
taskInput.addEventListener("keydown", function (event) {


    if (event.key === "Enter") {
        addButton.click();
   }
});

// save tasks to local storage
function saveTasks() {

    const tasks = [];
    const allTasks = taskList.querySelectorAll("li");

    allTasks.forEach(function (task) {
        const taskText = task.querySelector(".task-text").textContent;

        const Completed = task.classList.contains("completed");

        const taskData = {
            text: taskText,
            completed: Completed
        };

        tasks.push(taskData);
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

// load tasks from local storage
function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks === null) {
        return;
    }
    
    const tasks = JSON.parse(savedTasks);

    tasks.forEach(function (taskData) {
        createTask(taskData.text, taskData.completed);
    
    });
}

// Task counter
function updateTaskCount() {

    const totalTasks = taskList.querySelectorAll("li").length;

    if (totalTasks === 1) { 
        taskCount.textContent = "1 Task";
    }
    else {
        taskCount.textContent = `${totalTasks} Tasks`;
    
    }
}

// Search tasks
function searchTasks() {

    const searchText = searchInput.value.toLowerCase().trim();

    const allTasks = taskList.querySelectorAll("li");

    allTasks.forEach(function (task) {

        const taskText = task.querySelector(".task-text").textContent.toLowerCase();

        if (taskText.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });
}


// Search tasks
function searchTasks() {

    const searchText = searchInput.value.toLowerCase().trim();

    const allTasks = taskList.querySelectorAll("li");

    allTasks.forEach(function (task) {

        const taskText = task.querySelector(".task-text").textContent.toLowerCase();

        if (taskText.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }

    });
}


// Search while typing
searchInput.addEventListener("input", function () {

    searchTasks();

});