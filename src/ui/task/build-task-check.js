// Crea la casilla que marca una tarea como culminada o pendiente.
export function buildTaskCheck(task) {
  const check = document.createElement('input');
  check.type = 'checkbox';
  check.className = 'task-check';
  check.checked = task.completed;
  check.dataset.taskId = task.id;
  check.setAttribute('aria-label', `${task.completed ? 'Marcar pendiente' : 'Marcar culminada'}: ${task.title}`);
  return check;
}
