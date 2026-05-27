---
id: general
title: FAQ General
---

# FAQ General

Preguntas frecuentes sobre aMule en general: interfaz de usuario, gestión de archivos, configuración, créditos y uso diario.

---

## ¿Qué es aMule?

aMule es un cliente multiplataforma para la red de compartición de archivos ED2K, basado en el cliente de Windows eMule. aMule empezó en agosto de 2003 como un fork de xMule, que a su vez es un fork de lMule. aMule es compatible con Windows, macOS, Linux, FreeBSD, OpenBSD y Xbox, tanto en ordenadores de 32 bits como de 64 bits.

aMule está diseñado para ser tan fácil de usar y con tantas funciones como eMule, y para mantenerse fiel al aspecto y la sensación de eMule, de modo que los usuarios familiarizados con cualquiera de los dos clientes puedan cambiar entre ellos fácilmente. Dado que aMule está basado en el código de eMule, las nuevas funciones de eMule suelen aparecer en aMule poco después de su inclusión en eMule.

---

## ¿Cómo veo los créditos de un cliente?

Haz clic derecho sobre el apodo del cliente y selecciona **Mostrar detalles**. No se muestra directamente ningún valor de crédito concreto, pero puedes ver:

- La cantidad total de datos que ese cliente te ha enviado.
- El **Modificador de Créditos** (también llamado **Modificador DL/UL**).

Si el cliente está actualmente en tu cola de subida, el diálogo también muestra la **valoración** y la **puntuación** de ese cliente tal como las calcula tu aMule.

---

## Veo mensajes sobre pérdida de créditos en el registro. ¿Debo preocuparme?

No. Los créditos de un cliente se eliminan automáticamente después de aproximadamente **150 días** (~5 meses) sin encontrar a ese cliente. Además, los créditos pueden eliminarse para clientes que se comporten incorrectamente. Estos son mensajes de depuración informativos, no errores.

---

## ¿Qué significan esos colores en la barra de progreso?

### Lista de transferencias en descarga

| Color | Significado |
|---|---|
| Rojo | No hay fuentes para este chunk en la sesión actual |
| Azul (más claro → más oscuro) | Al menos una fuente disponible; más oscuro = más fuentes |
| Amarillo | Descargándose actualmente |
| Negro | Ya descargado y verificado |
| Verde (barra completa) | Descarga completada y verificada; el archivo está en tu carpeta Incoming |

### Lista de transferencias expandida (doble clic sobre una transferencia)

| Color | Significado |
|---|---|
| Negro | Un chunk que esa fuente tiene y tú no |
| Blanco | Un chunk que esa fuente no tiene |
| Verde | Un chunk que tanto tú como esa fuente tenéis |
| Amarillo | Un chunk que esa fuente está subiendo a ti actualmente |

### Lista de transferencias en subida

| Color | Significado |
|---|---|
| Negro | Chunks que el cliente ha completado y verificado |
| Gris | Chunks que el cliente no tiene |

Nota: no todos los clientes informan de qué partes han completado, por lo que algunos pueden no mostrar ninguna barra.

### Ventana de resultados de búsqueda

| Color | Significado |
|---|---|
| Negro | Solo un cliente tiene este archivo |
| Azul (más claro → más oscuro) | Dos o más clientes; más oscuro = más clientes |
| Rojo | El archivo ya está en tu cola de descarga |
| Verde | Ya tienes este archivo completamente descargado y compartido |

---

## ¿Qué son todos esos iconos?

Consulta la sección "Iconos y su significado" en la [guía de Primeros pasos](../quickstart-guide/index.md).

---

## ¿Qué significan los números entre corchetes en la columna de fuentes de la ventana de búsqueda?

Son los clientes que se sabe que tienen el **archivo completo**. Aunque el número entre corchetes sea 0, no significa que nadie tenga el archivo completo; solo significa que ningún cliente ha marcado el archivo compartido como "completado" (muchos clientes no lo hacen). Es un indicador aproximado, no un recuento definitivo.

