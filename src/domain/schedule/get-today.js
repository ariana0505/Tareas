// Devuelve la fecha de hoy en formato AAAA-MM-DD según la hora local.
export function getToday(now = new Date()) {
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}
