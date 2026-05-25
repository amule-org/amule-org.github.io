---
id: macos
title: Compilar en macOS
---

Esta página proporciona instrucciones específicas para macOS sobre la instalación de las dependencias de compilación usando [Homebrew](https://brew.sh/) y la compilación de aMule desde el código fuente. La página general de [Compilación](index.md) documenta el flujo de trabajo completo de CMake y todas las opciones de compilación.

## Prerrequisitos

Instala las herramientas de línea de comandos de Xcode:

```sh
xcode-select --install
```

Instala [Homebrew](https://brew.sh/) si aún no lo tienes:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Instalar Dependencias

```sh
brew install \
    cmake \
    boost \
    cryptopp \
    gd \
    gettext \
    libmaxminddb \
    libupnp \
    pkg-config \
    wxwidgets \
    zlib
```

## Compilar

```sh
cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES
cmake --build build -j"$(sysctl -n hw.logicalcpu)"
```

## Notas

- aMule no soporta la bandeja del sistema en macOS — `libayatana-appindicator3` es solo para Linux.
- Los binarios compilados se colocan en `build/` y pueden ejecutarse directamente sin instalar.
- Para instalar localmente sin `sudo`: `cmake --install build --prefix=$HOME/.local`