---

## ¿Qué significan todos esos números en la columna de fuentes de la ventana de Transferencias?

El formato es `XX/YY + ZZ (WW)` donde:

| Valor | Significado |
|---|---|
| `XX` | Número de fuentes **disponibles** (fuentes desde las que puedes descargar actualmente) |
| `YY` | Número total de fuentes encontradas |
| `ZZ` | Número de fuentes "Asked For Another File" (A4AF) |
| `WW` | Número de fuentes desde las que estás descargando actualmente un chunk |

---

## ¿Qué significan todos esos números en la columna de prioridad de la ventana de transferencias extendida?

Es tu **posición en la cola** en esa fuente específica para ese archivo. No todos los clientes proporcionan esta información.

El número entre corchetes es cuántas posiciones te has **movido** en la cola de subida de ese cliente:

- **Negativo (azul)**: posiciones que has ganado desde que fuiste añadido.
- **Positivo (rojo)**: posiciones que has perdido desde que fuiste añadido.

---

## ¿Por qué hay dos tasas de transferencia en la lista de transferencias en subida?

Cuando subes un archivo a un cliente, la tasa se muestra como un único valor en KBps. Sin embargo, si **ese mismo cliente también te está subiendo simultáneamente**, el formato cambia a `XX/YY`:

| Valor | Significado |
|---|---|
| `XX` | Velocidad a la que estás subiendo **a** ese cliente |
| `YY` | Velocidad a la que ese cliente te está subiendo **a ti** |

Esto es especialmente útil para archivos raros: si ves a un cliente subiéndote uno de tus archivos raros, puedes asignarle un **friend slot** para subirle más rápido, acumular más créditos con él y, en consecuencia, descargar más rápido de él.

---

## ¿Qué es A4AF?

**A4AF** significa **Asked For Another File** (Solicitado Para Otro Archivo). Es un mecanismo de optimización de fuentes.

Cuando descargas un archivo, aMule encuentra una lista de clientes que lo comparten. Algunos de esos clientes también pueden estar compartiendo otro archivo que estás descargando, colocándolos en dos colas de descarga separadas simultáneamente. Como no puedes descargar dos chunks del mismo cliente al mismo tiempo, A4AF evita este desperdicio:

- Activar A4AF en una descarga le dice a aMule que busque cualquier fuente en la cola de ese archivo que también esté en la cola de otro archivo y la elimine de la otra cola, concentrando las fuentes en la descarga actual.
- También puedes activar A4AF al revés, donando fuentes de la descarga actual a otra, lo que es útil para archivos de menor prioridad en una serie.

**Importante:** una fuente con una posición en la cola (QR) inferior a 50 en la descarga de mayor prioridad **nunca** será intercambiada. Esto garantiza que la descarga pueda iniciarse desde esa fuente de inmediato.

---

## ¿Qué significan los números "QR: xxxx" que veo al consultar mis fuentes?

**QR** significa **Queue Rank** (Posición en la cola) — tu posición actual en la cola de subida de esa fuente. Un valor más bajo es mejor. Si una fuente es un cliente eMule y no hay número QR, su cola probablemente está llena y no puede aceptar más clientes.

---

## ¿Cuál es la diferencia entre Transferred y Completed en la ventana de Transferencias? {#what-is-the-difference-between-transferred-and-completed-in-the-transfers-window}

- **Transferred**: la cantidad total de datos brutos recibidos para el archivo. Los datos llegan en formato comprimido.
- **Completed**: la cantidad de datos de archivo útiles descomprimidos extraídos de los datos recibidos, es decir, el contenido real del archivo excluyendo las cabeceras de protocolo y el overhead de compresión.

Es normal y esperado que Transferred sea **menor** que Completed (ver [Problemas de aMule: ¿Por qué Transferred es menor que Completed?](/docs/troubleshooting/common-problems)).

