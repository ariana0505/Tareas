// Devuelve la lista sin la tarea eliminada.
export function removeTask(tasks, id) {
  return tasks.filter((task) => task.id !== id);
}
