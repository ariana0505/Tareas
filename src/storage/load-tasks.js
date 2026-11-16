// Devuelve las tareas guardadas que tienen un formato reconocido.
import { isStoredTask } from '../domain/tasks/is-stored-task.js';
import { loadStoredEntries } from './load-stored-entries.js';

export function loadTasks() {
  return loadStoredEntries().filter(isStoredTask);
}
