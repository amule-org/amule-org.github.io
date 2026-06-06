---
id: index
title: Documentación de aMule
slug: /
---

aMule es un programa para compartir archivos libre y de código abierto para las redes peer-to-peer [**eD2k (eDonkey2000)**](p2p-networks/ed2k/index.md) y [**Kademlia (Kad)**](p2p-networks/kademlia.md). Funciona en Windows, macOS, Linux, FreeBSD y OpenBSD, y se mantiene fiel a eMule en aspecto y manejo para que cambiar de uno a otro sea sencillo.

## Historia

aMule nació en agosto de 2003 como un fork multiplataforma de xMule (que a su vez derivaba de lMule), llevando la experiencia de eMule a sistemas más allá de Windows. Desde entonces ha crecido mucho más allá de sus orígenes.

## Características

### Características heredadas de eMule

aMule incluye las características que los usuarios de eMule ya reconocerán:

- **Dos redes** — se conecta tanto a la red eD2k como a Kad para acceder al mayor conjunto posible de archivos y fuentes.
- **[Compatible con eMule](manual/migration/migrate-from-emule.md)** — compatible a nivel de protocolo con eMule y con todos los clientes *Mule, así compartes los mismos archivos y fuentes, te conectas a los mismos servidores y abres enlaces `ed2k://` estándar.
- **[Varias formas de buscar](manual/interfaces/gui/searches.md)**:
  - Tu servidor conectado
  - Todos los servidores conocidos a la vez (búsqueda global)
  - La red Kad, que puede pedir más resultados a peers adicionales
  - Directamente desde tu navegador, haciendo clic en [enlaces `ed2k://`](p2p-networks/ed2k/links.md)
