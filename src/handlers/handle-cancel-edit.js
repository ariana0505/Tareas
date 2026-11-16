// Cancela la edición y devuelve el formulario al modo de creación.
import { state } from '../state.js';
import { resetTaskForm } from '../ui/form/reset-task-form.js';
import { showMessage } from '../ui/form/show-message.js';

export function handleCancelEdit() {
  state.editingId = null;
  state.editingSnapshot = null;
  resetTaskForm();
  showMessage('');
  document.querySelector('#task-title').focus();
}
