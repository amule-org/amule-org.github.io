---
id: amule
title: amule — GUI Client
---

`amule` is the all-in-one graphical client. It bundles the aMule core and a full wxWidgets-based interface in a single executable, and connects directly to both the eD2k and Kademlia networks.

## Overview

`amule` is the most complete way to run aMule: the core and GUI run in the same process, so no remote connection or daemon setup is required. It is the best choice for desktop systems where a persistent graphical session is available.

For headless or server environments, use [`amuled`](../amuled.md) (daemon) together with [`amulegui`](./amulegui.md), [`amuleweb`](../amuleweb.md), or [`amulecmd`](../amulecmd.md).

aMule officially supports more than 60 different hardware and OS configurations. It is built on the [wxWidgets](https://www.wxwidgets.org/) toolkit (formerly wxWindows), which provides the multiplatform GUI layer.

## Installation

Most distributions ship `amule` in their repositories:

```bash
# Debian/Ubuntu:
sudo apt install amule

# Fedora/RHEL:
sudo dnf install amule

# Arch:
sudo pacman -S amule
```

## Compilation

To build `amule` from source:

```sh
git clone https://github.com/amule-org/amule.git
cd amule

cmake -B build -DBUILD_MONOLITHIC=YES

cmake --build build -j"$(nproc)"
sudo cmake --install build
```

`BUILD_MONOLITHIC` is the default and builds the all-in-one `amule` binary. For dependency installation and all available CMake options see [Compilation](../../../developer/compilation/index.md).

## Configuration

All settings are stored in [`~/.aMule/amule.conf`](../../configuration/files/amule-conf.md). The file is created automatically on first run. The most common settings to edit manually are in the `[ExternalConnect]` section (EC password and port, needed if you want to connect remote interfaces to `amule`).

## Starting amule

Launch from a terminal:

```bash
amule
```

On first run, aMule creates its configuration directory (`~/.aMule/`) and presents a first-run wizard for basic setup (TCP/UDP ports, download/upload directories, bandwidth limits).

Common command-line flags:

| Flag | Description |
|---|---|
| `-h`, `--help` | Display help and exit |
| `-v`, `--version` | Print version and exit |
| `-c <path>` | Use an alternative configuration directory instead of `~/.aMule/` |
| `-o`, `--log-stdout` | Print log messages to stdout |
| `-q`, `--quiet` | Disable output to stdout |

## Interface

The aMule interface is divided into several panels accessible via tabs or the toolbar.
Full documentation for each panel is in the [GUI](./index.md) guides.

![aMule downloads screenshot](/img/screenshots/downloads.png)

## ED2K Link Integration

aMule can handle `ed2k://` links clicked in a web browser using the `ed2k` helper binary (installed alongside `amule`). When clicked, the browser invokes `ed2k`, which passes the link to the running aMule instance via the ED2KLinks file.

- For the **`ed2k` command** and how the ED2KLinks file works, see [ed2k — ED2K Link Handler](../../utilities/ed2k.md).
- For **browser configuration** (Firefox, Opera, Konqueror, Windows, macOS, remote handling), see [ed2k — ED2K Link Handler](../../utilities/ed2k.md).
