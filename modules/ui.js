import Book from './book.js';
import Store from './storage.js';
import { DateTime } from './luxon.js';

export default class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('#books-list');

    const row = document.createElement('tr');
    row.classList.add('row-books');

    row.innerHTML = `
    <td>"${book.title}" by ${book.author}</td>
    <td class="book-id">${book.isbn}</td>
    <td class="delete-book"><a href="#" class="delete">Remove</a></td>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 2seconds
    setTimeout(() => document.querySelector('.alert').remove(), 2000);
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }
}
document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.addEventListener('DOMContentLoaded', () => {
  const dateP = document.querySelector('.date');
  const currentDate = DateTime.now();
  dateP.textContent = `${currentDate.toLocaleString(DateTime.DATETIME_MED)}`;
});

let isbn = document.querySelector('#isbn').value;
isbn = '0';
// Event: Add a book.
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // Prevent submit default event
  e.preventDefault();
  // get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  // let isbn = document.querySelector('#isbn');
  isbn += 1;

  // Validate
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'emptyfields');
  } else {
    // instantiate book
    const book = new Book(title, author, isbn);

    // Add book to UI
    UI.addBookToList(book);

    // Add book to localstorage

    Store.addBook(book);

    // Show success message
    UI.showAlert('Book Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

const listLink = document.querySelector('.list-link');
const addNewLink = document.querySelector('.add-new-link');
const contactLink = document.querySelector('.contact-link');

const addNew = document.querySelector('.add-new');
const listSection = document.querySelector('.list');
const contactSection = document.querySelector('.contact');

addNewLink.addEventListener('click', () => {
  if (addNew.classList.contains('hidden')) {
    addNew.classList.remove('hidden');
    if (!listSection.classList.contains('hidden')) {
      listSection.classList.add('hidden');
    }
    if (!contactSection.classList.contains('hidden')) {
      contactSection.classList.add('hidden');
    }
  }
});

listLink.addEventListener('click', () => {
  if (listSection.classList.contains('hidden')) {
    listSection.classList.remove('hidden');
    if (!addNew.classList.contains('hidden')) {
      addNew.classList.add('hidden');
    }
    if (!contactSection.classList.contains('hidden')) {
      contactSection.classList.add('hidden');
    }
    console.log('God is GREAT');
  }
});

contactLink.addEventListener('click', () => {
  if (contactSection.classList.contains('hidden')) {
    contactSection.classList.remove('hidden');
    if (!listSection.classList.contains('hidden')) {
      listSection.classList.add('hidden');
    }
    if (!addNew.classList.contains('hidden')) {
      addNew.classList.add('hidden');
    }
  }
});

// document.querySelector('#books-list').addEventListener('click', (e) => {
//   //remove book from UI
//   UI.deleteBook(e.target);

//   //Remove book from localstorage
//   Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
//   //Show success message
//   UI.showAlert('Book Removed', 'success');
// });
