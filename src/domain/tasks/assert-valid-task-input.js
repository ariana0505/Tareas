// Lanza un error con el campo afectado si los datos de la tarea no son válidos.
import { validateTaskInput } from './validate-task-input.js';
import { createFieldError } from './create-field-error.js';

export function assertValidTaskInput(input) {
  const error = validateTaskInput(input);
  if (error) throw createFieldError(error.field, error.message);
}
