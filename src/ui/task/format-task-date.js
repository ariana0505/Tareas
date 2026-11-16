// Convierte una fecha ISO a un texto legible en español.
export function formatTaskDate(date) {
  // Parsear la fecha ISO en UTC evita que los años 00-99 pasen a 1900-1999.
  return new Intl.DateTimeFormat('es-PE', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' })
    .format(new Date(`${date}T00:00:00Z`));
}
