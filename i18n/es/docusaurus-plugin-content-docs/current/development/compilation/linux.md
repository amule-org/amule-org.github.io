---
id: linux
title: Compilar en Linux
---

Esta página proporciona instrucciones específicas para Linux sobre la instalación de las dependencias de compilación y la compilación de aMule desde el código fuente. La página general de [Compilación](index.md) documenta el flujo de trabajo completo de CMake y todas las opciones de compilación.

## Debian y Ubuntu

### Instalar Dependencias

```sh
sudo apt update
sudo apt install \
    binutils-dev \
    build-essential \
    cmake \
    gettext \
    libboost-all-dev \
    libcrypto++-dev \
    libgd-dev \
    libmaxminddb-dev \
    libupnp-dev \
    libwxgtk3.2-dev \
    libz-dev \
    pkg-config \
    po4a \
    libayatana-appindicator3-dev \
    libglib2.0-dev
```

### Compilar

```sh
cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES
cmake --build build -j"$(nproc)"
```

## Fedora y RHEL

### Instalar Dependencias

```sh
sudo dnf install \
    binutils-devel \
    boost-devel \
    cmake \
    cryptopp-devel \
    gd-devel \
    gettext \
    libmaxminddb-devel \
    libupnp-devel \
    wxGTK-devel \
    zlib-devel \
    libayatana-appindicator-gtk3-devel \
    glib2-devel
```

## Arch Linux y Manjaro

### Instalar Dependencias

```sh
sudo pacman -S \
    base-devel \
    binutils \
    boost \
    cmake \
    crypto++ \
    gd \
    gettext \
    libmaxminddb \
    libupnp \
    wxgtk3 \
    zlib \
    libayatana-appindicator \
    glib2
```

## Gentoo

Instala aMule con todos los USE flags habilitados:

```sh
USE="daemon remotegui webserver amulecmd nls upnp" emerge amule
```

Para compilar desde el código fuente con todos los componentes:

```sh
cmake -B build \
    -DBUILD_EVERYTHING=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES
cmake --build build -j"$(nproc)"
```
