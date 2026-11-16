// Limpia los textos del formulario y devuelve solo los campos de una tarea.
export function normalizeTaskInput(input) {
  return {
    title: input.title.trim(),
    description: input.description.trim(),
    block: input.block.trim(),
    date: input.date,
    startTime: input.startTime,
    endTime: input.endTime,
    priority: input.priority,
  };
}
