//Iterator function 
let namesIterator = (names) => {
    let counter = 0

    return {
        next: () => {
            if (counter === names.length) counter = 0
            return counter < names.length ? { value: names[counter++], done: false } : { done: true }
        }
    }
}

//New array
let namesArr = ['Paulo', 'Farrukh', 'Developer']

//Use the iterator to loop through 
let names = namesIterator(namesArr)

console.log(names.next())

//Create a generator
function* namesGenerator() {

    yield 'Paulo1';
    yield 'Developer';
    yield 'Farrukh';
}

//Call the generator
const name = namesGenerator()

console.log(name.next())

//Fetch data from random API

async function getRandomUser() {
    const response = await fetch("https://randomuser.me/api/")
    const data = await response.json()
    console.log(data)
    return data
}

getRandomUser()