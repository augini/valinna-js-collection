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
      { meal: "steak", calory: '100', id: 1234 },
      { meal: "plov", calory: '123', id: 1324 },
    ],
    currentItem: '',
    totalCalories: ' '
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
      //Generate a random ID
      let id = Math.floor(Math.random() * 11111);

      //Update the items data structure
      item.id = id;

      data.items.push(item)

      return item
    },
  };
})();

//UI Controllers
const UICtrl = (function () {
  //Private methods

  const createListItem = (item) => {
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

    return li
  }

  //Pupulate the list item in the DOM with list items
  const populateItemList = function (items) {
    items.forEach(function (item) {
      const HTMLitem = createListItem(item)
      itemList.appendChild(HTMLitem);
    });
  };

  //Public methods
  return {
    populateItemList: (items) => {
      populateItemList(items)
    },

    createListItem: (item) => {
      createListItem(item)
    },

    getItemInput: () => {
      if (mealInput.value !== "" && caloryInput.value !== "") {
        return {
          meal: mealInput.value,
          calory: caloryInput.value
        }
      } else {
        //Toggle the warning alert function
        setWarning();
        setTimeout(() => {
          removeWarning();
        }, 5000);
      }
    },
    setWarning: () => {
      warning.classList.remove("d-none");
      jumbotron.classList.add("border-warning");
    },
    removeWarning: () => {
      warning.classList.add("d-none");
      jumbotron.classList.remove("border-warning");
    },
  };
})();

//App Controller
const AppCtrl = (function (itemCtrl, UICtrl) {
  //Private Methods

  //Create event loaders function
  const eventLoader = function () {
    itemForm.addEventListener("submit", addNewItem);
  };

  const addNewItem = (e) => {
    //Get the input meal
    let newMealInput = UICtrl.getItemInput()

    //Add to the list data structure
    const newItem = itemCtrl.addNewItem(newMealInput)

    //Append with HTML
    const HTMLItem = UICtrl.createListItem(newItem)

    itemList.appendChild(HTMLItem)
    e.preventDefault()
  }


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
