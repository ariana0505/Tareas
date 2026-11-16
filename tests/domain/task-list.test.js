// Verifica filtros, contadores, cambio de estado, borrado y orden por importancia.
import test from 'node:test';
import assert from 'node:assert/strict';
import { getVisibleTasks } from '../../src/domain/tasks/get-visible-tasks.js';
import { getTaskCounts } from '../../src/domain/tasks/get-task-counts.js';
import { toggleTask } from '../../src/domain/tasks/toggle-task.js';
import { removeTask } from '../../src/domain/tasks/remove-task.js';


test('filtra, cuenta y cambia el estado sin modificar la lista original', () => {
  const tasks = [
    { id: 'a', completed: false, priority: 'baja' },
    { id: 'b', completed: true, priority: 'media' },
  ];
  assert.deepEqual(getTaskCounts(tasks), { total: 2, pending: 1, completed: 1 });
  assert.deepEqual(getVisibleTasks(tasks, 'pendientes').map((task) => task.id), ['a']);
  assert.deepEqual(getVisibleTasks(tasks, 'culminadas').map((task) => task.id), ['b']);
  const changed = toggleTask(tasks, 'a');
  assert.equal(changed[0].completed, true);
  assert.equal(tasks[0].completed, false);
  assert.deepEqual(removeTask(changed, 'b').map((task) => task.id), ['a']);
});

test('muestra primero las tareas de mayor importancia', () => {
  const tasks = [
    { id: 'baja', completed: false, priority: 'baja' },
    { id: 'alta', completed: false, priority: 'alta' },
    { id: 'media', completed: false, priority: 'media' },
  ];
  assert.deepEqual(getVisibleTasks(tasks, 'todas').map((task) => task.id), ['alta', 'media', 'baja']);
  assert.equal(tasks[0].id, 'baja');
});
