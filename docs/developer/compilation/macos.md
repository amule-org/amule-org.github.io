---
id: macos
title: Building on macOS
---

This page provides macOS-specific instructions for installing build dependencies and compiling aMule from source using [Homebrew](https://brew.sh/). The general [Compilation](index.md) page documents the full CMake workflow and all build options.

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

Homebrew on Apple Silicon installs into `/opt/homebrew` instead of `/usr/local`. This prefix is not on the default compiler and linker search paths, so you must export environment variables before running cmake:

```sh
BREW_PREFIX=$(brew --prefix)

export CPATH="$BREW_PREFIX/include"
export LIBRARY_PATH="$BREW_PREFIX/lib"
export PKG_CONFIG_PATH="$BREW_PREFIX/lib/pkgconfig:$(brew --prefix gd)/lib/pkgconfig:$(brew --prefix libupnp)/lib/pkgconfig:$(brew --prefix gettext)/lib/pkgconfig"
```

`gettext` is **keg-only** on macOS (not linked into `/opt/homebrew/bin` by default) because it conflicts with the BSD gettext tools included with Xcode. Add it to `PATH` explicitly so cmake can find `msgfmt` for the NLS probe:

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

cmake --build build -j"$(nproc)"
```

### NLS (Translations) on macOS

`ENABLE_NLS` is `YES` by default. However, `argz.h` is a glibc-only header not provided by macOS or Homebrew. CMake detects this and automatically disables NLS on macOS — no action needed. The English strings will always be displayed.

If you explicitly want NLS disabled:

```sh
cmake -B build -DENABLE_NLS=NO ...
```

### Debug Build

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES

cmake --build build -j"$(nproc)"
```

## Install

```sh
sudo cmake --install build
```

This installs to `/usr/local` by default. To install to a custom prefix (e.g. to avoid `sudo`):

```sh
cmake --install build --prefix="$HOME/.local"
```

## Packaging (Creating a macOS App Bundle / DMG)

The `packaging/macos/` directory contains build scripts for creating distributable `.app` bundles and `.dmg` disk images. These scripts are used by the CI release pipeline.

```sh
# Example: build a release DMG
cd packaging/macos
./build.sh
```

For signing and notarization (required for distribution outside the App Store):

```sh
./sign-and-notarize.sh
```

Refer to `packaging/macos/README.md` and `packaging/macos/versions.env` for the environment variables and codesigning certificate setup.

## Common Issues

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

aMule requires wxWidgets ≥ 3.2.0. Verify the Homebrew formula:

```sh
brew info wxwidgets
```

If the version is too old, upgrade:

```sh
brew upgrade wxwidgets
```

### `pkg-config` cannot find `libupnp` or `gd`

On Apple Silicon, add the formula-specific `lib/pkgconfig` paths:

```sh
export PKG_CONFIG_PATH="$(brew --prefix)/lib/pkgconfig:$(brew --prefix libupnp)/lib/pkgconfig:$(brew --prefix gd)/lib/pkgconfig"
```

### CMake cannot find `msgfmt` (NLS probe fails)

`gettext` is keg-only and not on `$PATH` by default:

```sh
export PATH="$(brew --prefix gettext)/bin:$PATH"
cmake -B build ...
```

### Build Fails with `winsock2.h` Warning

This does not apply to macOS. This warning is specific to the Windows build.

## Running from the Build Directory

All binaries are placed in `build/` and can be run directly without installing:

```sh
./build/amule
./build/amuled
./build/amulecmd
```
