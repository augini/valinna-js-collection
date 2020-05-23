//Add the event loader
const UIEventLoader = function () {
  document.addEventListener('DOMContentLoaded', storeMealsfromLS)
  itemForm.addEventListener("submit", addNewItem)
  itemList.addEventListener('click', updateItemState)
  clearAll.addEventListener('click', emptyList)
};

//Function to handle new item event
const addNewItem = (e) => {
  if (mealInput.value !== "" && caloryInput.value !== "") {
    //Generate a random ID for each meal in the array
    let id = Math.floor(Math.random() * 11111);

    //Call the newMeal function
    const newMeal = createNewMeal(mealInput.value, caloryInput.value, id.toString())
    
    //Store in local storage
    storeLocalStorage(mealInput.value, caloryInput.value, id.toString())
    
    //Set the state of input fields to empty
    emptyInputFields()
    
    //Append the meal to list
    console.log(newMeal);
    itemList.appendChild(newMeal)
    removeWarning()
    
    //Apply the standard State to the page
    page.change(new standardState);

  } else {

    //Toggle the warning alert function
    setWarning();
    
    //Toggle the function with timeout
    setTimeout(() => {
      removeWarning();
    }, 5000);

  }
  e.preventDefault();
};

//Function to handle update state event
const updateItemState = function(e){
  if(e.target.classList.contains('far')){
    updateMealField(e.target.parentElement.id)
    page.change(new updateState)
  }
}

//Empty List function
const emptyList = function(e){
  //Initiate the first state
  if(confirm("Are you sure you want to delete all meals?")){
    itemList.innerHTML = ' '
    page.change(new initialState)
  }
  //Clear the local storage
  localStorage.clear()
}


//Call the event loader
UIEventLoader();
