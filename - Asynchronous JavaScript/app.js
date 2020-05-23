//Define UI variables
let output = document.getElementById("output")

//Load data function
let loadData = () => {
    const xhr = new XMLHttpRequest()

    //OPEN method to send a request
    xhr.open('GET', 'data.txt', true)

    //Use this method for spinners/loaders
    xhr.onprogress = function() {
        console.log(this.readyState)
    }

    //Use this method for error
    xhr.onerror = function() {
        console.log(this.readyState)
    }

    //Onload method to deal with the response data
    xhr.onload = function() {
        if (this.status === 200) {
            if (output.innerHTML === '') {
                output.style.display = "block"
                output.innerHTML = `<h1> ${ this.responseText } <h1>`
            } else {
                output.style.display = "none"
                output.innerHTML = ''
            }
        }
    }

    //Send the XHR request
    xhr.send()
}

//Add event listener to the button
document.getElementById("button").addEventListener('click', loadData)


// HTTP Statuses
// 200: "OK" 
// 403: "Forbidden"
// 404: "Not Found"