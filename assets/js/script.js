// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks"));
let nextId = JSON.parse(localStorage.getItem("nextId"));
const submitButton = $('#submit');
const taskTitleInputEl = $('#taskTitle');
const taskDateInputEl = $('#taskDueDate');
const taskDescrInputEl = $('#taskDesc');
const modal = $('formModal');

console.log(submitButton);
// Save function 
function saveTaskCards(taskNotes){
  localStorage.setItem('tasks', JSON.stringify(taskNotes));
}

// Read task from localStorage and returns an array of tasks. 
function readFromStorage(){
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  // if (!=not) return an empty array
  if (!tasks){
    tasks =[];
  }
  return tasks;
}

// Todo: create a function to generate a unique task id
function generateTaskId() {

}

// Todo: create a function to create a task card
function createTaskCard(task) {

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {

}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  // event.preventDefault();
  // Read user's input from the form
  const taskTitle = taskTitleInputEl.val();
  const taskDate = taskDateInputEl.val();
  const taskDescrp = taskDescrInputEl.val().trim();
  console.log(taskTitle);
  // creates a new array
  const newTask = {
    title: taskTitle,
    date: taskDate,
    description: taskDescrp,
    status: 'to-do'
  };

  const taskNotes = readFromStorage();
  taskNotes.push(newTask);

  saveTaskCards(taskNotes);

  taskTitleInputEl.val('');
  taskDateInputEl.val('');
  taskDescrInputEl.val('');
  modal.setAttribute("aria-hidden", true);
}

// Todo: create a function to handle deleting a task
function handleDeleteTask(event){

}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {

}

submitButton.on('click', handleAddTask);
// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });
});
