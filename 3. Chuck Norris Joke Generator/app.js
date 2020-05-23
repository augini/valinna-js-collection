//Get UI variables
let numberInput = document.getElementById("jokesNumberInput")
let jokesForm = document.getElementById("jokesForm")
let UI = document.getElementById("jokesList")

//Event listener loades 
let loadEventListeners = () => {
    jokesForm.addEventListener('submit', getJokes)
}

//Get jokes from API
let getJokes = (e) => {
    // Declare new XMLHTTP request
    const xhr = new XMLHttpRequest()
    let numberOfJokes;
    if (numberInput.value == '') {
        numberOfJokes = 1
    } else {
        numberOfJokes = numberInput.value
    }
    //Open the API URL
    xhr.open("GET", `https://api.icndb.com/jokes/random/${numberOfJokes}`, true)

    //Load function to load the result output
    xhr.onload = function() {
        UI.innerHTML = ''
        if (this.status === 200) {
            let outputJokes = JSON.parse(this.responseText)
            outputJokes.value.forEach((joke) => {
                UI.innerHTML += `<li>${joke.joke}</li>`
            })
        } else {
            UI.innerHTML = '<li>Something went wrong</li>'
        }
    }

    //Send the request
    xhr.send()

    e.preventDefault()
}

loadEventListeners()