// Hook de Claude Code (PostToolUse): tras editar src/ o tests/, corre las pruebas y avisa si falla la regla de superposición.
import { spawnSync } from 'node:child_process';
import { relative, resolve } from 'node:path';

const project = process.env.CLAUDE_PROJECT_DIR ?? process.cwd();

let raw = '';
for await (const chunk of process.stdin) raw += chunk;
let file;
try {
  file = JSON.parse(raw)?.tool_input?.file_path;
} catch {
  process.exit(1); // Entrada ilegible: error no bloqueante, Claude sigue trabajando.
}

// Solo vigila el código del producto; otros archivos no disparan las pruebas.
if (!file || !/^(src|tests)[\\/]/.test(relative(project, resolve(project, file)))) process.exit(0);

const run = spawnSync(process.execPath, ['--test'], { cwd: project, encoding: 'utf8', timeout: 20000 });
if (run.status === 0) process.exit(0);

const detail = (run.stdout + run.stderr).split('\n').filter((line) => /✖|Error|expected|actual|failing/.test(line)).slice(0, 12).join('\n');
console.error(`Las pruebas fallan después de editar ${file}. La regla de superposición no debe romperse.\n${detail}`);
process.exit(2); // Código 2: Claude recibe este mensaje y debe corregir el cambio.
