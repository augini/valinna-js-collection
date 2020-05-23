//Grab UI variables
const inputField = document.getElementById("inputField")
const userAvatar = document.getElementById("userAvatar")
const userStats = document.getElementById("userStats")
const userPersonalData = document.getElementById("userPersonalData")
const output = document.getElementById("output")
const repositoryListContainer = document.getElementById("repositoryListContainer")
const errorNotice = document.getElementById("errorNotice")

//New github class variable
const github = new GitHub()

//Load event listeners
let loadEventlisteners = () => {
    inputField.addEventListener('keyup', getUser)
}

//Get user function to fetch the user information
function getUser() {
    let username
    if (inputField.value != '') {
        username = inputField.value

        //Get the repository information for the user
        github.getRepository(username)
            .then((dataRepository) => {
                if (dataRepository.message !== 'Not Found') {
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
                }
            })

        //Console the return data
        github.getUser(username)
            .then((data) => {
                if (data.message === 'Not Found') {
                    errorNotice.style.display = "block"
                    setTimeout(() => {
                        errorNotice.style.display = "none"
                    }, 5000)
                } else {

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
                }
            })
    } else {
        console.log("search field is empty")
    }
}

//Call event loaders
loadEventlisteners()