// Muestra u oculta el mensaje de lista vacía según el filtro activo.
const messages = {
  todas: ['Tu lista empieza aquí', 'Agrega una tarea para tener claro tu próximo paso.'],
  pendientes: ['Nada pendiente', 'Cuando agregues una tarea pendiente, aparecerá aquí.'],
  culminadas: ['Aún no hay tareas culminadas', 'Marca una tarea como culminada y aparecerá aquí.'],
};

export function renderEmptyState(isEmpty, filter) {
  document.querySelector('#empty-state').hidden = !isEmpty;
  if (!isEmpty) return;
  const [title, description] = messages[filter];
  document.querySelector('#empty-title').textContent = title;
  document.querySelector('#empty-description').textContent = description;
}
