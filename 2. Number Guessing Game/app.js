//Grab UI elements

//Get input form
let inputForm = document.getElementById("formInput")

//Get input field
let inputField = document.querySelector("#numberInput")

//Get guess number in HTML
let guessIndicator = document.querySelector("#guessIndicator")

//Wrong message indicator
let wrongIndicator = document.querySelector("#wrongIndicator")

//Get the submit button
let sbmtButton = document.querySelector("#submitButton")

//Get the guess text
let guessText = document.querySelector("#guessText")

//Generate the random number between 1 and 10
let generatedNumber = Math.floor((Math.random() * 9) + 1)

//Set the counter
var counter = 3;

//Load event listeners
let loadEventListeners = () => {
    inputForm.addEventListener('submit', checkNumber)
}


//Check the input number
let checkNumber = (e) => {
    if (inputField.value != '') {
        let randomNumber = parseInt(inputField.value)
        console.log(generatedNumber, randomNumber)
        if (counter > 1) {
            if (randomNumber === generatedNumber) {
                guessText.textContent = "Congratulations!!! You won the game"

                //Set the game function
                setGame()
            } else {
                counter = counter - 1
                wrongIndicator.textContent = randomNumber
                guessIndicator.textContent = counter
                guessText.style.display = "block"
            }
        } else {
            guessText.textContent = `No guess left. The correct answer was ${generatedNumber}.`
            guessText.style.display = "block"

            //Set the game function
            setGame()
        }
    } else {
        alert("Please enter a number")
    }
    e.preventDefault()
    inputField.value = ''
}

//Set the game function
let setGame = () => {
    inputField.placeholder = " "
    inputField.disabled = true
    sbmtButton.value = "Play again!"
    inputForm.removeEventListener('submit', checkNumber)
    inputForm.addEventListener('submit', playAgain)
}

//Play again function

let playAgain = () => {
    counter = 3
    sbmtButton.value = "Submit"
    sbmtButton.removeEventListener('DOMContentLoaded', playAgain)
    inputField.disabled = false
    inputField.placeholder = 'Enter your guess ...'
    guessText.innerHTML = '<p id="guessText" style="display: none;">You have <span id="guessIndicator"></span> guesses left </p>'
    guessText.style.display = "none"
}


//Call load event listener function
loadEventListeners()