# Copia con harness

# Archivos tocados (contados)
3 archivos modificados:
 api.ts
 App.css
 App.tsx

# Convenciones respetadas / incumplidas 
La ejecución final ha respetado todo lo especificado en sus settings y lo especificado en la solicitud

# Nº de intervenciones tuyas (corregir/aclarar/repetir/parar)
1 ajuste de pretool para que no modifique nada en backend

# Qué arreglarías a mano antes de mostrarlo a tu equipo		

Nada, funciona tal y como se ha solicitado

# Copia sin harness

# Archivos tocados (contados)
3 archivos modificados:
 api.ts
 App.tsx

# Convenciones respetadas / incumplidas 
No se tenian convenciones a respetar

# Nº de intervenciones tuyas (corregir/aclarar/repetir/parar)
Ninguna

# Qué arreglarías a mano antes de mostrarlo a tu equipo		

Modificaria el css que es algo que le ha faltado, y el control para diferenciar errores

# PARTE B

# Qué piezas montaste y cuál te costó más de lo que esperabas

Claude.md
settings.json
block-backend.json
Prompt

Lo que mas me costo ya que no lo habia hecho nunca es la vinculación del settings con el hook de control para verificar y controlar que no toca nada de backend

# La primera diferencia que viste entre las dos salidas, y en qué te fijaste para verla

La salida sin harness no toco nada de css, se limito al cumplimiento de la tarea
El api en la versión con harness es mas estricto y es capaz de diferenciar los errores de manera más correcta en la versión sin harness solamente se limita la tarea

# Algo que dejaste escrito en el harness y que el agente no cumplió igualmente

Como he comentado más arriba por un error de control de archivos en el hook la ejecución de test modifico algo que no debia, al arreglarlo para que las rutas esten correctas no volvio a dar el fallo y se limito a cumplir con lo debia