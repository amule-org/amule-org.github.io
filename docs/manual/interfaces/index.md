---
id: index
title: aMule Modules
---

aMule ships several binaries, each serving a distinct role. They can be used independently or in combination.

| Binary | Description |
|---|---|
| [`amule`](./gui/amule.md) | All-in-one GUI client |
| [`amuled`](./amuled.md) | Headless daemon (no GUI); intended for servers and remote operation |
| [`amulegui`](./gui/amulegui.md) | Remote GUI that connects to a running `amuled` instance via the EC protocol |
| [`amuleweb`](./amuleweb.md) | HTTP web interface for a running `amuled` instance |
| [`amulecmd`](./amulecmd.md) | Interactive command-line interface for a running `amuled` instance |
| [`ed2k`](../utilities/ed2k.md) | Command-line tool for adding eD2k links to a running aMule instance |
| [`alc` / `alcc`](../utilities/alc-alcc.md) | GUI and command-line tools for generating ed2k links for local files |
| [`wxcas` / `cas`](../utilities/cas-wxcas.md) | Statistics tools that display aMule status from `amulesig.dat` |

## External Connections (EC) Protocol

The remote-control components (`amulegui`, `amuleweb`, `amulecmd`) all communicate with a running `amuled` (or `amule`) instance through the **[External Connections (EC) protocol](../../developer/ec-protocol.md)**. EC is a TCP-based binary protocol that carries authentication, commands, and status updates between the core and any remote interface.

To use any remote interface:

1. Enable **Accept External Connections** in Preferences → Remote Controls (or set `AcceptExternalConnections=1` in `amule.conf`).
2. Set an **EC password** in the same panel. The password is stored as an MD5 hash in `amule.conf`:
   ```bash
   echo -n yourpassword | md5sum | cut -d ' ' -f 1
   ```
3. Optionally restrict the listening interface to `127.0.0.1` if you only need local access.
4. The default EC port is **4712**.
