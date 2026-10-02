import React, {StrictMode, useEffect, useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

function App() {
  const [tasks, setTasks] = useState(() => {
    const raw = localStorage.getItem('tasks');
    if (raw) {
      return JSON.parse(raw);
    }
    return [];
  });
  const [description, setDescription] = useState('');


  useEffect(() => {
    const raw = localStorage.getItem('tasks');
    if (raw) {
      setTasks(JSON.parse(raw));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTaskOnSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: crypto.randomUUID(),
      description: description,
      isDone: false
    };

    setTasks([...tasks, newTask]);
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task => {
      return task.id === id ? {...task, isDone: !task.isDone} : task;
    }));
  }

  const deleteTask = (id) =>
    setTasks(tasks.filter(task => {
      return task.id !== id;
    }))

  return (
    <div className="app">
      <h1>МОИ ЗАДАЧИ</h1>
      <form onSubmit={addTaskOnSubmit} id='task-adding-form'>
        <input onChange={(e) => {setDescription(e.target.value)}} value={description} data-testid='todo-input' type='text' required placeholder='Введите новую задачу'/>
        <button data-testid='todo-add' type='submit'>ДОБАВИТЬ</button>
      </form>
      <ul className='task-list' data-testid='todo-list'>
        { tasks.length === 0 ? (<li>Нет задач</li>) :
          (
            tasks.map((task) => (
              (<li className='task' key={task.id}>
                {task.description}
                <input onChange={() => toggleTask(task.id)} type='checkbox'/>
                <button onClick={() => deleteTask(task.id)} type='button' className='delete-task-button'>🗑</button>
              </li>)
            ))
          )}
      </ul>
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
