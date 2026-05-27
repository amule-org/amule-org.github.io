---
id: index
title: Documentación de aMule
slug: /
---

aMule es un cliente peer-to-peer libre, de código abierto y multiplataforma para compartir archivos en las redes **eD2k (eDonkey2000)** y **Kademlia (Kad)**. Está escrito en C++ con wxWidgets y funciona en Windows, macOS, Linux, FreeBSD y OpenBSD.

## Historia

aMule surgió como fork del proyecto xMule (anteriormente conocido como lMule) en septiembre de 2003. Comenzó como una continuación multiplataforma del linaje *Mule y desde entonces ha evolucionado sustancialmente respecto a sus orígenes.

## Características

### Características de *Mule

aMule implementa la mayoría de las características del cliente eMule original:

- Soporte para las redes **eD2k y Kademlia**.
- Disponible en **28 idiomas**.
- **Source Exchange** — los clientes comparten listas de fuentes para encontrar fuentes de descarga adicionales de forma más eficiente.
- **Sistema de créditos** — recompensa a los usuarios que comparten con otros; las colas largas se gestionan de forma equitativa para que todos los clientes reciban finalmente los archivos que desean.
- **Transferencias y comunicación con servidores comprimidas** mediante zlib — transferencias más rápidas para archivos comprimibles y menor carga en los servidores.
- **Identificación segura** — previene el robo de hashes de usuario y la suplantación de clientes.
- **Filtros IP** — bloquea conexiones desde rangos de IP conocidos como problemáticos.
- **Búsqueda booleana** — operadores `AND`, `OR`, `NOT` en las consultas de búsqueda.
- **Variantes de barra de progreso** — barra de fragmentos tradicional, porcentaje completado, o ambas simultáneamente.
- **Integración en la bandeja del sistema** para GNOME, KDE y gestores de ventanas compatibles (y Windows).
- **Online Signatures** — `amulesig.dat` permite a herramientas externas mostrar el estado de aMule.
- **Detección agresiva de clientes** — detecta y bloquea peers con comportamiento incorrecto.
- **Hashes MD4** — utilizados para descubrimiento de fuentes y verificación de integridad de archivos, previniendo la corrupción.
- **ICH y AICH** — Intelligent Corruption Handler y Advanced Intelligent Corruption Handler aceleran la corrección de partes de archivos corruptas.
- **Prioridades automáticas y gestión de fuentes** — inicia múltiples descargas sin supervisión manual.
- **Función de previsualización** — permite ver vídeos y archivos comprimidos antes de que la descarga finalice (se recomienda MPlayer o Xine; VLC también funciona).
- **Categorías** — organiza las descargas en grupos con nombre.
- **Tipos de búsqueda**:
  - Búsqueda en servidor local
  - Búsqueda global en servidores (consulta todos los servidores conocidos)
  - Búsqueda Kademlia
  - Integración con navegadores mediante enlaces `ed2k://` para descarga con un clic
- **Sistema de mensajería y amigos** — envía mensajes a otros clientes y mantiene una lista de amigos.
- **Actualización de la lista de servidores desde URL** — actualiza al inicio, al conectar, o manualmente en tiempo de ejecución.
- **PowerShare** — gestión prioritaria de tus propios archivos compartidos (conocido como Release).
- **Soporte de skins**.

### Características específicas de aMule

Además de la base *Mule, aMule añade:

- **Multiplataforma** — Windows, macOS, Linux, BSD y muchas más.
- **Soporte de proxy**.
- **Mejores controles contra clientes agresivos**.
- **Protocolo External Connections (EC) completo** — desarrollado desde cero; permite el control remoto total.
- **aMule Daemon ([`amuled`](user-guide/amule-components/amuled.md))** — ejecuta aMule como proceso sin interfaz gráfica con un uso muy bajo de CPU y memoria. Ideal para servidores y dispositivos NAS.
- **aMuleGUI ([`amulegui`](user-guide/amule-components/amulegui.md))** — GUI remota con la misma interfaz que el cliente local.
- **aMuleWeb ([`amuleweb`](user-guide/amule-components/amuleweb.md))** — interfaz basada en navegador; funciona de forma local y remota desde cualquier dispositivo.
- **aMuleCMD ([`amulecmd`](user-guide/amule-components/amulecmd.md))** — control remoto por línea de comandos; scriptable mediante shell y cron.
- **Herramientas de estadísticas** — [`cas` y `wxcas`](user-guide/amule-components/cas-wxcas.md) leen `amulesig.dat` para generar imágenes de estado y páginas HTML.
- **ALinkCreator ([`alc` / `alcc`](user-guide/amule-components/alc-alcc.md))** — genera enlaces ed2k para archivos locales sin necesidad de ejecutar aMule.
- **Gestor rápido de enlaces ed2k** — integrado en la parte inferior de cada página (puede desactivarse en Preferencias).
- **Ejecutar un comando al completar un archivo**.
- **Guardar hasta 20 fuentes en archivos poco comunes** (≤20 fuentes) — mejora la reconexión tras reinicios.
- **Filtrar resultados de búsqueda**.
- **Permisos de archivo por defecto** para las descargas completadas.
- **Soporte de múltiples sistemas de archivos**.
- **Comprobación de actualizaciones de versión**.
- **Asignación de slots** — especifica el ancho de banda mínimo por slot de subida. Por ejemplo, con 20 KB/s de capacidad de subida y una asignación de 10 KB/s por slot, aMule sube a dos clientes simultáneamente a 10 KB/s cada uno.

## Inicio rápido

- [Guía de inicio rápido](quickstart-guide/index.md) — primera ejecución, configuración, búsqueda y descarga

## Módulos

| Binario | Descripción |
|---|---|
| [`amule`](user-guide/amule-components/amule.md) | Cliente GUI todo en uno |
| [`amuled`](user-guide/amule-components/amuled.md) | Daemon sin interfaz gráfica |
| [`amulegui`](user-guide/amule-components/amulegui.md) | GUI remota; se conecta a `amuled` mediante el protocolo EC |
| [`amuleweb`](user-guide/amule-components/amuleweb.md) | Interfaz web HTTP para un `amuled` en ejecución |
| [`amulecmd`](user-guide/amule-components/amulecmd.md) | Interfaz interactiva de línea de comandos para un `amuled` en ejecución |
| [`ed2k`](user-guide/amule-components/ed2k-cli.md) | Herramienta de línea de comandos para añadir enlaces eD2k a una instancia de aMule en ejecución |
| [`alc` / `alcc`](user-guide/amule-components/alc-alcc.md) | Herramientas GUI y de línea de comandos para generar enlaces ed2k de archivos locales |
| [`wxcas` / `cas`](user-guide/amule-components/cas-wxcas.md) | Herramientas de estadísticas que muestran el estado de aMule desde `amulesig.dat` |

## Plataformas compatibles

Windows, macOS, Linux, FreeBSD y OpenBSD (x86\_64 y ARM64).
