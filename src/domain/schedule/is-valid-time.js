// Comprueba que un texto sea una hora válida con formato HH:MM.
export function isValidTime(value) {
  return typeof value === 'string' && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}
