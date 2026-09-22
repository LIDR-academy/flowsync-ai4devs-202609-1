# Comparación: FlowSync con harness vs sin harness

**Encargo:** Iniciar sesión en FlowSync (mismo texto, palabra por palabra, en ambas copias)
**Harness montado:** CLAUDE.md (instrucciones de proyecto) + hook Prettier (PostToolUse)
**Fecha:** 2026-09-21

## Parte A — La comparación

| # | Casilla | Con harness | Sin harness |
|---|---------|-------------|-------------|
| 1 | Archivos que propuso tocar (contados) | 11 | 9 |
| 2 | Convenciones del proyecto respetadas / NO respetadas (nómbralas una a una) | Con harness: menciona que el hash del password no se expone. | también lo menciona |
| 3 | Veces que tuve que intervenir (corregir, aclarar, repetir, parar) | 1 pregunta (shadcn/ui) | 2 preguntas (router y tests) |
| 4 | Qué arreglaría a mano antes de enseñárselo a mi equipo | No se ven idénticos; las diferencias que noté (nº de archivos, qué preguntó cada uno) no sé si afectan la calidad final, pero son observables. No sabría precisar qué arreglar a mano sin ayuda técnica. | Prácticamente comparables; diferencias observables pero no sé juzgar su impacto |

## Parte B — Las tres líneas

1. **Qué piezas monté y cuál me costó más de lo esperado:**  **las dos se pararon a preguntar, pero por cosas distintas** — la del harness preguntó por shadcn, la pelada por el router y los tests.


2. **Primera diferencia que vi entre las dos salidas, y en qué me fijé para verla** (qué salió distinto, no cuál fue "mejor"; dónde estaba mirando): La primera diferencia que noté al comparar los dos planes fue el número de archivos: la copia con harness proponía 11 y la copia sin harness 9. En detalle se veían muy parecidos; me fijé en eso al ir contando los archivos de cada lista. Las dos se detuvieron a preguntar antes de dar el plan, pero por cosas distintas (la de harness por shadcn/ui; la de sin harness por el router y los tests). No sabría decir si esos 2 archivos de más le dan más robustez al código o son simplemente más trabajo.


3. **Algo que dejé escrito en el harness y que el agente no cumplió igual** (no es lo que hizo mal el pelado: es lo que estaba en el lado bueno y aun así no pasó): Dejé configurado en el harness un hook de Prettier (en `.claude/settings.json`) para que formateara el frontend automáticamente. Pero no se cumplió: en el plan apareció un aviso de que el hook falló con el error "No files matching the pattern were found: frontend/", porque la ruta que puse era relativa y el directorio de trabajo era otro (backend/). Además, Prettier ni siquiera estaba instalado en el frontend. O sea, lo dejé escrito esperando que se ejecutara solo, y no funcionó por cómo lo configuré.
