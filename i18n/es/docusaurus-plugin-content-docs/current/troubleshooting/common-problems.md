---
id: common-problems
title: Problemas comunes
---

# Problemas comunes

Soluciones a los problemas más frecuentes al ejecutar aMule.

---

## ¿Por qué aMule consume tanta CPU al iniciar?

aMule calcula el hash de cada archivo nuevo o modificado que encuentra en los Directorios Compartidos al iniciarse. Este comportamiento es normal para archivos nuevos.

Si aMule **siempre** consume mucha CPU al iniciar aunque no se hayan añadido ni modificado archivos nuevos, existe un problema conocido:

- **Versiones anteriores a 2.0.0-rc3**: el hashing siempre ocurría cuando el directorio Temp, Incoming o cualquier Directorio Compartido estaba en una partición FAT32. Esto se corrigió en 2.0.0-rc3.
- **Versiones anteriores a 2.0.0-rc4**: los sistemas de archivos con codificación UTF-8 (observado en SuSE 9.1) causaban problemas cuando algún archivo o directorio en la ruta de los Directorios Compartidos contenía un carácter especial.

  **Solución temporal para el problema UTF-8**: cuando aMule termina de calcular los hashes (el uso de CPU baja), cierra aMule y recodifica `~/.aMule/known.met`:

  ```bash
  recode u8 ~/.aMule/known.met
  ```

  Esto debe repetirse cada vez que se añada o modifique un archivo. La solución definitiva es actualizar a la versión más reciente de aMule.

- **`known.met` corrupto**: si ninguno de los casos anteriores aplica, `known.met` puede estar corrupto (por un programa externo o un error del usuario). Elimínalo y reinicia aMule para forzar un recálculo completo de hashes:

  ```bash
  rm ~/.aMule/known.met
  ```

---

## "No valid servers to connect in serverlist found" — ¿qué significa?

Este mensaje aparece cuando la opción **"Conectar automáticamente solo a servidores de la lista estática"** está activada pero la lista estática está vacía.

**Soluciones:**

1. **Desactiva la opción**: Preferencias → Servidores → desmarcar "Conectar automáticamente solo a servidores de la lista estática".
2. **Añade un servidor a la lista estática**: en la ventana de Servidores, haz clic derecho sobre un servidor y selecciona "Añadir a estáticos". Repítelo para todos los servidores que quieras conservar.

---

## ¿Por qué aMule se queda de repente sin servidores en la lista?

Esto ocurre normalmente cuando ambas opciones están activadas simultáneamente:

- **Preferencias → Servidores → "Eliminar servidor muerto tras X reintentos"**
- **Preferencias → Conexión → "Reconectar al perder la conexión"**

Si tu conexión a internet se interrumpió brevemente, aMule detectó la desconexión, intentó reconectarse a cada servidor y los fue eliminando uno a uno tras X intentos fallidos hasta que la lista quedó vacía.

**Solución**: desactiva **"Eliminar servidor muerto tras X reintentos"**. Es seguro dejar activado "Reconectar al perder la conexión".

---

## aMule se conecta a un servidor pero siempre obtiene una Low ID. ¿Por qué? {#amule-connects-to-a-server-but-always-gets-a-low-id-why}

Tres posibles causas:

