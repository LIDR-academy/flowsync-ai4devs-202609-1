#!/usr/bin/env node
/**
 * Comprobación completa del proyecto: un solo comando después de implementar una tarea.
 *
 *   node scripts/check.mjs
 *
 * Encadena los scripts que ya existen en backend/ y frontend/. No instala nada,
 * no toca la lógica de la aplicación y no modifica ficheros salvo lo que ya
 * escriben los propios scripts (el build del backend en backend/build/, que está
 * en .gitignore).
 *
 * Ejecuta todos los pasos aunque alguno falle, y al final imprime el resumen.
 * Sale con código 1 si algo ha fallado, 0 si está todo verde.
 */

import { spawnSync } from 'node:child_process'
import { existsSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = dirname(dirname(fileURLToPath(import.meta.url)))

/**
 * Los pasos, en el orden en que conviene leerlos cuando algo falla: primero lo
 * que señala el error exacto (tipos), luego lo mecánico (lint, formato) y al
 * final lo lento (tests, builds).
 *
 * `hint` se imprime en el resumen cuando el paso falla.
 */
const steps = [
  {
    name: 'backend · typecheck',
    cwd: 'backend',
    run: 'npm run typecheck',
  },
  {
    name: 'backend · lint',
    cwd: 'backend',
    run: 'npm run lint',
    hint: 'muchas reglas se arreglan solas con: cd backend && npm run lint -- --fix',
  },
  {
    name: 'backend · formato',
    cwd: 'backend',
    // Los ficheros se comprueban, no se reescriben: una comprobación que cambia
    // el árbol de trabajo no sirve para verificar nada. Usa el mismo Prettier y
    // el mismo preset que `npm run format`, que es el que arregla.
    //
    // `--end-of-line auto` respeta los finales de línea que ya tiene cada
    // fichero. Sin esto, en Windows (git con core.autocrlf=true deja el árbol en
    // CRLF) fallarían los 40 ficheros del backend por un motivo que no tiene
    // nada que ver con el código.
    run: 'npm exec -- prettier --check --end-of-line auto .',
    hint: 'arreglar con: cd backend && npm run format',
  },
  {
    name: 'backend · tests',
    cwd: 'backend',
    run: 'npm test',
  },
  {
    name: 'backend · build',
    cwd: 'backend',
    run: 'npm run build',
  },
  {
    name: 'frontend · lint',
    cwd: 'frontend',
    run: 'npm run lint',
  },
  {
    name: 'frontend · build + typecheck',
    cwd: 'frontend',
    // `npm run build` es `tsc -b && vite build`: en el frontend no hay script de
    // typecheck aparte, así que este paso es también la comprobación de tipos.
    run: 'npm run build',
  },
]

function formatDuration(ms) {
  return ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`
}

/** Comprueba que las dependencias están instaladas antes de empezar. */
const missing = ['backend', 'frontend'].filter(
  (project) => !existsSync(join(root, project, 'node_modules'))
)

if (missing.length > 0) {
  console.error(`\nFaltan dependencias en: ${missing.join(', ')}`)
  console.error(missing.map((project) => `  cd ${project} && npm install`).join('\n'))
  process.exit(1)
}

const results = []

for (const step of steps) {
  console.log(`\n\u001b[1m▶ ${step.name}\u001b[0m  (${step.cwd}: ${step.run})`)

  const startedAt = Date.now()
  const { status } = spawnSync(step.run, {
    cwd: join(root, step.cwd),
    stdio: 'inherit',
    shell: true,
  })

  results.push({ ...step, ok: status === 0, duration: Date.now() - startedAt })
}

console.log(`\n\u001b[1m── Resumen ──\u001b[0m`)

for (const result of results) {
  const mark = result.ok ? '\u001b[32mOK  \u001b[0m' : '\u001b[31mFALLA\u001b[0m'
  console.log(`${mark} ${result.name.padEnd(32)} ${formatDuration(result.duration)}`)
}

const failed = results.filter((result) => !result.ok)

if (failed.length === 0) {
  console.log('\n\u001b[32mTodo verde. La tarea puede darse por terminada.\u001b[0m')
  process.exit(0)
}

console.log(`\n\u001b[31m${failed.length} de ${results.length} comprobaciones han fallado:\u001b[0m`)

for (const result of failed) {
  console.log(`  · ${result.name}${result.hint ? ` — ${result.hint}` : ''}`)
}

console.log('\nLa tarea NO está terminada hasta que esto salga en verde.')
process.exit(1)
