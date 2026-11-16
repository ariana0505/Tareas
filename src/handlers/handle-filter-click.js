// Cambia el filtro activo de la lista.
import { state } from '../state.js';
import { renderApp } from '../ui/render-app.js';

export function handleFilterClick(event) {
  const button = event.target.closest('[data-filter]');
  if (!button) return;
  state.filter = button.dataset.filter;
  renderApp();
}
