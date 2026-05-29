---
id: windows
title: Building on Windows
---

aMule is built on Windows using **MSYS2** with the **MINGW64** toolchain and **Ninja** as the build generator. This is the configuration used by the CI pipeline and produces the official Windows release. The general [Compilation](index.md) page documents the full CMake workflow and all build options.

## Prerequisites

### Install MSYS2

Download and install MSYS2 from [https://www.msys2.org/](https://www.msys2.org/). Follow the first-run update instructions on the website.

After the base installation, open the **MSYS2 MINGW64** terminal (not MSYS2 MSYS or UCRT64) for all subsequent steps.

### Install Dependencies

In the MSYS2 MINGW64 terminal:

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
    mingw-w64-x86_64-pupnp \
    mingw-w64-x86_64-readline \
    mingw-w64-x86_64-toolchain \
    mingw-w64-x86_64-wxwidgets3.2-msw \
    mingw-w64-x86_64-zlib
```

The `mingw-w64-x86_64-toolchain` group includes GCC, binutils, and all associated tools.

## Build

In the MSYS2 MINGW64 terminal, clone the repository and configure with CMake using the **Ninja** generator:

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -G Ninja \
    -DCMAKE_BUILD_TYPE=Release \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DBUILD_WEBSERVER=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build
```

The `-G Ninja` flag selects the Ninja build generator, which is faster than the default `make`-based generator for incremental builds.

To use all available CPU cores:

```sh
cmake --build build -- -j$(nproc)
```

### Debug Build

```sh
cmake -B build \
    -G Ninja \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_TESTING=YES

cmake --build build
```

### Full Build (All Components)

```sh
cmake -B build \
    -G Ninja \
    -DCMAKE_BUILD_TYPE=Release \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DBUILD_ALC=YES \
    -DBUILD_ALCC=YES \
    -DBUILD_WXCAS=YES \
    -DBUILD_TESTING=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build
```

## Running the Tests

```sh
ctest --test-dir build --output-on-failure --timeout 10
```

## Running the Built Binaries

The compiled `.exe` files are placed in `build/`. Run them directly from the MSYS2 MINGW64 terminal:

```sh
./build/amule.exe
./build/amuled.exe
./build/amulecmd.exe
```

To run binaries outside the MSYS2 terminal (e.g. by double-clicking in Windows Explorer), the MINGW64 DLLs must be available. Either:

1. Add `C:\msys64\mingw64\bin` to the Windows system `PATH`.
2. Or copy the required DLLs next to the executable. The packaging scripts in `packaging/windows/build.sh` handle this automatically for release builds.

## Packaging (Creating a Windows Installer)

The `packaging/windows/` directory contains scripts that produce the official Windows installer:

```sh
# In the MSYS2 MINGW64 terminal
cd packaging/windows
./build.sh
```

The script copies the built binaries, resolves and bundles all required DLLs, and produces a distributable installer or archive. See `packaging/windows/README.md` and `packaging/windows/versions.env` for configuration.

For signing the release binary:

```sh
./sign.sh
```

## Common Issues

### `winsock2.h` Warnings During Build

You may see warnings like:

```
winsock2.h:15: #warning Please include winsock2.h before windows.h
```

This is a known interaction between the MSYS2 MINGW64 `winsock2.h` header and wxWidgets 3.2's `wrapwin.h`. CMake defines `WIN32_LEAN_AND_MEAN` to suppress it (this is done automatically in `CMakeLists.txt`). If you still see the warning, verify that `WIN32_LEAN_AND_MEAN` is being applied. The warning is harmless and does not indicate a build problem.

### `crypto++` not found

The MSYS2 package is `mingw-w64-x86_64-crypto++`. Verify it is installed:

```sh
pacman -Q mingw-w64-x86_64-crypto++
```

### CMake Cannot Find Ninja

Install the Ninja package:

```sh
pacman -S mingw-w64-x86_64-ninja
```

Verify:

```sh
which ninja
ninja --version
```

### `pkg-config` not found

Install the MINGW64 version:

```sh
pacman -S mingw-w64-x86_64-pkgconf
```

Do not use the generic MSYS2 `pkg-config` — it does not know about the MINGW64 package paths.

### Build Directory Must Be Deleted After a Failed Configure

CMake caches configure results. If a configure fails partway through (e.g. because a package was missing), install the missing package and delete the build directory before re-running cmake:

```sh
rm -rf build
cmake -B build -G Ninja ...
```

## Notes on the MSYS2 MINGW64 Environment

All commands must be run inside the **MSYS2 MINGW64** shell. Do not use:

- **MSYS2 MSYS** — uses a different runtime and does not find MINGW64 packages.
- **MSYS2 UCRT64** — uses the Windows Universal CRT instead of MSVCRT; package names differ (`mingw-w64-ucrt-x86_64-*`).
- **Command Prompt** or **PowerShell** — these do not have access to the MSYS2 build tools.

The CI pipeline uses the [msys2/setup-msys2](https://github.com/msys2/setup-msys2) GitHub Action with `msystem: MINGW64` to set up an identical environment.
