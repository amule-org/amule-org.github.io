---
id: amule
title: amule — GUI Client
---

`amule` is the all-in-one graphical client. It bundles the aMule core and a full wxWidgets-based interface in a single executable, and connects directly to both the eD2k and Kademlia networks.

![aMule downloads screenshot](/img/docs/gui_amule/amule_downloads.png)

## Overview

`amule` is the most complete way to run aMule: the core and GUI run in the same process, so no remote connection or daemon setup is required. It is the best choice for desktop systems where a persistent graphical session is available.

For headless or server environments, use [`amuled`](../amuled.md) (daemon) together with [`amulegui`](./amulegui.md), [`amuleweb`](../amuleweb.md), or [`amulecmd`](../amulecmd.md).

aMule officially supports more than 60 different hardware and OS configurations. It is built on the [wxWidgets](https://www.wxwidgets.org/) toolkit (formerly wxWindows), which provides the multiplatform GUI layer.

## Installation

See [Installation](../../installation/index.md) for pre-built packages, or [Compilation](../../../developer/compilation/index.md) to build `amule` from source.

## Configuration

Most settings can be configured directly from the GUI through the [Preferences](./preferences.md) dialog. They are stored in [`~/.aMule/amule.conf`](../../configuration/config-files/amule-conf.md), which is created automatically on first run.

## Starting amule

Launch from a terminal:

```bash
amule
```

On first run, aMule creates its [configuration directory](../../configuration/config-files/index.md) (`~/.aMule/`) and presents a first-run wizard for basic setup (TCP/UDP ports, download/upload directories, bandwidth limits).

Common command-line flags:

| Flag | Description |
|---|---|
| `-h`, `--help` | Display help and exit |
| `-v`, `--version` | Print version and exit |
| `-c <path>` | Use an alternative configuration directory instead of `~/.aMule/` |
| `-o`, `--log-stdout` | Print log messages to stdout |
| `-q`, `--quiet` | Disable output to stdout |

## Interface

The aMule interface is divided into several panels accessible via tabs or the toolbar. Full documentation for each panel is in the [GUI](./index.md) guides.

## ED2K Link Integration

aMule can handle `ed2k://` and `magnet:` links clicked in a web browser using the `ed2k` helper binary (installed alongside `amule`). When clicked, the browser invokes `ed2k`, which passes the link to the running aMule instance via the ED2KLinks file.

- For the **`ed2k` command** and how the ED2KLinks file works, see [ed2k — ED2K Link Handler](../../utilities/ed2k.md).
- For **browser configuration** (Firefox, Opera, Konqueror, Windows, macOS, remote handling), see [ed2k — ED2K Link Handler](../../utilities/ed2k.md).
