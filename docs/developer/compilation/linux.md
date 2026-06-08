---
id: linux
title: Building on Linux
---

This page is a self-contained guide to building aMule from source on Linux: install the dependencies for your distribution, then build. The general [Compilation](index.md) page documents the full CMake workflow and the complete list of [build options](index.md#build-options). For other platforms, see [Windows](windows.md), [macOS](macos.md), and [BSD](bsd.md).

## Install Dependencies

Install the packages for your distribution. Then continue with [Build](#build) below — the build commands are the same for every distribution.

### Debian and Ubuntu

```sh
sudo apt update
sudo apt install \
    binutils-dev \
    build-essential \
    cmake \
    gettext \
    libayatana-appindicator3-dev \
    libboost-all-dev \
    libcrypto++-dev \
    libgd-dev \
    libglib2.0-dev \
    libmaxminddb-dev \
    libreadline-dev \
    libupnp-dev \
    libwxgtk3.2-dev \
    pkg-config \
    wx3.2-headers \
    zlib1g-dev
```

### Fedora and RHEL / Rocky Linux

```sh
sudo dnf install \
    binutils-devel \
    boost-devel \
    cmake \
    cryptopp-devel \
    gd-devel \
    gettext \
    glib2-devel \
    libayatana-appindicator-gtk3-devel \
    libmaxminddb-devel \
    libupnp-devel \
    make \
    pkgconfig \
    readline-devel \
    wxGTK-devel \
    zlib-devel
```

:::note RHEL / Rocky Linux
On RHEL 8 and Rocky Linux, some packages (wxGTK, cryptopp) may not be available in the default repositories. Enable EPEL and RPMFusion:
```sh
sudo dnf install epel-release
sudo dnf install rpmfusion-free-release
```
:::

### Arch Linux and Manjaro

```sh
sudo pacman -S \
    base-devel \
    binutils \
    boost \
    cmake \
    crypto++ \
    gd \
    gettext \
    glib2 \
    libayatana-appindicator \
    libmaxminddb \
    libupnp \
    pkg-config \
    readline \
    wxwidgets-gtk3 \
    zlib
```

### Gentoo

Gentoo installs aMule directly from Portage, so the [Build](#build) section is only needed for a git build.

```sh
# Install the release version
emerge -av net-p2p/amule
```

Select components with USE flags:

| USE flag | Component |
|---|---|
| `daemon` | Build [`amuled`](../../manual/interfaces/amuled.md) |
| `remote` | Build [`amulegui`](../../manual/interfaces/gui/amulegui.md) |
| `webserver` | Build [`amuleweb`](../../manual/interfaces/amuleweb.md) |
| `amulecmd` | Build [`amulecmd`](../../manual/interfaces/amulecmd.md) |
| `ed2k` | Build [`ed2k`](../../manual/utilities/ed2k.md) link handler |
| `nls` | [Native-language support](../translations/index.md) |
| `upnp` | [UPnP port forwarding](../../manual/configuration/upnp.md) |
| `geoip` | IP→country mapping |
| `debug` | Debug symbols ([Debugging](../debugging.md)) |

```sh
USE="daemon webserver amulecmd nls upnp geoip" emerge -av net-p2p/amule
```

To build the development version from git, install the build dependencies and then follow the [Build](#build) section:

```sh
emerge -av \
    dev-libs/boost \
    dev-libs/crypto++ \
    dev-libs/glib \
    dev-libs/libmaxminddb \
    dev-libs/libupnp \
    media-libs/libgd \
    sys-libs/readline \
    sys-libs/zlib \
    x11-libs/wxGTK
```

For debugging on Gentoo with split-debug symbols, see [Debugging](../debugging.md#gentoo-splitdebug-build).

## Build

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
    -DBUILD_CAS=YES \
    -DBUILD_WXCAS=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

This enables a common set of components. See [Build Options](index.md#build-options) for the full list, [Debug Build](index.md#debug-build) for a debug configuration, and [Installing](index.md#installing) / [Uninstalling](index.md#uninstalling) for install prefixes and removal.

## Running from the Build Directory

All binaries are placed in `build/` and can be run directly without installing:

```sh
./build/amule
./build/amuled
./build/amulecmd
```

## Desktop Integration

### Icon Cache

`cmake --install` places `org.amule.aMule.png` in `<prefix>/share/icons/hicolor/128x128/apps/`. Distribution packages (`.deb`, `.rpm`) refresh the GTK icon-theme cache via post-install scripts; a raw `cmake --install` does not. If the launcher or dock shows a generic placeholder icon instead of the aMule mule, refresh the cache manually:

```sh
gtk-update-icon-cache -f -t <prefix>/share/icons/hicolor/
```

GNOME Shell's inotify watcher usually picks up new icons on its own within a few seconds, so this is rarely necessary.

### SNI Tray Icon

The `libayatana-appindicator3` library provides the **StatusNotifierItem (SNI)** D-Bus backend for the [system tray icon](../../manual/interfaces/gui/tray-icon.md) (included in the dependency lists above). Without it, the tray icon falls back to the legacy `GtkStatusIcon` API, which GNOME Shell removed in 3.26 and wlroots compositors (Sway, Hyprland, etc.) never implemented — so the tray icon is **silently invisible** on vanilla GNOME, Fedora GNOME, and wlroots desktops.

When CMake finds the library it logs:

```
-- AppIndicator3 found: ... — tray icon uses SNI backend
```

## Troubleshooting

### `glib-2.0` not found

```
CMake Error: glib-2.0 development headers not found, but they are required
```

The `amule`, `amuled`, and `amulegui` binaries call `g_set_prgname()` to bind the Wayland `wl_app_id` (and X11 `WM_CLASS`) to the `.desktop` filename, so `libglib2.0-dev` (Debian/Ubuntu) or `glib2-devel` (Fedora) is required against wxGTK. Install it, then **delete the build directory** and re-run cmake — pkg-config results are cached:

```sh
rm -rf build
cmake -B build ...
```

### wxWidgets version too old

```
CMake Error: Could NOT find wxWidgets (Required is at least version "3.2.0")
```

aMule requires wxWidgets ≥ 3.2.0. Ubuntu 22.04 and earlier ship wxWidgets 3.0. Options:

- Use the [wxWidgets 3.2 PPA](https://launchpad.net/~sjr/+archive/ubuntu/wx32) (Ubuntu).
- Enable a third-party repository (RPMFusion on Fedora).
- Build wxWidgets 3.2 from source:

```sh
sudo apt install libgtk-3-dev
wget https://github.com/wxWidgets/wxWidgets/releases/download/v3.2.4/wxWidgets-3.2.4.tar.bz2
tar xf wxWidgets-3.2.4.tar.bz2
cd wxWidgets-3.2.4
./configure --with-gtk=3 --enable-unicode --enable-shared
make -j"$(nproc)"
sudo make install
sudo ldconfig
```

### SNI tray icon not found

```
-- AppIndicator3 not found (looked for ayatana-appindicator3-0.1 and appindicator3-0.1) — tray icon falls back to legacy GtkStatusIcon, invisible on modern GNOME/wlroots
```

This is a warning, not an error — aMule still builds and runs, but the [tray icon](../../manual/interfaces/gui/tray-icon.md) will be invisible on GNOME 3.26+ and wlroots compositors. Install `libayatana-appindicator3-dev` (Debian/Ubuntu) or `libayatana-appindicator-gtk3-devel` (Fedora) and rebuild to fix it.

### `crypto++` version too old

```
CMake Error: crypto++ version <X.Y> is too old
```

CMake requires Crypto++ ≥ 5.6. Some older distributions (Ubuntu 18.04 LTS, RHEL 7) ship an older version. Either build Crypto++ from source ([github.com/weidai11/cryptopp](https://github.com/weidai11/cryptopp)) or upgrade to a supported distribution release.

### `libupnp` not found

```
CMake Error: ENABLE_UPNP=YES but libupnp was not found.
```

You enabled `-DENABLE_UPNP=YES` (the default) but the libupnp headers and library are missing. Options:

- Install libupnp: `libupnp-dev` (Debian/Ubuntu) or `libupnp-devel` (Fedora).
- Pass `-DENABLE_UPNP=NO` to disable [UPnP port forwarding](../../manual/configuration/upnp.md).
- Pass `-DDOWNLOAD_AND_BUILD_DEPS=YES` to have CMake download and build libupnp from source (requires Git).

### `libmaxminddb` not found

```
CMake Error: ENABLE_IP2COUNTRY=YES but maxminddb.h was not found.
```

You enabled `-DENABLE_IP2COUNTRY=YES` but the libmaxminddb headers (or shared library) are missing. Either install libmaxminddb (`libmaxminddb-dev` on Debian/Ubuntu, `libmaxminddb-devel` on Fedora) or pass `-DENABLE_IP2COUNTRY=NO`.
