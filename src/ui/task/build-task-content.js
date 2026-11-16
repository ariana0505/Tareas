// Crea el bloque de texto de una tarea: título, detalles e importancia.
const priorityLabels = { alta: 'Alta', media: 'Media', baja: 'Baja' };

export function buildTaskContent(task) {
  const content = document.createElement('div');
  content.className = 'task-content';

  const title = document.createElement('p');
  title.className = 'task-title';
  title.textContent = task.title;
  content.append(title);

  if (task.description) {
    const description = document.createElement('p');
    description.className = 'task-description';
    description.textContent = task.description;
    content.append(description);
  }

  const meta = document.createElement('div');
  meta.className = 'task-meta';
  const badge = document.createElement('span');
  badge.className = 'priority-badge';
  badge.dataset.priority = task.priority;
  badge.textContent = priorityLabels[task.priority];
  meta.append(badge);
  content.append(meta);
  return content;
}
