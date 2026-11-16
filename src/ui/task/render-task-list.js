// Dibuja las tareas visibles según el filtro activo.
import { state } from '../../state.js';
import { getVisibleTasks } from '../../domain/tasks/get-visible-tasks.js';
import { renderTask } from './render-task.js';
import { renderEmptyState } from './render-empty-state.js';

export function renderTaskList() {
  const visible = getVisibleTasks(state.tasks, state.filter);
  document.querySelector('#task-list').replaceChildren(...visible.map(renderTask));
  renderEmptyState(visible.length === 0, state.filter);
}
