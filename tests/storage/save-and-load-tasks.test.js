// Verifica la persistencia y compatibilidad de tareas guardadas.
import test from 'node:test';
import assert from 'node:assert/strict';
import { saveTasks } from '../../src/storage/save-tasks.js';
import { loadTasks } from '../../src/storage/load-tasks.js';

test('guarda y recupera las tareas al volver a cargar', () => {
  let saved = null;
  globalThis.localStorage = {
    setItem(key, value) {
      assert.equal(key, 'mis-tareas-v1');
      saved = value;
    },
    getItem(key) {
      assert.equal(key, 'mis-tareas-v1');
      return saved;
    },
  };

  const task = {
    id: '1', title: 'Leer', description: '', priority: 'alta',
    block: 'Lectura', date: '2026-11-14', startTime: '08:00', endTime: '09:00',
    completed: false, createdAt: '2026-11-14T00:00:00.000Z',
  };
  assert.equal(saveTasks([task]), true);
  assert.deepEqual(loadTasks(), [task]);
});

test('conserva tareas anteriores que todavía no tienen horario', () => {
  const oldTask = {
    id: 'old', title: 'Leer', description: '', priority: 'media',
    completed: false, createdAt: '2026-11-01T00:00:00.000Z',
  };
  globalThis.localStorage = {
    getItem: () => JSON.stringify([oldTask]),
  };
  assert.deepEqual(loadTasks(), [oldTask]);
});

