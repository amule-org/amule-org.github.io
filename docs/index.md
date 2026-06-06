---
id: index
title: aMule Documentation
slug: /
---

aMule is a free, open-source file-sharing program for the [**eD2k (eDonkey2000)**](./p2p-networks/ed2k/index.md) and [**Kademlia (Kad)**](./p2p-networks/kademlia.md) peer-to-peer networks. It runs on Windows, macOS, Linux, FreeBSD, and OpenBSD, and stays close to eMule in look and feel so users can switch with ease.

## History

aMule began in August 2003 as a multiplatform fork of xMule (itself derived from lMule), bringing the eMule experience to systems beyond Windows. It has grown well beyond its origins ever since.

## Features

### Features inherited from eMule

aMule supports the features eMule users will already recognize:

- **Two networks** — connects to both the eD2k and Kad networks for the widest possible pool of files and sources.
- **[eMule compatible](./manual/migration/migrate-from-emule.md)** — wire-compatible with eMule and every *Mule client, so you share the same files and sources, connect to the same servers, and open standard `ed2k://` links.
- **[Several ways to search](./manual/interfaces/gui/searches.md)**:
  - Your connected server
  - All known servers at once (global search)
  - The Kad network, which can ask extra peers for more results
  - Straight from your browser, by clicking [`ed2k://` links](./p2p-networks/ed2k/links.md)
- **Source Exchange** — clients share their source lists with each other, so you find more places to download from, faster.
- **[Credit system](./p2p-networks/concepts.md)** — the more you upload to someone, the sooner they upload back to you, keeping sharing fair for everyone.
- **[Automatic corruption repair](./p2p-networks/ed2k/aich.md)** — downloads are checked for integrity, and damaged parts are detected and re-downloaded on their own.
- **Hands-off download management** — aMule sets [priorities](./manual/interfaces/gui/priority.md) and finds sources by itself, so you can start many downloads and leave them running.
- **[Bandwidth control](./manual/interfaces/gui/preferences.md#bandwidth-limits)** — set hard upload and download speed limits so aMule never saturates your connection, or let it run full-throttle when you are away.
- **[Categories](./manual/interfaces/gui/downloads.md#categories)** — organize your downloads into named groups.
- **[Preview](./manual/interfaces/gui/downloads.md)** — watch a video or open an archive before the download finishes (using your preferred media player; MPlayer by default).
- **Boolean search** — refine your searches with `AND`, `OR`, and `NOT`.
- **Compressed transfers** — data is compressed on the fly for faster transfers and less load on servers.
- **IP filtering** — block connections from known-bad or unwanted address ranges.
- **[Secure identification](./p2p-networks/ed2k/secure-user-identification.md)** — protects your identity so no one can impersonate you or steal your upload credits.
- **Misbehaving-client detection** — spots and blocks peers that try to cheat the sharing rules.
- **[Release Priority](./manual/interfaces/gui/priority.md#release-priority)** (known as PowerShare in eMule) — give your own shared files top priority so others can grab them quickly.
- **[Automatic server-list updates](./p2p-networks/ed2k/servers.md)** — keep your server list current automatically, or refresh it whenever you like.
- **[System tray](./manual/interfaces/gui/tray-icon.md)** — keep aMule running quietly in the system tray (or notification area) on all major desktops.
- **[Friends and messaging](./manual/interfaces/gui/messages.md)** — keep a friends list and exchange messages with other users.
- **[Online signature](./manual/utilities/wxcas-cas.md)** — publish your current status, such as speed and active downloads, on a website or forum signature.
- **Flexible progress display** — show download progress as a chunk bar, a percentage, or both.
- **[Skins](./manual/interfaces/gui/skins.md)** — change aMule's appearance with downloadable skins.
- **37 languages** — use aMule in your own language.

### Features added by aMule

On top of that, aMule adds capabilities of its own:

- **[Runs everywhere](./manual/installation/index.md)** — native support for Windows, macOS, Linux, and BSD.
- **[Native packages](./manual/installation/index.md)** — ready-to-use builds for every platform: installer and portable `.zip` on Windows, a Universal2 `.dmg` on macOS, AppImage and Flatpak on Linux, for both x64 and ARM64.
- **Free and open source** — released under the GPL-2.0 license with no telemetry, no advertisements, and no vendor lock-in; the full source code is open to inspect and contribute to.
- **Full remote control** — run aMule in the background and manage it remotely from a [remote GUI](./manual/interfaces/gui/amulegui.md), a [web interface](./manual/interfaces/amuleweb.md), or a [command-line interface](./manual/interfaces/amulecmd.md), all built on its [External Connections (EC)](./developer/ec-protocol.md) system.
- **[Search-result filtering](./manual/interfaces/gui/searches.md)** — hide unwanted results so you find what you want faster.
- **Upload slot control** — set a minimum speed per upload so you share with a sensible number of people at once, instead of spreading too thin.
- **Automatic folder rescan** — aMule notices when files are added, changed, or removed in your [shared and Incoming folders](./manual/configuration/directories.md), with no manual refresh.
- **Remembers sources for rare files** — saves where to find hard-to-get files so your downloads pick up again quickly after a restart.
- **Quick ed2k link bar** — paste `ed2k://` links straight into a bar at the bottom of every window (can be turned off).
- **[Run a command on completion](./manual/configuration/events.md)** — automatically launch a script or program when a download finishes.
- **Works across filesystems** — keep downloads and shared files on different drives or filesystems.
- **Secure (HTTPS) updates** — server lists and filter lists can be downloaded over secure HTTPS connections.
- **[Proxy support](./manual/configuration/proxy.md)** — route your connection through a proxy server.
- **Country lookup** — shows the country of the servers and users you connect to (a free country database download is required).
- **Update notifications** — aMule lets you know when a new version is available.
- **Start on login** — have aMule launch automatically when you sign in.
- **Default file permissions** — choose the access permissions applied to completed downloads.

## Quick Start

- [Getting Started](quickstart-guide.md) — first run, configuration, searching and downloading

## Modules

| Tool | What it does |
|---|---|
| [`amule`](./manual/interfaces/gui/amule.md) | All-in-one client with a full graphical interface |
| [`amuled`](./manual/interfaces/amuled.md) | Background version with no window (daemon) |
| [`amulegui`](./manual/interfaces/gui/amulegui.md) | Graphical interface that controls a background aMule |
| [`amuleweb`](./manual/interfaces/amuleweb.md) | Web interface for a background aMule |
| [`amulecmd`](./manual/interfaces/amulecmd.md) | Command-line interface for a background aMule |
| [`ed2k`](./manual/utilities/ed2k.md) | Command-line helper that sends `ed2k://` links to a running aMule |
| [`alc` / `alcc`](./manual/utilities/alc-alcc.md) | Create `ed2k://` links for your own files (graphical and command-line) |
| [`wxcas` / `cas`](./manual/utilities/wxcas-cas.md) | Show your aMule status as images or web pages |

## Supported Platforms

aMule runs on Windows, macOS, Linux, FreeBSD, and OpenBSD, on both x86\_64 and ARM64 hardware.
