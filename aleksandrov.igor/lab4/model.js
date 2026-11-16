export class Recipe {
  constructor(title, ingredients = [], steps = []) {
    this.title = String(title);
    this.ingredients = Array.isArray(ingredients) ? [...ingredients] : [];
    this.steps = Array.isArray(steps) ? [...steps] : [];
  }

  get ingredientCount() {
    return this.ingredients.length;
  }

  addIngredient(ingredient) {
    if (ingredient == null || ingredient == '') {
      return;
    }
    this.ingredients.push(String(ingredient));
  }

  removeIngredient(ingredient) {
    const i = this.ingredients.indexOf(String(ingredient));
    if (i !== -1) {
      this.ingredients.splice(i, 1);
    }
  }
}
