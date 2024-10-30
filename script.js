const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

Book.prototype.toggleReadStatus = function() {
    this.read = this.read === "read" ? "not read yet" : "read";
}

// Adding an initial book to the library
const theHobbit = new Book('The Hobbit', 'J.R.R Tolkien', '295 pages', 'not read yet');
const soloLeveling = new Book('Solo Leveling', 'Chugong', '200 pages', 'read' );
myLibrary.push(theHobbit, soloLeveling);

console.log(myLibrary);

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const readInput = document.querySelector('input[name="read"]:checked');
    const read = readInput ? readInput.value : "Not read yet";

    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
    bookBar(); // Update the display after adding a new book
}

function removeBook(index) {
    myLibrary.splice(index, 1);
    bookBar(); // Update the display after removing a book
}

function bookBar() {
    const wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = ''; // Clear existing books

    myLibrary.forEach((book, index) => {
        let card = document.createElement("div");
        let title = document.createElement("div");
        let authorLabel = document.createElement("div");
        let author = document.createElement("div");
        let pagesLabel = document.createElement("div");
        let pages = document.createElement("div");
        let read = document.createElement("div");

        card.classList.add("cards");
        title.classList.add("title");
        authorLabel.classList.add("author-label");
        author.classList.add("author");
        pagesLabel.classList.add("pages-label");
        pages.classList.add("pages");
        read.classList.add("read");

        title.textContent = book.title;
        authorLabel.textContent = "Author:";
        author.textContent = `by ${book.author}`;
        pagesLabel.textContent = "Pages:";
        pages.textContent = book.pages;
        read.textContent = book.read;

        // Apply styles based on read status
        if (book.read === "read") {
            read.classList.add("read-status-read");
            read.classList.remove("read-status-not-read");
        } else {
            read.classList.add("read-status-not-read");
            read.classList.remove("read-status-read");
        }

        // Add buttons to each card
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-button");
        removeButton.addEventListener("click", () => {
            removeBook(index);
        });

        const changeStatusButton = document.createElement("button");
        changeStatusButton.textContent = "Change Read Status";
        changeStatusButton.classList.add("change-status-button");
        changeStatusButton.addEventListener("click", () => {
            book.toggleReadStatus();
            bookBar(); // Refresh the display after changing read status
        });

        card.appendChild(title);
        card.appendChild(authorLabel);
        card.appendChild(author);
        card.appendChild(pagesLabel);
        card.appendChild(pages);
        card.appendChild(read);
        card.appendChild(removeButton);
        card.appendChild(changeStatusButton);

        wrapper.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const dialog = document.getElementById('form-container');

    // Ensure the dialog is initially hidden
    dialog.close();

    document.getElementById('add-btn').addEventListener('click', function() {
        dialog.showModal();
    });

    document.getElementById('cancelBook').addEventListener('click', function() {
        dialog.close();
    });

    document.getElementById('submitBook').addEventListener('click', function(event) {
        event.preventDefault();

        addBookToLibrary(); // Use the function to add the book to the library

        console.log(myLibrary); // Check if the book is added

        // Close the dialog
        dialog.close();
    });

    bookBar(); // Display the initial book list
});
