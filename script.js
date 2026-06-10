let library = [];

function Book(bookName, bookDesc, bookID) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this Object");
  }
  
  this.bookName = bookName;
  this.bookDesc = bookDesc;
  this.bookID = bookID;
}

const libraryInterface = {
  title: document.querySelector("#title"),
  description: document.querySelector("#description"),
  addButton: document.querySelector("#addBook"),
}

function interfaceListeners() {
  libraryInterface.addButton.addEventListener("click", addButtonFunc);
}

function addButtonFunc(event) {
  addBookToLibrary();
  resetInterface();
  console.log(library);
  
  event.preventDefault();
}

function addBookToLibrary() {
  const title = libraryInterface.title.value;
  const description = libraryInterface.description.value;
  const id = self.crypto.randomUUID();  
  
  const newBook = new Book(title, description, id);
  library.push(newBook);
}

function resetInterface() {
  libraryInterface.title.textContent = "";
  libraryInterface.description.textContent = "";
}

function displayBookToInterface() {
  for (const book of library) {
    console.log(book);
  }
}

interfaceListeners();
