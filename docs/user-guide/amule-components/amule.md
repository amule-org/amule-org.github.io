---
id: amule
title: amule — GUI Client
---

`amule` is the all-in-one graphical client. It bundles the aMule core and a full wxWidgets-based interface in a single executable, and connects directly to both the eD2k and Kademlia networks.

## Overview

`amule` is the most complete way to run aMule: the core and GUI run in the same process, so no remote connection or daemon setup is required. It is the best choice for desktop systems where a persistent graphical session is available.

For headless or server environments, use [`amuled`](amuled.md) (daemon) together with [`amulegui`](amulegui.md), [`amuleweb`](amuleweb.md), or [`amulecmd`](amulecmd.md).

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

`BUILD_MONOLITHIC` is the default and builds the all-in-one `amule` binary. For dependency installation and all available CMake options see [Compilation](../../development/compilation/index.md).

## Configuration

All settings are stored in [`~/.aMule/amule.conf`](../amule-files/amule-conf.md). The file is created automatically on first run. The most common settings to edit manually are in the `[ExternalConnect]` section (EC password and port, needed if you want to connect remote interfaces to `amule`).

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

## Interface Overview

The aMule interface is divided into several panels accessible via tabs or the toolbar.

### Toolbar and Status Bar

The toolbar provides quick access to connect/disconnect, preferences, and the main panels. The status bar at the bottom displays:

- Current eD2k connection status and server name.
- Kademlia connection status.
- Current download and upload speeds.
- Your eD2k ID ([High ID or Low ID](../../ed2k/high-id-low-id.md)).

### Networks Panel

The Networks panel manages connections to eD2k servers and the Kademlia network.

**Empty server list:**

![Empty server list](/img/docs/serverlist_empty.png)

**Connected to an eD2k server:**

![eD2k server list](/img/docs/serverlist_ed2k.png)

**Kademlia network view:**

![Kademlia network](/img/docs/serverlist_kad.png)

The ![Reload button](/img/docs/reload_button.png) reload button refreshes the server list from the configured URL.

To add servers: right-click the server list → Add server, or update from a URL in Preferences → Server.

### Searches Panel

The Searches panel allows you to search for files across eD2k servers and the Kademlia network.

**Search dialog:**

![Search dialog](/img/docs/search_dialog.png)

Search options:
- **Type**: filter by file type (any, audio, video, images, programs, documents, archives, CD images).
- **Min/Max size**: restrict results by file size.
- **Availability**: minimum source count.
- **Extension**: filter by file extension.

**Search results:**

![Search results](/img/docs/search_results.png)

Double-click a result to start downloading. Right-click for additional options including downloading with a specific category.

### Transfers Panel

The Transfers panel shows active downloads and uploads.

![Transfers and queue](/img/docs/transfers_queue.png)

For each download:
- The coloured progress bar shows which 9.28 MB chunks have been completed (blue), are being downloaded (green), are available from sources but not yet requested (grey), and are unavailable (black).
- Source counts, current speed, priority, and category are shown per file.

Upload slots are shown in the lower half. aMule limits simultaneous upload slots based on your configured slot allocation bandwidth.

### Shared Files Panel

Lists all files in your shared directories. For each file you can see:
- File name, size, and type.
- Number of requests (this session and total).
- Total bytes uploaded.
- Upload priority.

Use the panel to change priorities or copy ed2k links to clipboard.

### Messages Panel

Displays messages received from other aMule/eMule clients. You can also send messages to clients you have added as friends.

### Statistics Panel

Displays real-time and cumulative statistics including:
- Upload and download speed graphs.
- Total bytes transferred (session and all-time).
- Number of clients in the upload queue.
- Shared file count.
- Connection uptime.

### Preferences

Open with **Edit → Preferences** or the toolbar shortcut.

**Directories preferences:**

![Directories preferences](/img/docs/prefs_directories.png)

**Bandwidth limits:**

![Bandwidth limits](/img/docs/bandwidth_limits.png)

Key preference sections:
- **General** — nickname, language, version check.
- **Connection** — TCP port, UDP port, max connections, max sources per file, bandwidth limits.
- **Server** — server list URL, auto-connect settings.
- **Downloads** — incoming directory, temp directory, file permissions.
- **Uploads** — upload bandwidth, slot allocation.
- **Remote Controls** — EC password and port for remote interfaces.
- **Online Signature** — enable/disable [`amulesig.dat`](../amule-files/amulesig-dat.md) generation.
- **Advanced** — ICH, AICH, IP filter, proxy.

## ED2K Link Integration

aMule can handle `ed2k://` links clicked in a web browser using the `ed2k` helper binary (installed alongside `amule`). When clicked, the browser invokes `ed2k`, which passes the link to the running aMule instance via the ED2KLinks file.

- For the **`ed2k` command** and how the ED2KLinks file works, see [ed2k — ED2K Link Handler](ed2k-cli.md).
- For **browser configuration** (Firefox, Opera, Konqueror, Windows, macOS, remote handling), see [ed2k — ED2K Link Handler](ed2k-cli.md).
