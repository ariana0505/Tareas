// Crea un error asociado al campo del formulario que lo causó.
export function createFieldError(field, message, code) {
  const error = new Error(message);
  error.field = field;
  if (code) error.code = code;
  return error;
}
