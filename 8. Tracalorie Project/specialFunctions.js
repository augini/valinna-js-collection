
//Function to create a new list item
const createNewMeal = function (meal, calory, id) {
  
  //Create li and span document elements
  const li = document.createElement("li");
 
  //Append inner text
  li.innerText = `${meal} ${calory}`;
 
  //Set class attribute
  li.setAttribute(
    "class",
    "list-group-item font-weight-bold d-flex justify-content-between"
  );
  li.setAttribute("id", id);
  
  //Create a new span element
  const span = document.createElement("span");
  span.setAttribute("class", "far fa-edit");
  li.appendChild(span);
  
  
  return li;
};

//Function to update the meal information
const updateMealField = function(id){
 
  //Get the meal from meals array
  const mealToUpdate = meals.find((meal) => {
    return meal.id === id;
  });
  console.log(mealToUpdate);
  //Set the input fields with meal information
  mealInput.value = mealToUpdate.meal;
  caloryInput.value = mealToUpdate.calory;

  //Handle click event on the updateBtn
  updateBtn.addEventListener("click", () => {
    meals.forEach((meal) => {
      if (meal.id === id) {
        meal.meal = mealInput.value;
        meal.calory = caloryInput.value;
        
        itemList.innerHTML = ''
        storeMealsfromLS()
      }
    });
    localStorage.setItem('meals', JSON.stringify(meals))
  });

  //Handle the click event on the deleteBtn
  deleteBtn.addEventListener("click", () => {
    console.log("object");
  });
};

//Store the array in local storage
const storeLocalStorage = function (meal, calory, id) {
  
  //Define an array to store storage values
  let meals = [];
  if (localStorage.getItem("meals") === null) {
    meals = [];
  } else {
    meals = JSON.parse(localStorage.getItem("meals"));
  }

  //Push the data into the array
  meals.push({ id: id, meal: meal, calory: calory });
  
  //Set the new variable in the local storage
  localStorage.setItem("meals", JSON.stringify(meals));
};

//Store meals from local storage
const storeMealsfromLS = function(){
  if(meals.length !== 0 ){
    meals.forEach((meal)=>{
      const newMeal = createNewMeal(meal.meal, meal.calory, meal.id)
      itemList.appendChild(newMeal)
      page.change(new standardState)
    })
  }
}


//Empty the input fields
const emptyInputFields = function () {
  mealInput.value = "";
  caloryInput.value = "";
};

//Function to set the warning alert
const setWarning = function () {
  warning.classList.remove("d-none");
  jumbotron.classList.add("border-warning");
};

//Function to remove the warning alert
const removeWarning = function () {
  warning.classList.add("d-none");
  jumbotron.classList.remove("border-warning");
};
