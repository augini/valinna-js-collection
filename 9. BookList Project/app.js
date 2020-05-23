//Define UI variables

const bookForm = document.getElementById("bookForm");
const addBookBtn = document.getElementById("addNewBook");
const bookTable = document.getElementById("bookTable");
const bookTableBody = document.getElementById("bookTableBody");
const titleInput = document.getElementById("bookTitle");
const authorInput = document.getElementById("bookAuthor");
const isbnInput = document.getElementById("bookISBN");
const alertMessage = document.getElementById("alertMessage")
const cardBody = document.getElementById('cardBody')
const editSave = document.getElementById('saveEdit')
const deleteEdit = document.getElementById('deleteEdit')

class Book {
  //Constructor to construct a new book 
  constructor(title, author, isbn, id) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.id = id
  }

  //Function to generate html row of an book object
  createBookHTML = () => {
    const bookHTMl = ` 
      <tr id = ${this.id}>
          <th scope="row"> ${this.title} </th>
          <td>${this.author}</td>
          <td>${this.isbn}</td>
          <td>
          <button type="button" class="btn btn-outline-primary btn-sm m-0 waves-effect" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
          </td>
          </tr> `;
    this.html = bookHTMl;
  };
}

class UI {
  
  //Function to show alerts 
  static showAlert = (content, classColor) => {
    const alertHtml = `
    <div class="alert alert-${classColor} mb-0" role="alert">
    <p class="mb-0">${content}.</p>
    </div>
    `
    alertMessage.innerHTML = alertHtml
  }

  //Function to remove alert
  static removeAlert = () => {
    alertMessage.innerHTML = ''
  }

  //Function to clear input fields once inputs are taken
  static cleanInputFields = () => {
    titleInput.value = ''
    authorInput.value = ''
    isbnInput.value = ''
  }

  //Function to show modal when update button is clicked
  static showModal = (e) => {
    BookList.currentBook = parseInt(e.target.parentElement.parentElement.id)
    document.getElementById("editBookTitle1").value = e.target.parentElement.parentElement.children[0].innerText
    document.getElementById("editBookAuthor1").value = e.target.parentElement.parentElement.children[1].innerText
    document.getElementById("editBookISBN1").value = e.target.parentElement.parentElement.children[2].innerText

  }
}

class BookList {

  //Variable to hold the book To Be Updated
  static currentBook = null

  //Data structure to store the books array
  static books = []


  //Function to initiate books array
  static declareBooks = () => {
    if (localStorage.getItem('books') !== null) {
      this.books = JSON.parse(localStorage.getItem('books'))
    }
  }

  //Function to add new book 
  static getNewBook = () => {

    if (titleInput.value !== "" && authorInput.value !== "" && isbnInput.value !== "") {
      
      //Remove display none class from the table if there is one
      bookTable.classList.remove('d-none')

      //Generate a new book object
      let newBook = new Book(titleInput.value, authorInput.value, parseInt(isbnInput.value), parseInt(this.books.length + 1));

      //Create an HTML 
      newBook.createBookHTML();

      //Push the book into the store
      this.books.push(newBook)

      LocalStorage.storeData(newBook)

      //Update the book table UI
      bookTableBody.innerHTML += newBook.html;
      UI.showAlert("Book added", 'success')

      //Add and remove the alerts
      UI.cleanInputFields()
      setTimeout(() => UI.removeAlert(), 3000)

    } else {
      UI.showAlert("Please fill in all fields", 'danger')
      setTimeout(() => UI.removeAlert(), 3000)
    }
  };

  //Function to delete an existing book
  static deleteBook = () => {
    console.log(this.currentBook);

    //Delete the book from UI
    bookTableBody.children[this.currentBook-1].remove()
    this.books.splice(this.currentBook-1, 1)

    //Delete the book from Local Storage
    LocalStorage.storeData()
    
    //Make the table invisible if the last item is deleted
    if (this.books.length === 0) {
      bookTable.classList.add('d-none')
    }

  }

  //Function to update the book
  static updateBook = () => {
    let bookToUpdate = this.books.find(book => book.id === this.currentBook)

    let titleToUpdate = document.getElementById('editBookTitle1').value
    let authorToUpdate = document.getElementById('editBookAuthor1').value
    let isbnToUpdate = document.getElementById('editBookISBN1').value

    this.books[bookToUpdate.id] = {
      title: titleToUpdate,
      author: authorToUpdate,
      isbn: isbnToUpdate,
      id: bookToUpdate.id
    }
    //Update the book content on UI
    bookTableBody.children[this.currentBook - 1].innerHTML = ` 
    <tr id = ${this.books[bookToUpdate.id].id}>
          <th scope="row" class = "text-info"> ${titleToUpdate} </th>
          <td class = "text-info">${authorToUpdate}</td>
          <td class = "text-info">${isbnToUpdate}</td>
          <td>
          <button type="button" class="btn btn-outline-primary btn-sm m-0 waves-effect" data-toggle="modal" data-target="#exampleModalCenter">Edit</button>
          </td>
          </tr> `;

    //Show alert 
    UI.showAlert('Book has been updated', 'success')
    setTimeout(() => UI.removeAlert(), 3000)
  }
}


class LocalStorage {
  //Function to store data in local storage
  static storeData = () => {
    let books = BookList.books
    localStorage.setItem('books', JSON.stringify(books))
  }
}

const App = (() => {

  //Create an event loader function
  const eventLoaders = () => {
    bookForm.addEventListener("submit", BookList.getNewBook)
    bookTableBody.addEventListener('click', UI.showModal)
    editSave.addEventListener('click', BookList.updateBook)
    deleteEdit.addEventListener('click', BookList.deleteBook)
  };

  //Populat the table with initial data from Local Storage
  const populateTable = () => {
    
    //Declare initial array from local storage
    BookList.declareBooks()

    //Cover each book with proper HTML
    BookList.books.forEach((book) => {
      bookTable.classList.remove('d-none')
      bookTableBody.innerHTML += book.html
    })
  }


  return {
    init: () => {
      console.log("Initializing the app ...")

      //Initialize event loaders
      eventLoaders()

      //Populate the table
      populateTable()
    }

  }
})()


App.init()