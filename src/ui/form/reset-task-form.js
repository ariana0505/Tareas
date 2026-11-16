// Restablece el formulario para agregar una tarea nueva.
import { clearFormErrors } from './clear-form-errors.js';

export function resetTaskForm() {
  const form = document.querySelector('#task-form');
  form.reset();
  clearFormErrors(form);
  document.querySelector('#new-task-title').textContent = 'Nueva tarea';
  document.querySelector('#submit-task').textContent = 'Agregar tarea';
  document.querySelector('#cancel-edit').hidden = true;
}
