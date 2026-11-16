// Verifica la creación de tareas: datos válidos, inválidos y fechas pasadas.
import test from 'node:test';
import assert from 'node:assert/strict';
import { createTask } from '../../src/domain/tasks/create-task.js';

const validInput = {
  title: 'Estudiar', description: '', block: 'Estudio', date: '2099-11-14',
  startTime: '09:00', endTime: '10:00', priority: 'media',
};

test('crea una tarea pendiente con importancia y texto limpio', () => {
  const task = createTask({ ...validInput, title: '  Estudiar  ', description: '  Capítulo 2  ', block: '  Estudio  ', priority: 'alta' });
  assert.equal(task.title, 'Estudiar');
  assert.equal(task.description, 'Capítulo 2');
  assert.equal(task.priority, 'alta');
  assert.equal(task.block, 'Estudio');
  assert.equal(task.date, '2099-11-14');
  assert.equal(task.startTime, '09:00');
  assert.equal(task.endTime, '10:00');
  assert.equal(task.completed, false);
  assert.ok(task.id);
});

test('rechaza una tarea sin nombre o con importancia inválida', () => {
  assert.throws(() => createTask({ ...validInput, title: '  ' }));
  assert.throws(() => createTask({ ...validInput, priority: 'urgente' }));
});

test('rechaza fechas y bloques horarios inválidos', () => {
  assert.throws(() => createTask({ ...validInput, date: '2026-02-30' }));
  assert.throws(() => createTask({ ...validInput, startTime: '11:00', endTime: '10:00' }));
  assert.throws(() => createTask({ ...validInput, startTime: '10:00', endTime: '10:00' }));
});

test('rechaza agendar en un día pasado y acepta hoy y días futuros', () => {
  assert.throws(() => createTask({ ...validInput, date: '2026-11-14' }, '2026-11-15'), { field: 'date' });
  assert.equal(createTask({ ...validInput, date: '2026-11-15' }, '2026-11-15').date, '2026-11-15');
  assert.equal(createTask({ ...validInput, date: '2026-11-16' }, '2026-11-15').date, '2026-11-16');
});
