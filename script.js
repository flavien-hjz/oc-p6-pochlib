let bookList = JSON.parse(localStorage.getItem('bookList'));

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
    bookImage: 'Une 2e image'
  }];
};

function saveToStorage() {
  localStorage.setItem('bookList', JSON.stringify(bookList));
}

console.log(bookList);

function displayBookList() {
  let myBookList = document.getElementById('content');
  myBookList = `
  <div class="result-box js-result-box">
    <div>
      <i class="fa-regular fa-bookmark js-bookmark"></i>
    </div>
    <p class="box-title">Titre : ${bookList[0].bookTitle}</p>
    <p class="box-id">Id : ${bookList[0].bookId}</p>
    <p class="box-author">Auteur : ${bookList[0].bookAuthor}</p>
    <p class="box-description">Description : ${bookList[0].bookDescription}</p>
    <div class="cover">
      <img src="${bookList[0].bookImage}">
    </div>
  </div>`

  document.getElementById('content').insertAdjacentHTML('beforeend', myBookList);
};

displayBookList();

function addBook() {
  document.querySelector('.js-add-button').addEventListener('click', () => {
    displaySearchSection();
  })
}

addBook();

function displaySearchSection() {
  document.querySelector('.js-search-container').innerHTML = `
    <form>
      <label for="title" class="input-label">Titre du livre</label>
      <input type="text" id="title" name="title" class="js-title-input" placeholder="Renseignez le titre du livre">
      <label for="author" class="input-label">Auteur</label>
      <input type="text" id="author" name="author" class="js-author-input" placeholder="Renseignez l'auteur">
    </form>
    <div class="buttons-box">
      <button class="button green-button js-search-button">Rechercher</button>
      <button class="button red-button js-cancel-button">Annuler</button>
    </div>
    <span id="error-message"></span>`;
  cancelSearch();
  launchSearch();
};

function cancelSearch() {
  document.querySelector('.js-cancel-button').addEventListener('click', () => {
    hideSearchSection();
    addBook();
    document.querySelector('.js-result-section').innerHTML ='';
  })
}

function hideSearchSection() {
  document.querySelector('.js-search-container').innerHTML = `
    <div class="buttons-box">
      <button class="button green-button js-add-button">Ajouter un livre</button>
    </div>`;
}

async function searchAPI() {
    document.querySelector('.js-result-section').innerHTML = `
    <h2 class="sub-title">Résultats de la recherche</h2>
		<div class="result-box-grid js-result-box-grid">
    </div>
    <hr>`;

    const title = document.querySelector('.js-title-input').value;
    const author = document.querySelector('.js-author-input').value;
    const url = 'https://www.googleapis.com/books/v1/volumes?q='+title+author;

    const response = await fetch(url);
    const books = await response.json();
    //console.log(books);

    books.items.forEach((book) => {

      let bookDescription = 'Information manquante';

      if (book.volumeInfo.description) {
        bookDescription = truncateText(book.volumeInfo.description, 200);
      }

      let bookImage = 'images/unavailable.png';
      
      if (book.volumeInfo.imageLinks) {
        bookImage = book.volumeInfo.imageLinks.smallThumbnail
      };

      let bookTitle = truncateText(book.volumeInfo.title, 100);
      let bookId = book.id;
      let bookAuthor = book.volumeInfo.authors[0];

      const newResult = `
        <div class="result-box js-result-box">
          <div class="js-bookmark"
            data-book-id="${bookId}"
            data-book-author="${bookAuthor}">
            <i class="fa-regular fa-bookmark js-bookmark"></i>
          </div>
          <p class="box-title">Titre : ${bookTitle}</p>
          <p class="box-id">Id : ${bookId}</p>
          <p class="box-author">Auteur : ${bookAuthor}</p>
          <p class="box-description">Description : ${bookDescription}</p>
          <div class="cover">
            <img src="${bookImage}">
          </div>
        </div>`

      document.querySelector('.js-result-box-grid').insertAdjacentHTML('beforeend', newResult);

    });

    document.querySelectorAll('.js-bookmark').forEach(item => {
      item.addEventListener('click', event => {
        console.log(item.dataset.bookId);
        console.log(item.dataset.bookAuthor);
      })
    })
    
};

function launchSearch() {

  document.querySelector('.js-search-button').addEventListener('click', () => {

    const titleInput = document.querySelector('.js-title-input').value;
    const authorInput = document.querySelector('.js-author-input').value;
    const errorMessage = document.getElementById('error-message');

    if (!titleInput || !authorInput) {
      errorMessage.textContent = "Merci de renseigner un titre et un auteur";
    } else {
      errorMessage.textContent = "";
      searchAPI();
    };

  });

  document.body.addEventListener('keyup', (event) => {

    const titleInput = document.querySelector('.js-title-input').value;
    const authorInput = document.querySelector('.js-author-input').value;
    const errorMessage = document.getElementById('error-message');

    if (event.key === 'Enter') {

      if (!titleInput || !authorInput) {
        errorMessage.textContent = "Merci de renseigner un titre et un auteur";
      } else {
        errorMessage.textContent = "";
        searchAPI();
      };
    };
  });
};

function truncateText(string, n){
  return (string.length > n) ? string.slice(0, n-1) + '&hellip;' : string;
};