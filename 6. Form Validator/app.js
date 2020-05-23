const nameForm = document.getElementById("name")
const emailForm = document.getElementById("email")
const zipcodeForm = document.getElementById("zipcode")
const phoneForm = document.getElementById("phone")

//Load event listeners
let loadEventListeners = () => {
    nameForm.addEventListener('blur', validateName)
    emailForm.addEventListener('blur', validateEmail)
    zipcodeForm.addEventListener('blur', validateZipcode)
    phoneForm.addEventListener('blur', validatePhone)
}


//Function to validate name
let validateName = () => {
    let regex = /^[a-zA-Z]{2,10}$/

    if (!regex.test(nameForm.value)) {
        nameForm.classList.add('is-invalid')
    } else {
        nameForm.classList.remove('is-invalid')
    }
}

//Function to validate email
let validateEmail = () => {
    let regex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.[a-zA-Z]{2,5}$/

    if (!regex.test(emailForm.value)) {
        emailForm.classList.add('is-invalid')
    } else {
        emailForm.classList.remove('is-invalid')
    }
}


//Funcion to validate the zipCode
let validateZipcode = () => {
    const zip = document.getElementById('zip');
    const re = /^[0-9]{5}(-[0-9]{4})?$/;

    if (!re.test(zip.value)) {
        zip.classList.add('is-invalid');
    } else {
        zip.classList.remove('is-invalid');
    }
}

//Function to validate the Phone number
let validatePhone = () => {
    const phone = document.getElementById('phone');
    const re = /^\(?\d{3}\)?[-. ]?\d{3}[-. ]?\d{4}$/;

    if (!re.test(phone.value)) {
        phone.classList.add('is-invalid');
    } else {
        phone.classList.remove('is-invalid');
    }
}

loadEventListeners()