class Book {
    constructor(title, author, pages, haveRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.haveRead = Boolean(haveRead);
    }

    info() {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.haveRead}`;
    }

    getPages() {
        return this.pages;
    }

    static addBookToLibrary(title, author, pages, haveRead, library) {
        const isRead = haveRead === 'true';
        const newBook = new Book(title, author, pages, isRead);
        library.addBook(newBook);
    }

    toggleReadStatus() {
        this.haveRead = !this.haveRead;

        if (this.haveRead) {
            addPages(this.getPages());
        } else {
            removePages(this.getPages());
        }
    }
}

let totalPages = 0;
const pageCount = document.getElementById('page-counter-number');


function addPages(numPages) {
    totalPages = +totalPages + +numPages;
    pageCount.innerText = +totalPages;
}

function removePages(numPages) {
    totalPages = +totalPages - +numPages;
    pageCount.innerText = +totalPages;
}

function getTotalPages() {
    return +totalPages;
}


class Library {
    constructor() {
        this.books = [];
    }

    addBook(title, author, pages, haveRead) {
        const newBook = new Book(title, author, pages, haveRead);
        this.books.push(newBook);
        if (newBook.haveRead) {
            addPages(pages);
        }
        console.log(getTotalPages());
    }

    removeBook(index) {
        let numPagesOfRemovedBook = +(this.books[index]).getPages();
        if (this.haveRead) {
            removePages(numPagesOfRemovedBook);
        }
        this.books.splice(index, 1);
        console.log(getTotalPages());
    }
}


const library = document.querySelector('.library-grid');
const myLibrary = new Library();



function displayBooks() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }

    myLibrary.books.forEach((book, index) => {
        const readCheck = book.haveRead ? 'checked' : '';
        const readStatus = book.haveRead ? 'read' : '';
        const readText = book.haveRead ? 'Read' : 'Unread';

        const bookElement = document.createElement('div');
        bookElement.innerHTML = `
            <div class="card ${readStatus}">
                <h1>${book.title}</h1>
                <h2>${book.author}</h2>
                <p class="page-text">${book.pages} pages</p>
                <p class="read-text">${readText}</p>
                <span class="card-actions">
                    <div class="switch-container">
                        <label class="read-switch">
                            <input class="read-input" data-index="${index}" type="checkbox" ${readCheck} />
                            <div></div>
                        </label>
                    </div>
                    <img class="delete-button" data-index="${index}" src="./assets/delete.svg">
                </span>
            </div>
        `;

        library.appendChild(bookElement);
    });
}

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.getElementById('book-title').value;
    const author = document.getElementById('book-author').value;
    const pages = document.getElementById('book-pages').value;
    const haveRead = document.querySelector('input[name="book-read"]:checked').value === 'true';

    myLibrary.addBook(title, author, pages, haveRead);
    displayBooks();
    form.reset();
});

library.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        const result = confirm('Are you sure?');
        if (result) {
            myLibrary.removeBook(event.target.dataset.index);
            displayBooks();
        }
    }
});

library.addEventListener('click', function (event) {
    if (event.target.classList.contains('read-input')) {
        const index = event.target.dataset.index;
        myLibrary.books[index].toggleReadStatus();
        displayBooks();
    }
});

// Test
myLibrary.addBook('The Hobbit', 'J.R.R. Tolkien', 295, false);
myLibrary.addBook('Pride and Prejudice', 'Jane Austen', 432, true);
myLibrary.addBook('The Great Gatsby', 'F. Scott Fitzgerald', 180, true);
myLibrary.addBook('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 336, true);
myLibrary.addBook('The Hunger Games', 'Suzanne Collins', 374, false);

// Test

displayBooks();