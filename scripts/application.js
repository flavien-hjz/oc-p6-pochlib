import { addBook } from "./search.js";

const myBooksElement = document.getElementById('myBooks');
const titleContainerElement = document.createElement('div');
titleContainerElement.classList.add('title-container');
const logoImage = document.createElement('img');
logoImage.src = "images/logo-detoure.png";
const mainTitle = document.querySelector('.title');
myBooksElement.prepend(titleContainerElement);
titleContainerElement.prepend(logoImage);
titleContainerElement.append(mainTitle);

const subTitles = document.querySelectorAll('h2');
for (const subTitle of subTitles) {
  subTitle.classList.add('sub-title');
};

const searchContainerElement = document.createElement('div');
searchContainerElement.classList.add('js-search-container');
const buttonsBoxElement = document.createElement('div');
buttonsBoxElement.classList.add('buttons-box');
const addButton = document.createElement('button');
addButton.classList.add('button--green', 'js-add-button');
addButton.textContent = 'Ajouter un livre';
myBooksElement.insertBefore(searchContainerElement, document.querySelector('hr'));
searchContainerElement.append(buttonsBoxElement);
buttonsBoxElement.append(addButton);

const contentElement = document.getElementById('content');
const resultSectionElement = document.createElement('div');
resultSectionElement.classList.add('js-result-section');
myBooksElement.insertBefore(resultSectionElement, contentElement);

const resultBoxGridElement = document.createElement('div');
resultBoxGridElement.classList.add('result-box-grid', 'js-myBooklist-box');
contentElement.append(resultBoxGridElement);

addBook();

export let bookList = new Array;
const storage = JSON.parse(localStorage.getItem('bookList'));
if (storage) {
  bookList = storage;
  displayBookList();
};

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

export function saveToStorage() {
  localStorage.setItem('bookList', JSON.stringify(bookList));
};