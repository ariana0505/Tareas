// Muestra el error de un envío fallido y marca el campo afectado.
import { showMessage } from './show-message.js';

export function showSubmitError(form, error) {
  if (!error.field) {
    showMessage('No se pudo guardar la tarea en este navegador. Inténtalo otra vez.');
    return;
  }
  const candidate = form.elements[error.field];
  const field = candidate && typeof candidate.setAttribute === 'function' ? candidate : form.elements.title;
  field.setAttribute('aria-invalid', 'true');
  showMessage(error.message);
  field.focus();
}
