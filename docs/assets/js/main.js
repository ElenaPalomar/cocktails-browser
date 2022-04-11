"use strict";const mainList=document.querySelector(".js_mainList");let drinks=[];const searchText=document.querySelector(".js_searchText"),searchButton=document.querySelector(".js_searchButton");let favorites=[];const favoriteList=document.querySelector(".js_favoriteList"),favoriteDrinkList=JSON.parse(localStorage.getItem("favoriteDrinkList"));function handleClickSearchButton(r){r.preventDefault();const t=searchText.value;fetch("https://www.thecocktaildb.com/api/json/v2/1/search.php?s="+t).then(r=>r.json()).then(r=>{drinks=r.drinks,renderDrinksHtml()})}function handleClickRenderedDrinks(r){null!==favoriteDrinkList&&(favorites=favoriteDrinkList);const t=r.currentTarget.id,e=drinks.find(r=>r.idDrink===t),i=favorites.findIndex(r=>r.idDrink===t);-1===i?favorites.push(e):favorites.splice(i,1),localStorage.setItem("favoriteDrinkList",JSON.stringify(favorites)),renderDrinksHtml(),renderFavoritesHtml(favorites)}function listenersRenderedDrinks(){const r=document.querySelectorAll(".js_drinks");for(const t of r)t.addEventListener("click",handleClickRenderedDrinks)}function renderDrinksHtml(r){let t="";for(const r of drinks){let e="";e=-1!==favorites.findIndex(t=>t.idDrink===r.idDrink)?"drink--favorite":"",t+=`<li class="drink js_drinks ${e}" id=${r.idDrink}>`,""===r.strDrinkThumb?t+=` <img src='https://via.placeholder.com/210x295/ffffff/666666/?text=img' alt='${r.strDrink}' />`:t+=` <img src='${r.strDrinkThumb}/preview' alt='${r.strDrink}' />`,t+=` <h3>${r.strDrink}</h3>`,t+="</li>"}mainList.innerHTML=t,listenersRenderedDrinks()}function renderFavoritesHtml(r){let t="";for(const e of r)t+=`<li class="favorite js_favorite" id=${e.idDrink}>`,""===e.strDrinkThumb?t+=` <img src='https://via.placeholder.com/210x295/ffffff/666666/?text=img' alt='${e.strDrink}' />`:t+=` <img src='${e.strDrinkThumb}/preview' alt='${e.strDrink}' />`,t+=` <h3>${e.strDrink}</h3>`,t+="</li>";favoriteList.innerHTML=t}searchButton.addEventListener("click",handleClickSearchButton),null!==favoriteDrinkList&&renderFavoritesHtml(favoriteDrinkList);