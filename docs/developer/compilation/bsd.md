---
id: bsd
title: Building on BSD
---

This page is a self-contained guide to building aMule from source on BSD: install the dependencies for your system, then build. The general [Compilation](index.md) page documents the full CMake workflow and the complete list of [build options](index.md#build-options). For other platforms, see [Windows](windows.md), [macOS](macos.md), and [Linux](linux.md). To install a pre-built package from the system repository instead of compiling, see the [Installation](../../manual/installation/index.md) page.

FreeBSD and OpenBSD are the most commonly used BSD platforms with aMule. NetBSD and DragonFlyBSD follow similar patterns using their respective package managers.

## Install Dependencies

Install the packages for your system. Then continue with [Build](#build) below — the build commands are identical across BSD variants; only the package names differ.

### FreeBSD

```sh
pkg install \
    boost-libs \
    cmake \
    cryptopp \
    gd \
    gettext-runtime \
    gettext-tools \
    git \
    glib \
    libmaxminddb \
    libupnp \
    pkgconf \
    readline \
    wx32-gtk3
```

`gettext-runtime` provides `libintl` (linked directly by aMule); `gettext-tools` provides `msgfmt`/`msgmerge`, required when `ENABLE_NLS=YES`.

### OpenBSD

```sh
pkg_add \
    boost \
    cmake \
    cryptopp \
    gd \
    gettext-runtime \
    gettext-tools \
    git \
    glib2 \
    libmaxminddb \
    libupnp \
    pkgconf \
    readline \
    wxWidgets
```

Like FreeBSD, OpenBSD splits gettext into `gettext-runtime` (the `libintl` runtime) and `gettext-tools` (`msgfmt`/`msgmerge`).

### NetBSD

```sh
pkgin install \
    boost-libs \
    cmake \
    cryptopp \
    gd \
    gettext-tools \
    git \
    glib2 \
    libmaxminddb \
    libupnp \
    pkgconf \
    readline \
    wxGTK32
```

On NetBSD, `gettext-tools` pulls in `gettext-lib` (which provides `libintl`) automatically.

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
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
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

## BSD-Specific Notes

### Parallel builds: `sysctl` instead of `nproc`

`nproc` is Linux-specific and not available on BSD. Use `sysctl -n hw.ncpu` to get the logical CPU count for the `-j` flag:

```sh
cmake --build build -j"$(sysctl -n hw.ncpu)"
```

### NLS and `libintl`

On BSD, `libintl` is **not** part of the base C library (unlike glibc on GNU/Linux, where `gettext` is integrated into `libc`). aMule links `libintl` directly to provide [native-language support](../translations/index.md). When `ENABLE_NLS=YES`, CMake locates it through `find_package(Intl)`; if missing, the build fails:

```
CMake Error: ENABLE_NLS=YES but the libintl headers/library were not found.
Install GNU gettext's runtime (*BSD: gettext-runtime) …
```

**FreeBSD** and **OpenBSD** split gettext into `gettext-runtime` (the `libintl` runtime, needed for linking) and `gettext-tools` (`msgfmt`/`msgmerge`, needed for compiling `.mo` files); install both. On **NetBSD**, `gettext-tools` pulls in `gettext-lib` (which provides `libintl`) automatically. If translated messages are not needed, disable NLS with `-DENABLE_NLS=NO`.

### `glib-2.0` is required with wxGTK

aMule calls `g_set_prgname()` to bind the Wayland `wl_app_id` / X11 `WM_CLASS` to its `.desktop` entry, compiled whenever the toolkit is wxGTK and the platform is not macOS (`#if defined(__WXGTK__) && !defined(__APPLE__)`). The BSD wxWidgets ports (`wx32-gtk3` on FreeBSD/NetBSD, `wxWidgets` on OpenBSD) are all wxGTK builds, so `glib-2.0` **is** needed when building any of the [`amule`](../../manual/interfaces/gui/amule.md) (monolithic), [`amuled`](../../manual/interfaces/amuled.md), or [`amulegui`](../../manual/interfaces/gui/amulegui.md) targets. Install it with `pkg install glib` (FreeBSD), `pkg_add glib2` (OpenBSD), or `pkgin install glib2` (NetBSD).

### Headers and libraries in `/usr/local`

BSD systems install third-party headers and libraries under `/usr/local/include` and `/usr/local/lib`, which are on the default compiler and linker search paths. CMake and `pkg-config` discover packages installed via `pkg`, `pkg_add`, or pkgsrc automatically — no extra `CPPFLAGS`, `LDFLAGS`, or `CMAKE_PREFIX_PATH` are needed.

## Troubleshooting

### `_libintl_dgettext` undefined symbol

```
undefined reference to `_libintl_dgettext'
```

`ENABLE_NLS=YES` but `libintl` is not installed. Install the gettext runtime and delete the build directory before re-configuring (pkg-config results are cached):

```sh
pkg install gettext-runtime   # FreeBSD
rm -rf build
cmake -B build -DENABLE_NLS=YES ...
```

### CMake cannot find `msgfmt` or `msgmerge`

```
CMake Error: ENABLE_NLS=YES but msgfmt and/or msgmerge were not found.
```

These tools are in `gettext-tools` (FreeBSD) or `gettext` (OpenBSD/NetBSD). Install them and re-run cmake.

### wxWidgets version too old

aMule requires wxWidgets ≥ 3.2.0. Verify and upgrade the installed version:

```sh
pkg info wx32-gtk3      # FreeBSD
pkg upgrade wx32-gtk3   # FreeBSD
```

### CMake cannot find `wx-config`

If wxWidgets is installed but cmake cannot locate `wx-config`, pass the path explicitly. On FreeBSD with `wx32-gtk3`, the script may be named `wxgtk32u-3.2-config`:

```sh
cmake -B build \
    -DwxWidgets_CONFIG_EXECUTABLE=/usr/local/bin/wxgtk32u-3.2-config \
    ...
```

### `glib-2.0` development headers not found

```
CMake Error: glib-2.0 development headers not found, but they are required to build
amule (monolithic), amuled, or amulegui against wxGTK …
```

Install glib (`pkg install glib` on FreeBSD, `pkg_add glib2` on OpenBSD, `pkgin install glib2` on NetBSD) and re-configure. `pkg_check_modules` runs only at configure time, so delete the build directory first:

```sh
rm -rf build
cmake -B build ...
```

`pkg-config` (`pkgconf`) must also be installed, since cmake locates glib through it.

### `libupnp` not found

```
CMake Error: ENABLE_UPNP=YES but libupnp was not found.
```

Either disable UPnP (`-DENABLE_UPNP=NO`) or let CMake build it from source (`-DDOWNLOAD_AND_BUILD_DEPS=YES`).

### Crypto++ version too old

CMake requires Crypto++ ≥ 5.6. Verify with `pkg info cryptopp` (FreeBSD). If too old, build Crypto++ from source: [github.com/weidai11/cryptopp](https://github.com/weidai11/cryptopp).
