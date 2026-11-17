import {Recipe} from './model.js';

const STORAGE_KEY = 'lab4-recipes';

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(recipes.map((r) => ({
      title: r.title,
      ingredients: r.ingredients,
      steps: r.steps,
    })))
  );
}

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return [];
    }
    const data = JSON.parse(raw);
    if (!Array.isArray(data)) {
      return [];
    }
    return data.map((item) => new Recipe(item.title, item.ingredients, item.steps));
  } catch {
    return [];
  }
}

let recipes = load();

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
    save();
    render();
  });
});

list.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-testid="delete-entity"]');
  if (!btn) return;

  const index = Number(btn.dataset.index);
  delay(() => {
    recipes.splice(index, 1);
    save();
    render();
  });
});

