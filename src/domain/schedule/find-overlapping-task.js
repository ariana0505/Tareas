// Busca una tarea con horario superpuesto en la misma fecha.
// Terminar a la misma hora en que otra empieza no cuenta como superposición.
export function findOverlappingTask(task, tasks) {
  return tasks.find((other) =>
    other.id !== task.id
    && other.date === task.date
    && typeof other.startTime === 'string' && typeof other.endTime === 'string'
    && task.startTime < other.endTime
    && other.startTime < task.endTime) ?? null;
}
