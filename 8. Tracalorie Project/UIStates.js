//Initial state => none item has been added neither created
//Standard state => some items have been created
//Update state => items are being updated

const UIState = function(){
  let currentState = new initialState(this)

  this.init = function(){
    this.change(initialState)
  }

  this.change = function(state){
    currentState = state
  }
}

//Initalstate
const initialState = function(page){
  sectionUL.classList.add('d-none')
  updateSectionBtn.classList.remove('d-flex')
  updateSectionBtn.classList.add('d-none')
}

//Standard State
const standardState = function(page){
  sectionUL.classList.remove('d-none')
  updateSectionBtn.classList.remove('d-flex')
  updateSectionBtn.classList.add('d-none')
  newItemBtn.classList.remove('d-none')
}

//Update state
const updateState = function(page){
  updateSectionBtn.classList.add('d-flex')
  updateSectionBtn.classList.remove('d-none')
  newItemBtn.classList.add('d-none')
}



//Define the new variable from UIState
const page = new UIState()

//Init the state
page.init()