//Grab UI variables
const inputField = document.getElementById("inputField")
const userAvatar = document.getElementById("userAvatar")
const userStats = document.getElementById("userStats")
const userPersonalData = document.getElementById("userPersonalData")
const output = document.getElementById("output")
const repositoryListContainer = document.getElementById("repositoryListContainer")
const errorNotice = document.getElementById("errorNotice")

//Load event listeners
let loadEventlisteners = () => {
    inputField.addEventListener('keyup', getUser)
}

//Get user function to fetch the user information
async function getUser() {
    let username
    if (inputField.value != '') {
        username = inputField.value

        //Await until the data is resolved
        const response = await fetch(`https://api.github.com/users/${username}?client_id=698ef61c96e417319d81&client_secret=1e863cb10c802b58536c3c655c04d98494392aac`)

        //Only proceed if the response status is equal to 200
        if (response.status === 200) {
            //Wait until the data is parsed in JSON
            const data = await response.json()

            //Make a request to repositories URL
            const responseRepository = await fetch(`https://api.github.com/users/${username}/repos`)

            //Wait until the repository data is parsed to JSON
            const dataRepository = await responseRepository.json()

            //Get rid of the erro notice in case there is any
            errorNotice.style.display = "none"

            //Use the data that API returns
            userAvatar.src = data.avatar_url

            userPersonalData.innerHTML = `
                <div class="text-center">
                <!-- Title -->
                
                <h4 class="card-title mr-2 text-capitilize text-info"><strong>${data.login}</strong></h4>
                </div>
                <!-- Subtitle -->
                
                <ul class="d-flex flex-column justify-content-start font-weight-bold text-info" style="list-style: none;">
                <li><span class="text-dark">Company: </span>${data.company}</li>
                <li><span class="text-dark">Website: </span><a href="https://www.${data.blog}">${data.blog}</a></li>
                <li><span class="text-dark">Location: </span>${data.location}</li>
                </ul>
                
                <a type="button" href = "${data.html_url}" class="btn btn-dark btn-md btn-block"><i class="fab fa-github mr-3"></i>View Profile </a>
                
                </div>`

            userStats.innerHTML = `
                    <h4><span class="badge badge-light m-1 pr-2 pl-2">Public Repos: ${data.public_repos}</span></h4>
                    <h4><span class="badge badge-warning m-1 pr-2 pl-2">Public Gists: ${data.public_gists}</span></h4>
                    <h4><span class="badge badge-info m-1 pr-2 pl-2">Followers: ${data.followers}</span></h4>
                    <h4><span class="badge badge-success m-1 pr-2 pl-2">Following: ${data.following}</span></h4>
                    `

            //Get the first five repositories
            let counter = 0;
            const firstRepositories = dataRepository.filter((repository) => {
                counter = counter + 1
                if (counter <= 5) return repository
            })

            //Empty the the list from the previous data
            repositoryListContainer.innerHTML = ' '

            //Append the repository titles to the Unordered list 
            firstRepositories.forEach((repository) => {
                repositoryListContainer.innerHTML += `
                  <li class="border-top border-bottom border-light m-2 text-info"><a href = "${repository.html_url}">${repository.name}</a> </li>`
            })
            output.classList.remove('d-none')
            output.classList.add("d-flex")

        } else if (response.status) {
            errorNotice.style.display = "block"
            setTimeout(() => {
                errorNotice.style.display = "none"
            }, 5000)
        }
    } else {
        console.log("search field is empty")
    }
}

//Call event loaders
loadEventlisteners()