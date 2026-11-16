# Mis tareas

Primera versión del frontend del proyecto P2. Permite registrar tareas con bloque, fecha, hora de inicio, hora de fin e importancia; editarlas; y verlas como pendientes o culminadas. La lista muestra primero las tareas de mayor importancia. Los datos se guardan en el navegador mediante `localStorage`.

La hora de fin debe ser posterior a la de inicio. Las tareas creadas antes de añadir horarios se conservan como «Sin horario asignado» y pueden completarse con **Editar**.

Al crear o editar una tarea, el hook `src/hooks/before-task-save.js` (minilab 2) comprueba que su horario no se superponga con otra tarea de la misma fecha, sin importar el bloque. Si hay superposición, no se guarda y se indica con qué tarea choca. Que una tarea empiece justo cuando otra termina no cuenta como superposición. Al editar, la tarea no se compara consigo misma.

## Ejecutar

Necesitas Python 3 para levantar un servidor local. Desde esta carpeta:

```bash
npm run dev
```

Abre <http://localhost:4173>. Para ejecutar las pruebas de las reglas de tareas:

```bash
npm test
```

## Minilab 2: hook de Claude Code

Hay dos capas que cuidan que no existan tareas con horarios superpuestos:

- **En la app:** `src/hooks/before-task-save.js` rechaza guardar una tarea que choque con otra.
- **En Claude Code:** `.claude/hooks/verificar-superposicion.mjs` (configurado en `.claude/settings.json`) corre las pruebas cada vez que Claude edita un archivo de `src/` o `tests/`. Si fallan, Claude recibe el aviso y debe corregir el cambio.

Para verlo funcionar (tres comandos):

```bash
npm test                                   # las pruebas pasan: hook en silencio
# rompe la regla en src/domain/schedule/find-overlapping-task.js y pide a Claude que edite ese archivo
npm test                                   # ahora falla y el hook avisa a Claude
```

Con el hook de Claude Code, si el hook no responde o la entrada es ilegible, no bloquea el trabajo (sale con error no bloqueante). Alternativa manual: ejecutar `npm test` tras cada cambio.

## Estructura

Cada archivo hace una sola cosa y empieza con un comentario que la explica.

- `index.html` y `styles.css`: estructura y diseño de la página (adaptable a escritorio y móvil).
- `src/main.js`: inicia la app y conecta los eventos.
- `src/state.js`: estado temporal de la vista (filtro y edición activa).
- `src/domain/tasks/`: reglas de las tareas (crear, editar, validar, filtrar, contar, ordenar).
- `src/domain/schedule/`: fechas, horas y detección de horarios superpuestos.
- `.claude/`: configuración y script del hook de Claude Code.
- `src/hooks/`: verificaciones que corren antes de guardar (minilab 2).
- `src/storage/`: lectura y escritura en `localStorage`.
- `src/handlers/`: una función por cada interacción de la persona.
- `src/ui/`: dibujo de la interfaz; `task/` para la lista y `form/` para el formulario.
- `tests/`: pruebas organizadas igual que `src/` (`domain/`, `hooks/`, `storage/`).

Esta entrega se centra en la página de tareas. Según la guía S3, el frontend por sí solo todavía no completa P2: falta demostrar una herramienta C2 funcionando en una tarea del producto. El minilab 2 añade el hook que impide crear tareas con horarios superpuestos.

Los datos son locales a cada navegador. No hay cuentas ni sincronización entre dispositivos.
