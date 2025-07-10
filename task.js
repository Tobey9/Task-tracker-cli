const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "tasks.json");

function loadTasks() {
  if (!fs.existsSync(FILE)) {
    fs.writeFileSync(FILE, "[]");
  }
  const data = fs.readFileSync(FILE, "utf8");
  try {
    return JSON.parse(data);
  } catch (err) {
    console.log("Error: tasks.json");
    fs.writeFileSync(FILE, "[]");
    return [];
  }
}

function saveTasks(tasks) {
  fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));
}

function now() {
  return new Date().toISOString();
}

function addTask(description) {
  const tasks = loadTasks();
  const newTask = {
    id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
    description,
    status: "todo",
    createdAt: now(),
    updatedAt: now(),
  };
  tasks.push(newTask);
  saveTasks(tasks);
  console.log(`Task added ID ${newTask.id}`);
}

function listTasks(status = null) {
  const tasks = loadTasks();
  const filtered = status ? tasks.filter((t) => t.status === status) : tasks;

  if (filtered.length === 0) {
    console.log("No tasks found");
    return;
  }

  filtered.forEach((task) => {
    console.log(
      `[${task.status.toUpperCase()}] ${task.id} : ${
        task.description
      } (Created: ${task.createdAt})`
    );
  });
}

function updateTask(id, newDesc) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return console.log("Task not found");

  task.description = newDesc;
  task.updatedAt = now();
  saveTasks(tasks);
  console.log("Task updated.");
}

function deleteTask(id) {
  let tasks = loadTasks();
  const originalLength = tasks.length;
  tasks = tasks.filter((t) => t.id !== Number(id));
  if (tasks.length === originalLength) return console.log("Task is not found");

  saveTasks(tasks);
  console.log("Task deleted.");
}

function markStatus(id, status) {
  const tasks = loadTasks();
  const task = tasks.find((t) => t.id === Number(id));
  if (!task) return console.log("Task not found");

  task.status = status;
  task.updatedAt = now();
  saveTasks(tasks);
  console.log(`Task marked as ${status}`);
}

const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case "add":
    addTask(args[1]);
    break;
  case "update":
    updateTask(args[1], args[2]);
    break;
  case "delete":
    deleteTask(args[1]);
    break;
  case "mark-in-progress":
    markStatus(args[1], "in-progress");
    break;
  case "mark-done":
    markStatus(args[1], "done");
    break;
  case "list":
    listTasks(args[1]);
    break;
  default:
    console.log("Unknown Command");
}
