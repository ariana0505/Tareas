// Ordena tareas por importancia sin modificar la lista original.
const order = { alta: 0, media: 1, baja: 2 };

export function sortTasksByPriority(tasks) {
  return [...tasks].sort((first, second) => order[first.priority] - order[second.priority]);
}
