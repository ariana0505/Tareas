// Actualiza los datos locales partiendo de la versión más reciente.
import { isStoredTask } from '../domain/tasks/is-stored-task.js';
import { loadStoredEntries } from './load-stored-entries.js';
import { saveTasks } from './save-tasks.js';

export async function updateStoredTasks(update) {
  const commit = () => {
    const entries = loadStoredEntries();
    const nextTasks = update(entries.filter(isStoredTask));
    // Las entradas no reconocidas se conservan para no borrar datos al guardar.
    const unknown = entries.filter((entry) => !isStoredTask(entry));
    return saveTasks([...nextTasks, ...unknown]) ? nextTasks : null;
  };

  // El bloqueo serializa escrituras simultáneas entre pestañas cuando está disponible.
  if (globalThis.navigator?.locks?.request) {
    return navigator.locks.request('mis-tareas-v1', commit);
  }
  return commit();
}
