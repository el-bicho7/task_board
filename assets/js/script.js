let taskList = JSON.parse(localStorage.getItem("tasks"));
const projectDisplayEl = $('#project-display');
const submitButton = $('#submit');
const taskTitleInputEl = $('#taskTitle');
const taskDateInputEl = $('#taskDueDate');
const taskDescrInputEl = $('#taskDesc');
// Save function 
function saveTaskCards(taskNotes){
  localStorage.setItem('tasks', JSON.stringify(taskNotes));
}

// Read task from localStorage and returns an array of tasks. 
function readFromStorage(){
  // if (!:not) return an empty array
  if (!taskList){
    taskList =[];
  }
  return taskList;
} 

// Todo: create a function to generate a unique task id
function generateTaskId() {
  const randomId = Math.random().toString(36).substring(2,9);
  return randomId;
}

// Todo: create a function to create a task card
function createTaskCard(task) {
  // This will create a new div with a class, and attributes
  const card = $('<div>')
    .addClass('card task-card draggable my-3')
    .attr('data-id', task.id);
  // This will create a div and be a header
  const cardHeader = $('<div>')
    .addClass('card-header h4').text(task.title);
  // This will create a div and be the body
  const cardBody = $('<div>').addClass('card-body');
  // This will be th content of the body 
  const cardDescription = $('<p>').addClass('card-text').text(task.description);
  const cardDue = $('<p>').addClass('card-text').text(`Due date: ${task.date}`);
  // Delete card button
  const cardDeleteButton = $('<div>')
    .addClass('btn btn-danger delete')
    .text('Delete')
    .attr('data-id', task.id);
  cardDeleteButton.on('click', handleDeleteTask);

  // Give color to the cards depending on the due date and status not done
  // Red: Overdue, Yellow: Near Deadline
  if (task.date && task.status !== 'done') {
    const today = dayjs();
    const dueDateCard = dayjs(task.date);
    // If the dueDate is bigger than de today the background-color will  be yellow otherwise red
    const isThesame = today.isSame(dueDateCard, 'day');
    const isAfter = today.isAfter(dueDateCard, 'day');

    if (isThesame){
      card.addClass('bg-warning text-white');
    } else if (isAfter) {
      card.addClass('bg-danger text-white');
      cardDeleteButton.addClass('border-white')
    }};

  
  // Here i'm adding the cardDescription and the cardDue to the Body
  cardBody.append(cardDescription, cardDue, cardDeleteButton);
  // Here i'm adding the Header and the Body to the card
  card.append(cardHeader, cardBody);

  return card

}

// Todo: create a function to render the task list and make cards draggable
function renderTaskList() {
  // reads the local storage for tasks
  const taskNotes = readFromStorage();
  // empties existing tasks cards out of the lanes because it renders on every function.
  const todoList = $('#todo-cards');
  todoList.empty();
  
  const inProgress = $('#in-progress-cards');
  inProgress.empty();

  const doneList = $('#done-cards');
  doneList.empty();

  // iterate all the taskNotes to see the status of each 
  for (let task of taskNotes){
    // if the status is to-do it will append in #todo-cards (creating the task card with the task)
    if (task.status === 'to-do'){
      todoList.append(createTaskCard(task));
    } else if (task.status === 'in-progress'){
      inProgress.append(createTaskCard(task));
    } else if (task.status === 'done'){
      doneList.append(createTaskCard(task));
    }
  };

  // Draggable
  $( ".draggable" ).draggable({
    revert: 'true',
    helper: 'clone'

  });
}

// Todo: create a function to handle adding a new task
function handleAddTask(event){
  event.preventDefault();
  // Read user's input from the form
  const taskTitle = taskTitleInputEl.val();
  const taskDate = taskDateInputEl.val();
  const taskDescrp = taskDescrInputEl.val().trim();
  // const idCard = generateTaskId();
  // creates a new array with title, date, description, and status elements.
  const newTask = {
    title: taskTitle,
    date: taskDate,
    description: taskDescrp,
    status: 'to-do',
    id: generateTaskId()
  };

  // Reads the localstorage if storage empty returns []
  const taskNotes = readFromStorage();
  // pushing newtasks to localstorage
  taskNotes.push(newTask);
  // save the last updates
  saveTaskCards(taskNotes);
  // renders tasklist with the changes
  renderTaskList();
  // empties the values of the input
  taskTitleInputEl.val('');
  taskDateInputEl.val('');
  taskDescrInputEl.val('');

}

// Todo: create a function to handle deleting a task
function handleDeleteTask(){
  // This will select the id of the clicked delete option
  const taskId = $(this).attr('data-id');
  const taskNotes = readFromStorage();

  // The arrow function specifies the action to be performed for each element
  taskNotes.forEach((task) => {
    if (task.id === taskId){
      // Splice Adds and/or removes array elements
      // array.aplice(index,howmany, item1,..,itemx)
      // index: position, howmany: number of items to be removed,itex: new element
      // indexOf: returns the first index at which a given element can be found in the array
      taskNotes.splice(taskNotes.indexOf(task),1);
    }
  });

  // Saves the array that's resulting in the slice
  saveTaskCards(taskNotes);
  // Renders tasklist with the changes
  renderTaskList();
}

// Todo: create a function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  // Read tasks from localStorage
  const taskNotes = readFromStorage();
  // Get the ID of th task that's moving
  const taskId = ui.draggable[0].dataset.id;
  // Get the id of the lane that the card was dropped
  const newStatus = event.target.id;
  
  for (let task of taskNotes){
    // Find the task card by the id 
    if (task.id === taskId) {
      // update the status of the moved card
      task.status = newStatus;
    }
  };
  localStorage.setItem('tasks', JSON.stringify(taskNotes));

  renderTaskList();
}

// This will add the task
submitButton.on('click', handleAddTask);

// This will run the delete handleDeleteTask always when the pages runs so you can delete the task easier
projectDisplayEl.on('click', handleDeleteTask)



// Todo: when the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $('#taskDueDate').datepicker({
    changeMonth: true,
    changeYear: true,
  });

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop,
  });

});
