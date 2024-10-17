// Constants
let todos = JSON.parse(globalThis.localStorage.getItem("todos")) || [];
let newTask = "";

// Cached elements
const inputEl = document.querySelector(".input__field");
const countEl = document.getElementById("cnter");
const scrollEl = document.querySelector(".scroll");
const addBtnEl = document.querySelector(".btn");
const deleteBtnEl = document.getElementById("delete__button");

// Utility functions
const saveToStorage = () => {
  globalThis.localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTaskCount = () => {
  countEl.textContent = todos.length;
};

// Task Management Functions
const addTask = () => {
  if (!newTask.trim()) return; // Ignore empty tasks
  todos.push({ text: newTask.trim(), completed: false });
  newTask = "";
  inputEl.value = ""; // Reset input field
  renderTasks();
  saveToStorage();
};

const toggleTask = (idx) => {
  todos[idx].completed = !todos[idx].completed;
  renderTasks();
  saveToStorage();
};

const editTask = (idx) => {
  const currEl = document.getElementById(`todo__p-${idx}`);
  const currText = todos[idx].text;
  
  // Replace task text with an input field for editing
  const editInputEl = document.createElement("input");
  editInputEl.value = currText;
  currEl.replaceWith(editInputEl);
  
  editInputEl.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      todos[idx].text = editInputEl.value.trim();
      renderTasks();
      saveToStorage();
    }
  });
  editInputEl.focus();
};

const renderTasks = () => {
  scrollEl.innerHTML = ""; // Clear task list

  todos.forEach((todo, idx) => {
    const { completed, text } = todo;
    const taskItem = document.createElement("li");

    taskItem.innerHTML = `
      <div class="todo__container">
        <input id="todo__checkbox-${idx}" type="checkbox" ${completed ? "checked" : ""} />
        <p class="${completed ? "completed" : "notcomplete"}" id="todo__p-${idx}">${text}</p>
      </div>
    `;

    scrollEl.appendChild(taskItem);
    
    // Attach event listeners
    const checkbox = document.getElementById(`todo__checkbox-${idx}`);
    checkbox.addEventListener("change", () => toggleTask(idx));

    const taskText = document.getElementById(`todo__p-${idx}`);
    taskText.addEventListener("click", () => editTask(idx));
  });

  updateTaskCount();
};

const deleteAllTasks = () => {
  todos = [];
  saveToStorage();
  renderTasks();
};

// Event Handlers
const handleInputKeyup = (e) => {
  newTask = e.target.value;
  if (e.key === "Enter") {
    addTask();
  }
};

// Event Listeners
document.addEventListener("DOMContentLoaded", renderTasks);
inputEl.addEventListener("keyup", handleInputKeyup);
addBtnEl.addEventListener("click", addTask);
deleteBtnEl.addEventListener("click", deleteAllTasks);