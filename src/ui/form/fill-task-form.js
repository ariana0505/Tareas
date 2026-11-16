// Rellena el formulario con los datos de una tarea existente.
import { clearFormErrors } from './clear-form-errors.js';

export function fillTaskForm(task) {
  const form = document.querySelector('#task-form');
  form.elements.title.value = task.title;
  form.elements.description.value = task.description;
  form.elements.block.value = task.block || '';
  form.elements.date.value = task.date || '';
  form.elements.startTime.value = task.startTime || '';
  form.elements.endTime.value = task.endTime || '';
  form.elements.priority.value = task.priority;
  clearFormErrors(form);
  document.querySelector('#new-task-title').textContent = 'Editar tarea';
  document.querySelector('#submit-task').textContent = 'Guardar cambios';
  document.querySelector('#cancel-edit').hidden = false;
  form.elements.title.focus();
}
