---
id: index
title: Desarrollo
---

Esta sección documenta la arquitectura de aMule, el flujo de trabajo de desarrollo y los aspectos técnicos internos. Está dirigida a colaboradores que deseen entender cómo funciona aMule antes de modificarlo, y a desarrolladores que crean aplicaciones que interactúan con aMule.

## Descripción General de Componentes

aMule se distribuye como varios binarios que comparten el mismo estado en disco en `~/.aMule/`:

| Binario | Descripción |
|---|---|
| `amule` | Cliente GUI todo en uno. El motor de descarga y la interfaz de usuario se ejecutan en el mismo proceso. |
| `amuled` | Daemon sin interfaz gráfica. Mismo motor que `amule`, sin ninguna UI. Diseñado para servidores de uso continuo, NAS y VPS. |
| `amulegui` | GUI remota que se conecta a un `amuled` en ejecución a través del [protocolo EC](ec-protocol.md). |
| `amuleweb` | Pequeño servidor HTTP que expone un `amuled` en ejecución a un navegador web. |
| `amulecmd` | CLI interactiva que se conecta a un `amuled` en ejecución vía EC. |
| `ed2k` | Pequeño auxiliar que pasa URLs `ed2k://` desde un navegador a una instancia de aMule en ejecución. |
| `alc` / `alcc` | Creadores de enlaces GUI y consola — generan enlaces eD2k a partir de archivos locales. |
| `cas` / `wxcas` | Herramientas de estadísticas en C y wxWidgets — leen el archivo de firma online `amulesig.dat`. |

`amuled`, `amulegui`, `amuleweb` y `amulecmd` se comunican a través del **protocolo de Conexiones Externas (EC)**, un protocolo binario personalizado sobre una conexión TCP. Consulta el [Protocolo EC](ec-protocol.md) para ver la especificación completa.

## Estructura del Árbol de Fuentes

```
amule/
├── src/                    # Fuente principal de la aplicación
│   ├── amule.cpp           # Punto de entrada de la aplicación monolítica
│   ├── amuled.cpp          # Punto de entrada del daemon
│   ├── amule-gui.cpp       # Código específico de la GUI
│   ├── amule-remote-gui.cpp # GUI remota (amulegui)
│   ├── ExternalConn.cpp    # Implementación del lado servidor del protocolo EC
│   ├── ClientList.*        # Gestión de clientes conectados
│   ├── DownloadQueue.*     # Gestión de la cola de descarga
│   ├── UploadQueue.*       # Gestión de ranuras de subida
│   ├── kademlia/           # Implementación de la DHT Kademlia
│   │   ├── routing/        # Zona de enrutamiento y gestión de contactos
│   │   └── utils/          # UInt128, KadSearchTerm, etc.
│   ├── utils/              # Utilidades independientes (alc, alcc, cas, wxcas, ed2k)
│   ├── webserver/          # Servidor HTTP amuleweb
│   └── lib/
│       ├── common/         # Biblioteca compartida: MuleCollection, CFile, etc.
│       ├── ec/             # Biblioteca cliente del protocolo EC (usada por amulegui, amulecmd)
│       └── ...
├── unittests/              # Suite de tests basada en MuleUnit
├── cmake/                  # Módulos find y opciones de compilación de CMake
├── docs/
│   ├── INSTALL.md          # Instrucciones de compilación (autoritativas)
│   ├── EC_Protocol.md      # Especificación del protocolo EC
│   ├── translations.md     # Flujo de trabajo de traducción
│   └── man/                # Man pages + infraestructura de traducción po4a
├── po/                     # Archivos .po de traducción de la UI
└── packaging/              # Scripts de empaquetado por plataforma (Linux, macOS, Windows)
```

## Arquitectura

### Motor de Descarga

El motor de descarga es compartido entre `amule` (monolítico) y `amuled` (daemon). Gestiona:

- **Cola de descarga** (`DownloadQueue.*`): descargas en cola y activas, agregación de fuentes, gestión de prioridades.
- **Cola de subida** (`UploadQueue.*`): asignación de ranuras de subida, puntuación por cliente, limitación de ancho de banda.
- **Lista de clientes** (`ClientList.*`): todos los clientes conocidos, deduplicación, bloqueo.
- **DHT Kademlia** (`src/kademlia/`): descubrimiento de peers, búsqueda de archivos, búsqueda de fuentes sin servidor central.
- **Conexión al servidor eD2k**: conexión TCP a un servidor eD2k activo para indexación y búsqueda de fuentes.

