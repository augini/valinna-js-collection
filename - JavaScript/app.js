// Standard Module Pattern
const UICTRL =  ( () => {
    //Declare private vars and functions
    let text = 'Marginal Adjustment'
    const updateText = () => {
        const UItext = document.getElementById("justText")
        UItext.innerText = "Updated with the Standard Module Pattern"
    }
    return {
    //Declare public vars and functions
        changeText: () => {
            updateText()
        }
    }
})();

UICTRL.changeText()

//Revealing Module Pattern
const ItemCTRL = ( () => {
    let items = [];

    const add = (item) => {
        items.push({id: 1, item: item })
        console.log("Item has been added");
    }
    const get = (id) => {
        return items.filter((item) => item.id === id )
    }

    return {
        add: add, 
        get : get
    }
})();

ItemCTRL.add("paulo")
const item1 = ItemCTRL.get(1)
// console.log(item1);

//Singleton Module Pattern
const SingletonMethod = (()=>{
    let instance;
    const create_instance = () => {
        const Object1 = new Object({ id:1, name: "Farrukh" } )
        return Object1;
    }

    return {
        getInstance: () => {
            if(!instance) {
                instance = create_instance()
            }
            return instance
        }
    }

})();

const objectOne = SingletonMethod.getInstance()
const objectTwo = SingletonMethod.getInstance()

// console.log(objectOne === objectTwo);


//Factory pattern in JavaScript
function DogRegisterSet () {
    this.createDog = function (name, type){
        let newDog;

        if (type === 'Husky'){
            newDog = new ExpensiveBreed(name)
        }else if(type === 'GermanShephard') {
            newDog = new StandardBreed(name)
        }else if (type === 'Bulldog') {
            newDog = new BasicBreed(name)
        }

        newDog.type = type

        newDog.define = function(){
            console.log(`${this.name}: (${this.type} and ${this.price})`);
        }

        return newDog
    }
}

function ExpensiveBreed (name){
    this.name = name
    this.price = '2000$'
}

function StandardBreed(name) {
    this.name = name
    this.price = '1500$'
}

function BasicBreed(name) {
    this.name = name
    this.price = '500$'
}

let dogs = []
let newDog = new DogRegisterSet()

dogs.push(newDog.createDog('Orlando', 'Husky'))
dogs.push(newDog.createDog('Enzo', 'GermanShephard'))
dogs.push(newDog.createDog('Husky', 'Bulldog'))

// console.log(dogs);

dogs.forEach((dog)=> {
    dog.define()
})


//Observer Module Pattern
function EventObserver(){
    this.observers = []
}

EventObserver.prototype = {
    subscribe: function(fn){
        this.observers.push(fn)
        console.log(`You have subscribed to the function ${fn.name}`);
    },
    unsubscribe: function(fn){
        this.observers = this.observers.filter((item)=>{ item !== fn })
        console.log(`You have unsubscribed from the function ${fn.name}`);
    },
    fire: function(){
        this.observers.forEach(function(item){
            item.call()
        })
    }
}

const click = new EventObserver()


document.querySelector(".sub-ms").addEventListener('click', () => {
    click.subscribe(getMilliSeconds)
} )

document.querySelector(".unsub-ms").addEventListener('click', ()=>{
    click.unsubscribe(getMilliSeconds)
})

document.querySelector('.fire').addEventListener('click', ()=>{ 
    click.fire()
})


const getMilliSeconds = function(){
    console.log(`Time: ${new Date()}`)
}