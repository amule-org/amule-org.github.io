---
id: windows
title: Compilar en Windows
---

aMule se compila en Windows usando **MSYS2** con el toolchain **MINGW64** y **Ninja** como generador de compilación. Esta es la configuración usada por el pipeline de CI y produce la versión oficial para Windows. La página general de [Compilación](index.md) documenta el flujo de trabajo completo de CMake y todas las opciones de compilación.

## Prerrequisitos

### Instalar MSYS2

Descarga e instala MSYS2 desde [https://www.msys2.org/](https://www.msys2.org/). Sigue las instrucciones de actualización del primer arranque del sitio web.

Después de la instalación base, abre la terminal **MSYS2 MINGW64** (no MSYS2 MSYS ni UCRT64) para todos los pasos siguientes.

### Instalar Dependencias

En la terminal MSYS2 MINGW64:

```sh
pacman -Syu
pacman -S \
    mingw-w64-x86_64-boost \
    mingw-w64-x86_64-cmake \
    mingw-w64-x86_64-crypto++ \
    mingw-w64-x86_64-gettext \
    mingw-w64-x86_64-libgd \
    mingw-w64-x86_64-libmaxminddb \
    mingw-w64-x86_64-ninja \
    mingw-w64-x86_64-pkgconf \
    mingw-w64-x86_64-upnplib \
    mingw-w64-x86_64-wxwidgets3.2-msw \
    mingw-w64-x86_64-zlib \
    base-devel \
    git
```

## Compilar

```sh
cmake -B build -G Ninja \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES
cmake --build build -j"$(nproc)"
```

## Notas

- Usa siempre la terminal **MSYS2 MINGW64** — los toolchains MSYS y UCRT64 no son compatibles.
- Los binarios compilados se encuentran en `build/` y pueden ejecutarse directamente.
- La bandeja del sistema usa el API Win32 nativo en Windows; `libayatana-appindicator3` es solo para Linux.
