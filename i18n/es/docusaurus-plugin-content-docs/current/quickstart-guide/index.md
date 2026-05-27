---
id: index
title: Primeros pasos
---

## Qué es aMule

aMule es un cliente peer-to-peer (P2P) para la red [eD2k](https://es.wikipedia.org/wiki/EDonkey), conocida comúnmente como red eDonkey o red eD2k (eDonkey2000). Esta guía no requiere que conozcas estas redes en detalle, pero sí que tengas aMule instalado en tu equipo. Si todavía no lo has instalado, consulta la guía de instalación de tu plataforma.

## Instalación

Si aún no has instalado aMule, consulta la [guía de instalación](../user-guide/installation/index.md) para instrucciones específicas de cada plataforma.

## Ejecutar aMule por primera vez

Inicia aMule ejecutando el comando `amule` en una terminal, o utilizando el acceso directo que proporcione tu entorno de escritorio.

Al iniciarse por primera vez, aMule mostrará una notificación informándote de que lo estás ejecutando por primera vez.

> **Nota:** aMule utiliza ampliamente los menús contextuales accesibles con clic derecho. Si no encuentras una función, prueba a hacer clic derecho sobre el elemento que quieras manipular.

### Configurar aMule

Antes de comenzar a compartir archivos, debes configurar correctamente aMule. Esto incluye velocidades y límites de conexión, directorios, proxies, puertos y otras opciones. Accede a las preferencias haciendo clic en el icono **Preferencias** en la parte superior de la ventana de aMule. En macOS, haz clic en el icono **Herramientas** de la barra de herramientas.

#### Velocidad de conexión

La red eDonkey exige subida. Para poder descargar archivos, tú también debes compartirlos (no te preocupes si todavía no tienes nada que compartir). Esto se aplica de dos maneras:

- Tu velocidad de descarga depende de la velocidad de subida. Si limitas la subida por debajo de 10 kB/s, la velocidad máxima de descarga será aproximadamente 3–4 veces la de subida. Limitar la subida a 5 kB/s significa que solo podrás descargar a ~20 kB/s.
- Los archivos parcialmente descargados se comparten automáticamente en cuanto recibes al menos un chunk (un chunk es un fragmento de 9,28 MB de un archivo).

Al abrir por primera vez el cuadro de diálogo Preferencias se muestra la página **General**. Para configurar el ancho de banda, haz clic en la pestaña **Conexión**:

![Diálogo de límites de ancho de banda](/img/docs/bandwidth_limits.png)

Los ajustes relevantes están en **Límites de ancho de banda** — los campos **Subida** y **Descarga**. No es necesario establecer una velocidad máxima de descarga, pero se recomienda fijar la velocidad de subida al **80% de tu velocidad real**, ya que dejarla sin límite puede ralentizar las descargas.

Ten en cuenta que las velocidades de los ISP suelen indicarse en kilo**bits** por segundo (kb/s), pero aMule espera kilo**bytes** por segundo (kB/s). Divide entre 8 para convertir:

```
Descarga máxima: 1024 kb/s ÷ 8 = 128 kB/s
Subida máxima:    512 kb/s ÷ 8 =  64 kB/s
```

Una vez introducidos los valores correctos, haz clic en **Aceptar** para guardar.

### eD2k y Kademlia

aMule puede conectarse a dos redes simultáneamente:

- **ED2K** — la red eDonkey clásica basada en servidores.
- **Kademlia (Kad)** — una red distribuida sin servidores. Permite que aMule y otros clientes eDonkey funcionen sin depender de servidores centralizados.

Ambas redes están activadas por defecto. Puedes desactivar cualquiera de las dos desde la parte inferior de la página de preferencias **Conexión**. Los usuarios con velocidades de subida lentas deberían considerar activar solo una red para reducir la sobrecarga.

### Conectarse a un servidor

Al abrir aMule deberías ver el diálogo de servidores:

![Lista de servidores vacía](/img/docs/serverlist_empty.png)

La lista de servidores está vacía en el primer inicio. Para rellenarla, haz clic en el campo de texto que contiene la URL (p. ej. `https://upd.emule-security.org/server.met`) y pulsa Intro. Aparecerá brevemente un cuadro de diálogo mientras se descarga la lista.

![Lista de servidores ED2K poblada](/img/docs/serverlist_ed2k.png)

Una vez que tengas una lista de servidores, haz clic en el botón grande **Conectar** en la parte superior izquierda de la ventana para conectarte a un servidor aleatorio. aMule contactará con servidores y establecerá una conexión; espera a que indique que la conexión se ha realizado correctamente antes de continuar.

### Conectarse a la red Kademlia

Para conectarte a la red Kademlia (cuando está habilitada en las preferencias), pulsa el botón **Conectar** en la barra de herramientas superior. Ten en cuenta que conectarte manualmente a un servidor ED2K concreto haciendo doble clic **no** te conecta a Kademlia.

Alternativamente, ve a la subpágina **Kad** de la página **Redes** y pulsa **Inicializar desde clientes conocidos**. Si es la primera vez que usas Kad, actualiza el archivo `nodes.dat` haciendo clic en el campo de texto de la URL y pulsando Intro. No es necesario repetir esto más adelante; aMule mantiene la lista de nodos actualizada mientras se está ejecutando.

![Página de red Kademlia](/img/docs/serverlist_kad.png)

### ID alta e ID baja

Dado que las redes P2P requieren que los clientes se conecten directamente entre sí, estar detrás de un cortafuegos o de un router que bloquee puertos específicos puede causar problemas.

Observa el icono del globo terráqueo en la esquina inferior derecha de la ventana:

- **Flechas verdes** — tienes **ID alta** y conectividad completa. Continúa con normalidad.
- **Flechas amarillas** — tienes **ID baja**. La ID baja reduce considerablemente el rendimiento P2P. Tendrás que abrir y redirigir los puertos 4662 (TCP), 4665 (UDP) y 4672 (UDP) en tu router o firewall.

## Uso básico

### Buscar y descargar

Para buscar un archivo, asegúrate de estar conectado a un servidor o a la red Kademlia, y haz clic en el botón **Búsquedas**:

![Diálogo de búsqueda](/img/docs/search_dialog.png)

Para acotar los resultados por tipo, activa **Parámetros extendidos** y elige un **Tipo de archivo** en el menú desplegable (p. ej. *CD-Images*). Selecciona un tipo de búsqueda:

- **Local** — consulta únicamente el servidor ED2K al que estás conectado. Es rápida y suficiente en la mayoría de los casos.
- **Global** — consulta todos los servidores de tu lista. Más lenta (aproximadamente 0,75 s por servidor).
- **Kad** — busca en la red Kademlia.

Introduce un término de búsqueda en el campo **Nombre** y pulsa Intro o haz clic en **Buscar**:

![Resultados de búsqueda](/img/docs/search_results.png)

Haz clic en **Fuentes** dos veces para ordenar por popularidad. Haz doble clic en un resultado (o selecciónalo y haz clic en **Descargar**) para añadirlo a la cola de descarga.

Colores de los resultados:

- **Azul** — número de fuentes; azul más oscuro significa más fuentes.
- **Rojo** — archivo que estás descargando actualmente.
- **Verde** — archivo que ya has descargado o compartido.

#### Búsquedas avanzadas

aMule admite expresiones de búsqueda booleanas con `AND`, `OR` y `NOT`. Las expresiones pueden agruparse con paréntesis:

```
(knoppix AND V5.1.1) OR (knoppix AND V6.0)
```

#### Filtrar resultados

Usa el campo de filtro del diálogo de búsqueda para eliminar resultados no deseados. El campo acepta expresiones regulares (sintaxis [wxRegEx](https://docs.wxwidgets.org/stable/overview_resyntax.html)). Por defecto el filtro elimina todo lo que **no** coincide; este comportamiento puede invertirse.

Ejemplos:

| Expresión | Efecto |
|---|---|
| `porn\|sex` | Elimina entradas que contengan "porn" o "sex" |
| `^palabra` | Elimina entradas que comiencen por "palabra" |
| `palabra$` | Elimina entradas que terminen en "palabra" |

### Tipos de búsqueda

| Tipo | Descripción |
|---|---|
| **Local** | Consulta únicamente el servidor al que estás conectado. Es rápida y suficiente en la mayoría de los casos. |
| **Global** | Consulta todos los servidores de tu lista (~0,75 s por servidor). Úsala si Local no devuelve resultados. |
| **Kad** | Consulta la red Kademlia. Los resultados representan solo fuentes completas (a diferencia de ED2K, que cuenta fuentes completas e incompletas). |

### La cola de descargas

Haz clic en el botón **Transferencias** para ver tus descargas en cola:

![Cola de transferencias](/img/docs/transfers_queue.png)

Si la barra de progreso pasa a azul oscuro, significa que muchas fuentes tienen ese archivo. Evita los archivos con segmentos rojos; el rojo indica que ninguna fuente conocida tiene esa parte y que probablemente la descarga no podrá completarse.

Haz doble clic en cualquier archivo para inspeccionar las fuentes encontradas para él.

#### Columnas de la cola de descargas

| Columna | Descripción |
|---|---|
| **Nombre de archivo** | Nombre del archivo. |
| **Tamaño** | Tamaño del archivo. La red eD2k admite archivos de hasta 4 GB. |
| **Transferido** | Total de bytes recibidos hasta ahora. |
| **Completado** | Cuánto del archivo está realmente completo. Puede diferir de *Transferido* debido a compresión o corrupción. |
| **Progreso** | Barra de progreso visual. Azul = partes con fuentes disponibles (más oscuro = más fuentes); Rojo = ninguna fuente tiene esa parte; Negro = parte ya descargada; Amarillo = parte que se está descargando actualmente. La barra verde fina en la parte superior muestra el progreso total. |
| **Fuentes** | Formato: `<Consultadas>[/Total] [+A4AF] [(Transfiriendo)]`. *Consultadas* = fuentes a las que se ha consultado; *Total* = todas las fuentes conocidas; *A4AF* = fuentes solicitadas para otro archivo; *Transfiriendo* = fuentes que te están subiendo datos ahora mismo. |
| **Prioridad** | Prioridad de descarga. La prioridad automática (por defecto) permite que aMule gestione la asignación automáticamente. Los archivos con mayor prioridad atraen más fuentes. |
| **Estado** | Estado actual de la descarga. *Esperando* significa que aMule está esperando a que una fuente empiece a subirte datos. |
| **Tiempo restante** | Tiempo estimado para completar la descarga. Solo se muestra cuando se están recibiendo datos activamente. |
| **Última vez completo** | Última vez que una fuente tenía el archivo completo. |
| **Última recepción** | Última vez que se recibieron datos de este archivo. |

### La cola de subidas

La cola de subidas aparece debajo de la cola de descargas y muestra los clientes que están descargando archivos desde tu equipo. No puedes detener manualmente las subidas.

Haz clic en el icono azul situado junto a la etiqueta **Subidas** para alternar entre las subidas activas y los clientes en cola que esperan descargar desde ti.

### Iconos y su significado

La página Transferencias utiliza pequeños iconos para indicar el estado de cada conexión con una fuente.

**Estado de la fuente**

| Significado del icono | Descripción |
|---|---|
| Enviando | El cliente te está enviando un archivo o un hashset. |
| En cola / Preguntando | Estás en la cola de este cliente o solicitándole un archivo. |
| Conectando | Te estás conectando actualmente a este cliente. |
| No disponible | Al cliente se le ha solicitado otro archivo, no tiene las partes necesarias o no es accesible (ID baja). |
| Desconocido | Estado desconocido. |

**Tipo de cliente**

| Cliente | Descripción |
|---|---|
| aMule | Cliente aMule |
| eDonkey2000 | Cliente eDonkey original |
| eMule | Cliente eMule |
| Amigo | Cliente marcado como Amigo |
| lphant | Cliente lphant |
| mlDonkey | Cliente mlDonkey |
| Shareaza | Cliente Shareaza |
| xMule | Cliente xMule |
| Desconocido | Cliente no reconocido |

**Indicadores superpuestos**

| Modificador | Significado |
|---|---|
| Protocolo eMule | El cliente admite extensiones del protocolo eMule (intercambio de fuentes, etc.). |
| Buen crédito | El cliente tiene una buena puntuación de crédito. |
| Crédito normal | El cliente tiene una puntuación de crédito normal. |
| ID segura (válida) | El cliente ha sido identificado de forma segura. |
| ID segura (inválida) | El cliente ha sido marcado como actor malicioso. |

### Categorías para descargas

Las descargas pueden asignarse a categorías con nombre, cada una con un color propio y un directorio de destino independiente.

- **Crear una categoría:** haz clic derecho en la pestaña **Todas** (debajo de la barra de herramientas en la página Transferencias) y selecciona **Añadir categoría**.
- **Asignar un archivo:** haz clic derecho en una descarga de la lista y elige una categoría en **Asignar a categoría**. Selecciona *Sin asignar* para usar la categoría predeterminada.
- **Filtrar por categoría:** haz clic izquierdo en cualquier pestaña de categoría para mostrar solo sus archivos. Haz clic derecho en la pestaña **Todas** y usa **Seleccionar filtro de vista** para opciones de filtrado adicionales.

### ¿Dónde están los archivos?

Durante la descarga, aMule almacena los archivos parciales en un directorio temporal:

| Plataforma | Directorio temporal | Archivos completados |
|---|---|---|
| Windows XP | `C:\Documents and Settings\<usuario>\Application Data\aMule` | misma raíz |
| Windows Vista+ | `C:\Users\<usuario>\AppData\Roaming\aMule` | misma raíz |
| macOS | `~/Library/Application Support/aMule/Temp` | `~/Library/Application Support/aMule/Incoming` |
| Linux | `~/.aMule/Temp` | `~/.aMule/Incoming` |

> **Nota:** En Linux, `.aMule` es un directorio oculto. Activa *Mostrar archivos ocultos* en tu gestor de archivos para verlo.

Puedes cambiar ambas rutas en **Preferencias → Directorios**. Si existe un directorio llamado `config` junto al ejecutable de aMule, los archivos de configuración se guardan allí — útil para ejecutar aMule desde una memoria USB.

Si tienes descargas incompletas de eMule, puedes copiar sus archivos temporales al directorio `Temp` de aMule y este reanudará esas descargas.

### Compartir archivos

La red eD2k está optimizada para archivos grandes, no para clips o documentos pequeños. Es **tu** responsabilidad asegurarte de no infringir ninguna ley respecto al material que compartes.

Hay dos formas de compartir archivos:

**1. Colocar archivos en el directorio Incoming**

Copia los archivos a `~/.aMule/Incoming` (Linux) o la ruta equivalente en tu plataforma. Luego reinicia aMule o pulsa el botón **Recargar** en la página Archivos compartidos:

![Botón recargar archivos compartidos](/img/docs/reload_button.png)

**2. Añadir directorios compartidos en Preferencias**

Haz clic en **Preferencias → Directorios**:

![Preferencias — página de directorios](/img/docs/prefs_directories.png)

Navega hasta el directorio que quieras compartir. Haz doble clic en una carpeta para compartirla, o haz clic derecho para compartirla de forma recursiva (incluyendo todos los subdirectorios).

## Conclusión

Esta guía ha cubierto los aspectos esenciales para poner aMule en marcha: configurar el ancho de banda, conectarse a las redes eD2k y Kademlia, buscar y descargar archivos, y compartir tu propio contenido. Si encuentras algo que falta o no está claro, las contribuciones son bienvenidas.
