// Verifica que se generen identificadores aunque randomUUID no exista.
import test from 'node:test';
import assert from 'node:assert/strict';
import { generateId } from '../../src/domain/tasks/generate-id.js';


test('genera identificadores aunque randomUUID no exista', () => {
  const original = crypto.randomUUID;
  Object.defineProperty(crypto, 'randomUUID', { value: undefined, configurable: true });
  try {
    const id = generateId();
    assert.match(id, /^[0-9a-f]{32}$/);
  } finally {
    Object.defineProperty(crypto, 'randomUUID', { value: original, configurable: true });
  }
});
