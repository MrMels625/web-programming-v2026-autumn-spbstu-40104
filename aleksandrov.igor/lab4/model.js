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

export function groupRecipesByIngredientCount(recipes) {
  const res = {};
  for (const r of recipes) {
    const key = String(r.ingredientCount);
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(r);
  }
  return res;
}

export function getUniqueIngredients(recipes) {
  const set = new Set();
  for (const r of recipes) {
    for (const ing of r.ingredients) {
      set.add(ing);
    }
  }
  return [...set];
}

export function findRecipesByIngredient(recipes, ingredient) {
  const target = String(ingredient);
  return recipes.filter((r) => r.ingredients.includes(target));
}

export function groupRecipesByStepCount(recipes) {
  const res = {};
  for (const r of recipes) {
    const key = String(r.steps.length);
    if (!res[key]) {
      res[key] = [];
    }
    res[key].push(r);
  }
  return res;
}

export function getRecipeTitles(recipes) {
  return recipes.map((r) => r.title);
}
