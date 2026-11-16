// Cambia el estado de una tarea sin mutar la lista recibida.
export function toggleTask(tasks, id) {
  return tasks.map((task) => task.id === id ? { ...task, completed: !task.completed } : task);
}