1. **El puerto TCP 4662 no está abierto** en tu firewall o no está redirigido en tu router. Ver [Red eD2k → Puertos](/docs/ed2k/ed2k-network) y [Probar tus puertos](/docs/troubleshooting/fake-files-and-servers#testing-your-ports).

2. **El servidor está sobrecargado o mal configurado** y está asignando Low IDs incluso a clientes con puertos abiertos. Prueba con un servidor diferente.

3. **Tu ISP bloquea el tráfico P2P** en el puerto eD2k estándar 4662. Configura aMule para usar un puerto diferente:
   - Preferencias → Conexión → Puerto TCP estándar del cliente → cambia a un valor no estándar (por ejemplo, el puerto TCP 25600 ha funcionado en algunos ISPs).

---

## aMule fue interrumpido mientras completaba un archivo y ahora nunca lo completa (muestra 100% descargado). ¿Cómo lo soluciono?

Esto ocurre cuando aMule es terminado a mitad de la finalización y el pase de verificación de hash final no se completó. Solución:

1. Cierra aMule.
2. Ve a tu directorio Temp (por defecto: `~/.aMule/Temp`).
3. Ejecuta:
   ```bash
   touch ./*
   ```
4. Reinicia aMule. Detectará la finalización pendiente y terminará el proceso.

---

## Perdí una descarga — ¿puedo recuperarla?

Dos escenarios:

### Escenario 1: faltan los archivos `*.part`

Los datos de descarga han desaparecido. Si aún existen archivos `*.part.met`, aMule reiniciará las descargas desde cero en el siguiente inicio. No es posible recuperar los datos parcialmente descargados.

### Escenario 2: faltan los archivos `*.part.met` pero existen los archivos `*.part`

Primero, comprueba si existen archivos de copia de seguridad `*.part.met.bak` en el directorio Temp:

```bash
ls ~/.aMule/Temp/*.part.met.bak
```

Si existen, restáuralos:

```bash
cd ~/.aMule/Temp
for file in *.part.met.bak; do
  mv -f "$file" "${file%.bak}"
done
```

### Escenario 3: faltan tanto `*.part.met` como `*.part.met.bak` pero existe `*.part`

Dos enfoques:

- **MetFileRegenerator**: una herramienta Java que reconstruye archivos `*.part.met` a partir de los datos `.part` existentes. Búscala en los foros de aMule.
- **Reasignación manual**:
  1. Busca el archivo en aMule e inicia una nueva descarga del mismo.
  2. Cierra aMule. La nueva descarga crea un nuevo archivo `NNN.part` (por ejemplo, `011.part`) con su propio `011.part.met`.
  3. Renombra el nuevo `.met` para que coincida con el número del `.part` antiguo (por ejemplo, renombra `011.part.met` a `008.part.met` si tu archivo parcial antiguo era `008.part`).
  4. Elimina el nuevo archivo `.part` (por ejemplo, elimina `011.part`).
  5. Reinicia aMule: recogerá el `.part` antiguo con el `.met` restaurado.

---

## ¿Por qué aMule deja de responder a los clics aunque no se haya colgado?

Hay un cuadro de diálogo abierto en algún lugar de tu escritorio, posiblemente oculto detrás de otras ventanas o en un espacio de trabajo diferente. aMule está esperando a que sea cerrado. Comprueba todos los espacios de trabajo en busca de cualquier diálogo de aMule (cuadros de confirmación, diálogos de error, etc.) y haz clic en Aceptar o Cancelar.

---

## ¿Por qué algunos archivos de mis carpetas compartidas no aparecen en la ventana de Archivos Compartidos?

Si añadiste archivos después de que aMule ya estuviera en ejecución, haz clic en el botón **Recargar** en la ventana de Archivos Compartidos. aMule volverá a escanear y calculará los hashes de los nuevos archivos (esto consume CPU en proporción al número de archivos nuevos).

Si los archivos siguen desapareciendo tras un reinicio, `~/.aMule/known.met` puede estar corrupto. Elimínalo:

```bash
rm ~/.aMule/known.met
```

En el siguiente inicio, aMule recalculará los hashes de todos los archivos compartidos desde cero.

---

## Siempre obtengo un mensaje sobre addresses.met al iniciar aMule. ¿Qué ocurre?

Esto sucede cuando:
- La opción **Preferencias → Servidores → "Actualizar automáticamente la lista de servidores al inicio"** está activada, **y**
- No hay URLs de listas de servidores en `~/.aMule/addresses.dat`.

**Soluciones:**
- Añade URLs de listas de servidores en **Preferencias → Servidores → "Lista"**.
- O desactiva **"Actualizar automáticamente la lista de servidores al inicio"** si no necesitas actualizaciones automáticas.

---

## ¿Qué hago si pierdo mi archivo cryptkey.dat?

Perder `cryptkey.dat` significa que **todos tus créditos se pierden** de forma permanente. No hay recuperación posible.

Dado que el `cryptkey.dat` perdido significa que tu antigua identidad no puede verificarse, también debes eliminar `~/.aMule/preferences.dat`. De lo contrario, los clientes que te identificaron previamente (antes de la pérdida) no podrán volverte a conceder créditos:

```bash
rm ~/.aMule/cryptkey.dat
rm ~/.aMule/preferences.dat
```

Inicia aMule de nuevo y comienza a reconstruir créditos.

---

## ¿Por qué el límite de Subida/Descarga se restablece a 0 tras cada reinicio?

Esto ocurrió en versiones de aMule **anteriores a 2.0.0-rc4** cuando establecías un Límite de Ancho de Banda superior al valor de Capacidad de Ancho de Banda correspondiente. La corrección se aplicó en 2.0.0-rc4. Si usas una versión actual y sigues viendo esto, verifica que tus límites de Descarga/Subida no superen los valores de Capacidad correspondientes en Preferencias → Conexión.

---

## ¿Por qué aMule ignora el ancho de banda que establecí por slot? {#why-is-amule-ignoring-the-bandwidth-i-set-per-slot}

El ajuste de ancho de banda por slot solo se aplica si permite **al menos 3 slots de subida simultáneos**. La velocidad máxima efectiva por slot es:

```
velocidad_max_slot = LímiteAnchoBanda / 3
```

No confundas **Límite de Ancho de Banda** (tasa máxima real de subida para aMule) con **Capacidad de Ancho de Banda** (el máximo físico de tu línea, usado solo para el gráfico de Estadísticas).

Además, si tras asignar slots queda ancho de banda antes de alcanzar el Límite, aMule abrirá un slot extra y redistribuirá el ancho de banda de manera uniforme entre todos los slots.

**Ejemplo:**
- Límite de Ancho de Banda: 7 KBps
- Asignación por slot: 2 KBps

Tras 3 slots (6 KBps usados), queda 1 KBps. aMule abre un 4.º slot y da a los 4 slots `7 / 4 = 1,75 KBps` cada uno.

---

## ¿Por qué aparecen mensajes de "Too many connections" en el terminal?

Has establecido un valor muy alto para **Preferencias → Conexión → Máx. Conexiones** que se acerca o supera el límite de descriptores de archivo por proceso del sistema operativo. Otras aplicaciones del mismo equipo también consumen conexiones, lo que significa que aMule alcanza el límite del SO y no puede abrir nuevas.

**En Windows 9x/ME**: el límite es de 100 conexiones TCP. Para aumentarlo, edita el registro de Windows:

```
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\VxD\MSTCP\MaxConnections
```

Establécelo como valor de cadena que contenga un número decimal de 32 bits. (Esta clave normalmente no existe y debe crearse.)

**En Linux**: comprueba los límites con `ulimit -a` y ajusta con `ulimit -n <valor>`.

---

## Mis barras de progreso han perdido el efecto 3D y tienen un aspecto plano. ¿Puedo restaurarlas?

En la mayoría de versiones de aMule: **Preferencias → Ajustes de la GUI → Estilo de la barra de progreso → mueve el deslizador a la posición más a la derecha** para el mejor efecto 3D.

Excepción — versiones 2.0.0-rc4 a 2.0.0-rc6: en esas versiones específicas, el mejor efecto 3D se consigue con la posición **central**. La posición más a la derecha da un aspecto plano; la más a la izquierda da un aspecto oscuro.

---

## Todas mis descargas se pausaron de repente y no puedo reanudarlas. ¿Qué ocurre?

Comprueba el espacio libre en el sistema de archivos donde se encuentra tu **directorio Temp**. aMule necesita un mínimo de **9,28 MB** de espacio libre para descargar un chunk. Si el espacio libre cae por debajo del umbral establecido en **Preferencias → Archivos → "Espacio mínimo en disco"**, aMule pausa todas las descargas para evitar la corrupción.

Libera espacio en disco y luego reanuda las descargas.

---

## ¿Por qué no puedo previsualizar un archivo?

aMule permite la previsualización solo de **archivos de vídeo**. Deben cumplirse dos condiciones:

1. El archivo tiene una extensión de vídeo reconocida (`.avi`, `.mpg`, `.mpeg`, `.divx`, `.mov`, `.rm`, etc.).
2. Al menos los **primeros 256 KB** del archivo han sido descargados.

Si aMule se niega a previsualizar un archivo que crees que debería ser previsualizable, navega manualmente a tu directorio Temp y abre el archivo `NNN.part` directamente con un reproductor de vídeo.

---

## ¿Por qué la previsualización de aMule no funciona con MPlayer?

Desde aMule 2.0.0-rc4, el comando de previsualización no se ejecuta en el mismo terminal que aMule. MPlayer requiere un terminal para mostrar la salida y aceptar la entrada del teclado.

Establece el comando de previsualización de aMule en Preferencias como:

```bash
xterm -T "aMule preview" -iconic -e mplayer -idx "%PARTFILE"
```

Si MPlayer se cuelga con archivos AVI incompletos, añade `-demuxer lavf`:

```bash
xterm -T "aMule preview" -iconic -e mplayer -demuxer lavf "%PARTFILE"
```

---

## Al cerrar MPlayer desde una previsualización, aMule se queda bloqueado

Este error existía en aMule **anterior a 2.0.0-rc4**. La causa: MPlayer mantenía su proceso principal en ejecución en segundo plano tras cerrar la ventana, y aMule esperaba a que el proceso de previsualización terminase.

**Solución temporal (aMule < 2.0.0-rc4)**: cierra MPlayer pulsando la tecla **Q** (no cerrando la ventana).

**Solución definitiva**: actualiza a una versión actual de aMule.

---

## ¿Por qué Transferred es un número menor que Completed?

Esto parece contraintuitivo pero es correcto. Ver [FAQ General → Transferred vs Completed](/docs/faq/general#what-is-the-difference-between-transferred-and-completed-in-the-transfers-window).

En resumen: "Transferred" son los bytes comprimidos sin procesar recibidos. "Completed" es la cantidad de datos de archivo útiles reales extraídos de esos bytes tras la descompresión y la eliminación de las cabeceras de protocolo. Transferred siempre será menor o igual que Completed.

---

## aMule siempre ralentiza mi ordenador cuando completa una descarga. ¿Es normal?

Sí. Cuando una descarga se completa, aMule realiza una **verificación completa del hash del archivo**: calcula los hashes de todos los chunks descargados y los verifica frente a los valores esperados. Aunque la integridad de los chunks se comprueba de forma incremental durante la descarga, este pase final garantiza que ningún chunk fue corrompido por el usuario o una aplicación externa después de ser escrito.

Esto es intensivo en CPU para archivos grandes y es el comportamiento esperado.

---

## ¿Hay alguna forma de seleccionar recursivamente un directorio completo y su contenido en Preferencias?

Sí:

- **aMule 2.0.0-rc4 o posterior**: haz clic derecho sobre el icono del directorio que quieres seleccionar recursivamente en la lista de Directorios Compartidos.
- **aMule 1.x y hasta 2.0.0-rc3**: haz clic en el directorio mientras mantienes pulsada la tecla **Ctrl**.

---

## Descargué un archivo que se corrompió tras completarse. ¿Puedo evitar volver a descargarlo todo?

Si aún tienes el enlace `ed2k://`:

1. Inicia la descarga de nuevo.
2. Espera hasta que se haya descargado al menos un chunk completo (9,28 MB).
3. Cierra aMule.
4. Renombra el archivo completo corrupto para que coincida con el nombre del archivo `.part` de la nueva descarga parcial (por ejemplo, `002.part`).
5. Ejecuta `touch` sobre el archivo renombrado:
   ```bash
   touch ~/.aMule/Temp/002.part*
   ```
6. Reinicia aMule. Detectará qué chunks están intactos (coincidiendo con el hash esperado) y cuáles están corruptos, y solo volverá a descargar los chunks corruptos.

---

## ¿Qué debo tener en cuenta al usar montajes NFS con aMule?

Si alguno de tus Directorios Compartidos o directorios Temp/Incoming está en montajes NFS, asegúrate de **desmontar esos montajes NFS de cualquier equipo que se esté apagando** antes de que ocurra el apagado.

Si un montaje NFS deja de estar disponible mientras aMule está en ejecución, aMule se bloqueará indefinidamente esperando a que el montaje vuelva. Síntomas: la ventana de Estadísticas muestra líneas planas no nulas para Descarga/Subida/Conexiones que caen a cero solo después de restaurar los montajes NFS.

Tras desmontar los montajes NFS de cualquier equipo, también haz clic en **Recargar** en la ventana de Archivos Compartidos.

---

## Los archivos descargados no obtienen los permisos que establecí en Preferencias. ¿Por qué?

aMule respeta la **umask** del proceso. El valor `umask` define qué bits de permiso las aplicaciones **no** pueden establecer.

Ejemplo: si configuras los permisos de archivo como `664` en Preferencias pero `umask` es `022`:

```
664 AND NOT 022 = 644
```

aMule crea archivos con `644` en lugar de `664`.

Comprueba tu umask actual:

```bash
umask
```

Para cambiarlo, establece `umask` en tu perfil de shell o sesión antes de iniciar aMule. En sistemas basados en systemd puedes establecer `UMask=` en el archivo de unidad del servicio.

---

## aMule no puede crear archivos / muestra errores de descriptor de archivo. ¿Qué ocurre?

Esto no debería ocurrir en operación normal. Cuando sucede, la causa más probable es que el **límite de descriptores de archivo abiertos** está demasiado bajo para tu cuenta de usuario.

Comprueba los límites actuales:

```bash
ulimit -a
```

La línea relevante es `open files`. Lee el manual para saber cómo aumentarlo:

```bash
man ulimit
```

En la mayoría de distribuciones Linux, los límites permanentes pueden establecerse en `/etc/security/limits.conf`. Recuerda que los cambios tienen efecto en la siguiente sesión de inicio de sesión (o reinicio del sistema, dependiendo de tu configuración).

---

## aMule se cuelga con bastante frecuencia. ¿Puedo configurarlo para que se reinicie automáticamente?

aMule no tiene un mecanismo de reinicio integrado, pero los scripts de shell pueden gestionarlo — algunos de los cuales también detectan cuelgues (no solo cierres inesperados). Scripts de la comunidad para este propósito:

- [Hilo del foro 1](http://forum.amule.org/index.php?topic=1232.0)
- [Hilo del foro 2](http://forum.amule.org/index.php?topic=542.0)
