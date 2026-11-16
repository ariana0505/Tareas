// Actualiza las partes principales de la interfaz.
import { renderTaskList } from './task/render-task-list.js';
import { renderSummary } from './render-summary.js';
import { renderFilters } from './render-filters.js';

export function renderApp() {
  renderTaskList();
  renderSummary();
  renderFilters();
}
