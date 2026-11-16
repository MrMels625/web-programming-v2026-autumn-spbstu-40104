import {Recipe} from './model.js';

const recipes = [];

const form = document.querySelector('form[data-testid="entity-form"]');
const list = document.querySelector('[data-testid="entity-list"]');

function parseList(text) {
  return String(text || '')
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.querySelector('[name="title"]').value.trim();
  if (!title) {
    return;
  }

  const ingredients = parseList(
    form.querySelector('[name="ingredients"]').value,
  );
  const steps = parseList(form.querySelector('[name="steps"]').value);

  const recipe = new Recipe(title, ingredients, steps);
  recipes.push(recipe);

  console.log(recipes);
  form.reset();
});
