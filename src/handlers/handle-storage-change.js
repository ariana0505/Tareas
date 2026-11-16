// Sincroniza la vista con cambios guardados en otra pestaña.
import { state } from '../state.js';
import { loadTasks } from '../storage/load-tasks.js';
import { renderApp } from '../ui/render-app.js';

// Actualiza la vista cuando otra pestaña cambia o borra los datos locales.
export function handleStorageChange(event) {
  if (event.key !== 'mis-tareas-v1' && event.key !== null) return;
  state.tasks = loadTasks();
  renderApp();
}
