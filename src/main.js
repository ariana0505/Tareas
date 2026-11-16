// Inicia la aplicación y conecta los eventos con sus manejadores.
import { state } from './state.js';
import { loadTasks } from './storage/load-tasks.js';
import { renderApp } from './ui/render-app.js';
import { getToday } from './domain/schedule/get-today.js';
import { handleSubmit } from './handlers/handle-submit.js';
import { handleTaskChange } from './handlers/handle-task-change.js';
import { handleTaskClick } from './handlers/handle-task-click.js';
import { handleFilterClick } from './handlers/handle-filter-click.js';
import { handleEditClick } from './handlers/handle-edit-click.js';
import { handleCancelEdit } from './handlers/handle-cancel-edit.js';
import { handleStorageChange } from './handlers/handle-storage-change.js';

state.tasks = loadTasks();
document.querySelector('#task-date').min = getToday();
renderApp();

document.querySelector('#task-form').addEventListener('submit', handleSubmit);
document.querySelector('#task-list').addEventListener('change', handleTaskChange);
document.querySelector('#task-list').addEventListener('click', handleTaskClick);
document.querySelector('#task-list').addEventListener('click', handleEditClick);
document.querySelector('#task-filters').addEventListener('click', handleFilterClick);
document.querySelector('#cancel-edit').addEventListener('click', handleCancelEdit);
window.addEventListener('storage', handleStorageChange);
