export class Recipe {
  constructor(title, ingredients = [], steps = []) {
    this.title = String(title);
    this.ingredients = Array.isArray(ingredients) ? [...ingredients] : [];
    this.steps = Array.isArray(steps) ? [...steps] : [];
  }
}
