"use strict";let initialDrinks=[],drinks=[];const searchText=document.querySelector(".js_searchText"),searchButton=document.querySelector(".js_searchButton"),listsContainer=document.querySelector(".js_listsContainer"),errorContainer=document.querySelector(".js_errorContainer"),searchContainer=document.querySelector(".js_searchContainer"),searchList=document.querySelector(".js_searchList"),searchTitle=document.querySelector(".js_searchTitle");let favorites=[];const favoritesContainer=document.querySelector(".js_favorites"),favoritesList=document.querySelector(".js_favoritesList"),deleteAllFavoritesButton=document.querySelector(".js_resetFavorites"),favoriteDrinkList=JSON.parse(localStorage.getItem("favoriteDrinkList"));function initialGetFromServer(){fetch("https://www.thecocktaildb.com/api/json/v1/1/filter.php?g=Cocktail_glass").then(e=>e.json()).then(e=>{const t=e.drinks;initialDrinks=t.map(e=>({id:e.idDrink,name:e.strDrink,image:e.strDrinkThumb}));const r=initialDrinks.sort(()=>Math.random()-.5).splice(7,20);initialDrinks=r,deletePreviousQueries(),renderInitialDrinks(initialDrinks),searchTitle.innerHTML="Algunos cócteles"}).catch(e=>{searchContainer.classList.add("hidden"),deletePreviousQueries(),deleteErrorMessage(),errorMessage("No lo intentes. Hazlo o no lo hagas. Pero en este caso inténtalo de nuevo por favor. Hemos tenido un problemilla momentáneo.","./assets/images/noTrys.jpg","Yoda",'El imperio contrataca - Yoda enseñando a luke a usar la fuerza - "No lo intentes. Hazlo o no lo hagas. Pero no lo intentes."')})}function renderInitialDrinks(e){for(const t of e){const e=favorites.findIndex(e=>e.id===t.id),r=document.createElement("li");r.classList.add("drink","js_initialDrink"),-1!==e&&r.classList.add("drink--favorite"),r.setAttribute("id",t.id);const i=document.createElement("img");""===t.image?(i.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=img"),i.setAttribute("alt",t.name),i.classList.add("drink__image")):(i.setAttribute("src",t.image+"/preview"),i.setAttribute("alt",t.name),i.classList.add("drink__image")),r.appendChild(i);const s=document.createElement("h3");s.classList.add("drink__title");const n=document.createTextNode(t.name);s.appendChild(n),r.appendChild(s),searchList.appendChild(r)}listenersInitialDrinks()}initialGetFromServer();const removePreviusInitialDrinks=()=>{const e=document.querySelectorAll(".js_initialDrink");for(const t of e)t.remove()};function handleClickSearchButton(e){e.preventDefault();validateInputValue(searchText.value.toLowerCase())}searchButton.addEventListener("click",handleClickSearchButton);const errorMessage=(e,t,r,i)=>{errorContainer.classList.remove("hidden"),listsContainer.classList.add("hidden");const s=document.createElement("p");s.classList.add("error__text","js_errorText");const n=document.createTextNode(e);if(s.appendChild(n),errorContainer.appendChild(s),void 0!==t){const e=document.createElement("img");e.classList.add("error__image","js_errorImage"),e.setAttribute("src",t),e.setAttribute("alt",r),e.setAttribute("title",i),errorContainer.appendChild(e)}},deleteErrorMessage=()=>{if(!errorContainer.classList.contains("hidden")){const e=document.querySelectorAll(".js_errorText"),t=document.querySelector(".js_errorImage");for(const t of e)t.remove();t.remove(),errorContainer.classList.add("hidden")}};function validateInputValue(e){""===e?(deletePreviousQueries(),errorMessage("Nada, es inútil. No sé qué será."),errorMessage("Es un acertijo: Di, *nombre del cóctel que quieres buscar* y encuentra.","./assets/images/LOR.jpg","Puerta de Moria",'La Comunidad del Anillo - Puerta de Moria - "Di amigo y entra".')):getFromServer(e)}function getFromServer(e){fetch("https://www.thecocktaildb.com/api/json/v2/1/search.php?s="+e).then(e=>e.json()).then(t=>{const r=t.drinks;null===r?(deletePreviousQueries(),errorMessage("Lo siento. Mis respuestas son limitadas. Haz las consultas correctas.","./assets/images/rightSearchs.jpg","Doctor Alfred Lanning",'Yo, Robot - Interrogatorio al doctor Alfred Lanning por el detective Del Spooner, después de su muerte. - "Lo siento. Mis respuestas son limitadas. Haz las preguntas correctas."')):(drinks=r.map(e=>({id:e.idDrink,name:e.strDrink,image:e.strDrinkThumb})),deletePreviousQueries(),renderDrinks(drinks),searchTitle.innerHTML=e)}).catch(e=>{searchContainer.classList.add("hidden"),deletePreviousQueries(),errorMessage("No lo intentes. Hazlo o no lo hagas. Pero en este caso inténtalo de nuevo por favor. Hemos tenido un problemilla momentáneo.","./assets/images/noTrys.jpg","Yoda",'El imperio contrataca - Yoda enseñando a luke a usar la fuerza - "No lo intentes. Hazlo o no lo hagas. Pero no lo intentes."')})}function renderDrinks(e){for(const t of e){const e=favorites.findIndex(e=>e.id===t.id),r=document.createElement("li");r.classList.add("drink","js_drinks"),-1!==e&&r.classList.add("drink--favorite"),r.setAttribute("id",t.id);const i=document.createElement("img");""===t.image?(i.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=img"),i.setAttribute("alt",t.name),i.classList.add("drink__image")):(i.setAttribute("src",t.image+"/preview"),i.setAttribute("alt",t.name),i.classList.add("drink__image")),r.appendChild(i);const s=document.createElement("h3");s.classList.add("drink__title");const n=document.createTextNode(t.name);s.appendChild(n),r.appendChild(s),searchList.appendChild(r)}listenersRenderedDrinks()}const removePreviusRenderedDrinks=()=>{const e=document.querySelectorAll(".js_drinks");for(const t of e)t.remove()},deletePreviousQueries=()=>{listsContainer.classList.contains("hidden")?deleteErrorMessage():searchList.innerHTML=""};function addRemoveDrinkToFavorites(e){const t=e.currentTarget.id,r=drinks.find(e=>e.id===t),i=favorites.findIndex(e=>e.id===t);-1===i?favorites.push(r):favorites.splice(i,1)}function handleClickRenderedDrinks(e){addRemoveDrinkToFavorites(e),localStorage.setItem("favoriteDrinkList",JSON.stringify(favorites)),removePreviusRenderedDrinks(),renderDrinks(drinks),removePreviusRenderedFavorites(),renderFavorites(favorites)}function listenersRenderedDrinks(){const e=document.querySelectorAll(".js_drinks");for(const t of e)t.addEventListener("click",handleClickRenderedDrinks)}function addRemoveFavoritesFromInitialDrinks(e){const t=e.currentTarget.id,r=initialDrinks.find(e=>e.id===t),i=favorites.findIndex(e=>e.id===t);-1===i?favorites.push(r):favorites.splice(i,1)}function handleClickInitialDrinks(e){addRemoveFavoritesFromInitialDrinks(e),localStorage.setItem("favoriteDrinkList",JSON.stringify(favorites)),removePreviusInitialDrinks(),renderInitialDrinks(initialDrinks),removePreviusRenderedFavorites(),renderFavorites(favorites)}function listenersInitialDrinks(){const e=document.querySelectorAll(".js_initialDrink");for(const t of e)t.addEventListener("click",handleClickInitialDrinks)}function renderFavorites(e){for(const t of e){const e=document.createElement("li");e.classList.add("favorite","js_favorite"),e.setAttribute("id",t.id);const r=document.createElement("img");""===t.image?(r.setAttribute("src","https://via.placeholder.com/210x295/ffffff/666666/?text=img"),r.setAttribute("alt",t.name),r.classList.add("favorite__image")):(r.setAttribute("src",t.image+"/preview"),r.setAttribute("alt",t.name),r.classList.add("favorite__image")),e.appendChild(r);const i=document.createElement("h3");i.classList.add("favorite__title");const s=document.createTextNode(t.name);i.appendChild(s),e.appendChild(i);const n=document.createElement("button");n.classList.add("deleteFavorite","js_deleteFavorite"),n.setAttribute("id",t.id);const o=document.createElement("ion-icon");o.classList.add("deleteFavorite__icon"),o.setAttribute("name","heart-dislike-outline"),n.appendChild(o),e.appendChild(n),favoritesList.appendChild(e)}listenersDeleteFavoritesButton()}const removePreviusRenderedFavorites=()=>{const e=document.querySelectorAll(".js_favorite");for(const t of e)t.remove()};function handleClickDeleteFavorites(e){const t=e.currentTarget.id,r=favorites.findIndex(e=>e.id===t);-1!==r&&favorites.splice(r,1),localStorage.setItem("favoriteDrinkList",JSON.stringify(favorites)),removePreviusRenderedDrinks(),renderDrinks(drinks),removePreviusRenderedFavorites(),renderFavorites(favorites)}function listenersDeleteFavoritesButton(){const e=document.querySelectorAll(".js_deleteFavorite");for(const t of e)t.addEventListener("click",handleClickDeleteFavorites)}function handleClickDeleteAllFavorites(e){e.preventDefault(),favorites=[],localStorage.removeItem("favoriteDrinkList"),removePreviusRenderedDrinks(),renderDrinks(drinks),removePreviusRenderedFavorites(),renderFavorites(favorites)}deleteAllFavoritesButton.addEventListener("click",handleClickDeleteAllFavorites),null!==favoriteDrinkList&&(favorites=favoriteDrinkList,renderFavorites(favoriteDrinkList));