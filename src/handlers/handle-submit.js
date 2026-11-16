// Coordina el envío del formulario: crea o edita la tarea y muestra el resultado.
import { state } from '../state.js';
import { createTask } from '../domain/tasks/create-task.js';
import { updateTaskIfUnchanged } from '../domain/tasks/update-task-if-unchanged.js';
import { beforeTaskSave } from '../hooks/before-task-save.js';
import { updateStoredTasks } from '../storage/update-stored-tasks.js';
import { loadTasks } from '../storage/load-tasks.js';
import { renderApp } from '../ui/render-app.js';
import { resetTaskForm } from '../ui/form/reset-task-form.js';
import { clearFormErrors } from '../ui/form/clear-form-errors.js';
import { showSubmitError } from '../ui/form/show-submit-error.js';
import { showMessage } from '../ui/form/show-message.js';

export async function handleSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const input = Object.fromEntries(new FormData(form));
  clearFormErrors(form);

  try {
    const editingId = state.editingId;
    const editingSnapshot = state.editingSnapshot;
    const nextTasks = await updateStoredTasks((currentTasks) => {
      if (!editingId) {
        const task = createTask(input);
        beforeTaskSave(task, currentTasks);
        return [task, ...currentTasks];
      }
      const nextList = updateTaskIfUnchanged(currentTasks, editingId, editingSnapshot, input);
      const edited = nextList.find((task) => task.id === editingId);
      beforeTaskSave(edited, nextList.filter((task) => task.id !== editingId));
      return nextList;
    });
    if (!nextTasks) {
      showMessage('No se pudo guardar la tarea en este navegador. Revisa el espacio disponible e inténtalo otra vez.');
      return;
    }
    state.tasks = nextTasks;
    state.editingId = null;
    state.editingSnapshot = null;
    resetTaskForm();
    showMessage(editingId ? 'Cambios guardados.' : 'Tarea agregada.', 'success');
    renderApp();
    form.elements.title.focus();
  } catch (error) {
    if (error.code !== 'TASK_CONFLICT') return showSubmitError(form, error);
    state.tasks = loadTasks();
    renderApp();
    showMessage('Esta tarea cambió en otra pestaña. Cancela la edición y vuelve a abrirla para ver la versión actual.');
  }
}
