---
id: index
title: aMule Documentation
slug: /
---

aMule is a free, open-source, multi-platform peer-to-peer file-sharing client for the **eD2k (eDonkey2000)** and **Kademlia (Kad)** networks. It is written in C++ using wxWidgets and runs on Windows, macOS, Linux, FreeBSD, and OpenBSD.

## History

aMule was forked from the xMule project (formerly known as lMule) in September 2003. It started as a multiplatform continuation of the *Mule lineage and has since diverged substantially from its origins.

## Features

### *Mule features

aMule implements most features of the original eMule client:

- **eD2k and Kademlia** network support.
- Available in **28 languages**.
- **Source Exchange** — clients share source lists to find additional download sources more efficiently.
- **Credit system** — rewards users who upload to others; large queues are managed fairly so all clients eventually receive the files they want.
- **Compressed transfers and server communication** using zlib — faster transfers for compressible files and reduced server load.
- **Secure Identification** — prevents user hash theft and client impersonation.
- **IP Filters** — block connections from known-bad IP ranges.
- **Boolean search** — `AND`, `OR`, `NOT` operators in search queries.
- **Progress bar variants** — traditional chunk bar, percentage completed, or both simultaneously.
- **Systray integration** for GNOME, KDE, and compatible window managers (and Windows).
- **Online Signatures** — `amulesig.dat` lets external tools display your aMule status.
- **Aggressive client detection** — checks and blocks misbehaving peers.
- **MD4 hashes** — used for source discovery and file integrity verification, preventing corruption.
- **ICH and AICH** — Intelligent Corruption Handler and Advanced Intelligent Corruption Handler speed up correction of corrupted file parts.
- **Auto priorities and source management** — start many downloads without manual monitoring.
- **Preview function** — view videos and archives before download completes (MPlayer or Xine recommended; VLC also works).
- **Categories** — organize downloads into named groups.
- **Search types**:
  - Local server search
  - Global server search (queries all known servers)
  - Kademlia search
  - Integration with browsers via `ed2k://` links for click-to-download
- **Messaging and Friends system** — send messages to other clients and maintain a friends list.
- **Server list updates from URL** — update at startup, on connect, or manually at runtime.
- **PowerShare** — prioritized handling of your own shared files (known as Release).
- **Skins support**.

### aMule-specific features

In addition to the *Mule baseline, aMule adds:

- **Multiplatform** — Windows, macOS, Linux, BSD, and many more.
- **Proxy support**.
- **Improved checks against aggressive clients**.
- **Complete External Connections (EC) protocol** — built from scratch; allows full remote control.
- **aMule Daemon ([`amuled`](user-guide/amule-components/amuled.md))** — run aMule as a headless process with very low CPU and memory usage. Ideal for servers and NAS devices.
- **aMuleGUI ([`amulegui`](user-guide/amule-components/amulegui.md))** — remote GUI with the same interface as the local client.
- **aMuleWeb ([`amuleweb`](user-guide/amule-components/amuleweb.md))** — browser-based interface; works locally and remotely from any device.
- **aMuleCMD ([`amulecmd`](user-guide/amule-components/amulecmd.md))** — command-line remote control; scriptable via shell and cron.
- **Statistics tools** — [`cas` and `wxcas`](user-guide/amule-components/cas-wxcas.md) read `amulesig.dat` to generate status images and HTML pages.
- **ALinkCreator ([`alc` / `alcc`](user-guide/amule-components/alc-alcc.md))** — generate ed2k links for local files without running aMule.
- **Fast ed2k link handler** — embedded at the bottom of every page (can be disabled in Preferences).
- **Run a command when a file completes**.
- **Save up to 20 sources on rare files** (≤20 sources) — improves re-connectivity after restarts.
- **Filter search results**.
- **Default file permissions** for completed downloads.
- **Multiple filesystem support**.
- **Version update checks**.
- **Slot allocation** — specify the minimum bandwidth per upload slot. For example, with 20 KB/s upload capacity and a 10 KB/s slot allocation, aMule uploads to two clients simultaneously at 10 KB/s each.

## Quick Start

- [Getting Started](quickstart-guide/index.md) — first run, configuration, searching and downloading

## Modules

| Binary | Description |
|---|---|
| [`amule`](user-guide/amule-components/amule.md) | All-in-one GUI client |
| [`amuled`](user-guide/amule-components/amuled.md) | Headless daemon (no GUI) |
| [`amulegui`](user-guide/amule-components/amulegui.md) | Remote GUI; connects to `amuled` via the EC protocol |
| [`amuleweb`](user-guide/amule-components/amuleweb.md) | HTTP web interface for a running `amuled` |
| [`amulecmd`](user-guide/amule-components/amulecmd.md) | Interactive command-line interface for a running `amuled` |
| [`ed2k`](user-guide/amule-components/ed2k-cli.md) | Command-line tool for adding eD2k links to a running aMule instance |
| [`alc` / `alcc`](user-guide/amule-components/alc-alcc.md) | GUI and command-line tools for generating ed2k links for local files |
| [`wxcas` / `cas`](user-guide/amule-components/cas-wxcas.md) | Statistics tools that display aMule status from `amulesig.dat` |

## Supported Platforms

Windows, macOS, Linux, FreeBSD, and OpenBSD (x86\_64 and ARM64).