---

## ¿Cuál es la diferencia entre pausar y detener una transferencia?

| Acción | Efecto |
|---|---|
| **Pausar** | Se cierran todas las conexiones de esa transferencia, pero se conserva la lista de fuentes. Al reanudar, aMule se vuelve a conectar a esas fuentes conocidas. |
| **Detener** | Se descarta toda la lista de fuentes. Al reanudar, aMule empieza a buscar fuentes desde cero. |

---

## ¿Para qué sirven todos esos archivos que aMule crea la primera vez que se ejecuta?

La mayoría son idénticos a los de eMule. Puedes encontrar información detallada sobre cada archivo, así como una lista completa, en [Archivos de aMule](../user-guide/amule-files/index.md).

---

## ¿Dónde están mis archivos descargados?

Por defecto, aMule almacena las descargas completadas en `~/.aMule/Incoming`. Como `~/.aMule` es un directorio oculto, es posible que tu gestor de archivos no lo muestre; activa la opción "Mostrar archivos ocultos".

Los archivos en proceso de descarga se almacenan en `~/.aMule/Temp`.

- **macOS**: `~/Library/Application Support/aMule/Incoming`
- **Windows**: la carpeta configurada en Preferencias de aMule (generalmente en tu directorio de usuario)

---

## ¿Puedo usar los archivos y la configuración de eMule, y viceversa?

La mayoría de archivos se pueden compartir entre los dos clientes. Los únicos archivos que **no puedes** compartir son los archivos de configuración del programa:

- eMule usa `preferences.ini`
- aMule usa `~/.aMule/amule.conf`

Todos los archivos relacionados con la red ED2K pueden compartirse correctamente copiándolos entre los directorios de las dos aplicaciones. Sin embargo, algunos archivos en `~/.aMule` son específicos de aMule (como `amulesig.dat` o `aMule.tmpl`), por lo que es mejor mover solo los archivos que existen en ambos directorios de aMule y eMule.

**Mover archivos semidescargados** es sencillo: cópialos desde el directorio Temp de eMule (normalmente `C:\Program Files\eMule\Temp` en Windows) a `~/.aMule/Temp` (o el directorio Temp que hayas configurado en aMule), y viceversa.

---

## ¿Para qué sirve todo ese contenido en amulesig.dat y onlinesig.dat?

Estos archivos contienen la **firma online** actual — el estado actual de aMule, si la función de firma está activada. Son usados por herramientas de estadísticas externas (CAS, wxCAS) para mostrar tu actividad de aMule.

- [`amulesig.dat`](/docs/user-guide/amule-files/amulesig-dat) — formato de firma propio de aMule.
- `onlinesig.dat` — compatibilidad con el formato de firma de eMule.

---

## Acabo de instalar aMule por primera vez. ¿Cómo lo configuro?

1. Abre aMule y haz clic en el botón **Preferencias**.
2. En la pestaña **General**: establece un apodo y tu idioma preferido.
3. En la pestaña **Conexión**:
   - Establece las **Capacidades de línea** (la velocidad máxima real de tu conexión a internet).
   - Establece los **Límites de ancho de banda** al máximo de ancho de banda que quieres que use aMule.
4. En la pestaña **Directorios**:
   - Establece un directorio para los **archivos temporales** (archivos en proceso).
   - Establece un directorio para los **archivos completados** (Incoming).
   - Selecciona los directorios que quieres compartir. No se recomienda compartir demasiados archivos al principio.
5. Haz clic en **Aceptar** y luego en **Conectar**.

