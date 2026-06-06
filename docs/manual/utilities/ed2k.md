---
id: ed2k
title: ed2k — ED2K Link Handler
---

`ed2k` is a command-line utility shipped with aMule that adds eD2k links to a running aMule instance. It is also the binary that web browsers invoke when the user clicks an `ed2k://` link.

## Overview

Unlike [`amulecmd`](../interfaces/amulecmd.md), [`amuleweb`](../interfaces/amuleweb.md), and [`amulegui`](../interfaces/gui/amulegui.md), the `ed2k` command does **not** use the External Connections (EC) protocol. Instead, it communicates with aMule through the [**`ED2KLinks` file**](../configuration/config-files/index.md#ed2klinks): a plain text file that aMule checks roughly once per second. When aMule detects the file, it reads the links inside, queues them for download, and deletes the file.

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
aMule converts a magnet URI to an eD2k link before queuing it, so the magnet **must** carry the eD2k file information: an `xt=urn:ed2k:<hash>` (or `xt=urn:ed2khash:<hash>`) parameter with the file's MD4 hash **and** an `xl=<size>` parameter with the exact file size in bytes. Magnets that only contain a BitTorrent hash (`xt=urn:btih:...`) or that omit the size cannot be imported.
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
- One ed2k link per line.
- The file must end with a newline after the last link.
- aMule deletes the file after reading it; do not rely on it persisting.
- Any line containing only `RAISE_DIALOG` causes aMule to raise its window. This is an internal marker that a second aMule instance writes to the file when it is started while one is already running — it is **not** a valid argument for the `ed2k` command (passing it on the command line is rejected as a bad parameter).

## Browser Configuration — Local Handling

When you click an `ed2k://` link in a browser, the browser does not run `ed2k` itself. Instead, it hands the link to the **handler that the operating system has registered for the `ed2k://` scheme** — and aMule (or the `ed2k` tool) is that handler. You therefore register the handler **once at the OS level**, and every browser (Firefox, Chrome, Edge, Safari) delegates to it, usually showing a one-time confirmation dialog ("Open aMule?").

:::note Only the `ed2k://` scheme is handled automatically
aMule registers itself as a handler for the `ed2k://` URI scheme only (on Linux, via `x-scheme-handler/ed2k` in its `.desktop` file). It does **not** register as a `magnet:` handler, so clicking a magnet link in a browser will not reach aMule by default. To open magnets from the browser you must register the `magnet` scheme manually so that it calls the `ed2k` tool (which accepts `magnet:?...` as an argument), the same way the `ed2k://` scheme is configured below.
:::

### Windows

To make Windows recognise the `ed2k://` scheme, register a handler in the registry. Create a file named `ed2k.reg` with the following content:

```reg
REGEDIT4

[HKEY_CLASSES_ROOT\ed2k]
@="URL: ed2k Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\ed2k\DefaultIcon]
@="C:\\Program Files\\aMule\\amulegui.exe"

[HKEY_CLASSES_ROOT\ed2k\shell]
@="open"

[HKEY_CLASSES_ROOT\ed2k\shell\open]

[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\ed2k\" \"%1\""
```

Double-click the `.reg` file to import it. From then on every browser — Microsoft Edge, Chrome, Firefox, and the rest — recognises `ed2k://` links through this handler. The first time you click a link the browser asks for confirmation ("Open aMule?"); tick **Always allow** / **Remember my choice** so it stops asking.

If your aMule configuration directory is in a non-default location (e.g. `D:\amule\config`), pass it with the `-c` flag:

```reg
[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\ed2k\" -c d:\\amule\\config \"%1\""
```

### macOS

Current macOS builds of aMule do **not** register a handler for the `ed2k://` scheme: the application bundle does not declare the scheme, and the legacy `ed2kHelperScript.app` that older versions relied on is no longer shipped. As a result, clicking an `ed2k://` link in a browser will not open aMule.

On macOS, add links through one of these instead:

- Copy the link and paste it into the **ED2K-Link Handler** field in aMule's Searches window.
- Append the link to the [`ED2KLinks` file](#ed2klinks-file) at `~/Library/Application Support/aMule/ED2KLinks`.
- Run the bundled `ed2k` tool from a terminal: `aMule.app/Contents/MacOS/ed2k "ed2k://|file|...|/"`.

See [macOS → Handling ed2k Links](../configuration/macos.md#handling-ed2k-links) for the GUI walkthrough.

### GNU/Linux

On Linux the `ed2k://` scheme follows the freedesktop.org standard: a `.desktop` file declares `MimeType=x-scheme-handler/ed2k`, and browsers ask the desktop environment which application handles it. **aMule ships this registration**, so in most cases clicking an `ed2k://` link already prompts to open aMule and there is nothing to configure.

If links are not picked up, set aMule as the default handler explicitly:

```bash
# Point the ed2k:// scheme at aMule's .desktop file
xdg-mime default amule.desktop x-scheme-handler/ed2k

# Refresh the desktop database
update-desktop-database ~/.local/share/applications
```

Check which application is currently registered:

```bash
xdg-mime query default x-scheme-handler/ed2k
```

When you then click a link, the browser (Firefox, Chrome, Chromium, Brave, …) shows a confirmation dialog offering to open it with aMule; choose to remember the choice to avoid being asked again.

To also handle **magnet** links, register the `magnet` scheme the same way (`x-scheme-handler/magnet`) pointing at a launcher that calls `ed2k`, since aMule does not claim that scheme itself.

:::warning Firefox and `ed2k://` (Firefox 122+)
Since Firefox 122, changes to how Firefox parses non-standard URIs can mangle `ed2k://` links before they reach the OS handler. A previous workaround was to set `network.url.useDefaultURI` to `false` in `about:config`, but it stopped working in later releases. If clicking an `ed2k://` link in Firefox fails, copy the link and pass it to the `ed2k` tool from a terminal, or use another browser, until the issue is resolved upstream.
:::

## Browser Configuration — Remote Handling

Remote handling lets you click an `ed2k://` link in a browser anywhere and have it added to an aMule instance running on another machine (for example, at home). It uses **`amulecmd`** instead of the local `ed2k` command, so aMule must be running with External Connections enabled (see [amulecmd](../interfaces/amulecmd.md)).

The principle is the same as local handling — register the `ed2k://` scheme at the OS level — but the handler runs `amulecmd` with an `Add` command pointed at the remote host.

### Windows

Create a small batch wrapper that forwards the link to `amulecmd`. Use the aMule install path for your build: `C:\Program Files\aMule\` on 64-bit aMule, or `C:\Program Files (x86)\aMule\` on a 32-bit build. Save it as `ed2k_remote.bat` in that folder:

```bat
@echo off
set link=%1
for /f "useback tokens=*" %%a in ('%link%') do set link=%%~a
"C:\Program Files\aMule\amulecmd.exe" /h SERVER /P PASSWORD /c "add %link%"
```

Replace `SERVER` with your home machine's IP or DNS name and `PASSWORD` with the External Connections password set in **Preferences → Remote Controls**. On a 32-bit build, change the path to `C:\Program Files (x86)\aMule\amulecmd.exe`.

Then register the scheme to call the batch file. Create `ed2k_remote.reg` (adjust the path on 32-bit builds):

```reg
REGEDIT4

[HKEY_CLASSES_ROOT\ed2k]
@="URL: ed2k Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\ed2k\DefaultIcon]
@="C:\\Program Files\\aMule\\amulegui.exe"

[HKEY_CLASSES_ROOT\ed2k\shell]
@="open"

[HKEY_CLASSES_ROOT\ed2k\shell\open]

[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\ed2k_remote.bat\" \"%1\""
```

Import the `.reg` file. As with local handling, every browser uses this handler and asks for confirmation the first time — tick **Remember** / **Always allow**.

### GNU/Linux

Register the `ed2k://` scheme (as in local handling) but point the handler at a script that calls `amulecmd` instead of `ed2k`. Create an executable wrapper:

```bash
#!/bin/bash
/path/to/amulecmd -h SERVER_IP -P PASSWORD -c "Add $1"
```

Replace `SERVER_IP` with your home machine's IP or DNS name and `PASSWORD` with the External Connections password (**Preferences → Remote Controls**). Make it executable with `chmod +x`, then set it as the `x-scheme-handler/ed2k` handler via a `.desktop` file (`Exec=/path/to/script %u`) and `xdg-mime default`, exactly as shown for local handling.
