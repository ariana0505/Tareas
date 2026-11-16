// Carga en el formulario la tarea elegida para editar.
import { state } from '../state.js';
import { fillTaskForm } from '../ui/form/fill-task-form.js';
import { showMessage } from '../ui/form/show-message.js';

export function handleEditClick(event) {
  const button = event.target.closest('[data-edit-id]');
  if (!button) return;
  const task = state.tasks.find((item) => item.id === button.dataset.editId);
  if (!task) return;
  state.editingId = task.id;
  state.editingSnapshot = JSON.stringify(task);
  showMessage('');
  fillTaskForm(task);
  document.querySelector('#task-form').scrollIntoView({ block: 'start', behavior: 'smooth' });
}
