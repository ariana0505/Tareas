// Filtra y ordena las tareas que deben mostrarse.
import { sortTasksByPriority } from './sort-tasks-by-priority.js';

export function getVisibleTasks(tasks, filter) {
  if (filter === 'pendientes') return sortTasksByPriority(tasks.filter((task) => !task.completed));
  if (filter === 'culminadas') return sortTasksByPriority(tasks.filter((task) => task.completed));
  return sortTasksByPriority(tasks);
}
