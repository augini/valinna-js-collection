//Storage controllers

//Item Controllers
const itemCtrl = (function () {
  const item = function (meal, calory, id) {
    this.meal = meal;
    this.calory = calory;
    this.id = id;
  };

  const data = {
    items: [
      { meal: "steak", calory: "100", id: 1234 },
      { meal: "plov", calory: "123", id: 1324 },
    ],
    currentItem: "",
    totalCalories: 0,
  };

  //Public Methods
  return {
    logData: function () {
      return data;
    },
    getItems: function () {
      return data.items;
    },
    addNewItem: (item) => {
      data.totalCalories = data.totalCalories + item.calory;

      //Set total calories
      caloryCounter.innerText = data.totalCalories
      
      //Push the new meal
      data.items.push(item);
    },
    getCaloryCounter: () => {
      return data.totalCalories;
    },
  };
})();

//UI Controllers
const UICtrl = (function () {
  //Private methods

  const createListItem = (item) => {

    //Remove the display none from section list
    sectionUL.classList.remove('d-none')
    
    //Create a li element in the DOM
    const li = document.createElement("li");

    //Append inner text
    li.innerText = `${item.meal} ${item.calory}`;

    //Set class attribute
    li.setAttribute(
      "class",
      "list-group-item font-weight-bold d-flex justify-content-between"
    );
    li.setAttribute("id", item.id);

    //Create a new span element
    const span = document.createElement("span");
    span.setAttribute("class", "far fa-edit");
    li.appendChild(span);

    return li;
  };

  //Pupulate the list item in the DOM with list items
  const populateItemList = function (items) {
    items.forEach(function (item) {
      const HTMLitem = createListItem(item);
      itemList.appendChild(HTMLitem);
    });
  };

  //Set alert function
  const setWarning = () => {
    warning.classList.remove("d-none");
    jumbotron.classList.add("border-warning");
  };

  //Remove alert warning
  const removeWarning = () => {
    warning.classList.add("d-none");
    jumbotron.classList.remove("border-warning");
  };

  //Function to clear input fields
  const clearInputField = () => {
    mealInput.value = "";
    caloryInput.value = "";
  };

  //Function to input a new item
  const getItemInput = (e) => {
    if (mealInput.value !== "" && caloryInput.value !== "") {
      //Generate a random ID
      let id = itemCtrl.getItems().length + 1;

      //Generate a new object
      let inputMeal = {
        meal: mealInput.value,
        calory: parseInt(caloryInput.value),
        id: id,
      };

      //Push to the meals array
      itemCtrl.addNewItem(inputMeal);

      //Append HTML to meal input
      itemList.appendChild(createListItem(inputMeal));

      //Clear input fields
      clearInputField();

      //Prevent the default behaviour
      e.preventDefault();
    } else {
      //Toggle the warning alert function
      setWarning();
      setTimeout(() => {
        removeWarning();
      }, 5000);
    }
  };

  //Public methods
  return {
    populateItemList: (items) => {
      populateItemList(items);
    },

    createListItem: (item) => {
      createListItem(item);
    },

    getItemInput: (e) => {
      getItemInput(e);
    },

    setWarning: () => {
      setWarning();
    },
    removeWarning: () => {
      setWarning();
    },
  };
})();

//App Controller
const AppCtrl = (function (itemCtrl, UICtrl) {
  //Private Methods

  //Create event loaders function
  const eventLoader = function () {
    itemForm.addEventListener("submit", UICtrl.getItemInput);
  };

  //Public methods
  return {
    init: function () {
      console.log("Initializing the app....");

      //Fetch items from the data structure
      const items = itemCtrl.getItems();

      //Populate the item list
      UICtrl.populateItemList(items);

      //Initialize the evetn loader
      eventLoader();
    },
  };
})(itemCtrl, UICtrl);

AppCtrl.init();
