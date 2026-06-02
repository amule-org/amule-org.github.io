---
id: index
title: Compilation
---

aMule uses **CMake** (minimum version 3.10) as its build system. This page covers the complete build, install, and uninstall workflow. Platform-specific dependency installation commands are in the sub-pages for [Windows](windows.md), [macOS](macos.md), [Linux](linux.md), and [BSD](bsd.md).

## Dependencies

### Required

| Package | Minimum version | Notes |
|---|---|---|
| CMake | 3.10 | Build system |
| zlib | 1.2.3 | Compression |
| wxWidgets | 3.2.0 | GUI toolkit (3.2 branch or newer) |
| Crypto++ | 5.6 | Cryptographic functions |
| Boost | 1.70 | Headers only; only `asio` is used |

wxWidgets must be built with Unicode support (the default since wx 3.0). aMule is Unicode-only.

### Optional

| Package | What it enables |
|---|---|
| `libgd` ≥ 2.0.0 | Statistics images in `cas` |
| `libupnp` ≥ 1.6.6 | UPnP port forwarding |
| `libmaxminddb` ≥ 1.0 | Country flags and IP→country mapping |
| `gettext` ≥ 0.11.5 | Native-language support (NLS) |
| `libayatana-appindicator3` | **Linux only.** StatusNotifierItem (SNI) tray-icon backend; see [Building on Linux](linux.md#sni-tray-icon). |
| `glib-2.0` dev headers | **wxGTK builds (Linux / BSD).** Required for the `g_set_prgname()` desktop-entry binding when building `amule`, `amuled`, or `amulegui`. No-op on macOS. |
| `readline` | Line editing in `amulecmd` and `amuleweb` |
| `binutils-dev` / `libbfd` | BFD-based crash handler |
| `libpng` | PNG support in `amuleweb` |

## Quick Start

```sh
# Clone the repository
git clone https://github.com/amule-org/amule.git
cd amule

# Install platform-specific dependencies first (see sub-pages)

# Configure — build the all-in-one GUI + daemon
cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES

# Build
cmake --build build -j"$(nproc)"

# Install (default prefix: /usr/local)
sudo cmake --install build
```

## Build Options

All options are passed as `-DOPTION=YES` or `-DOPTION=NO` to the initial `cmake -B build` command.

| Option | Default | Builds |
|---|---|---|
| `BUILD_MONOLITHIC` | YES | [`amule`](../../manual/interfaces/gui/amule.md) — all-in-one GUI client |
| `BUILD_DAEMON` | NO | [`amuled`](../../manual/interfaces/amuled.md) — headless daemon |
| `BUILD_REMOTEGUI` | NO | [`amulegui`](../../manual/interfaces/gui/amulegui.md) — remote control GUI |
| `BUILD_WEBSERVER` | NO | [`amuleweb`](../../manual/interfaces/amuleweb.md) — HTTP web interface |
| `BUILD_AMULECMD` | NO | [`amulecmd`](../../manual/interfaces/amulecmd.md) — CLI client for the daemon |
| `BUILD_ED2K` | YES | [`ed2k`](../../manual/utilities/ed2k.md) — eD2k link handler helper |
| `BUILD_ALC` | NO | [`alc`](../../manual/utilities/alc-alcc.md) — aMuleLinkCreator GUI |
| `BUILD_ALCC` | NO | [`alcc`](../../manual/utilities/alc-alcc.md) — aMuleLinkCreator console |
| `BUILD_CAS` | NO | [`cas`](../../manual/utilities/wxcas-cas.md) — C statistics tool (Unix only) |
| `BUILD_WXCAS` | NO | [`wxcas`](../../manual/utilities/wxcas-cas.md) — GUI statistics tool |
| `BUILD_FILEVIEW` | NO | [`fileview`](../file-formats/fileview.md) — console file viewer (experimental) |
| `BUILD_TESTING` | YES | [Unit test suite](../testing.md) |
| `ENABLE_NLS` | YES | [Native-language support](../translations.md) (gettext) |
| `ENABLE_UPNP` | YES | [UPnP port forwarding](../../manual/configuration/upnp.md) |
| `ENABLE_IP2COUNTRY` | NO | IP→country mapping (libmaxminddb) |
| `ENABLE_MMAP` | NO | Use memory-mapped file I/O where supported |
| `DOWNLOAD_AND_BUILD_DEPS` | NO | When an optional dependency is missing, let CMake download and build it from source instead of failing (requires Git) |

To list all available options with descriptions:

```sh
cmake -LAH -B build | less
```

### Building Everything

```sh
cmake -B build \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_REMOTEGUI=YES \
    -DBUILD_WEBSERVER=YES \
    -DBUILD_AMULECMD=YES \
    -DBUILD_ED2K=YES \
    -DBUILD_ALC=YES \
    -DBUILD_ALCC=YES \
    -DBUILD_CAS=YES \
    -DBUILD_WXCAS=YES \
    -DBUILD_TESTING=YES \
    -DENABLE_NLS=YES \
    -DENABLE_UPNP=YES \
    -DENABLE_IP2COUNTRY=YES
```

Or, using the `BUILD_EVERYTHING` shorthand:

```sh
cmake -B build -DBUILD_EVERYTHING=YES
```

`BUILD_EVERYTHING` turns on every build target (`BUILD_*`), but it does **not** enable `ENABLE_IP2COUNTRY` (which is `NO` by default). Pass `-DENABLE_IP2COUNTRY=YES` alongside it if you want IP→country mapping. `ENABLE_NLS` and `ENABLE_UPNP` are already `YES` by default.

### Debug Build

```sh
cmake -B build -DCMAKE_BUILD_TYPE=Debug -DBUILD_MONOLITHIC=YES
cmake --build build -j"$(nproc)"
```

The `Debug` type enables compiler optimisation flags for debugging and retains full symbol information. See [Debugging](../debugging.md) for how to use it with GDB and Valgrind.

## Installing

```sh
sudo cmake --install build
```

Default installation layout under `/usr/local`:

| What | Where |
|---|---|
| Binaries | `/usr/local/bin/` |
| Translation catalogs | `/usr/local/share/locale/<lang>/LC_MESSAGES/amule.mo` |
| Data files (skins, webserver) | `/usr/local/share/amule/` |
| Documentation | `/usr/local/share/doc/amule/` |
| License | `/usr/local/share/LICENSE.md` |
| Desktop entries | `/usr/local/share/applications/` |
| Icon | `/usr/local/share/icons/hicolor/128x128/apps/` |
| AppStream metadata | `/usr/local/share/metainfo/` |

### Custom Install Prefix

Override the prefix with `-DCMAKE_INSTALL_PREFIX`:

```sh
cmake -B build -DCMAKE_INSTALL_PREFIX=/opt/amule -DBUILD_MONOLITHIC=YES
cmake --build build -j"$(nproc)"
sudo cmake --install build
```

### Developer Install (No sudo)

Install to `$HOME/.local` during development. No root required, and easy to undo:

```sh
cmake --install build --prefix=$HOME/.local
```

Binaries land in `~/.local/bin/` (make sure it is in your `$PATH`).

On Linux, after a raw `cmake --install` you may need to refresh the icon cache and ensure the SNI tray-icon backend is present — see [Desktop Integration](linux.md#desktop-integration).

## Uninstalling

CMake records every installed file in `build/install_manifest.txt`. Use it to remove them:

```sh
# System install
sudo xargs rm -f < build/install_manifest.txt

# Local install (no sudo needed)
xargs rm -f < build/install_manifest.txt
```

## Refreshing Translated Man Pages

The translated `*.LANG.1` man pages under `docs/man/` are committed pre-generated artifacts. They are refreshed from `docs/man/po/manpages-LANG.po` using `po4a`. See [Man Page Translations](../translations.md#man-page-translations) for the full translation workflow. The refresh CMake target is available only when `po4a` is found at configure time:

```sh
cmake --build build --target po4a-update
```

This rewrites `docs/man/po/manpages.pot`, syncs each `manpages-LANG.po`, and regenerates the translated man pages in place. Commit the resulting changes.

## Running Without Installing

All built binaries are placed in `build/` and can be run directly:

```sh
./build/amule
./build/amuled
./build/amulecmd
```

This is the recommended workflow during development — no need to install after every build.

## Speeding Up Builds with ccache

If [ccache](https://ccache.dev/) is installed, CMake detects it automatically and uses it as a compiler launcher. Incremental rebuilds are significantly faster when switching between branches or performing `git bisect` sessions:

```sh
# Debian / Ubuntu
sudo apt install ccache

# Fedora / RHEL
sudo dnf install ccache
```

## Running the Unit Tests

```sh
cmake -B build -DBUILD_TESTING=YES -DBUILD_MONOLITHIC=YES
cmake --build build -j"$(nproc)"
ctest --test-dir build --output-on-failure
```

See [Testing](../testing.md) for the full test suite documentation.
