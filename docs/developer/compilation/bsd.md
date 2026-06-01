---
id: bsd
title: Building on BSD
---

This page provides BSD-specific instructions for installing build dependencies and compiling aMule from source. The general [Compilation](index.md) page documents the full CMake workflow and all [build options](index.md#build-options). To install a pre-built package from the system repository instead of compiling, see the [Installation](../../manual/installation/index.md) page.

FreeBSD and OpenBSD are the most commonly used BSD platforms with aMule. NetBSD and DragonFlyBSD follow similar patterns using their respective package managers. The instructions below use FreeBSD as the primary reference, with notes for OpenBSD and NetBSD where package names or procedures differ.

## Building from Source

### FreeBSD

#### Install Dependencies

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

`gettext-runtime` provides `libintl`, which aMule links directly. `gettext-tools` provides `msgfmt` and `msgmerge`, required when `ENABLE_NLS=YES` to compile `.po` translation catalogs at build time.

#### Clone and Build

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

### OpenBSD

#### Install Dependencies

```sh
pkg_add \
    boost \
    cmake \
    cryptopp \
    gd \
    gettext \
    git \
    glib2 \
    libmaxminddb \
    pkgconf \
    readline \
    wxWidgets
```

:::note UPnP on OpenBSD
`libupnp` may not be available in the OpenBSD package set. If [UPnP](../../manual/configuration/upnp.md) support is not needed, pass `-DENABLE_UPNP=NO`. Alternatively, pass `-DDOWNLOAD_AND_BUILD_DEPS=YES` to have CMake download and build `libupnp` from source automatically.
:::

#### Clone and Build

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=NO \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
sudo cmake --install build
```

### NetBSD

#### Install Dependencies (pkgin)

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

#### Clone and Build

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
sudo cmake --install build
```

## BSD-Specific Notes

### Parallel builds: `sysctl` instead of `nproc`

`nproc` is Linux-specific and not available on BSD systems. Use `sysctl -n hw.ncpu` to get the logical CPU count and pass it to the `-j` flag:

```sh
cmake --build build -j"$(sysctl -n hw.ncpu)"
```

### NLS and `libintl` on BSD

On BSD systems, `libintl` is **not** part of the base C library — unlike GNU/Linux (glibc), where `gettext` is integrated into `libc`. aMule links `libintl` directly from `Parser.cpp` and the web server code to provide [native-language support](../translations.md). When `ENABLE_NLS=YES`, CMake locates `libintl` through `find_package(Intl)`. If `libintl` is missing, the build fails:

```
CMake Error: ENABLE_NLS=YES but the libintl headers/library were not found.
Install GNU gettext's runtime (*BSD: gettext-runtime) …
```

**FreeBSD** splits the package into:
- `gettext-runtime` — the `libintl` runtime library (needed for linking)
- `gettext-tools` — the `msgfmt` and `msgmerge` build tools (needed for compiling `.mo` files)

Install both when building with NLS:

```sh
pkg install gettext-runtime gettext-tools
```

**OpenBSD** and **NetBSD** ship them together in `gettext`.

If translated messages are not needed, disable NLS entirely:

```sh
cmake -B build -DENABLE_NLS=NO ...
```

### `glib-2.0` is required with wxGTK

aMule calls `g_set_prgname()` to bind the Wayland `wl_app_id` / X11 `WM_CLASS` to its `.desktop` entry. This code path is **not** gated by operating system — it is compiled whenever the wxWidgets toolkit is wxGTK and the platform is not macOS (`#if defined(__WXGTK__) && !defined(__APPLE__)`).

The BSD wxWidgets ports (`wx32-gtk3` on FreeBSD/NetBSD, `wxWidgets` on OpenBSD) are all wxGTK builds, so `glib-2.0` **is** needed on BSD when building any of the [`amule`](../../manual/interfaces/gui/amule.md) (monolithic), [`amuled`](../../manual/interfaces/amuled.md), or [`amulegui`](../../manual/interfaces/gui/amulegui.md) targets. CMake aborts at configure time if it is missing:

```
CMake Error: glib-2.0 development headers not found, but they are required to build
amule (monolithic), amuled, or amulegui against wxGTK …
```

Install it with `pkg install glib` (FreeBSD), `pkg_add glib2` (OpenBSD), or `pkgin install glib2` (NetBSD). Only macOS (Cocoa toolkit) is exempt.

### Headers and libraries in `/usr/local`

BSD systems install third-party headers and libraries under `/usr/local/include` and `/usr/local/lib`. These paths are on the default compiler and linker search paths. CMake and `pkg-config` discover packages installed via `pkg`, `pkg_add`, or pkgsrc automatically. No extra `CPPFLAGS`, `LDFLAGS`, or `CMAKE_PREFIX_PATH` are needed.

## Common Issues

### `_libintl_dgettext` undefined symbol

This linker error occurs when `ENABLE_NLS=YES` but `libintl` is not installed:

```
undefined reference to `_libintl_dgettext'
```

Install the gettext runtime and delete the build directory before re-configuring (pkg-config results are cached):

```sh
pkg install gettext-runtime   # FreeBSD
rm -rf build
cmake -B build -DENABLE_NLS=YES ...
```

### CMake cannot find `msgfmt` or `msgmerge`

```
CMake Error: ENABLE_NLS=YES but msgfmt and/or msgmerge were not found.
```

These tools are in `gettext-tools` (FreeBSD) or `gettext` (OpenBSD/NetBSD). Install them and re-run cmake:

```sh
pkg install gettext-tools   # FreeBSD
```

### wxWidgets version too old

aMule requires wxWidgets ≥ 3.2.0. CMake calls `find_package(wxWidgets 3.2.0 REQUIRED ...)`, so an older install fails configuration with the standard CMake version-mismatch error (reporting the version found versus the 3.2.0 required).

Verify the installed version:

```sh
pkg info wx32-gtk3   # FreeBSD
```

If an older version is installed, upgrade:

```sh
pkg upgrade wx32-gtk3   # FreeBSD
```

### CMake cannot find `wx-config`

If wxWidgets is installed but cmake cannot locate `wx-config`, pass the executable path explicitly:

```sh
cmake -B build \
    -DwxWidgets_CONFIG_EXECUTABLE=/usr/local/bin/wx-config \
    ...
```

On FreeBSD with `wx32-gtk3`, the config script may be named `wxgtk32u-3.2-config`:

```sh
cmake -B build \
    -DwxWidgets_CONFIG_EXECUTABLE=/usr/local/bin/wxgtk32u-3.2-config \
    ...
```

### `libupnp` not found

```
CMake Error: ENABLE_UPNP=YES but libupnp was not found.
```

Either disable UPnP or let CMake build it from source:

```sh
# Disable UPnP
cmake -B build -DENABLE_UPNP=NO ...

# Or build libupnp from source automatically
cmake -B build -DDOWNLOAD_AND_BUILD_DEPS=YES ...
```

### `glib-2.0` development headers not found

When building a wxGTK target (`amule`, `amuled`, or `amulegui`) without the glib development headers:

```
CMake Error: glib-2.0 development headers not found, but they are required to build
amule (monolithic), amuled, or amulegui against wxGTK …
```

Install glib and re-configure. `pkg_check_modules` only runs at configure time, so delete the build directory before re-running cmake:

```sh
pkg install glib       # FreeBSD  (pkg_add glib2 on OpenBSD, pkgin install glib2 on NetBSD)
rm -rf build
cmake -B build ...
```

`pkg-config` (`pkgconf`) must also be installed, since cmake locates glib through it.

### Crypto++ version too old

CMake requires Crypto++ ≥ 5.6. Verify the version:

```sh
pkg info cryptopp   # FreeBSD
```

If the package is too old, build Crypto++ from source: [https://github.com/weidai11/cryptopp](https://github.com/weidai11/cryptopp)
