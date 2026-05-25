---
id: debugging
title: Depuración con GDB y Valgrind
---

GDB y Valgrind son las dos herramientas principales para diagnosticar crashes y errores de memoria en aMule. Esta página explica cómo compilar aMule con símbolos de depuración y cómo usar ambas herramientas eficazmente.

## Compilar aMule con Símbolos de Depuración

Para obtener una salida de depuración significativa, compila en modo **Debug**:

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
```

## Depuración con GDB

### Configurar el Manejo de Señales de GDB

aMule usa varias señales en tiempo real internamente. Configura GDB para pasarlas creando `~/.gdbinit`:

```
handle SIGPIPE nostop noprint pass
handle SIG32  nostop noprint pass
handle SIG33  nostop noprint pass
handle SIG34  nostop noprint pass
```

### Ejecutar aMule Bajo GDB

```sh
gdb build/amule
(gdb) run
```

Cuando aMule crashea, genera un backtrace:

```sh
(gdb) bt
(gdb) bt full
(gdb) thread apply all bt
```

### Analizar un Archivo Core

```sh
gdb /path/to/amule /path/to/core.<pid>
```

## Depuración con Valgrind

Valgrind's **memcheck** detecta lecturas/escrituras inválidas, uso de valores no inicializados, fugas de memoria y operaciones incorrectas de heap.

### Ejecutar aMule Bajo Valgrind

```sh
valgrind \
    --tool=memcheck \
    --leak-check=full \
    --num-callers=20 \
    --error-exitcode=1 \
    build/amule
```

## Interfaces Gráficas para GDB

- **KDbg** — frontend GDB basado en KDE.
- **DDD** — Data Display Debugger.
- **VS Code** con la extensión C/C++.
- **CLion** — IDE completo con integración GDB/LLDB.
