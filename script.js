let library = [];

function Book(bookName, bookDesc, bookID) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this Object");
  }
  
  this.title = bookName;
  this.description = bookDesc;
  this.ID = bookID;
}

const libraryInterface = {
  title: document.querySelector("#title"),
  description: document.querySelector("#description"),
  addButton: document.querySelector("#addBook"),
  libraryContainer: document.querySelector("#library"),
}

function interfaceListeners() {
  libraryInterface.addButton.addEventListener("click", addButtonFunc);
}

function addButtonFunc(event) {
  event.preventDefault();
  
  const newBook = addBookToLibrary();
  resetInterface();
  displayBookToInterface(newBook);
  
}

function addBookToLibrary() {
  const title = libraryInterface.title.value;
  const description = libraryInterface.description.value;
  const id = self.crypto.randomUUID();  
  
  const newBook = new Book(title, description, id);
  library.push(newBook);
  return newBook;
}

function resetInterface() {
  libraryInterface.title.value = "";
  libraryInterface.description.value = "";
}

function displayBookToInterface(book) {
  libraryInterface.libraryContainer.appendChild(bookContainer(book));
}

function bookContainer(book) {
  const bookDiv = document.createElement("div");
  const bookContent = document.createTextNode(`Title: ${book.title} Description: ${book.description} ID: ${book.ID}`);

  bookDiv.appendChild(bookContent);
  return bookDiv;
}

interfaceListeners();
