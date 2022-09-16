'use strict';

// FUNCTIONS

// Function to creater the text of an error message

const errorMessage = (errorTextContent, errorImageURL, errorImageAlt, errorImageTitle) => {

  errorContainer.classList.remove('hidden');
  listsContainer.classList.add('hidden');

  const errorTag = document.createElement('p');
  errorTag.classList.add('error__text', 'js_errorText');
  const errorText = document.createTextNode(errorTextContent);
  errorTag.appendChild(errorText);
  errorContainer.appendChild(errorTag);

  if (errorImageURL !== undefined) {
    const errorImage = document.createElement('img');
    errorImage.classList.add('error__image', 'js_errorImage');
    errorImage.setAttribute('src', errorImageURL);
    errorImage.setAttribute('alt', errorImageAlt);
    errorImage.setAttribute('title', errorImageTitle);
    errorContainer.appendChild(errorImage);

    const backToListButton = document.createElement('button');
    backToListButton.classList.add('backToListButton', 'js_backToListButton');
    const backToListButtonText = document.createTextNode('Volver');
    backToListButton.appendChild(backToListButtonText);
    errorContainer.appendChild(backToListButton);

    listenerDeleteFavoritesButton();
  }

};


const deleteErrorMessage = () => {

  if (!errorContainer.classList.contains('hidden')) {

    const errorText = document.querySelectorAll('.js_errorText');
    const errorImage = document.querySelector('.js_errorImage');
    const backToListButton = document.querySelector('.js_backToListButton');

    for (const item of errorText) {
      item.remove();
    }

    errorImage.remove();
    backToListButton.remove();

    errorContainer.classList.add('hidden');

  }

};


// Function to return to list when 'backToListButton' is clicked

const handleClickBackToListButton = () => {

  deleteErrorMessage();

  listsContainer.classList.remove('hidden');
  favoritesContainer.classList.remove('hidden');
  favoritesContainer.classList.remove('hidden');
  menuShowFavorites();

  renderInitialDrinks();

};


function listenerDeleteFavoritesButton() {
  const backToListButton = document.querySelector('.js_backToListButton');

  backToListButton.addEventListener('click', handleClickBackToListButton);
}