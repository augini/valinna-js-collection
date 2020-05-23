//Define UI variables 
const formUI = document.querySelector("#task-form")
const newTask = document.querySelector("#task")
const filterInput = document.querySelector("#filter")
const uList = document.querySelector(".collection")
const clearBtn = document.querySelector(".clear-tasks")

//Get current time
let today = new Date();

//Format present date and time
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
let dateTime = date + ' ' + time;

//Load all event listeners
let loadEventListeners = () => {
    //Add Dom loaded event listener
    document.addEventListener("DOMContentLoaded", storeTasksfromLS);
    // Add task event
    formUI.addEventListener('submit', createTask);
    //Add remove task event listener
    uList.addEventListener('click', removeTask);
    //Add clear tasks event listener
    clearBtn.addEventListener('click', clearTasks);
    //Add filter input event listener
    filterInput.addEventListener('keyup', filterTasks);
}

let storeTasksfromLS = () => {
    //Load tasks array from the local storage
    if (localStorage.getItem("tasks") === null) {
        var existingTasks = []
    } else {
        var existingTasks = JSON.parse(localStorage.getItem("tasks"))
    }
    existingTasks.forEach((task) => {
        //Append tasks to UL collection
        appendTask(task.task, task.time)
    })
}

//Add task event function
let createTask = (e) => {
    if (newTask.value === '') {
        alert("Add a new task");
    } else {
        let task = newTask.value

        //Stringify the datetime input
        let dateTimeIndicator = dateTime

        //Append task
        appendTask(task, dateTimeIndicator)

        //Store in Local Storage
        storeinLocalStorage(task, dateTimeIndicator)

        //Clear input
        newTask.value = '';
    }
    e.preventDefault();
}

//Append the task 
let appendTask = (task, dateTimeArgument) => {
    //Create element
    const li = document.createElement('li')

    //Add class
    li.className = 'collection-item'

    //Create text node and append to li
    li.appendChild(document.createTextNode(task))

    //Create a new link element
    const link = document.createElement('a')

    //Add class
    link.className = 'delete-item secondary-content'

    //Add icon
    link.innerHTML = "<i class='fa fa-remove'> </i>"

    //Append link to LI
    li.appendChild(link)

    //Create link element
    let timeIndicator = document.createElement('a')

    //Append time content
    timeIndicator.textContent = dateTimeArgument

    //Attach class name
    timeIndicator.className = 'secondary-content time-indicated '

    //Append time indicator
    li.appendChild(timeIndicator)

    //Append the li to UL
    uList.appendChild(li)
}

//Add remove function
let removeTask = (e) => {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm("Are you sure ? ")) {
            e.target.parentElement.parentElement.remove()

            //Grab the timeIndicator to remove
            let timeToReplace = e.target.parentElement.parentElement.lastChild.innerText

            //Remove timeIndicator from the textContent
            let taskToRemove = e.target.parentElement.parentElement.textContent.replace(timeToReplace, '').trim()

            //Remove the task from local storage
            removeTaskFromLS(taskToRemove)
        }
    }
}

//Remove from LS function
let removeTaskFromLS = (taskToRemove) => {
    if (localStorage.getItem('tasks') != null) {
        let existingTasks = JSON.parse(localStorage.getItem('tasks'))
        existingTasks.forEach((task, index) => {
            if (taskToRemove === task.task.trim()) {
                existingTasks.splice(index, 1)
            }
        })

        localStorage.setItem('tasks', JSON.stringify(existingTasks))
    }
}

//Add clear tasks function
let clearTasks = (e) => {
    if (confirm("Are you sure you want to delete all tasks? ")) {
        uList.innerHTML = " "
    }
    // Clear local storage
    localStorage.clear()
}

//Add filter function 
let filterTasks = (e) => {
    const text = e.target.value.toLowerCase()

    document.querySelectorAll(".collection-item").forEach((task) => {
        const item = task.firstChild.textContent
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = "block"
        } else {
            task.style.display = "none"
        }
    })
}

//Store in local storage
let storeinLocalStorage = (task, dateTimeArgument) => {
    let tasks = []
    if (localStorage.getItem('tasks') === null) {
        tasks = []
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'))
    }
    tasks.push({
        'task': task,
        'time': dateTimeArgument
    })
    localStorage.setItem("tasks", JSON.stringify(tasks))
}


// Load all event listeners
loadEventListeners();