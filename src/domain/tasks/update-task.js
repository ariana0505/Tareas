// Aplica los campos editables a una tarea conservando su id y estado.
import { assertValidTaskInput } from './assert-valid-task-input.js';
import { normalizeTaskInput } from './normalize-task-input.js';

export function updateTask(task, input) {
  assertValidTaskInput(input);
  return { ...task, ...normalizeTaskInput(input) };
}
