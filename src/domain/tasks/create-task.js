// Construye una tarea nueva y pendiente a partir de datos ya validados.
import { assertValidTaskInput } from './assert-valid-task-input.js';
import { assertNotPastDate } from './assert-not-past-date.js';
import { normalizeTaskInput } from './normalize-task-input.js';
import { generateId } from './generate-id.js';

export function createTask(input, today) {
  assertValidTaskInput(input);
  assertNotPastDate(input.date, today);
  return { id: generateId(), ...normalizeTaskInput(input), completed: false, createdAt: new Date().toISOString() };
}
