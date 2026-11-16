// Lee la lista guardada tal cual, sin descartar entradas que no reconoce.
export function loadStoredEntries() {
  try {
    const saved = JSON.parse(localStorage.getItem('mis-tareas-v1') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch {
    return [];
  }
}
