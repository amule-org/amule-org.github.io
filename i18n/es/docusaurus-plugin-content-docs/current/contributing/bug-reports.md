---
id: bug-reports
title: Informes de Bugs
---

Los informes de bugs son una contribución vital para aMule. Un problema no puede resolverse si no se reporta, y cuanto más rápida y precisa sea la descripción de un bug, antes podrá solucionarse. Esta página explica qué información incluir en un informe y cómo proporcionar un backtrace útil cuando aMule se cuelga.

## Dónde Reportar un Bug

Abre un issue en el [gestor de issues de GitHub de aMule](https://github.com/amule-org/amule/issues). Necesitarás una cuenta de GitHub.

Antes de abrir un nuevo issue, busca en los issues existentes para evitar duplicados. Incluye un título claro y descriptivo.

## Qué Incluir en Cada Informe

Un informe de bug útil contiene como mínimo:

| Campo | Cómo obtenerlo |
|---|---|
| **Versión de aMule** | `amule --version` o `amuled --version` |
| **Sistema operativo y versión** | p.ej. Ubuntu 24.04, Fedora 40, macOS 14.5, Windows 11 |
| **Pasos para reproducir** | La secuencia exacta de acciones que desencadena el bug |
| **Comportamiento esperado** | Lo que esperabas que ocurriera |
| **Comportamiento real** | Lo que realmente ocurrió |
| **Salida de log** | Líneas relevantes del log de aMule (`~/.aMule/logfile`) |
| **Backtrace del crash** | Para crashes y bloqueos — ver más abajo |

Sé lo más específico posible. "aMule se cuelga" no es un informe útil. "aMule se cuelga de forma reproducible al hacer clic en el botón de búsqueda mientras está conectado a Kad, aproximadamente 20 segundos después de comenzar la búsqueda, en Ubuntu 24.04 con aMule 3.0.0" sí lo es.

## Generar un Backtrace

Cuando aMule se cuelga, el reporter de crash integrado solo proporciona una traza mínima. Un **backtrace completo de GDB** da al equipo de aMule la pila de llamadas exacta en el momento del crash, lo cual es esencial para diagnosticar el problema.

### Paso 1 — Instalar GDB

Verifica que GDB está instalado:

```sh
which gdb
```

Si el comando no devuelve nada, instala GDB:

```sh
# Debian / Ubuntu
sudo apt install gdb

# Fedora / RHEL
sudo dnf install gdb

# Arch / Manjaro
sudo pacman -S gdb

# macOS (Homebrew)
brew install gdb
```

### Paso 2 — Compilar con Símbolos de Depuración

Los binarios de release tienen los símbolos de depuración eliminados. Para obtener un backtrace útil, debes compilar en modo Debug:

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES
cmake --build build -j"$(nproc)"
```

### Paso 3 — Configurar GDB

aMule usa varias señales en tiempo real internamente. Configura GDB para pasarlas creando `~/.gdbinit`:

```
handle SIGPIPE nostop noprint pass
handle SIG32  nostop noprint pass
handle SIG33  nostop noprint pass
handle SIG34  nostop noprint pass
```

### Paso 4 — Ejecutar aMule Bajo GDB

```sh
gdb build/amule
(gdb) run
```

Usa aMule normalmente hasta que se cuelgue. Cuando se produzca el crash, GDB mostrará el prompt `(gdb)`. Ejecuta inmediatamente:

```sh
(gdb) bt
(gdb) bt full
(gdb) thread apply all bt
```

Copia toda la salida y pégala en el issue de GitHub.

## Usar Valgrind para Errores de Memoria

Valgrind ayuda a encontrar fugas de memoria, lecturas/escrituras inválidas y errores use-after-free.

```sh
valgrind \
    --tool=memcheck \
    --leak-check=full \
    --num-callers=20 \
    build/amule
```

Copia la salida de Valgrind en el issue de GitHub.
