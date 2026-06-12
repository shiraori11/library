let library = [];

function Book(title, description, ID, author, status, pages) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call this Object");
  }
  
  this.title = title;
  this.description = description;
  this.ID = ID;
  this.author = author;
  this.status = status;
  this.pages = pages;
}

const libraryInterface = {
  title: document.querySelector("#title"),
  description: document.querySelector("#description"),
  addButton: document.querySelector("#addBook"), 
  author: document.querySelector("#bookAuthor"),
  status: document.querySelector("#readStatus"),
  pages: document.querySelector("#bookPages"),
  libraryContainer: document.querySelector("#library"),
  delete: document.querySelectorAll(".deleteButton"),
}

function interfaceListeners() {
  libraryInterface.addButton.addEventListener("click", addButtonFunc);
}

function addButtonFunc(event) {
  event.preventDefault();
  
  addBookToLibrary();
  resetInterface();
  displayBookToInterface();
}

function addBookToLibrary() {
  const title = libraryInterface.title.value;
  const description = libraryInterface.description.value;
  const id = self.crypto.randomUUID();  
  const author = libraryInterface.author.value;
  const status = libraryInterface.status.value;
  const pages = libraryInterface.pages.value;
  
  const newBook = new Book(title, description, id, author, status, pages);
  library.push(newBook);

  console.log(newBook);
  console.log(library);
  
  return newBook;
}

function resetInterface() {
  libraryInterface.title.value = "";
  libraryInterface.description.value = "";
}

function displayBookToInterface() {
  libraryInterface.libraryContainer.innerHTML = "";
  
  for (const book of library) {
    libraryInterface.libraryContainer.appendChild(bookContainer(book));
  }
}

function bookContainer(book) {
  const bookDiv = document.createElement("div");
  bookDiv.setAttribute("class", "book");
  // bookDiv.setAttribute("data-book-id", book.ID);
  bookDiv.setAttribute("id", book.ID);

  const title = bookContainerPara(book.title, "class-test");
  const description = bookContainerPara(book.description, "descClass");
  const author = bookContainerPara(book.author, "authorClass");
  
  const status = document.createElement("select");
  const unread = selectOption("unread", book);
  const read = selectOption("read", book);
  status.append(unread, read);
  
  const pages = bookContainerPara(book.pages, "pagesClass");
  const deleteButton = bookContainerDel(book);
  deleteButton.addEventListener("click", deleteBtnFunc);

  bookDiv.append(title, description, author, status, pages, deleteButton);

  return bookDiv;
}

function bookContainerPara(text, paraClass) {
  const newPara = document.createElement("p");
  newPara.textContent = text;
  newPara.setAttribute("class", paraClass);

  return newPara;
}

function bookContainerDel(book) {
  const deleteButton = document.createElement("button");
  
  deleteButton.setAttribute("class", "deleteButton");
  deleteButton.setAttribute("data-delete-id", book.ID);
  deleteButton.textContent = "Delete Book";

  return deleteButton;
}

function deleteBtnFunc(event) {
  const id = event.target.dataset.deleteId;
  
  const deletedLibrary = library.filter((book) => book.ID !== id);
  library = deletedLibrary;
  
  displayBookToInterface();
}

function selectOption(name, book) {
  const selectElement = document.createElement("option");

  selectElement.setAttribute("id", name);
  selectElement.setAttribute("value", name)
  selectElement.textContent = name;

  if (book.status == name) {
    selectElement.setAttribute("selected", true);
  }

  return selectElement;
}

interfaceListeners();
