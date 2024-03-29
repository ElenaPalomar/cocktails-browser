'use strict';


//FUNCTIONS

// Function to add or remove the favorite items from the array 'favorites' (let favorites = [] was declared in VARIABLES) clicking a drink from searched cocktails

function addRemoveToFavorites(event, list) {
  const idSelectedDrink = event.currentTarget.id;

  const foundDrink = list.find(item => {
    return item.id === idSelectedDrink;
  });

  const foundFavoriteIndex = favorites.findIndex(item => {
    return item.id === idSelectedDrink;
  });

  if (foundFavoriteIndex === -1) {
    favorites.push(foundDrink);
  } else {
    favorites.splice(foundFavoriteIndex, 1);
  }

}


// Functions to re-render lists when a item is added or removed

const rerenderDrinks = () => {

  deletePreviusRenderedDrinks();
  renderDrinks();

};

const rerenderInitialDrinks = () => {

  deletePreviusInitialDrinks();
  renderInitialDrinks();

};

const rerenderFavorites = () => {

  if (favoritesList.classList.contains('hidden')) {
    deleteErrorEmptyFavorites();
  }

  deletePreviusRenderedFavorites();
  renderFavorites(favorites);

};


// HANDLE FUNCTIONS

// Function to add/remove favorites items when cliks the drinks elements, save the favorite list in local storage and render both, drinks and favorites, list
function handleClickRenderedDrinks(event) {

  addRemoveToFavorites(event, drinks);
  setLocalStorage();

  rerenderDrinks();
  rerenderFavorites();

}

function handleClickInitialDrinks(event) {

  addRemoveToFavorites(event, initialDrinks);
  setLocalStorage();

  rerenderInitialDrinks();
  rerenderFavorites();

}


// LISTENERS

// Listeners of each element of drinks list to add/remove a drink to/from favorites
function listenersRenderedDrinks() {
  const renderedDrinksHeart = document.querySelectorAll('.js_addRemoveFavorite');

  for (const item of renderedDrinksHeart) {
    item.addEventListener('click', handleClickRenderedDrinks);
  }
}

function listenersRenderedInitialDrinks() {
  const renderedDrinksHeart = document.querySelectorAll('.js_addRemoveFavorite');

  for (const item of renderedDrinksHeart) {
    item.addEventListener('click', handleClickInitialDrinks);
  }
}
