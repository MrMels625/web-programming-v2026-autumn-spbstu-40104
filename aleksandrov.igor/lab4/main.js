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
  list.innerHTML = `
    <h3>${recipe.title}</h3>
    <p>Ингредиентов: ${recipe.ingredientCount} · Шагов: ${recipe.steps.length}</p>
    <p><b>Ингредиенты:</b> ${recipe.ingredients.join(', ') || 'нет'}</p>
    <p><b>Шаги:</b> ${recipe.steps.join(' -> ') || 'нет'}</p>
    <div>
      <button type="button" data-action="add-ingredient" data-index="${index}">Добавить ингредиент</button>
      <button type="button" data-action="remove-ingredient" data-index="${index}">Удалить ингредиент</button>
      <button type="button" data-action="add-step" data-index="${index}">Добавить шаг</button>
      <button type="button" data-action="remove-step" data-index="${index}">Удалить шаг</button>
      <button type="button" data-testid="delete-entity" data-index="${index}">Удалить рецепт</button>
    </div>
  `;

  recipes.forEach((recipe, index) => {
    const card = document.createElement('article');
    card.setAttribute('data-testid', 'entity-card');

    card.innerHTML = `
      <h3>${recipe.title}</h3>
      <p>Ингредиентов: ${recipe.ingredientCount} · Шагов: ${recipe.steps.length}</p>
      <p><b>Ингредиенты:</b> ${recipe.ingredients.join(', ') || 'нет'}</p>
      <p><b>Шаги:</b> ${recipe.steps.join(' -> ') || 'нет'}</p>
      <button type="button" data-testid="delete-entity" data-index="${index}">
        Удалить
      </button>
    `;

    list.appendChild(card);
  });
}

list.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;

  const index = Number(btn.dataset.index);
  const recipe = recipes[index];
  if (!recipe) return;

  const action = btn.dataset.action;

  if (btn.matches('[data-testid="delete-entity"]')) {
    delay(() => {
      recipes.splice(index, 1);
      save();
      render();
    });
    return;
  }

  if (action === 'add-ingredient') {
    const value = prompt('Новый ингредиент:');
    if (!value?.trim()) return;
    delay(() => {
      recipe.addIngredient(value.trim());
      save();
      render();
    });
    return;
  }

  if (action === 'remove-ingredient') {
    const value = prompt('Какой ингредиент удалить?', recipe.ingredients[0] || '');
    if (!value?.trim()) return;
    delay(() => {
      recipe.removeIngredient(value.trim());
      save();
      render();
    });
    return;
  }

  if (action === 'add-step') {
    const value = prompt('Новый шаг:');
    if (!value?.trim()) return;
    delay(() => {
      recipe.addStep(value.trim());
      save();
      render();
    });
    return;
  }

  if (action === 'remove-step') {
    const value = prompt('Какой шаг удалить?', recipe.steps[0] || '');
    if (!value?.trim()) return;
    delay(() => {
      recipe.removeStep(value.trim());
      save();
      render();
    });
  }
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

