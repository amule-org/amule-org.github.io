---
id: amulegui
title: amulegui — Remote GUI
---

`amulegui` is a standalone graphical client that connects to a running [`amuled`](../amuled.md) (or to a monolithic [`amule`](./amule.md) core) over the network using the [External Connections (EC) protocol](../../../developer/ec-protocol.md). It provides almost the same interface as the `amule` client, but without running the core locally.

## Overview

`amulegui` is the preferred option when you want a full graphical interface to a headless `amuled` running on a remote machine, or on the same machine in a different session. Because the core runs as a separate process, you can keep `amuled` running 24/7 and attach or detach the GUI whenever you like.

If your connection to the `amuled` host is slow or unreliable, consider using [`amulecmd`](../amulecmd.md) (CLI) or [`amuleweb`](../amuleweb.md) (browser) instead, as those interfaces transfer less data per interaction.

### Known Limitations

- **Kad search results cannot be expanded**: the **More** button in the search panel is disabled in remote-GUI mode, because `amulegui` has no direct access to the Kademlia layer of the remote core.
- Feature parity with the local `amule` GUI is the design goal but may lag behind in practice.

## Installation

See [Installation](../../installation/index.md) for pre-built packages, or [Compilation](../../../developer/compilation/index.md) to build `amulegui` from source.

## Configuration

Before `amulegui` can connect, the core (`amuled` or `amule`) must have External Connections enabled and a password configured.

### Configuring the core

1. In [`~/.aMule/amule.conf`](../../configuration/config-files/amule-conf.md), set:

   ```ini
   [ExternalConnect]
   AcceptExternalConnections=1
   ECPassword=<md5hash>
   ECPort=4712
   ```

2. Generate the MD5 hash of your chosen password:

   ```bash
   echo -n yourpassword | md5sum | cut -d ' ' -f 1
   ```

   Paste the result (without trailing whitespace) as the value of `ECPassword`.

3. To allow connections only from the local machine:

   ```ini
   ECAddress=127.0.0.1
   ```

### Connecting amulegui to the core

When `amulegui` starts, it presents a connection dialog.

![amulegui connection dialog](/img/docs/gui_amulegui/amulegui_connect.png)

Enter:
- **Host/IP** — hostname or IP address of the machine running the core (default: `127.0.0.1`).
- **Port** — EC port (default: `4712`).
- **Password** — the plaintext password (not the MD5 hash); `amulegui` hashes it internally before sending. A non-empty password is required.
- **Force ZLIB compression** — traffic is compressed with zlib by default, except when the core resolves to a local/LAN address (where compression is skipped); tick this to compress regardless — useful when the core is reachable over a VPN tunnel that resolves to a LAN IP.

Tick the **Save** checkbox to store the host, port, hashed password and the **Force ZLIB compression** choice (persisted as [`/EC/ForceZLIB`](../../configuration/config-files/remote-conf.md#ec-section)) so they are reused on the next launch. With saved settings in place you can start with the `-s`/`--skip` flag (see below) to bypass the dialog entirely.

If the connection fails or times out, see [Remote Access Troubleshooting](../../troubleshooting/remote-access.md).

## Interface

Once connected, the interface is the same as the monolithic `amule` client, with the same panels (Networks, Searches, Downloads, Shared Files, Messages, Statistics). Full documentation for each panel is in the [GUI](./index.md) guides.

## Command-Line Options

| Flag | Description |
|---|---|
| `-h`, `--help` | Display usage information and exit. |
| `-v`, `--version` | Display the current version number and exit. |
| `-c`, `--config-dir <dir>` | Read config from `<dir>` instead of `~/.aMule`. |
| `-o`, `--log-stdout` | Print log messages to stdout. |
| `-r`, `--reset-config` | Reset config to default values (the old config is backed up as `.backup`). |
| `-s`, `--skip` | Skip the connection dialog and connect using the saved settings. |
| `--geometry <geom>` | Set the window geometry, using the standard X11 format `[=][<width>{xX}<height>][{+-}<xoffset>{+-}<yoffset>]`. |
| `-t`, `--category <num>` | Category for passed eD2k links (default: `0`). |

You can also pass one or more [eD2k links](../../../p2p-networks/ed2k/links.md) as arguments to enqueue them into the connected core:

```bash
amulegui -t 1 "ed2k://|file|example.iso|123456|<hash>|/"
```
