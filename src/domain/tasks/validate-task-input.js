// Reúne las reglas de validación del formulario de tareas.
import { isValidDate } from '../schedule/is-valid-date.js';
import { isValidTime } from '../schedule/is-valid-time.js';

export function validateTaskInput(input) {
  const { title, description, priority } = input;
  if (typeof title !== 'string' || !title.trim()) return { field: 'title', message: 'Escribe el nombre de la tarea.' };
  if (title.trim().length > 80) return { field: 'title', message: 'El nombre puede tener hasta 80 caracteres.' };
  if (typeof description !== 'string' || description.trim().length > 280) return { field: 'description', message: 'Los detalles pueden tener hasta 280 caracteres.' };
  if (typeof input.block !== 'string' || !input.block.trim()) return { field: 'block', message: 'Escribe el nombre del bloque.' };
  if (input.block.trim().length > 50) return { field: 'block', message: 'El bloque puede tener hasta 50 caracteres.' };
  if (!isValidDate(input.date)) return { field: 'date', message: 'Elige una fecha válida.' };
  if (!isValidTime(input.startTime)) return { field: 'startTime', message: 'Elige una hora de inicio válida.' };
  if (!isValidTime(input.endTime)) return { field: 'endTime', message: 'Elige una hora de fin válida.' };
  if (input.endTime <= input.startTime) return { field: 'endTime', message: 'La hora de fin debe ser posterior a la de inicio.' };
  if (!['alta', 'media', 'baja'].includes(priority)) return { field: 'priority', message: 'Elige una importancia válida.' };
  return null;
}
