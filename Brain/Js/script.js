document.addEventListener("DOMContentLoaded", function () {
  const todoInput = document.getElementById("todo-input");
  const addBtn = document.getElementById("add-btn");
  const todoList = document.querySelector(".todo-list");
  const filterBtns = document.querySelectorAll(".filter-btn");

  addBtn.addEventListener("click", addTask);
  todoInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      addTask();
    }
  });

  todoList.addEventListener("click", handleTaskActions);

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", applyFilter);
  });

  function addTask() {
    const taskText = todoInput.value.trim();

    if (taskText === "") {
      return;
    }

    const newTask = createTaskElement(taskText);

    todoList.appendChild(newTask);

    todoInput.value = "";
    todoInput.focus();

    updateFilterView();
  }

  function createTaskElement(text) {
    const li = document.createElement("li");
    li.className = "todo-item";

    li.innerHTML = `
          <input type="checkbox" class="todo-checkbox">
          <span class="todo-text">${text}</span>
          <button class="delete-btn">Delete</button>
      `;

    return li;
  }

  function handleTaskActions(e) {
    const target = e.target;
    const taskItem = target.closest(".todo-item");

    if (!taskItem) return;

    if (target.classList.contains("todo-checkbox")) {
      taskItem.classList.toggle("completed", target.checked);
      updateFilterView();
    }

    if (target.classList.contains("delete-btn")) {
      taskItem.remove();
    }
  }

  function applyFilter(e) {
    filterBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    e.target.classList.add("active");

    updateFilterView();
  }

  function updateFilterView() {
    const activeFilter = document.querySelector(".filter-btn.active").id;
    const todos = document.querySelectorAll(".todo-item");

    todos.forEach((todo) => {
      const isCompleted = todo.classList.contains("completed");

      switch (activeFilter) {
        case "All":
          todo.style.display = "flex";
          break;
        case "Active":
          todo.style.display = isCompleted ? "none" : "flex";
          break;
        case "completed":
          todo.style.display = isCompleted ? "flex" : "none";
          break;
      }
    });
  }

  updateFilterView();
});