- **Intercambio de fuentes** — los clientes se comparten entre sí sus listas de fuentes, así encuentras más sitios desde los que descargar, y más rápido.
- **[Sistema de créditos](p2p-networks/concepts.md)** — cuanto más subes a alguien, antes te sube esa persona a ti, manteniendo el reparto justo para todos.
- **[Reparación automática de corrupción](p2p-networks/ed2k/aich.md)** — las descargas se comprueban para verificar su integridad, y las partes dañadas se detectan y se vuelven a descargar por sí solas.
- **Gestión de descargas automática** — aMule asigna [prioridades](manual/interfaces/gui/priority.md) y busca fuentes por sí mismo, así puedes iniciar muchas descargas y dejarlas funcionando.
- **[Control de ancho de banda](manual/interfaces/gui/preferences.md#bandwidth-limits)** — fija límites duros de velocidad de subida y bajada para que aMule nunca sature tu conexión, o déjalo a máxima velocidad cuando no estés.
- **[Categorías](manual/interfaces/gui/downloads.md#categories)** — organiza tus descargas en grupos con nombre.
- **[Previsualización](manual/interfaces/gui/downloads.md)** — mira un vídeo o abre un archivo comprimido antes de que termine la descarga (usando tu reproductor multimedia preferido; MPlayer por defecto).
- **Búsqueda booleana** — afina tus búsquedas con `AND`, `OR` y `NOT`.
- **Transferencias comprimidas** — los datos se comprimen al vuelo para transferencias más rápidas y menos carga en los servidores.
- **Filtrado de IP** — bloquea conexiones desde rangos de direcciones conocidos como problemáticos o no deseados.
- **[Identificación segura](p2p-networks/ed2k/secure-user-identification.md)** — protege tu identidad para que nadie pueda hacerse pasar por ti ni robarte tus créditos de subida.
- **Detección de clientes que hacen trampa** — detecta y bloquea a los peers que intentan saltarse las reglas de compartición.
- **[Release Priority](manual/interfaces/gui/priority.md#release-priority)** (conocida como PowerShare en eMule) — da máxima prioridad a tus propios archivos compartidos para que otros puedan obtenerlos rápidamente.
- **[Actualización automática de la lista de servidores](p2p-networks/ed2k/servers.md)** — mantén tu lista de servidores al día automáticamente, o actualízala cuando quieras.
- **[Bandeja del sistema](manual/interfaces/gui/tray-icon.md)** — mantén aMule funcionando discretamente en la bandeja del sistema (o área de notificación) en todos los escritorios principales.
- **[Amigos y mensajería](manual/interfaces/gui/messages.md)** — mantén una lista de amigos e intercambia mensajes con otros usuarios.
- **[Firma en línea](manual/utilities/wxcas-cas.md)** — publica tu estado actual, como la velocidad y las descargas activas, en una web o en la firma de un foro.
- **Visualización de progreso flexible** — muestra el progreso de la descarga como barra de fragmentos, como porcentaje, o ambos.
- **[Skins](manual/interfaces/gui/skins.md)** — cambia el aspecto de aMule con skins descargables.
- **37 idiomas** — usa aMule en tu propio idioma.

### Características añadidas por aMule

Además de eso, aMule añade capacidades propias:

- **[Funciona en todas partes](manual/installation/index.md)** — soporte nativo para Windows, macOS, Linux y BSD.
- **[Paquetes nativos](manual/installation/index.md)** — builds listos para usar para cada plataforma: instalador y `.zip` portable en Windows, un `.dmg` Universal2 en macOS, AppImage y Flatpak en Linux, para x64 y ARM64.
- **Libre y de código abierto** — publicado bajo la licencia GPL-2.0, sin telemetría, sin publicidad y sin dependencia de un proveedor; el código fuente completo está abierto para inspeccionarlo y contribuir.
- **Control remoto completo** — ejecuta aMule en segundo plano y gestiónalo de forma remota desde una [GUI remota](manual/interfaces/gui/amulegui.md), una [interfaz web](manual/interfaces/amuleweb.md) o una [interfaz de línea de comandos](manual/interfaces/amulecmd.md), todo sobre su sistema de [External Connections (EC)](developer/ec-protocol.md).
- **[Filtrado de resultados de búsqueda](manual/interfaces/gui/searches.md)** — oculta los resultados no deseados para que encuentres lo que buscas más rápido.
- **Control de slots de subida** — fija una velocidad mínima por subida para compartir con un número razonable de personas a la vez, en lugar de repartirte demasiado.
- **Reescaneo automático de carpetas** — aMule detecta cuándo se añaden, cambian o eliminan archivos en tus [carpetas compartidas y en Incoming](manual/configuration/directories.md), sin recarga manual.
- **Recuerda las fuentes de archivos poco comunes** — guarda dónde encontrar archivos difíciles de conseguir para que tus descargas se reanuden rápidamente tras un reinicio.
- **Barra rápida de enlaces ed2k** — pega enlaces `ed2k://` directamente en una barra en la parte inferior de cada ventana (puede desactivarse).
- **[Ejecutar un comando al completar](manual/configuration/events.md)** — lanza automáticamente un script o programa cuando termina una descarga.
- **Funciona entre sistemas de archivos** — guarda las descargas y los archivos compartidos en distintas unidades o sistemas de archivos.
- **Actualizaciones seguras (HTTPS)** — las listas de servidores y de filtros pueden descargarse mediante conexiones HTTPS seguras.
- **[Soporte de proxy](manual/configuration/proxy.md)** — enruta tu conexión a través de un servidor proxy.
- **Resolución de país** — muestra el país de los servidores y usuarios a los que te conectas (se requiere la descarga de una base de datos de países gratuita).
- **Avisos de actualización** — aMule te avisa cuando hay una nueva versión disponible.
- **Inicio al arrancar sesión** — haz que aMule se inicie automáticamente cuando inicias sesión.
- **Permisos de archivo por defecto** — elige los permisos de acceso que se aplican a las descargas completadas.

## Inicio rápido

- [Primeros pasos](quickstart-guide.md) — primera ejecución, configuración, búsqueda y descarga

## Módulos

| Herramienta | Qué hace |
|---|---|
| [`amule`](manual/interfaces/gui/amule.md) | Cliente todo en uno con interfaz gráfica completa |
| [`amuled`](manual/interfaces/amuled.md) | Versión en segundo plano sin ventana (demonio) |
| [`amulegui`](manual/interfaces/gui/amulegui.md) | Interfaz gráfica que controla un aMule en segundo plano |
| [`amuleweb`](manual/interfaces/amuleweb.md) | Interfaz web para un aMule en segundo plano |
| [`amulecmd`](manual/interfaces/amulecmd.md) | Interfaz de línea de comandos para un aMule en segundo plano |
| [`ed2k`](manual/utilities/ed2k.md) | Utilidad de línea de comandos que envía enlaces `ed2k://` a un aMule en ejecución |
| [`alc` / `alcc`](manual/utilities/alc-alcc.md) | Crea enlaces `ed2k://` para tus propios archivos (gráfica y línea de comandos) |
| [`wxcas` / `cas`](manual/utilities/wxcas-cas.md) | Muestra tu estado de aMule como imágenes o páginas web |

## Plataformas soportadas

aMule funciona en Windows, macOS, Linux, FreeBSD y OpenBSD, en hardware x86\_64 y ARM64.
