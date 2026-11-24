import {StrictMode, useState, useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

function Timer() {
  const [minutes, setMinutes] = useState('');
  const [secondsLeft, setSecondsLeft] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const display =
    secondsLeft === null
      ? '00:00'
      : `${String(Math.floor(secondsLeft / 60)).padStart(2, '0')}:${String(
          secondsLeft % 60,
        ).padStart(2, '0')}`;

  return (
    <div className="timer">
      <input
        type="number"
        min="1"
        step="1"
        value={minutes}
        onChange={(e) => setMinutes(e.target.value)}
        placeholder="Минуты"
        disabled={isRunning}
      />
      <button type="button" disabled={isRunning || !minutes}>
        Запуск
      </button>
      <div className="time">{display}</div>
    </div>
  );
}

function App() {
  return (
    <div className="app">
      <h1>Таймер</h1>
      <Timer />
    </div>
  );
}

const rootElement = document.querySelector('[data-testid="app"]');

if (!rootElement) {
  throw new Error('Корневой элемент приложения не найден.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