### Capa GUI

La GUI está construida con **wxWidgets** (versión mínima 3.2.0). Está completamente separada del motor: todo el estado del motor se accede a través de una capa de aplicación delgada (`amuleAppCommon`). La misma capa de aplicación es usada tanto por el cliente monolítico como por el daemon, permitiendo que la GUI remota muestre información idéntica.

### Control Remoto (Protocolo EC)

`amuled` escucha en un puerto TCP configurable (por defecto: 4712) para Conexiones Externas. Los clientes se autentican con una contraseña hasheada con MD5, luego intercambian paquetes binarios estructurados para consultar el estado y emitir comandos. El protocolo está documentado en el [Protocolo EC](ec-protocol.md).

### Transferencia de Archivos

- Los archivos en progreso se almacenan como `<hash>.part` + `<hash>.part.met` en el directorio Temp (`~/.aMule/Temp/`).
- Los archivos completados se mueven al directorio Incoming (`~/.aMule/Incoming/`).
- La integridad de los archivos se verifica usando **AICH** (Advanced Intelligent Corruption Handling) — una estructura hash similar a un árbol de Merkle que permite la verificación por fragmento y la re-descarga selectiva de partes corruptas.

### Kademlia

aMule incluye una implementación completa de la **DHT Kademlia** usada por la red eD2k. La implementación está en `src/kademlia/`. Tipos clave:

- `CUInt128` — entero sin signo de 128 bits usado como identificador de nodo/archivo.
- `CRoutingZone` — la tabla de enrutamiento; particionada en 128 zonas organizadas como un árbol binario.
- `CContact` — un único peer Kad (IP, puerto, tipo, tiempo de última actividad).

## Documentación del Código

El código fuente de aMule está documentado con comentarios **Doxygen**. Para generar la referencia HTML:

```sh
# Instalar doxygen (Debian/Ubuntu)
sudo apt install doxygen

# Generar documentación
cd /path/to/amule
doxygen docs/Doxyfile
# La salida va a build/docs/html/ (o al OUTPUT_DIRECTORY en Doxyfile)
```

El HTML generado permite navegar por todas las clases, métodos y sus relaciones de forma interactiva.

Los comentarios de documentación siguen la sintaxis Doxygen descrita en la guía de [Estilo de Código](./code-style.md#documentation-comments). La documentación va en los archivos de cabecera; los archivos de implementación usan comentarios C++ planos para explicaciones en línea.

## Flujo de Trabajo de Desarrollo

### Configuración Inicial

```sh
git clone https://github.com/amule-org/amule.git
cd amule

# Instalar dependencias específicas de la plataforma — ver guías de Compilación
# Luego configurar y compilar en modo Debug
cmake -B build -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
```

### Ejecutar desde el Directorio de Compilación

Todos los binarios compilados se colocan en `build/` y pueden ejecutarse directamente sin instalar:

```sh
./build/amule
./build/amuled --full-daemon
```

Esto es conveniente durante el desarrollo — no es necesario hacer `sudo cmake --install` en cada cambio.

### Instalación Local (Sin sudo)

```sh
cmake --install build --prefix=$HOME/.local
```

Los binarios van a `~/.local/bin/`, los datos compartidos a `~/.local/share/amule/`. Para desinstalar, elimina los archivos listados en `build/install_manifest.txt`:

```sh
xargs rm -f < build/install_manifest.txt
```

### Ejecutar los Tests

```sh
ctest --test-dir build --output-on-failure
```

Consulta [Testing](testing.md) para más detalles sobre la suite de tests y cómo añadir nuevos tests.

### Depuración de Fallos

Consulta [Depuración con GDB y Valgrind](debugging.md) para instrucciones sobre:

- Compilar con símbolos de depuración
- Generar backtraces de GDB
- Usar valgrind para encontrar errores de memoria

## Lectura Adicional

- [Protocolo EC](ec-protocol.md) — protocolo binario usado por los clientes de control remoto
- [Compilación](compilation/index.md) — sistema de compilación, dependencias y notas específicas por plataforma
- [Depuración](debugging.md) — backtraces de GDB y uso de valgrind
- [Testing](testing.md) — tests unitarios y red de test virtual
- [Estilo de Código](./code-style.md) — formato, nomenclatura y patrones prohibidos
- [Traducciones](../contributing/translations.md) — flujo de trabajo gettext y po4a para man pages
