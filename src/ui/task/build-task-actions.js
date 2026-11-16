// Crea los botones Editar y Eliminar de una tarea.
export function buildTaskActions(task) {
  const actions = document.createElement('div');
  actions.className = 'task-actions';

  const edit = document.createElement('button');
  edit.type = 'button';
  edit.dataset.editId = task.id;
  edit.textContent = 'Editar';
  edit.setAttribute('aria-label', `Editar tarea: ${task.title}`);

  const remove = document.createElement('button');
  remove.type = 'button';
  remove.className = 'delete-button';
  remove.dataset.deleteId = task.id;
  remove.textContent = 'Eliminar';
  remove.setAttribute('aria-label', `Eliminar tarea: ${task.title}`);

  actions.append(edit, remove);
  return actions;
}
