import { Recipe } from "../models/recipe.js";

export class RecipeCard extends Recipe {
  constructor(data) {
    super(data);
  }

  get recipeCardArticle() {
    const article = document.createElement("article");
    article.setAttribute("class", "recipes__card");
    article.innerHTML = `<p class="recipes__duration">${this.time}min</p>
    <img
      src="images/recipes/${this.image}"
      alt="${this.name}"
      class="recipes__image"
    />
    <div class="recipes__details">
      <h2 class="recipes__name">${this.name}</h2>
      <p class="recipes__title">Recette</p>
      <p class="recipes__steps">${this.description}</p>
      <p class="recipes__title">Ingrédients</p>
      <ul class="recipes__ingredients">
      </ul>
    </div>`;
    return article;
  }
}
