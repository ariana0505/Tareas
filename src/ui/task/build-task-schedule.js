// Crea la línea con bloque, fecha y horas de una tarea, o el aviso de que no tiene horario.
import { formatTaskDate } from './format-task-date.js';

export function buildTaskSchedule(task) {
  const schedule = document.createElement('p');
  schedule.className = 'task-schedule';
  if (!(task.block && task.date && task.startTime && task.endTime)) {
    schedule.classList.add('is-unscheduled');
    schedule.textContent = 'Sin horario asignado';
    return schedule;
  }

  const block = document.createElement('strong');
  block.textContent = task.block;
  const date = document.createElement('span');
  date.textContent = formatTaskDate(task.date);
  const time = document.createElement('span');
  time.textContent = `De ${task.startTime} a ${task.endTime}`;
  schedule.append(block, date, time);
  return schedule;
}
