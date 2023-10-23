import { addBook } from "./search.js";

addBook();

export let bookList = JSON.parse(localStorage.getItem('bookList'));
console.log(bookList);

export function displayBookList() {

  document.querySelector('.js-myBooklist-box').innerHTML = '';

  for (let i=0; i < bookList.length; i++) {
    let myBookList = `
    <div class="result-box js-result-box">
      <div id="${bookList[i].bookId}" class="js-trash"
        data-book-id="${bookList[i].bookId}">
        <i class="fa-solid fa-trash"></i>
      </div>
      <p class="box-title">Titre : ${bookList[i].bookTitle}</p>
      <p class="box-id">Id : ${bookList[i].bookId}</p>
      <p class="box-author">Auteur : ${bookList[i].bookAuthor}</p>
      <p class="box-description">Description : ${bookList[i].bookDescription}</p>
      <div class="cover">
        <img src="${bookList[i].bookImage}">
      </div>
    </div>`
  
    document.querySelector('.js-myBooklist-box').insertAdjacentHTML('beforeend', myBookList);
  };

  deleteBook()
  
};

function deleteBook() {
  document.querySelectorAll('.js-trash').forEach(item => {
    item.addEventListener('click', event => {
      findBookToRemove(item.dataset.bookId);
      document.getElementById(item.dataset.bookId).innerHTML = '<i class="fa-regular fa-bookmark"></i>';
      displayBookList();
      console.log(bookList);
      saveToStorage();
    });
  });
};

function findBookToRemove(bookId) {
  bookList = bookList.filter(object => {
    return object.bookId !== bookId;
  });
};

displayBookList();

if (!bookList) {
  bookList = [{
    bookTitle: 'Un titre',
    bookId: '1',
    bookAuthor: 'Un auteur',
    bookDescription: 'Une description',
    bookImage: 'images/unavailable.png'
  }, {
    bookTitle: 'Un 2e titre',
    bookId: '2',
    bookAuthor: 'Un 2e auteur',
    bookDescription: 'Une 2e description',
    bookImage: 'images/unavailable.png'
  }];
};

export function saveToStorage() {
  localStorage.setItem('bookList', JSON.stringify(bookList));
};