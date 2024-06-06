const inputBox = document.querySelector("#input-box");
const lists = document.querySelector(".list-container");

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
  saveData();
}

//cannot add eventlisteners to li as they have not yet be made
lists.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked"); //.toggle toggles between checked and unchecked
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove(); //element.remove() removes the element from the DOM
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("Data", lists.innerHTML);
  //saves all the innerHTML of listcontainer
}

function showTasks() {
  lists.innerHTML = localStorage.getItem("Data");
}
showTasks();
