// Elimina la tarea seleccionada desde la lista.
import { state } from '../state.js';
import { removeTask } from '../domain/tasks/remove-task.js';
import { updateStoredTasks } from '../storage/update-stored-tasks.js';
import { renderApp } from '../ui/render-app.js';
import { resetTaskForm } from '../ui/form/reset-task-form.js';
import { showMessage } from '../ui/form/show-message.js';

export async function handleTaskClick(event) {
  const button = event.target.closest('[data-delete-id]');
  if (!button) return;

  const taskId = button.dataset.deleteId;
  let nextTasks;
  try {
    nextTasks = await updateStoredTasks((tasks) => removeTask(tasks, taskId));
  } catch {
    nextTasks = null;
  }
  if (!nextTasks) {
    showMessage('No se pudo eliminar la tarea. Inténtalo otra vez.');
    return;
  }
  state.tasks = nextTasks;
  if (state.editingId === taskId) {
    state.editingId = null;
    state.editingSnapshot = null;
    resetTaskForm();
  }
  showMessage('');
  renderApp();
  document.querySelector('[data-filter][aria-pressed="true"]').focus();
}
