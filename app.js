const identifier = document.getElementById('identifier')
const output  = document.getElementById('output')
const refreshBtn = document.getElementsByClassName('fa-sync')


//Get Quotes API
let getAPIData = () => {
  fetch('https://type.fit/api/quotes')
      .then((res) => {
          return res.json()
      })
      .then((data) => {
          const random = Math.floor(Math.random() * 1640)
          identifier.innerText = `${data[random].text}`
          output.innerHTML = `${data[random].author}`
      })
      .catch((err) => {
          output.innerText = err
      })
      e.preventDefault()
}

window.addEventListener("DOMContentLoaded", getAPIData) 
refreshBtn.addEventListener('click', getAPIData)