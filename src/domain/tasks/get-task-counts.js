// Calcula los totales que aparecen en el resumen.
export function getTaskCounts(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  return { total: tasks.length, pending: tasks.length - completed, completed };
}
