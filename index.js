import UI from './modules/ui.js';
import Store from './modules/storage.js';

document.querySelector('#books-list').addEventListener('click', (e) => {
  // remove book from UI
  UI.deleteBook(e.target);

  // Remove book from localstorage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  // Show success message
  UI.showAlert('Book Removed', 'success');
});
