//Define constant variables 
let meals = localStorage.getItem('meals') === null ? [] : JSON.parse(localStorage.getItem('meals'))

//Define the UI elements
const itemForm = document.getElementById('itemForm')
const mealInput = document.getElementById('mealInput')
const caloryInput = document.getElementById('caloryInput')
const newItemBtn = document.getElementById('newItemBtn')
const sectionUL = document.getElementById('sectionUL')
const itemList = document.getElementById('itemList')
const totalCalories = document.getElementById('totalCalories')
const updateSectionBtn = document.getElementById("updateSectionBtn")
const jumbotron = document.querySelector('.jumbotron')
const updateBtn = document.getElementById('updateBtn')
const deleteBtn = document.getElementById('deleteBtn')
const clearAll = document.getElementById('clearAll')
const caloryCounter = document.getElementById("caloryCounter")


//warning alert for empty input
const warning = document.querySelector(".alert-warning")