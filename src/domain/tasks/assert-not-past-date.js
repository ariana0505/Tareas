// Lanza un error si la fecha es anterior a hoy.
import { createFieldError } from './create-field-error.js';
import { getToday } from '../schedule/get-today.js';

export function assertNotPastDate(date, today = getToday()) {
  if (date < today) throw createFieldError('date', 'No puedes agendar una tarea en un día que ya pasó.');
}
