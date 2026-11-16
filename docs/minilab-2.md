# Minilab 2: un hook de Claude Code que protege la regla de superposición

## El problema

Mi app de tareas guarda bloque, fecha, hora de inicio y hora de fin. Al principio permitía horarios que se cruzaban, y eso no tiene sentido: nadie puede estudiar y jugar con amigos a la misma hora. Añadí una regla: una tarea nueva no puede superponerse con otra del mismo día. Empezar justo cuando otra termina sí está permitido.

El riesgo es que la regla se rompa sin que me dé cuenta. Cuando le pido cambios a Claude, puede estropear la comparación de horas sin que lo note. Quería un aviso en el momento.

## Cómo funciona por dentro

Hay dos capas.

La primera está en la app. `src/hooks/before-task-save.js` se ejecuta antes de guardar una tarea, nueva o editada. Llama a `findOverlappingTask`, que compara cada tarea guardada con la nueva: misma fecha y `inicioNueva < finOtra && inicioOtra < finNueva`. Si hay choque, lanza un error con el campo `startTime` y un mensaje que nombra la tarea con la que choca. La regla vive en un solo archivo, así que el formulario y las pruebas dan siempre la misma respuesta.

La segunda es el hook de Claude Code, que es la herramienta de este minilab. En `.claude/settings.json` lo activé para después de cada `Edit`, `Write` o `MultiEdit`. El script `.claude/hooks/verificar-superposicion.mjs` recibe por la entrada estándar un JSON con la ruta del archivo editado. Si el archivo está en `src/` o `tests/`, ejecuta `node --test`. Si las pruebas pasan, no dice nada. Si fallan, sale con código 2 y escribe en el error estándar qué prueba falló. Claude Code devuelve ese mensaje a Claude, que debe corregir su cambio. Si el JSON es ilegible, sale con código 1, que no bloquea el trabajo.

El contexto que recibe el hook es mínimo: solo la ruta del archivo. No lee su contenido ni mis datos.

## Qué se rompió realmente

Me pasaron tres cosas, y ninguna la había previsto.

1. Probé el hook con una copia del proyecto donde cambié `task.startTime < other.endTime` por `task.startTime < other.startTime`. El hook salió con código 2 y mostró el test que fallaba. Esa fue la comprobación de que la herramienta previene lo que dice prevenir.
2. La regla se podía esquivar editando. Mi primera versión solo comprobaba al crear. Al revisar la lista vi dos tareas del 4 de noviembre, de 09:48 a 20:51 y de 20:49 a 22:46, que se cruzaban dos minutos. Se habían creado al editar. Moví la comprobación para que también corra al guardar ediciones, ignorando la propia tarea.
3. Al impedir fechas pasadas, mis pruebas empezaron a fallar, porque usaban 2026-11-14 y esa fecha ya había pasado. Las cambié a 2099-11-14 y la función recibe "hoy" como parámetro para probarla con fechas fijas.

## Qué hizo la herramienta y qué decidí yo

El hook hace lo mecánico: se dispara solo, corre las pruebas y avisa. No decide qué es un conflicto. Esa decisión fue mía: comparar por fecha y no por bloque, contar también las tareas completadas, y permitir horarios contiguos. También fue mía la elección de Claude Code en lugar de una instrucción manual: una instrucción se olvida, un hook se ejecuta siempre.

## Cómo ejecutarlo

Con tres comandos: `npm test` para ver que pasa, romper la regla en `find-overlapping-task.js` desde una sesión de Claude Code, y `npm test` otra vez para ver que falla. Si el hook no responde, la alternativa manual es correr `npm test` después de cada cambio.
