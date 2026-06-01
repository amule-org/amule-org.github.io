---
id: macos
title: Building on macOS
---

This page is a self-contained guide to building aMule from source on macOS using [Homebrew](https://brew.sh/). The general [Compilation](index.md) page documents the full CMake workflow and the complete list of [build options](index.md#build-options). For other platforms, see [Windows](windows.md), [Linux](linux.md), and [BSD](bsd.md).

aMule targets **macOS ≥ 11.0 (Big Sur)** — the first release that runs natively on Apple Silicon.

## Prerequisites

### Install Xcode Command Line Tools

```sh
xcode-select --install
```

### Install Homebrew

If Homebrew is not already installed:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

## Install Dependencies

```sh
brew update
brew install \
    boost \
    cryptopp \
    gd \
    gettext \
    libmaxminddb \
    libupnp \
    pkg-config \
    wxwidgets
```

### Apple Silicon (M1 / M2 / M3)

Homebrew on Apple Silicon installs into `/opt/homebrew` instead of `/usr/local`. This prefix is not on the default compiler and linker search paths, so export these environment variables before running cmake:

```sh
BREW_PREFIX=$(brew --prefix)

export CPATH="$BREW_PREFIX/include"
export LIBRARY_PATH="$BREW_PREFIX/lib"
export PKG_CONFIG_PATH="$BREW_PREFIX/lib/pkgconfig:$(brew --prefix gd)/lib/pkgconfig:$(brew --prefix libupnp)/lib/pkgconfig:$(brew --prefix gettext)/lib/pkgconfig"
```

`gettext` is **keg-only** on macOS (not linked into `/opt/homebrew/bin` by default) because it conflicts with the BSD gettext tools included with Xcode. CMake's NLS module already searches the keg automatically (`/opt/homebrew/opt/gettext/bin` and `/usr/local/opt/gettext/bin`), so this normally needs no action. If you installed `gettext` elsewhere, add it to `PATH` so cmake can find `msgfmt`/`msgmerge`:

```sh
export PATH="$(brew --prefix gettext)/bin:$PATH"
```

You can add these exports to `~/.zshrc` (or `~/.bash_profile`) to make them permanent.

### Intel Macs

On Intel Macs, Homebrew installs to `/usr/local`, which is already on the default search paths. No extra environment variables are needed.

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
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build -j"$(sysctl -n hw.ncpu)"
sudo cmake --install build
```

This enables a common set of components. See [Build Options](index.md#build-options) for the full list, [Debug Build](index.md#debug-build) for a debug configuration, and [Installing](index.md#installing) / [Uninstalling](index.md#uninstalling) for install prefixes (e.g. `cmake --install build --prefix="$HOME/.local"` to avoid `sudo`) and removal.

### NLS (Translations) on macOS

`ENABLE_NLS` is `YES` by default and NLS **works on macOS** — translation is delegated to `wxLocale`, which links `libintl` through wxWidgets. As long as the `gettext` formula is installed (it is in the dependency list above), the build produces localized binaries. CMake finds the keg-only `gettext` tools automatically, so no manual `PATH` export is normally required.

> CMake probes glibc-only headers such as `argz.h` for completeness, but does **not** gate NLS on them — aMule does not include those headers. Localization depends only on `gettext`/`libintl` being available.

If `ENABLE_NLS=YES` but `msgfmt`/`msgmerge` or `libintl` cannot be found, the configure step **fails with a fatal error** rather than silently disabling translations. Either install `gettext`, or disable NLS with `-DENABLE_NLS=NO`. See the [Translations](../translations.md) guide for how aMule's localization catalogs are maintained.

## Running from the Build Directory

All binaries are placed in `build/` and can be run directly without installing:

```sh
./build/amule
./build/amuled
./build/amulecmd
```

For how to use each binary, see the User Manual: [amuled](../../manual/interfaces/amuled.md) (daemon), [amulecmd](../../manual/interfaces/amulecmd.md) (command-line client), and [amuleweb](../../manual/interfaces/amuleweb.md) (web interface).

## Packaging (App Bundle / DMG)

The `packaging/macos/` directory contains the script used by the CI release pipeline to build a distributable Universal2 (`x86_64;arm64`) `.app` bundle and package it into a `.dmg`. Run it **from the repository root**:

```sh
# from the repo root, on macOS — result: ./dist/aMule-<version>-macOS.dmg
packaging/macos/build.sh
```

The script needs `dylibbundler` in addition to the build dependencies (`brew install dylibbundler`); it bundles all non-system dylibs into the `.app` so it runs on a clean macOS box without Homebrew.

By default the `.dmg` ships **unsigned**. To sign and notarize (required for distribution outside the App Store), export the codesigning/notary environment variables and run the `sign` subcommand:

```sh
export APPLE_DEVELOPER_ID="Developer ID Application: Name (TEAMID)"
export APPLE_TEAM_ID=ABCDE12345
export APPLE_NOTARY_USER=apple-id@example.com
export APPLE_NOTARY_PASS=xxxx-xxxx-xxxx-xxxx
export APPLE_CERT_P12_BASE64=$(base64 -i path/to/cert.p12)
export APPLE_CERT_PASSWORD=cert-password

packaging/macos/build.sh sign
```

If any of those variables is unset, the sign step exits silently and the unsigned `.dmg` is left in place. Refer to `packaging/macos/README.md` for the full recipe and `packaging/macos/versions.env` for the deployment target and architecture pins.

## Troubleshooting

### `cryptopp` not found

CMake's custom `cmake/cryptopp.cmake` module uses `check_include_file_cxx` to locate the Crypto++ headers. This function does not honour `CMAKE_PREFIX_PATH`, so it falls back to `CPATH`. Make sure `CPATH` is set to the Homebrew prefix:

```sh
export CPATH="$(brew --prefix)/include"
```

If the error persists, verify the library is installed and linked:

```sh
brew info cryptopp
ls "$(brew --prefix)/include/cryptopp/"
```

### `wxWidgets` version not found

aMule requires wxWidgets ≥ 3.2.0. Verify the Homebrew formula, and upgrade if too old:

```sh
brew info wxwidgets
brew upgrade wxwidgets
```

### `pkg-config` cannot find `libupnp` or `gd`

On Apple Silicon, add the formula-specific `lib/pkgconfig` paths:

```sh
export PKG_CONFIG_PATH="$(brew --prefix)/lib/pkgconfig:$(brew --prefix libupnp)/lib/pkgconfig:$(brew --prefix gd)/lib/pkgconfig"
```

### CMake cannot find `msgfmt`/`msgmerge` (NLS)

CMake searches the keg-only `gettext` automatically, so this is rare. It can still happen if `gettext` is installed in a non-standard location or not installed at all. Either install it (`brew install gettext`) or add it to `$PATH` explicitly:

```sh
export PATH="$(brew --prefix gettext)/bin:$PATH"
cmake -B build ...
```

If you don't need translations, configure with `-DENABLE_NLS=NO` instead.
