const myLibrary = [];

function Book(title, author, pages, haveRead) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = (Boolean(haveRead)) ? 'already read' : 'not read yet';

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${this.haveRead}`;
    }
}


function addBookToLibrary(title, author, pages, haveRead) {

    const newBook = new Book(title, author, pages, haveRead);
    myLibrary.push(newBook);
}

addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);

console.table(myLibrary);