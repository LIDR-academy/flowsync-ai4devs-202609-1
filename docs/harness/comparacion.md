# Comparación de ejecuciones

## Con Harness 

1. **Qué archivos tocó:** `/src/App.tsx` , editó exactamente el mismo archivo en el contexto activo.
2. **Qué convenciones del proyecto respetó y cuáles no:**
   - Respetó: Solo la instruccion, TypeScript
   - Ignoró: No puso las etiquetas de formularios en MAYÚSCULAS ni en rojo,  No puso los botones de formularios en MINUSCULA ni en verde
3. **Cuántas veces tuviste que intervenir:** 3 veces para aclarar lo requerido
4. **Qué te tocaría arreglar a mano:** Como el agente ignoró el archivo de instrucciones (`.github/copilot-instructions.md`), me tocaría refactorizar manualmente el código para aplicar las convenciones del equipo (por ejemplo: corregir los estilos de botones/labels, envolver las llamadas en bloques try/catch y ajustar los tipos de TypeScript).

## Sin Harness 

1. **Qué archivos tocó:** `/src/App.tsx` , editó exactamente el mismo archivo en el contexto activo.
2. **Qué convenciones del proyecto respetó y cuáles no:**
   - Respetó: Sintaxis de TypeScript y la estructura básica solicitada en la instrucción.
   - Ignoró: No se aplicaron estilos específicos para labels (MAYÚSCULAS/rojo) ni para botones (minúsculas/verde) al no existir un archivo de instrucciones en esta copia.
3. **Cuántas veces tuviste que intervenir:** 3 veces para reintentar el prompt y guiar la generación del componente.
4. **Qué te tocaría arreglar a mano:** Reescribir la interfaz para aplicar los estilos visuales del proyecto, agregar la validación de errores y tipar correctamente los eventos del formulario antes de poder enviarlo a revisión de código.


