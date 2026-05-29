---
id: linux
title: Building on Linux
---

This page provides Linux-specific instructions for installing the build dependencies and compiling aMule from source. The general [Compilation](index.md) page documents the full CMake workflow and all build options.

## Debian and Ubuntu

### Install Dependencies

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
    libglib2.0-dev \
    libmaxminddb-dev \
    libreadline-dev \
    libupnp-dev \
    libwxgtk3.2-dev \
    pkg-config \
    wx3.2-headers
```

For the SNI tray-icon backend (recommended on GNOME and wlroots desktops):

```sh
sudo apt install libayatana-appindicator3-dev
```

### Build

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

### Notes

**`libglib2.0-dev` is required.** The `amule`, `amuled`, and `amulegui` binaries call `g_set_prgname()` to bind the Wayland `wl_app_id` (and X11 `WM_CLASS`) to the `.desktop` filename. wxGTK transitively depends on glib at runtime, but does not always pull the dev headers as a hard dependency. If `pkg-config` cannot find `glib-2.0`, CMake aborts with a clear error message — install `libglib2.0-dev` and delete the build directory before re-running cmake.

**wxWidgets 3.2 is required.** Ubuntu 22.04 and earlier ship wxWidgets 3.0 in the default repos. On those releases, use the [wxWidgets PPA](https://launchpad.net/~sjr/+archive/ubuntu/wx32) or build wxWidgets from source:

```sh
# Example: build wxWidgets 3.2 from source
sudo apt install libgtk-3-dev
wget https://github.com/wxWidgets/wxWidgets/releases/download/v3.2.4/wxWidgets-3.2.4.tar.bz2
tar xf wxWidgets-3.2.4.tar.bz2
cd wxWidgets-3.2.4
./configure --with-gtk=3 --enable-unicode --enable-shared
make -j"$(nproc)"
sudo make install
sudo ldconfig
```

## Fedora and RHEL / Rocky Linux

### Install Dependencies

```sh
sudo dnf install \
    binutils-devel \
    boost-devel \
    cmake \
    cryptopp-devel \
    gd-devel \
    glib2-devel \
    gettext \
    libmaxminddb-devel \
    libupnp-devel \
    make \
    pkgconfig \
    readline-devel \
    wxGTK-devel
```

For the SNI tray-icon backend:

```sh
sudo dnf install libayatana-appindicator-gtk3-devel
```

:::note RHEL / Rocky Linux
On RHEL 8 and Rocky Linux, some packages (wxGTK, cryptopp) may not be available in the default repositories. Enable EPEL and RPMFusion:
```sh
sudo dnf install epel-release
sudo dnf install rpmfusion-free-release
```
:::

### Build

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

## Arch Linux and Manjaro

### Install Dependencies

```sh
sudo pacman -S \
    base-devel \
    binutils \
    boost \
    cmake \
    crypto++ \
    gd \
    glib2 \
    gettext \
    libmaxminddb \
    libupnp \
    pkg-config \
    readline \
    wxwidgets-gtk3
```

For the SNI tray-icon backend:

```sh
sudo pacman -S libayatana-appindicator
```

### Build

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

## Gentoo

Gentoo users can install aMule directly from Portage:

```sh
# Release version
emerge -av net-p2p/amule
```

To control which components are built, use USE flags. Common flags:

| USE flag | Component |
|---|---|
| `daemon` | Build `amuled` |
| `remote` | Build `amulegui` |
| `webserver` | Build `amuleweb` |
| `amulecmd` | Build `amulecmd` |
| `ed2k` | Build `ed2k` link handler |
| `nls` | Native-language support |
| `upnp` | UPnP port forwarding |
| `geoip` | IP→country mapping |
| `debug` | Debug symbols |

Example:

```sh
USE="daemon webserver amulecmd nls upnp geoip" emerge -av net-p2p/amule
```

### Building from Git on Gentoo

To build the development version from git:

```sh
# Install build dependencies
emerge -av \
    dev-libs/boost \
    dev-libs/crypto++ \
    dev-libs/glib \
    dev-libs/libmaxminddb \
    dev-libs/libupnp \
    media-libs/libgd \
    sys-libs/readline \
    x11-libs/wxGTK

git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(nproc)"
```

For debugging on Gentoo with split-debug symbols, see [Debugging](../debugging.md#gentoo-splitdebug-build).

## FreeBSD

### Install Dependencies via Ports

```sh
cd /usr/ports/net-p2p/amule && make install clean
```

Or install the pre-built package:

```sh
pkg install amule
```

### Building from Source on FreeBSD

Install the required ports:

```sh
pkg install \
    boost-libs \
    cryptopp \
    gd \
    glib \
    libmaxminddb \
    libupnp \
    readline \
    wx32-gtk3
```

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

## Common Issues

### `glib-2.0` not found

```
CMake Error: glib-2.0 development headers not found, but they are required
```

Install `libglib2.0-dev` (Debian/Ubuntu) or `glib2-devel` (Fedora), then **delete the build directory** and re-run cmake. pkg-config results are cached — a fresh configure is required:

```sh
rm -rf build
cmake -B build ...
```

### wxWidgets version too old

```
CMake Error: wxWidgets 3.2.0 or newer is required
```

Your distribution ships wxWidgets 3.0. Options:
- Use the wxWidgets 3.2 PPA (Ubuntu).
- Enable a third-party repository (RPMFusion on Fedora).
- Build wxWidgets 3.2 from source (see the Debian/Ubuntu section above).

### SNI tray icon not found

```
-- AppIndicator3 not found — tray icon falls back to legacy GtkStatusIcon
```

This is a warning, not an error. aMule will still build and run. The tray icon will be invisible on GNOME 3.26+ and wlroots compositors. Install `libayatana-appindicator3-dev` and rebuild to fix it.

### `crypto++` version too old

CMake requires Crypto++ ≥ 5.6. Some older distributions (Ubuntu 18.04 LTS, RHEL 7) ship an older version. Options:
- Build Crypto++ from source: [https://github.com/weidai11/cryptopp](https://github.com/weidai11/cryptopp)
- Upgrade to a supported distribution release.
