function addBook() {
  document.querySelector('.js-add-button').addEventListener('click', () => {
    displaySearchSection();
  })
}

addBook();

function displaySearchSection() {
  document.querySelector('.js-search-container').innerHTML = `
    <p class="input-label">Titre du livre</p>
    <input type="search" class="js-title-input" placeholder="Renseignez le titre du livre" >
    <p class="input-label">Auteur</p>
    <input type="search" class="js-author-input" placeholder="Renseignez l'auteur" >
    <div class="buttons-box">
      <button class="button green-button js-search-button">Rechercher</button>
      <button class="button red-button js-cancel-button">Annuler</button>
    </div>`;
  cancelSearch();
  searchAPI();
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

function searchAPI() {
  document.querySelector('.js-search-button').addEventListener('click', async () => {
    document.querySelector('.js-result-section').innerHTML = `
    <h2 class="sub-title">Résultats de la recherche</h2>
		<div class="result-box-grid js-result-box-grid">
    </div>
    <hr>`;

    const title = document.querySelector('.js-title-input').value;
    const author = document.querySelector('.js-author-input').value;
    const url = 'https://www.googleapis.com/books/v1/volumes?q='+title+author;
    console.log(url);

    const response = await fetch(url);
    const books = await response.json();
    console.log(books);

    books.items.forEach((book) => {

      let bookDescription = 'Information manquante';

      if (book.volumeInfo.description) {
        bookDescription = truncateText(book.volumeInfo.description, 200);
      }

      let bookImage = 'images/unavailable.png';
      
      if (book.volumeInfo.imageLinks) {
        bookImage = book.volumeInfo.imageLinks.smallThumbnail
      };

      const newResult = `
        <div class="result-box js-result-box">
          <i class="fa-regular fa-bookmark"></i>
          <p class="box-title">Titre : ${book.volumeInfo.title}</p>
          <p class="box-id">Id : ${book.id}</p>
          <p class="box-author">Auteur : ${book.volumeInfo.authors[0]}</p>
          <p class="box-description">Description : ${bookDescription}</p>
          <div class="cover">
            <img src="${bookImage}">
          </div>
        </div>`

      document.querySelector('.js-result-box-grid').insertAdjacentHTML('beforeend', newResult);

    });
  })
};

function truncateText(string, n){
  return (string.length > n) ? string.slice(0, n-1) + '&hellip;' : string;
};