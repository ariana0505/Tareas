// Verifica el hook del minilab 2: rechaza horarios superpuestos al crear y al editar.
import test from 'node:test';
import assert from 'node:assert/strict';
import { beforeTaskSave } from '../../src/hooks/before-task-save.js';
import { createTask } from '../../src/domain/tasks/create-task.js';

const existing = { id: 'a', title: 'Clase', date: '2026-11-12', startTime: '09:00', endTime: '10:00', block: 'Estudio' };
const fresh = (startTime, endTime, extra = {}) => ({ id: 'n', title: 'Nueva', date: '2026-11-12', block: 'Otro', startTime, endTime, ...extra });

test('hook: rechaza una tarea que se superpone, aunque sea de otro bloque', () => {
  assert.throws(() => beforeTaskSave(fresh('09:30', '10:30'), [existing]),
    (error) => error.code === 'TASK_OVERLAP' && error.field === 'startTime' && error.conflictId === 'a' && error.message.includes('Clase'));
  assert.throws(() => beforeTaskSave(fresh('09:15', '09:45'), [existing]), { code: 'TASK_OVERLAP' });
});

test('hook: permite horarios contiguos, otra fecha y tareas sin horario', () => {
  assert.doesNotThrow(() => beforeTaskSave(fresh('10:00', '11:00'), [existing]));
  assert.doesNotThrow(() => beforeTaskSave(fresh('08:00', '09:00'), [existing]));
  assert.doesNotThrow(() => beforeTaskSave(fresh('09:30', '10:30', { date: '2026-11-13' }), [existing]));
  assert.doesNotThrow(() => beforeTaskSave(fresh('09:30', '10:30'), [{ id: 'old', title: 'Leer' }]));
});

test('hook al editar: ignora la propia tarea pero rechaza chocar con otra', () => {
  const other = { id: 'b', title: 'Jugar', date: '2026-11-12', startTime: '10:00', endTime: '11:00' };
  assert.doesNotThrow(() => beforeTaskSave({ ...existing, endTime: '09:50' }, [other]));
  assert.doesNotThrow(() => beforeTaskSave({ ...existing }, [existing, other].filter((t) => t.id !== 'a')));
  assert.throws(() => beforeTaskSave({ ...existing, endTime: '10:30' }, [other]), { code: 'TASK_OVERLAP' });
});

test('error controlado: un horario inválido se rechaza antes de comparar superposiciones', () => {
  const input = { title: 'X', description: '', block: 'B', date: '2099-01-01', startTime: '11:00', endTime: '10:00', priority: 'media' };
  assert.throws(() => createTask(input), (error) => error.field === 'endTime' && error.code === undefined);
});
