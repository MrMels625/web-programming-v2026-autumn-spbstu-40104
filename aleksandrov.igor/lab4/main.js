import {Recipe} from './model.js';

const recipes = [];

const form = document.querySelector('form[data-testid="entity-form"]');
const list = document.querySelector('[data-testid="entity-list"]');

const DELAY = 300;

function delay(fn) {
  return new Promise((resolve) => {
    setTimeout(() => {
      fn();
      resolve();
    }, DELAY);
  });
}

function parseList(text) {
  return String(text || '')
    .split(/\n|,/)
    .map((s) => s.trim())
    .filter(Boolean);
}

function render() {
  list.innerHTML = '';

  recipes.forEach((recipe, index) => {
    const card = document.createElement('article');
    card.setAttribute('data-testid', 'entity-card');

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Ингредиентов: ${recipe.ingredientCount} · Шагов: ${recipe.steps.length}</p>
      <p><b>Ингредиенты:</b> ${recipe.ingredients.join(', ') || 'нет'}</p>
      <p><b>Шаги:</b> ${recipe.steps.join(' → ') || 'нет'}</p>
      <button type="button" data-testid="delete-entity" data-index="${index}">
        Удалить
      </button>
    `;

    list.appendChild(card);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = form.querySelector('[name="title"]').value.trim();
  if (!title) return;

  const ingredients = parseList(
    form.querySelector('[name="ingredients"]').value,
  );
  const steps = parseList(form.querySelector('[name="steps"]').value);

  delay(() => {
    recipes.push(new Recipe(title, ingredients, steps));
    form.reset();
    render();
  });
});

list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-testid="delete-entity"]');
  if (!btn) return;

  const index = Number(btn.dataset.index);
  delay(() => {
    recipes.splice(index, 1);
    render();
  });
});
