//Get UI varibles
const getText = document.getElementById("getText")
const getJSON = document.getElementById("getJson")
const getAPI = document.getElementById("getAPI")
const output = document.getElementById("output")
const identifier = document.getElementById("identifier")

//Load event listeners
let loadEventlisteners = () => {

    //Get text
    getText.addEventListener('click', getTextData)

    //Get JSON
    getJSON.addEventListener('click', getJSONData)

    //Get API data
    getAPI.addEventListener('click', getAPIData)
}

//Get text Fetch function
let getTextData = () => {
    fetch('text.txt')
        .then((res) => {
            return (res.text())
        })
        .then((data) => {
            identifier.innerText = "Sample Text"
            output.innerHTML = data
        })
        .catch((err) => {
            output.innerHTML = err
        })
}

//Get JSON data from outside URL
let getJSONData = () => {
    fetch("http://api.icndb.com/jokes/random/3")
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            output.innerHTML = ''
            identifier.innerText = "Random Jokes"
            data.value.forEach((joke) => {
                output.innerHTML += `<li>${joke.joke}</li>`
            })
        })
        .catch((err) => {
            output.innerHTML = err
        })
}


//Get Quotes API
let getAPIData = () => {
    fetch('https://type.fit/api/quotes')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            const random = Math.floor(Math.random() * 1640)
            identifier.innerText = ""
            output.innerHTML = `<h3>${data[random].text}</h3> <br><hr> <p>${data[random].author}</p>`
        })
        .catch((err) => {
            output.innerText = err
        })
}


//Load event listeners
loadEventlisteners()