// Verifica que guardar no borre entradas desconocidas del almacenamiento.
import test from 'node:test';
import assert from 'node:assert/strict';
import { updateStoredTasks } from '../../src/storage/update-stored-tasks.js';


test('guardar no borra entradas que no se reconocen', async () => {
  const strange = { algo: 'de otra versión' };
  let saved = JSON.stringify([strange]);
  globalThis.localStorage = { getItem: () => saved, setItem: (_key, value) => { saved = value; } };
  const task = { id: '1', title: 'T', description: '', priority: 'alta', completed: false, createdAt: '2026-11-14T00:00:00.000Z' };
  const result = await updateStoredTasks((tasks) => [task, ...tasks]);
  assert.deepEqual(result, [task]);
  assert.deepEqual(JSON.parse(saved), [task, strange]);
});
