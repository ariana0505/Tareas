// Guarda el cambio de estado de una tarea marcada.
import { state } from '../state.js';
import { toggleTask } from '../domain/tasks/toggle-task.js';
import { updateStoredTasks } from '../storage/update-stored-tasks.js';
import { renderApp } from '../ui/render-app.js';
import { showMessage } from '../ui/form/show-message.js';

export async function handleTaskChange(event) {
  const check = event.target.closest('[data-task-id]');
  if (!check) return;

  const taskId = check.dataset.taskId;
  let nextTasks;
  try {
    nextTasks = await updateStoredTasks((tasks) => toggleTask(tasks, taskId));
  } catch {
    nextTasks = null;
  }
  if (!nextTasks) {
    check.checked = !check.checked;
    showMessage('No se pudo guardar el cambio. Inténtalo otra vez.');
    return;
  }
  state.tasks = nextTasks;
  showMessage('');
  renderApp();
  const sameCheck = [...document.querySelectorAll('[data-task-id]')]
    .find((item) => item.dataset.taskId === taskId);
  (sameCheck || document.querySelector('[data-filter][aria-pressed="true"]')).focus();
}
