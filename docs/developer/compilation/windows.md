---
id: windows
title: Building on Windows
---

This page is a self-contained guide to building aMule from source on Windows using **MSYS2** with the **MINGW64** toolchain and **Ninja** as the build generator. The general [Compilation](index.md) page documents the full CMake workflow and the complete list of [build options](index.md#build-options). For other platforms, see [macOS](macos.md), [Linux](linux.md), and [BSD](bsd.md).

## Prerequisites

### Install MSYS2

Download and install MSYS2 from [https://www.msys2.org/](https://www.msys2.org/). Follow the first-run update instructions on the website.

After the base installation, open the **MSYS2 MINGW64** terminal (not MSYS2 MSYS or UCRT64) for all subsequent steps.

The Windows build requires CMake ≥ 3.10, wxWidgets ≥ 3.2.0, Boost ≥ 1.70, and crypto++ ≥ 5.6 — the MSYS2 packages below already satisfy these.

## Install Dependencies

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

The `-G Ninja` flag selects the Ninja build generator, which is faster than the default `make`-based generator for incremental builds. To use all available CPU cores:

```sh
cmake --build build -- -j$(nproc)
```

This enables a common set of components. See [Build Options](index.md#build-options) for the full list. To build every component, add the remaining `BUILD_*`/`ENABLE_*` flags (e.g. `-DBUILD_REMOTEGUI=YES -DBUILD_ALC=YES -DBUILD_ALCC=YES -DBUILD_WXCAS=YES -DENABLE_NLS=YES`) or use `-DBUILD_EVERYTHING=YES`.

### Debug Build

```sh
cmake -B build \
    -G Ninja \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_TESTING=YES

cmake --build build
```

The `Debug` build type retains full symbol information. See [Debugging](../debugging.md) for how to use it.

## Running the Tests

Build with `-DBUILD_TESTING=YES` (as in the [Debug Build](#debug-build) above), then run:

```sh
ctest --test-dir build --output-on-failure --timeout 10
```

See [Testing](../testing.md) for the full test suite documentation.

## Running the Built Binaries

The compiled `.exe` files are placed in `build/`. Run them directly from the MSYS2 MINGW64 terminal:

```sh
./build/amule.exe
./build/amuled.exe
./build/amulecmd.exe
```

Which executables are produced depends on the `BUILD_*` options you enabled: [`amule`](../../manual/interfaces/gui/amule.md) (GUI), [`amuled`](../../manual/interfaces/amuled.md) (daemon), [`amulegui`](../../manual/interfaces/gui/amulegui.md) (remote GUI), [`amulecmd`](../../manual/interfaces/amulecmd.md) (CLI), [`amuleweb`](../../manual/interfaces/amuleweb.md) (web interface), and the [`ed2k`](../../manual/utilities/ed2k.md) link handler.

To run binaries outside the MSYS2 terminal (e.g. by double-clicking in Windows Explorer), the MINGW64 DLLs must be available. Either:

1. Add `C:\msys64\mingw64\bin` to the Windows system `PATH`.
2. Or copy the required DLLs next to the executable. The packaging scripts in `packaging/windows/build.sh` handle this automatically for release builds.

## Notes on the MSYS2 MINGW64 Environment

All commands must be run inside the **MSYS2 MINGW64** shell. Do not use:

- **MSYS2 MSYS** — uses a different runtime and does not find MINGW64 packages.
- **MSYS2 UCRT64** — uses the Windows Universal CRT instead of MSVCRT; package names differ (`mingw-w64-ucrt-x86_64-*`).
- **Command Prompt** or **PowerShell** — these do not have access to the MSYS2 build tools.

## Packaging (Portable .zip and Installer)

If you want a redistributable build rather than running the binaries from the build tree, the `packaging/windows/` directory contains helper scripts that produce a portable `.zip` and an NSIS installer. Unlike the manual build above, these scripts use the **MinGW Makefiles** generator (not Ninja — Ninja crashes with `0xc0000142` inside CMake's `try_compile` inner project on this toolchain), build into `build-windows-<arch>/`, and disable the test build (`BUILD_TESTING=NO`).

The scripts support two architectures, selected by the `WINDOWS_MSYSTEM` value in `packaging/windows/versions.env` (default `CLANGARM64`):

| MSYS2 environment | Architecture |
|---|---|
| `MINGW64` | x64 |
| `CLANGARM64` | ARM64 (Windows on ARM) |

`build.sh` takes a subcommand (`build` is the default):

```sh
# In the matching MSYS2 shell (MINGW64 for x64, CLANGARM64 for ARM64)

# 1. Portable .zip — the default action
packaging/windows/build.sh
# → dist/aMule-<version>-Windows-<arch>.zip

# 2. NSIS installer — wraps the portable tree from step 1
packaging/windows/build.sh installer
# → dist/aMule-<version>-Windows-Setup-<arch>.exe

# 3. Code-sign the produced artifacts (see below)
packaging/windows/build.sh sign
```

The `build` step configures CMake, compiles, installs a portable tree (`bin/{amule,amuled,amulegui,amulecmd,ed2k}.exe` plus the MSYS2 DLLs resolved automatically via `file(GET_RUNTIME_DEPENDENCIES)` and a `ca-bundle.crt` for libcurl HTTPS), and zips it.

To build the x64 release from a MINGW64 shell, either set `WINDOWS_MSYSTEM=MINGW64` in `versions.env` or override it inline:

```sh
WINDOWS_MSYSTEM=MINGW64 packaging/windows/build.sh
```

The `installer` subcommand requires `makensis` (NSIS 3.x) on `PATH`. See `packaging/windows/README.md` for installer details and remote (SSH) build instructions.

### Signing

Signing is driven through `build.sh sign` (which calls `sign.sh` internally). It signs every `.exe`/`.dll` inside the portable `.zip` and the installer `.exe` when present. It requires two environment variables; if either is unset, signing is a silent no-op (releases ship unsigned by default):

```sh
export WIN_CERT_PFX_BASE64=$(base64 -w0 path/to/cert.pfx)
export WIN_CERT_PASSWORD=cert-password

packaging/windows/build.sh sign
```

See `packaging/windows/versions.env` for the full list of signing variables.

## Troubleshooting

### `winsock2.h` Warnings During Build

You may see warnings like:

```
winsock2.h:15: #warning Please include winsock2.h before windows.h
```

This is a known interaction between the MSYS2 MINGW64 `winsock2.h` header and wxWidgets 3.2's `wrapwin.h`. CMake defines `WIN32_LEAN_AND_MEAN` to suppress it (done automatically in `CMakeLists.txt`). The warning is harmless and does not indicate a build problem.

### `crypto++` not found

The MSYS2 package is `mingw-w64-x86_64-crypto++`. Verify it is installed:

```sh
pacman -Q mingw-w64-x86_64-crypto++
```

### CMake Cannot Find Ninja

Install the Ninja package and verify:

```sh
pacman -S mingw-w64-x86_64-ninja
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
