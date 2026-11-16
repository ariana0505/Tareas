// Hook que corre antes de guardar una tarea nueva o editada: rechaza horarios superpuestos.
import { findOverlappingTask } from '../domain/schedule/find-overlapping-task.js';
import { createFieldError } from '../domain/tasks/create-field-error.js';

export function beforeTaskSave(task, existingTasks) {
  const overlap = findOverlappingTask(task, existingTasks);
  if (!overlap) return;
  const error = createFieldError('startTime',
    `Se superpone con «${overlap.title}» (${overlap.startTime} a ${overlap.endTime}) ese mismo día. Cambia el horario.`, 'TASK_OVERLAP');
  error.conflictId = overlap.id;
  throw error;
}
