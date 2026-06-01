---
id: index
title: Interfaces
---

aMule can be operated in two fundamental ways: as a single **all-in-one application** that bundles the core engine and a graphical interface in one process, or as a **headless core** (`amuled`) that runs on its own and is driven through one of several **remote interfaces**. Pick the combination that fits your setup — a desktop machine, a headless server or NAS, or remote access from a browser or terminal.

## Graphical interface (GUI)

The [GUI](./gui/index.md) is shared by two clients that present the exact same panels and windows:

| Client | Description |
|---|---|
| [`amule`](./gui/amule.md) | All-in-one GUI client that bundles the core and the interface in a single process |
| [`amulegui`](./gui/amulegui.md) | Remote GUI that connects to a running `amuled` instance via the EC protocol |

See the [GUI section](./gui/index.md) for day-to-day usage of the interface: toolbar, networks, searching, downloads, shared files, messaging, statistics, preferences, and appearance.

## Headless daemon and remote interfaces

For servers, NAS devices, or any machine without a desktop, run the headless core and control it remotely:

| Interface | Description |
|---|---|
| [`amuled`](./amuled.md) | Headless daemon — the aMule core with no GUI; intended for servers and remote operation |
| [`amulegui`](./gui/amulegui.md) | Graphical remote client (same interface as `amule`) |
| [`amuleweb`](./amuleweb.md) | HTTP web interface accessible from any browser |
| [`amulecmd`](./amulecmd.md) | Interactive command-line interface, also usable in scripts and cron jobs |

## External Connections (EC) Protocol

The remote interfaces (`amulegui`, `amuleweb`, `amulecmd`) all communicate with a running `amuled` (or `amule`) instance through the **[External Connections (EC) protocol](../../developer/ec-protocol.md)**. EC is a TCP-based binary protocol that carries authentication, commands, and status updates between the core and any remote interface.

To use any remote interface:

1. Enable **Accept External Connections** in [Preferences → Remote Controls](./gui/preferences.md#remote-controls) (or set `AcceptExternalConnections=1` in [`amule.conf`](../configuration/config-files/amule-conf.md)).
2. Set an **EC password** in the same panel. The password is stored as an MD5 hash in `amule.conf`:
   ```bash
   echo -n yourpassword | md5sum | cut -d ' ' -f 1
   ```
3. Optionally restrict the listening interface to `127.0.0.1` if you only need local access.
4. The default EC port is **4712**.

## See also

aMule also ships several standalone **[Utilities](../utilities/ed2k.md)** (`ed2k`, `alc`/`alcc`, `wxcas`/`cas`) for tasks such as adding eD2k links, generating links for local files, and displaying statistics.
