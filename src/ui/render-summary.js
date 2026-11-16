// Muestra las cantidades de tareas por estado.
import { state } from '../state.js';
import { getTaskCounts } from '../domain/tasks/get-task-counts.js';

export function renderSummary() {
  const counts = getTaskCounts(state.tasks);
  document.querySelector('#completed-count').textContent = counts.completed;
  document.querySelector('#pending-count').textContent = counts.pending;
  document.querySelector('#total-count').textContent = counts.total;
}
