const myLibrary = [];

function Book(title, author, pages, haveRead) {

    this.title = title;
    this.author = author;
    this.pages = pages;
    this.haveRead = Boolean(haveRead);

    this.info = function () {
        return `${title} by ${author}, ${pages} pages, ${this.haveRead}`;
    }
}


function addBookToLibrary(title, author, pages, haveRead) {

    const newBook = new Book(title, author, pages, haveRead);

    myLibrary.push(newBook);
}

// Test
addBookToLibrary('The Hobbit', 'J.R.R. Tolkien', 295, false);
addBookToLibrary('The Catcher in the Rye', 'J.D. Salinger', 224, false);
addBookToLibrary('To Kill a Mockingbird', 'Harper Lee', 324, true);
addBookToLibrary('1984', 'George Orwell', 328, false);
addBookToLibrary('Pride and Prejudice', 'Jane Austen', 432, true);
addBookToLibrary('The Great Gatsby', 'F. Scott Fitzgerald', 180, false);
addBookToLibrary('The Lord of the Rings', 'J.R.R. Tolkien', 1216, true);
addBookToLibrary('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 336, false);
addBookToLibrary('Brave New World', 'Aldous Huxley', 311, true);
addBookToLibrary('The Hunger Games', 'Suzanne Collins', 374, false);
addBookToLibrary('The Da Vinci Code', 'Dan Brown', 454, true);
// Test

const library = document.querySelector('.library-grid');

function displayBooks() {

    while (library.firstChild && library.removeChild(library.firstChild));

    myLibrary.forEach((ele) => {
        const book = document.createElement('div');

        let readCheck
            , readStatus;

        if (ele.haveRead) {
            readCheck = 'checked';
            readStatus = 'read';
            readText = 'Read';
        } else {
            readCheck = '';
            readStatus = '';
            readText = 'Unread'
        }

        book.innerHTML = `
        <div class="card ${readStatus}">
            <h1>${ele.title}</h1>
            <h2>${ele.author}</h2>
            <p class="page-text">${ele.pages} pages</p>
            <p class="read-text">${readText}</p>
            <span class="card-actions">
                <div class="switch-container">
                    <label class="read-switch">
                    <input class="read-input" data-index="${myLibrary.indexOf(ele)}" type="checkbox" ${readCheck} />
                        <div></div>
                    </label>
                </div>
                <img class="delete-button" data-index="${myLibrary.indexOf(ele)}" src="./assets/delete.svg">
            </span>
        </div>
        `;

        library.appendChild(book);
    })
}

// Test 
displayBooks();
// Test

const form = document.querySelector('form');

form.addEventListener('submit', function (event) {

    event.preventDefault();

    const title = document.getElementById('book-title').value
        , author = document.getElementById('book-author').value
        , pages = document.getElementById('book-pages').value
        , haveRead = document.querySelector('input[name="book-read"]:checked').value;

    addBookToLibrary(title, author, pages, haveRead);
    displayBooks();
    form.reset();
})


library.addEventListener('click', function (event) {
    if (event.target.classList.contains('delete-button')) {
        let result = confirm('Are you sure?');
        if (result) {
            myLibrary.splice(event.target.dataset.index, 1);
            displayBooks();
        }
    }
})

Book.prototype.toggleReadStatus = function () {
    this.haveRead = this.haveRead === true ? false : true;
}


library.addEventListener('click', function (event) {
    if (event.target.classList.contains('read-input')) {

        let index = event.target.dataset.index;
        myLibrary[index].toggleReadStatus();

        displayBooks();
    }
})