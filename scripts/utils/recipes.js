import { RecipeCard } from "../templates/recipe.js";

//Éléments du DOM nécessaire à la section recettes
const recipesSection = document.querySelector(".recipes");
const filterNumber = document.querySelector(".filter__number");

//Fonction qui affiche les cartes de chaque recette et le nombre de recettes
export function displayRecipesCards(arr) {
  recipesSection.innerHTML = "";
  let counter = 0;
  for (const recipe of arr) {
    counter++;
    const article = new RecipeCard(recipe);
    recipesSection.appendChild(article.recipeCardArticle);
    for (const ingredient of recipe.ingredients) {
      const recipesIngredients = recipesSection.lastElementChild.querySelector(
        ".recipes__ingredients"
      );
      recipesIngredients.insertAdjacentHTML(
        "beforeend",
        `<li class="recipes__ingredients-name">
              ${ingredient.ingredient}<br />
          <span class="recipes__ingredients-quantity">
              ${ingredient.quantity ?? ""} ${ingredient.unit ?? ""}
          </span>
        </li>`
      );
    }
  }

  filterNumber.textContent = `${counter} recettes`;

  const phantomArticle = document.createElement("article");
  phantomArticle.setAttribute("class", "recipes__phantom-card");
  recipesSection.appendChild(phantomArticle);
}
