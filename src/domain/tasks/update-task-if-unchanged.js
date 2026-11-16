// Aplica una edición solo si la tarea no cambió en otra pestaña desde que se abrió.
import { updateTask } from './update-task.js';

export function updateTaskIfUnchanged(tasks, id, snapshot, input) {
  const current = tasks.find((task) => task.id === id);
  if (!current || JSON.stringify(current) !== snapshot) {
    const conflict = new Error('La tarea cambió desde que empezó la edición.');
    conflict.code = 'TASK_CONFLICT';
    throw conflict;
  }
  return tasks.map((task) => task.id === id ? updateTask(task, input) : task);
}