Para una velocidad de descarga óptima, lee también [¿Cuáles son los mejores ajustes para tener una buena velocidad de descarga?](#what-are-the-best-settings-i-can-set-to-have-a-nice-download-rate)

---

## ¿Gestionará aMule mis archivos de xMule y lMule?

aMule gestiona automáticamente los archivos de configuración de lMule y xMule, pero de forma diferente:

- **lMule**: dado que lMule lleva años discontinuado, aMule lo trata como si fuera un reemplazo. **Renombra** `~/.lMule` a `~/.aMule`. Si usabas `~/.lMule/Temp` y `~/.lMule/Incoming`, actualiza las rutas en Preferencias a `~/.aMule/Temp` y `~/.aMule/Incoming`.
- **xMule**: si se encuentra un directorio `~/.xMule`, se deja sin cambios y aMule **copia** los archivos de configuración de él. Los archivos en proceso de descarga permanecerán en `~/.xMule` a menos que muevas manualmente `~/.xMule/Temp` y `~/.xMule/Incoming` a `~/.aMule` y actualices las rutas en Preferencias.

---

## ¿Cómo empiezo con aMule?

1. Haz clic en el botón **Conectar**.
2. Necesitas al menos un servidor en la ventana de Servidores. Si no aparece ninguno, haz clic en el pequeño botón debajo del botón Conectar en la ventana de Servidores para obtener la lista de servidores predeterminada.
3. Después de unos momentos, aMule se conectará a un servidor (el mensaje "No conectado" en la esquina inferior derecha desaparecerá).
4. Cambia a la ventana de **Búsqueda**, busca el archivo que quieres y haz doble clic en un resultado para comenzar la descarga.

Para más ayuda, únete a `#amule` en `irc.libera.chat` o visita los [foros de aMule](http://forum.amule.org).

---

## ¿Cuáles son los mejores ajustes para tener una buena velocidad de descarga? {#what-are-the-best-settings-i-can-set-to-have-a-nice-download-rate}

El factor más importante es tu **límite de subida**:

- Límite de subida `0–3,99` KBps: el límite de descarga está limitado a `subida × 3` KBps.
- Límite de subida `4–9,99` KBps: el límite de descarga está limitado a `subida × 4` KBps.
- Límite de subida `≥ 10` KBps: **sin límite de descarga** (solo aplica el límite de preferencias de Descarga).

La regla práctica: establece tu límite de subida en al menos **10 KBps** si tu ISP lo permite, y tan alto como puedas permitirte. Cuanto más subas, más créditos acumulas y más rápido descargas de otros clientes.

**Consejo para archivos raros**: cuando ves a una fuente subiéndote un chunk de ese archivo raro, asígnale un **friend slot** para que tenga la máxima prioridad en tu cola de subida, acumulando créditos más rápido.

---

## ¿Hay alguna forma de abrir un archivo de texto y cargar todos los enlaces ed2k que contiene?

Sí. Crea un archivo de texto plano con un enlace `ed2k://` por línea, nómbralo `ED2KLinks` y colócalo en `~/.aMule`. aMule lo detectará automáticamente, añadirá todos los enlaces a la cola de descarga y eliminará el archivo.

Consulta el [archivo ED2KLinks](../user-guide/amule-files/index.md) para más información.

---

## ¿Puedo gestionar aMule remotamente mediante telnet igual que hago con eDonkey?

Sí, aunque no exactamente igual que con eDonkey. Inicia una sesión `telnet` (o `ssh`) normal con el host que ejecuta aMule y usa `amulecmd` para controlarlo. Para iniciar nuevas descargas, usa el comando `ed2k`. Recuerda que [`amulecmd` debe configurarse](/docs/user-guide/amule-components/amulecmd) con la contraseña EC primero.

Otras opciones:
- `cas` — muestra estadísticas básicas de aMule en la línea de comandos.
- [`amuleweb`](/docs/user-guide/amule-components/amuleweb) — interfaz web completa, si puedes usar un navegador en el equipo remoto.

---

## ¿Hay alguna forma de iniciar aMule sin interfaz gráfica?

Sí. Desde aMule 2.0.0-rc6, puedes usar `amuled`, que funciona sin ninguna GUI. Contrólalo con [`amuleweb`](/docs/user-guide/amule-components/amuleweb), [`amulecmd`](/docs/user-guide/amule-components/amulecmd) o [`amulegui`](/docs/user-guide/amule-components/amulegui).

Para versiones anteriores (o usuarios que prefieren el binario monolítico `amule`), hay dos soluciones alternativas disponibles:

### Mediante Xvfb

```bash
# Inicia un framebuffer virtual
Xvfb :1 -screen 0 640x480x16 &

# Ejecuta aMule en él (solo ese shell se ve afectado)
DISPLAY=:1 amule &
```

Una vez en ejecución, controla aMule usando `amulecmd` y `ed2k` como lo harías por SSH.

### Mediante VNC

```bash
vncserver :0 -geometry 1024x768
export DISPLAY=:0
fluxbox &
amule &
```

Un cliente VNC puede conectarse e interactuar visualmente con la ventana de aMule. Nota: si aMule muestra un diálogo de inicio que requiere la intervención del usuario, se bloqueará hasta que alguien se conecte mediante VNC y lo cierre. Esto normalmente solo ocurre una vez.

---

## ¿Puedo ejecutar dos instancias de aMule al mismo tiempo?

Sí, aunque no se recomienda. aMule solo comprueba si el **usuario actual** está ejecutando otra instancia de aMule. Puedes ejecutar instancias adicionales con diferentes cuentas de usuario:

```bash
xhost +
su - otrousuario
amule &
```

**Advertencia**: aMule no puede detectar instancias que se ejecutan en una pantalla X diferente para el **mismo usuario**. Ejecutar dos instancias del mismo usuario en diferentes pantallas X probablemente resultará en una configuración corrupta y chunks perdidos.

---

## ¿Cómo puedo obtener esas bonitas estadísticas de aMule que algunas personas publican en canales IRC?

Usa **CAS** (`cas`) o su equivalente gráfico **wxCAS** (`wxcas`). Ejecuta `cas` en un terminal para obtener un resumen en texto de tu estado de aMule, o lanza `wxcas` para una visualización gráfica. Consulta [cas / wxcas](/docs/user-guide/amule-components/cas-wxcas) para más detalles.

---

## ¿Qué es la asignación de slots?

Cada conexión de subida activa es un **slot**. La asignación de slots define cuánto ancho de banda se asigna a cada slot.

Ejemplo: si tu límite de subida es de 20 KBps y estableces la asignación de slots en 2 KBps, hasta 10 clientes pueden descargar de ti simultáneamente, cada uno a un máximo de 2 KBps.

Ver [¿Por qué aMule ignora el ancho de banda que establecí por slot?](/docs/troubleshooting/common-problems#why-is-amule-ignoring-the-bandwidth-i-set-per-slot) para advertencias importantes.

---

## ¿Por qué no puedo establecer el límite de descarga de aMule a más de X?

El protocolo eD2k impone una relación subida/descarga para evitar el aprovechamiento gratuito. Los límites están codificados internamente:

| Límite de subida | Límite máximo de descarga |
|---|---|
| 0–3 KBps | Subida × 3 KBps |
| 4–9 KBps | Subida × 4 KBps |
| ≥ 10 KBps | Sin restricción |

---

## Establecí el Límite de Subida a 0 KBps pero aMule sigue transfiriendo. ¿Qué hice mal?

**0 KBps significa ilimitado**, no cero. No hay forma de detener completamente las subidas de aMule — este comportamiento es intencional e idéntico al de todos los clientes eD2k (eMule, eDonkey, etc.). Permitir a los usuarios desactivar completamente las subidas destruiría la red eD2k.

Aunque no compartas ningún directorio, aMule siempre comparte el **directorio Temp** para que los archivos parcialmente descargados estén disponibles para otros clientes que descarguen el mismo archivo.

---

## ¿Qué es un friend slot?

Un **friend slot** es un slot de subida dedicado permanentemente reservado para un cliente en tu lista de Amigos. Solo un amigo puede tener un slot a la vez. Cuando ese amigo (con el friend slot activado) intenta descargar un archivo de ti, recibe la máxima prioridad en la cola de subida y siempre es atendido desde ese slot dedicado.

Mientras el amigo no está descargando, el slot reservado revierte al cliente con la puntuación más alta en tu cola de subida normal.

---

## ¿Cuál es el propósito real de configurar las Capacidades de Línea en Preferencias?

aMule solo usa los **Límites de Ancho de Banda** para controlar el uso real de la red. Las **Capacidades de Línea** existen únicamente para dar a los **gráficos de Estadísticas** una escala significativa.

Ejemplo: si tienes una conexión de 100 KBps pero tus descargas nunca superan los 5 KBps (música gratuita indonesia rara), establecer Capacidades de Línea a 100 KBps hace que el gráfico muestre una línea casi plana sin información visual. Establecerlo a 5–10 KBps hace que el gráfico sea legible y útil.

---

## ¿Puedo hacer que aMule reciba datos desde la entrada estándar (para GDB o Valgrind)?

Sí. Desde aMule 2.0.0-rc4, esto está soportado mediante el parámetro `-i` o `--enable-stdin`.

Los usuarios de versiones anteriores a 2.0.0-rc4 pueden usar el `phoenix's aMule stdin patch`.

---

## ¿Cómo cambio de eMule a aMule sin perder mis créditos? {#how-can-i-switch-from-emule-to-amule-without-losing-my-credits}

Los créditos se almacenan en archivos específicos. Copia los siguientes del directorio de configuración de eMule (normalmente `C:\Program Files\eMule\config\` en Windows) a `~/.aMule`:

- `cryptkey.dat`
- `clients.met`
- `preferences.dat`
- `preferencesKad.dat`
- `key_index.dat`
- `load_index.dat`
- `src_index.dat`

Inicia aMule y leerá esos archivos. Tus créditos quedan preservados.

Consulta también la guía [Migrar de eMule a aMule](../user-guide/usage/index.md) para un recorrido completo.

---

## ¿aMule soporta Universal Plug and Play (UPnP)?

Sí. Desde aMule 2.2.1, UPnP está soportado en Linux y macOS. UPnP **no** está soportado en Windows.

---

## ¿Cuál es la historia del conejo?

Ah, sí, todo empezó... ejem... bueno... quiero decir... sigue al conejo blanco. ;-)

---

## ¿Qué distribución o SO se recomienda para ejecutar aMule?

aMule funciona en Windows, macOS, Linux, FreeBSD y OpenBSD. Cualquier distribución Linux moderna con paquetes actualizados funciona bien. La mejor elección es el SO que ya dominas.

---

## ¿Cuándo llegará la próxima release de aMule?

La respuesta siempre es la misma: **pronto**.

---

## Utilidades disponibles de aMule

Las siguientes utilidades se distribuyen con aMule o junto a él:

| Utilidad | Descripción |
|---|---|
| `amuled` | aMule daemon — funciona sin ninguna GUI |
| `amulecmd` | Interfaz de aMule local/remota por línea de comandos |
| `amuleweb` | Interfaz de aMule local/remota basada en web |
| `amulegui` | Interfaz gráfica remota de aMule (se conecta a amuled) |
| `ed2k` | Gestor de enlaces ED2K — pasa enlaces `ed2k://` del navegador a aMule |
| `alc` / `alcc` | ALinkCreator / ALinkCreatorConsole — calcula enlaces ed2k de archivos locales |
| `cas` | aMule Statistics — salida de estadísticas por línea de comandos |
| `wxcas` | wxCAS — visor gráfico de estadísticas de aMule |
| `xas` | xChat aMule Statistics — plugin Perl para xChat2 |
