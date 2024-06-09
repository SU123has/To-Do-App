function init() {
  dragula([document.querySelector("#tasksList")]); //initializes list-container as dragula container
  showTasks(); //fetching stored data
}

const inputBox = document.querySelector("#input-box");
const lists = document.querySelector(".list-container");
const clearbtn = document.querySelector("#clearAll");

//pressing enter in input submits the task
inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    addTask();
  }
});

function addTask() {
  if (inputBox.value === "") {
    alert("Empty task! Write something..");
  } else {
    let newTask = document.createElement("li");
    let newTaskText = document.createElement("p");
    newTaskText.innerText = inputBox.value;
    newTask.appendChild(newTaskText);
    lists.appendChild(newTask);
    let cross = document.createElement("span");
    cross.innerHTML = "\u00d7";
    newTask.appendChild(cross);
  }
  inputBox.value = "";
  updateCounts();
  saveData();
}

//cannot add eventlisteners to li as they have not yet be made
lists.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); //.toggle toggles between checked and unchecked
      updateCounts();
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); //element.remove() removes the element from the DOM
      updateCounts();
      saveData();
    }
  },
  false
);

clearbtn.addEventListener("click", () => {
  if (confirm("Are you sure you want to clear all tasks?")) {
    lists.innerHTML = "";
    updateCounts();
    saveData();
    console.log("All Tasks cleared!");
  } else {
    console.log("Action canceled!");
  }
});

function saveData() {
  localStorage.setItem("Data", lists.innerHTML);
  const tasks = document.querySelectorAll(".list-container li");
  const completedTasks = document.querySelectorAll(
    ".list-container li.checked"
  );
  const pendingCount = tasks.length - completedTasks.length;

  localStorage.setItem("completedCount", completedTasks.length);
  localStorage.setItem("pendingCount", pendingCount);
}

function showTasks() {
  lists.innerHTML = localStorage.getItem("Data");
  document.querySelector("#completedTasksVal").innerText =
    localStorage.getItem("completedCount") || 0;
  document.querySelector("#activeTasksVal").innerText =
    localStorage.getItem("pendingCount") || 0;
  updateCounts();
}

function updateCounts() {
  const tasks = document.querySelectorAll(".list-container li");
  const completedTasks = document.querySelectorAll(
    ".list-container li.checked"
  );
  const pendingCount = tasks.length - completedTasks.length;

  document.querySelector("#completedTasksVal").innerText =
    completedTasks.length;
  document.querySelector("#activeTasksVal").innerText = pendingCount;
}
