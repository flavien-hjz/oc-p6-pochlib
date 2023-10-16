document.querySelector('.js-add-button').addEventListener('click', () => {
  document.querySelector('.js-search-container').innerHTML = `
  <p class="input-label">Titre du livre</p>
  <input type="search" placeholder="Renseignez le titre du livre" >
  <p class="input-label">Auteur</p>
  <input type="search" placeholder="Renseignez l'auteur" >
  <div class="buttons-box">
    <button class="button green-button">Rechercher</button>
    <button class="button red-button">Annuler</button>
  </div>`
});