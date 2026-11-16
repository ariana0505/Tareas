// Quita las marcas de error de todos los campos del formulario.
export function clearFormErrors(form) {
  form.querySelectorAll('[aria-invalid="true"]').forEach((field) => field.removeAttribute('aria-invalid'));
}
