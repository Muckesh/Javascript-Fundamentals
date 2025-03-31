const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("todo-list"); // Fixed incorrect ID

// Add a new to-do
function addTodo() {
    const todo = todoInput.value.trim(); // Fixed incorrect property

    if (todo === "") return; // Prevent adding empty tasks

    const li = document.createElement("li");
    li.textContent = todo;

    // Toggle completion
    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    // Remove on double-click
    li.addEventListener("dblclick", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);

    saveTasks(); // Save to localStorage
     // to Clear input field
    todoInput.value = "";
}

// Event listener for button click
addBtn.addEventListener("click", addTodo);

// Allow pressing "Enter" to add a to-do
todoInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        addTodo();
    }
});

// Load saved tasks from localStorage
document.addEventListener("DOMContentLoaded", loadTasks);

function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(taskText => createTaskElement(taskText));
}

// Function to create and append a task element
function createTaskElement(taskText) {
    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    li.addEventListener("dblclick", () => {
        li.remove();
        saveTasks();
    });

    taskList.appendChild(li);
}

// Save tasks in localStorage
function saveTasks() {
    const tasks = Array.from(taskList.children).map(li => li.textContent);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
