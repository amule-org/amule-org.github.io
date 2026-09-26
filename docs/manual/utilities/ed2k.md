---
id: ed2k
title: ed2k — ED2K Link Handler
---

`ed2k` is a command-line utility shipped with aMule that adds eD2k links, eD2k-compatible magnet links and eMule collections to a running aMule instance. Links clicked in a browser are handled by aMule itself (see [eD2k and Magnet Links](../configuration/ed2k-magnet-links.md)); `ed2k` is meant for scripts and for [manually registered](../configuration/ed2k-magnet-links.md#manual-registration) handlers.

## Overview

Unlike [`amulegui`](../interfaces/gui/amulegui.md), [`amuleapi`](../interfaces/amuleapi/index.md), [`amulecmd`](../interfaces/amulecmd.md), and [`amuleweb`](../interfaces/amuleweb.md), the `ed2k` command does **not** use the External Connections (EC) protocol. Instead, it communicates with aMule through the [**`ED2KLinks` file**](../configuration/config-files/index.md#ed2klinks): a plain text file that aMule checks roughly once per second. When aMule detects the file, it reads the links inside, queues them for download, and deletes the file.

The `ED2KLinks` file lives in aMule's configuration directory; its location depends on the platform (see [Configuration Files → Platform paths](../configuration/config-files/index.md#platform-paths)). If aMule uses a non-default configuration directory, the file lives inside that directory instead (see the `-c` option below).

This interface is:
- **Mono-directional** — commands go from `ed2k` into aMule; there is no response.
- **In-going only** — `ed2k` cannot query aMule's state.
- **Simple** — no authentication or network connection required; aMule and `ed2k` must run as the same user.

## Usage

```bash
ed2k [-c <path>] [-t <num>] [-e] [-l] <link>
ed2k -h
ed2k -v
```

The simplest invocation queues a file link for download:

```bash
ed2k "ed2k://|file|NAME|SIZE|MD4HASH|/"
```

The double quotes are required so that the shell does not interpret the pipe characters (`|`) — and the ampersands (`&`) that appear in magnet links — as shell operators.

### Accepted link types

`ed2k` accepts more than just file links:

- **File link** (`ed2k://|file|...`) — queued for download.
- **Server link** (`ed2k://|server|...`) — added to the server list.
- **Serverlist link** (`ed2k://|serverlist|...`) — makes aMule update its server list.
- **Magnet URI** (`magnet:?...`) — converted to an eD2k link, then queued.
- **eMule collection file** (`.emulecollection`) — see the `-e` / `-l` options.

For the detailed syntax of each eD2k link type, see [eD2k Links](../../p2p-networks/ed2k/links.md).

:::note Magnet links must be eD2k-compatible
A magnet link must carry the file's MD4 hash and size; BitTorrent-only magnets cannot be imported. See [eD2k and Magnet Links → Magnet Links](../configuration/ed2k-magnet-links.md#magnet-links) for the exact rules.
:::

### Options

| Option | Description |
|---|---|
| `-h`, `--help` | Print a short usage description. |
| `-v`, `--version` | Display the version (`aMule ED2k link parser v1.5.1`). |
| `-c`, `--config-dir <path>` | Use `<path>` as aMule's configuration directory instead of the default. Also written as `-c<path>` or `--config-dir=<path>`. |
| `-t`, `--category <num>` | Add the following link(s) to category number `<num>`. |
| `-e`, `--emulecollection <file>` | Load every link found in the given `.emulecollection` file. |
| `-l`, `--list <file>` | Print every link found in the given `.emulecollection` file, without adding them. |

> **Option order is important.** Options apply to the links that follow them, and you can pass several links — each with its own options — in a single call. For example, `ed2k <link1> -t 2 <link2>` queues `<link1>` in the default category and `<link2>` in category 2.

Examples:

```bash
# Queue a file link into category 2
ed2k -t 2 "ed2k://|file|NAME|SIZE|MD4HASH|/"

# Add a magnet link
ed2k "magnet:?xt=urn:ed2k:MD4HASH&xl=SIZE&dn=NAME"

# List the links inside an eMule collection without adding them
ed2k -l mycollection.emulecollection

# Load all links from an eMule collection
ed2k -e mycollection.emulecollection
```

## ED2KLinks File

You can write to the [`ED2KLinks` file](../configuration/config-files/index.md#ed2klinks) directly without using the `ed2k` command:

```
ed2k://|file|debian-live-13.1.0-amd64-kde.iso|4127195136|6879BBE25C84E01EE4DCA0B783FF7C01|/
ed2k://|file|ubuntu-24.04.4-desktop-amd64.iso|6655619072|0031C9CBA65C50DD2015C184B2CA2C88|/
ed2k://|file|Fedora-Workstation-Live-x86_64-34-1.2.iso|2007367680|ABCC5847A58F4844CCE2946D9A62A757|/
```

Rules:
- One link per line: an eD2k link or an eD2k-compatible magnet link. A `:<n>` suffix after the link (for example `…|/:2`) adds it to category number `<n>`.
- The file must end with a newline after the last link.
- aMule deletes the file after reading it; do not rely on it persisting.
- Any line containing only `RAISE_DIALOG` causes aMule to raise its window. This is an internal marker that a second aMule instance writes to the file when it is started while one is already running — it is **not** a valid argument for the `ed2k` command (passing it on the command line is rejected as a bad parameter).

## Finding the `ed2k` Binary

| Installation method | Typical path |
|---|---|
| Windows installer | `C:\Program Files\aMule\bin\ed2k.exe` |
| Windows portable build | `amule-portable-<arch>\bin\ed2k.exe` in the extracted folder |
| macOS | `/Applications/aMule.app/Contents/MacOS/ed2k` |
| Linux AppImage | a symlink named `ed2k` pointing at the AppImage (see [Installation → AppImage](../installation/index.md#running-other-components-from-the-appimage)) |
| Linux Flatpak | `flatpak run --command=ed2k org.amule.aMule` |
| Distribution package | `/usr/bin/ed2k` (on Debian/Ubuntu, install the `amule-utils` package, and also `amule-ed2k` on Debian) |
| Self-compiled aMule | `/usr/local/bin/ed2k` |

On Linux and BSD, `which ed2k` shows where it is installed.

## Browser Integration

Browser and file-manager integration — registering aMule for `ed2k://` and `magnet:` links and `.emulecollection` files, registering a handler by hand (for example one that calls `ed2k` with `-c`), and remote handling with `amulecmd` — is described in [eD2k and Magnet Links](../configuration/ed2k-magnet-links.md).
