// Persiste una lista de tareas y comunica si falló.
export function saveTasks(tasks) {
  try {
    localStorage.setItem('mis-tareas-v1', JSON.stringify(tasks));
    return true;
  } catch {
    return false;
  }
}
