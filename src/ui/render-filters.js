// Señala visualmente cuál filtro está activo.
import { state } from '../state.js';

export function renderFilters() {
  document.querySelectorAll('[data-filter]').forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.filter === state.filter));
  });
}
