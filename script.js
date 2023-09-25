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
console.table(myLibrary);
// Test

const library = document.querySelector('.library-grid');

function displayBooks() {
    myLibrary.forEach((ele) => {
        const book = document.createElement('div');

        book.innerHTML = `
        <div class="card">
            <h1>${ele.title}</h1>
            <h2>${ele.author}</h2>
            <p>${ele.pages} pages</p>
            <span class="card-actions">
                <div class="switch-container">
                    <label class="read-switch">
                    <input class="read-input" type="checkbox" />
                        <div></div>
                    </label>
                </div>
                <img class="delete-button" src="./assets/delete.svg">
            </span>
        </div>
        `;

        library.appendChild(book);
    })
}

// Test 
displayBooks();
// Test