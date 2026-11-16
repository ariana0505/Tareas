// Arma el elemento de lista de una tarea juntando sus partes.
import { buildTaskCheck } from './build-task-check.js';
import { buildTaskContent } from './build-task-content.js';
import { buildTaskSchedule } from './build-task-schedule.js';
import { buildTaskActions } from './build-task-actions.js';

export function renderTask(task) {
  const item = document.createElement('li');
  item.className = `task-item${task.completed ? ' is-complete' : ''}`;
  const content = buildTaskContent(task);
  content.append(buildTaskSchedule(task));
  item.append(buildTaskCheck(task), content, buildTaskActions(task));
  return item;
}
