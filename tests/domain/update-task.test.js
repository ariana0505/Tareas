// Verifica la edición de tareas, incluidas las anteriores sin horario.
import test from 'node:test';
import assert from 'node:assert/strict';
import { updateTask } from '../../src/domain/tasks/update-task.js';

const validInput = {
  title: 'Estudiar', description: '', block: 'Estudio', date: '2099-11-14',
  startTime: '09:00', endTime: '10:00', priority: 'media',
};

test('permite asignar horario a una tarea anterior sin perder su estado', () => {
  const oldTask = {
    id: 'old', title: 'Leer', description: '', priority: 'baja',
    completed: true, createdAt: '2026-11-01T00:00:00.000Z',
  };
  const updated = updateTask(oldTask, validInput);
  assert.equal(updated.id, 'old');
  assert.equal(updated.completed, true);
  assert.equal(updated.block, 'Estudio');
  assert.equal(updated.endTime, '10:00');
});
