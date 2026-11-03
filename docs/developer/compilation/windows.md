---
id: windows
title: Building on Windows
---

This page is a self-contained guide to building aMule from source on Windows using **MSYS2** with the **CLANG64** toolchain (x64) and **Ninja** as the build generator. The general [Compilation](index.md) page documents the full CMake workflow and the complete list of [build options](index.md#build-options). For other platforms, see [macOS](macos.md), [Linux](linux.md), and [BSD](bsd.md).

## Prerequisites

### Install MSYS2

Download and install MSYS2 from [https://www.msys2.org/](https://www.msys2.org/). Follow the first-run update instructions on the website.

After the base installation, open the **MSYS2 CLANG64** terminal for all subsequent steps. On Windows on ARM, use **MSYS2 CLANGARM64** instead (see [Building for ARM64](#building-for-arm64)).

The Windows build requires CMake ≥ 3.12, wxWidgets ≥ 3.2.0, Boost ≥ 1.70, and crypto++ ≥ 8.1 — the MSYS2 packages below already satisfy these.

:::note
**MINGW64** is no longer supported: MSYS2 deprecated it and no longer packages wxWidgets for it. An existing MINGW64 setup cannot build aMule; switch to the CLANG64 shell and install the packages below.
:::

## Install Dependencies

In the MSYS2 CLANG64 terminal:

```sh
pacman -Syu
pacman -S \
    mingw-w64-clang-x86_64-boost \
    mingw-w64-clang-x86_64-cmake \
    mingw-w64-clang-x86_64-crypto++ \
    mingw-w64-clang-x86_64-gettext \
    mingw-w64-clang-x86_64-libgd \
    mingw-w64-clang-x86_64-libmaxminddb \
    mingw-w64-clang-x86_64-ninja \
    mingw-w64-clang-x86_64-pkgconf \
    mingw-w64-clang-x86_64-pupnp \
    mingw-w64-clang-x86_64-readline \
    mingw-w64-clang-x86_64-toolchain \
    mingw-w64-clang-x86_64-wxwidgets3.3-msw \
    mingw-w64-clang-x86_64-zlib
```

The `mingw-w64-clang-x86_64-toolchain` group includes Clang, LLD, and all associated tools. CI installs its own list (`cmake_mingw_w64_deps` in `.github/workflows/ccpp.yml`): it builds libupnp from source instead of installing `pupnp`, and adds packages for optional features such as QUIC.

### Building for ARM64

On Windows on ARM, work in the **MSYS2 CLANGARM64** terminal and replace the `mingw-w64-clang-x86_64-` prefix with `mingw-w64-clang-aarch64-` in every package name on this page. The rest of the guide is the same, except that the DLLs live in `C:\msys64\clangarm64\bin`.

## Build

In the MSYS2 CLANG64 terminal, clone the repository and configure with CMake using the **Ninja** generator:

```sh
git clone --branch 3.2.0 https://github.com/amule-org/amule.git
cd amule

cmake -B build \
    -G Ninja \
    -DCMAKE_BUILD_TYPE=Release \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULEAPI=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES

cmake --build build
```

The `-G Ninja` flag selects the Ninja build generator, which is faster than the default `make`-based generator for incremental builds and uses all CPU cores by default.

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
ctest --test-dir build --output-on-failure
```

See [Testing](../testing.md) for the full test suite documentation.

## Running the Built Binaries

The main `.exe` files are placed in `build/src/` (`amuleapi` in `build/src/webapi/`; see [Running Without Installing](index.md#running-without-installing) for the others). Run them directly from the MSYS2 CLANG64 terminal:

```sh
./build/src/amule.exe
./build/src/amuled.exe
./build/src/webapi/amuleapi.exe
./build/src/amulecmd.exe
```

Which executables are produced depends on the `BUILD_*` options you enabled: [`amule`](../../manual/interfaces/gui/amule.md) (GUI), [`amuled`](../../manual/interfaces/amuled.md) (daemon), [`amulegui`](../../manual/interfaces/gui/amulegui.md) (remote GUI), [`amuleapi`](../../manual/interfaces/amuleapi/index.md) (REST API & Web UI), [`amulecmd`](../../manual/interfaces/amulecmd.md) (CLI), [`amuleweb`](../../manual/interfaces/amuleweb.md) (legacy WebUI), and the [`ed2k`](../../manual/utilities/ed2k.md) link handler.

To run binaries outside the MSYS2 terminal (e.g. by double-clicking in Windows Explorer), the CLANG64 DLLs must be available. Either:

1. Add `C:\msys64\clang64\bin` to the Windows system `PATH`.
2. Or install into a folder (`cmake --install build --prefix <dir>`), which copies the required DLLs and `ca-bundle.crt` (needed for HTTPS downloads) next to the executables, as `packaging/windows/build.sh` does.

## Notes on the MSYS2 Environment

All commands must be run inside the **MSYS2 CLANG64** shell (**CLANGARM64** on ARM64). Do not use:

- **MSYS2 MSYS** — uses a different runtime and does not find CLANG64 packages.
- **MSYS2 MINGW64** — not supported (see the note above).
- **Command Prompt** or **PowerShell** — these do not have access to the MSYS2 build tools.

CI does not test **MSYS2 UCRT64**, and its package names differ (`mingw-w64-ucrt-x86_64-*`).

## Packaging (Portable .zip and Installer)

If you want a redistributable build rather than running the binaries from the build tree, the `packaging/windows/` directory contains helper scripts that produce a portable `.zip` and an NSIS installer. Unlike the manual build above, these scripts use the **MinGW Makefiles** generator (not Ninja — Ninja crashes with `0xc0000142` inside CMake's `try_compile` inner project when run from these scripts), build into `build-windows-<arch>/`, and disable the test build (`BUILD_TESTING=NO`).

The scripts support two architectures, selected by `WINDOWS_MSYSTEM` in `packaging/windows/versions.env` (default `CLANGARM64`). `build.sh` stops if it does not match the MSYS2 shell it runs in:

| MSYS2 environment | Architecture |
|---|---|
| `CLANG64` | x64 |
| `CLANGARM64` | ARM64 (Windows on ARM) |

`build.sh` takes a subcommand (`build` is the default):

```sh
# In the matching MSYS2 shell (CLANG64 for x64, CLANGARM64 for ARM64)

# 1. Portable .zip — the default action
packaging/windows/build.sh
# → dist/aMule-<version>-Windows-<arch>.zip

# 2. NSIS installer — wraps the portable tree from step 1
packaging/windows/build.sh installer
# → dist/aMule-<version>-Windows-Setup-<arch>.exe

# 3. Code-sign the produced artifacts (see below)
packaging/windows/build.sh sign
```

To build for x64 from a CLANG64 shell, override the default:

```sh
WINDOWS_MSYSTEM=CLANG64 packaging/windows/build.sh
```

The `build` step configures CMake, compiles, installs a portable tree (the executables under `bin/`, plus the MSYS2 DLLs resolved automatically via `file(GET_RUNTIME_DEPENDENCIES)` and a `ca-bundle.crt` for libcurl HTTPS), and zips it.

The scripts also need `zip` (`pacman -S zip`). The `installer` subcommand needs NSIS 3.x (`makensis`) and `python`, and `sign` needs `signtool` from the Windows SDK. See `packaging/windows/README.md` for installer details and remote (SSH) build instructions.

### Signing

Signing is driven through `build.sh sign` (which calls `sign.sh` internally). It signs every `.exe`/`.dll` inside the portable `.zip` and the installer `.exe` when present. It requires two environment variables; if either is unset, signing is a silent no-op (releases ship unsigned by default):

```sh
export WIN_CERT_PFX_BASE64=$(base64 -w0 path/to/cert.pfx)
export WIN_CERT_PASSWORD=cert-password

packaging/windows/build.sh sign
```

See `packaging/windows/versions.env` for the full list of signing variables.

## Troubleshooting

### `crypto++` not found

The MSYS2 package is `mingw-w64-clang-x86_64-crypto++`. Verify it is installed:

```sh
pacman -Q mingw-w64-clang-x86_64-crypto++
```

### CMake Cannot Find Ninja

Install the Ninja package and verify:

```sh
pacman -S mingw-w64-clang-x86_64-ninja
which ninja
ninja --version
```

### `pkg-config` not found

Install the CLANG64 version:

```sh
pacman -S mingw-w64-clang-x86_64-pkgconf
```

Do not use the generic MSYS2 `pkg-config` — it does not know about the CLANG64 package paths.

### Build Directory Must Be Deleted After a Failed Configure

CMake caches configure results. If a configure fails partway through (e.g. because a package was missing), install the missing package and delete the build directory before re-running cmake:

```sh
rm -rf build
cmake -B build -G Ninja ...
```
