// Muestra u oculta el aviso del formulario.
export function showMessage(message, kind = 'error') {
  const notice = document.querySelector('#form-message');
  notice.textContent = message;
  notice.dataset.kind = kind;
  notice.hidden = !message;
}
