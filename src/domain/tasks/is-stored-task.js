// Reconoce tareas guardadas con el formato actual o anterior.
import { isValidDate } from '../schedule/is-valid-date.js';
import { isValidTime } from '../schedule/is-valid-time.js';

export function isStoredTask(task) {
  const base = task !== null && typeof task === 'object'
    && typeof task.id === 'string'
    && typeof task.title === 'string'
    && typeof task.description === 'string'
    && ['alta', 'media', 'baja'].includes(task.priority)
    && typeof task.completed === 'boolean'
    && typeof task.createdAt === 'string';
  if (!base) return false;

  const legacy = task.block === undefined && task.date === undefined
    && task.startTime === undefined && task.endTime === undefined;
  const scheduled = typeof task.block === 'string' && task.block.trim().length > 0
    && isValidDate(task.date)
    && isValidTime(task.startTime)
    && isValidTime(task.endTime)
    && task.endTime > task.startTime;
  return legacy || scheduled;
}
