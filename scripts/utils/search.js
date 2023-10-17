import { displayRecipesCards } from "../utils/recipes.js";
import { recipes } from "../data/recipes.js";

//SEARCH

//Éléments du DOM nécessaire à la barre de recherche
const headerFormInput = document.querySelector(".header__form-input");
const recipesSection = document.querySelector(".recipes");

//Variables nécessaire à la section filtre
let filteredRecipes = [...recipes];
let ingredients = [];
let appliances = [];
let ustensils = [];
let selectedTags = [];

//Méthode de recherche de l'objet Array
export function manageSearch() {
  displayRecipesCards(filteredRecipes);
  returnFiltersArrays(filteredRecipes);
  fillFiltersContent();

  headerFormInput.addEventListener("input", () => {
    if (headerFormInput.value.length > 2) {
      filterRecipesWithSearchBar();

      displayRecipesCards(filteredRecipes);

      if (filteredRecipes.length === 0) {
        recipesSection.innerHTML = `
        <div class="recipes__message">
          Aucune recette ne contient "${headerFormInput.value}" vous pouvez chercher « tarte aux
          pommes », « poisson », etc.
        </div>`;
      }
    } else {
      filteredRecipes = [...recipes];
      displayRecipesCards(filteredRecipes);
    }

    returnFiltersArrays(filteredRecipes);
    fillFiltersContent();
  });

  filterByTag("ingredient", 0);

  filterByTag("appliance", 1);

  filterByTag("ustensil", 2);
}

//Fonction qui filtre via la barre de recherhce
function filterRecipesWithSearchBar() {
  filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(headerFormInput.value.toLowerCase()) ||
      recipe.ingredients.some((item) =>
        item.ingredient
          .toLowerCase()
          .includes(headerFormInput.value.toLowerCase())
      ) ||
      recipe.description
        .toLowerCase()
        .split(/,| |\.|\(|\)/)
        .includes(headerFormInput.value.toLowerCase())
  );
}

//Fonction qui supprime les doublons d'un tableau
function pushValueInArrayWithoutDuplicate(arr, val) {
  if (!arr.includes(val.toLowerCase())) {
    arr.push(val.toLowerCase());
  }
}

//Fonction qui retourne le contenu de chaque filtre
function returnFiltersArrays(arr) {
  ingredients = [];
  appliances = [];
  ustensils = [];
  for (const recipe of arr) {
    for (const ingredient of recipe.ingredients) {
      pushValueInArrayWithoutDuplicate(ingredients, ingredient.ingredient);
    }

    pushValueInArrayWithoutDuplicate(appliances, recipe.appliance);

    for (const ustensil of recipe.ustensils) {
      pushValueInArrayWithoutDuplicate(ustensils, ustensil);
    }
  }
}

//FILTER

//Éléments du DOM nécessaire à la section filtre
const filterIngredientsBtn = document.querySelector(".filter__ingredients-btn");
const filterAppliancesBtn = document.querySelector(".filter__appliances-btn");
const filterUstensilsBtn = document.querySelector(".filter__ustensils-btn");
const filterDropdownContent = document.querySelectorAll(
  ".filter__dropdown-content"
);
const filterChevronIcon = document.querySelectorAll(".filter__chevron-icon");
const badgesSection = document.querySelector(".badges");

//Fonction qui ouvre ou ferme le contenu du bouton filtre
function openCloseFilter(i) {
  if (
    getComputedStyle(filterDropdownContent[i]).getPropertyValue("display") ===
    "none"
  ) {
    filterDropdownContent[i].style.display = "block";
    filterChevronIcon[i].innerHTML = `<i class="bi bi-chevron-up"></i>`;
  } else {
    filterDropdownContent[i].style.display = "none";
    filterChevronIcon[i].innerHTML = `<i class="bi bi-chevron-down"></i>`;
  }
}

//Fonction qui rempli le contenu d'un filtre
function fillFilterContent(arr, filterElement, className) {
  while (filterElement.children.length > 1) {
    filterElement.removeChild(filterElement.lastChild);
  }
  for (const val of arr) {
    filterElement.insertAdjacentHTML(
      "beforeend",
      `<a class="filter__${className}-link">${val}</a>`
    );
  }
}

//Fonction qui remplis le contenu de tous les filtres
function fillFiltersContent() {
  fillFilterContent(ingredients, filterDropdownContent[0], "ingredient");
  fillFilterContent(appliances, filterDropdownContent[1], "appliance");
  fillFilterContent(ustensils, filterDropdownContent[2], "ustensil");
}

//Fonction qui filtre les recettes avec les tags
function filterRecipesWithTags() {
  for (const selectedTag of selectedTags) {
    filteredRecipes = filteredRecipes.filter(
      (recipe) =>
        recipe.appliance.toLowerCase().includes(selectedTag) ||
        recipe.ingredients.some((item) =>
          item.ingredient.toLowerCase().includes(selectedTag)
        ) ||
        recipe.ustensils.some((item) =>
          item.toLowerCase().includes(selectedTag)
        )
    );
  }
  displayRecipesCards(filteredRecipes);
  returnFiltersArrays(filteredRecipes);
  fillFiltersContent();
}

//Fonction qui affiche un badge lors du clic sur un élément d'un filtre
function filterByTag(filterName, i) {
  filterDropdownContent[i].addEventListener("click", (e) => {
    if (e.target.classList.contains(`filter__${filterName}-link`)) {
      if (!selectedTags.includes(e.target.innerText)) {
        badgesSection.insertAdjacentHTML(
          "beforeend",
          `<div class="badges__badge">${e.target.innerText}<i class="bi bi-x-lg badges__badge-${filterName}-icon"></i></div>`
        );

        selectedTags.push(e.target.innerText);
      }

      console.log(selectedTags);

      if (headerFormInput.value.length > 2) {
        filterRecipesWithSearchBar();
      }

      filterRecipesWithTags();

      openCloseFilter(i);
    }
  });

  badgesSection.addEventListener("click", (e) => {
    if (e.target.classList.contains(`badges__badge-${filterName}-icon`)) {
      selectedTags.splice(
        Array.from(badgesSection.children).indexOf(e.target.parentElement),
        1
      );

      console.log(selectedTags);

      filteredRecipes = [...recipes];

      if (headerFormInput.value.length > 2) {
        filterRecipesWithSearchBar();
      }

      filterRecipesWithTags();

      e.target.parentElement.remove();
    }
  });
}

//Fonction principale qui gère les filtres
export function manageFilters() {
  filterIngredientsBtn.addEventListener("click", () => {
    openCloseFilter(0);
  });

  filterAppliancesBtn.addEventListener("click", () => {
    openCloseFilter(1);
  });

  filterUstensilsBtn.addEventListener("click", () => {
    openCloseFilter(2);
  });
}
