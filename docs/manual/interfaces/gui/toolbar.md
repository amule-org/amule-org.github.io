---
id: toolbar
title: Toolbar
---

The toolbar provides one-click access to all major aMule windows and dialogs. It is normally positioned at the top of the main window but can be moved to the left side by enabling **[Preferences → Interface → Vertical toolbar orientation](./preferences.md#interface)**.

![aMule toolbar](/img/docs/gui_toolbar/toolbar.png)

The icons are drawn from vector (SVG) artwork, so they stay sharp at any display scaling (hi-DPI). A [skin](./skins.md) can still replace them with its own bitmaps.

## Window Buttons

The following buttons switch the main aMule window to the corresponding panel. Each one also has an `Alt`+letter [keyboard shortcut](./shortcuts.md#window-shortcuts), shown in its tooltip (`⌥`+letter on macOS):

| Button | Shortcut | Opens |
|---|---|---|
| **Networks** | `Alt+N` | [Networks panel](./networks.md) — eD2k server list and Kademlia status. Disabled when both networks are disabled in [Preferences](./preferences.md#networks) |
| **Searches** | `Alt+S` | [Searches panel](./searches.md) — search for files on the eD2k and Kad networks |
| **Downloads** | `Alt+T` | [Downloads panel](./downloads.md) — download queue and its sources |
| **Shared files** | `Alt+F` | [Shared Files panel](./shared-files.md) — files you are currently sharing |
| **Clients** | `Alt+C` | [Clients panel](./clients.md) — active clients and the known-clients history |
| **Messages** | `Alt+M` | [Messages panel](./messages.md) — chat and friends list |
| **Statistics** | `Alt+G` | [Statistics panel](./statistics.md) — speed graphs and detailed statistics |

When a chat message arrives while the Messages panel is not visible, the **Messages** button blinks (see [Detecting Incoming Messages](./messages.md#detecting-incoming-messages)).

## Access Buttons

The last buttons, after the separator, open secondary windows:

| Button | Shortcut | Opens |
|---|---|---|
| **Preferences** | `Alt+P` | [Preferences window](./preferences.md) — all aMule settings |
| **Import** | — | [Part-file importer](../../migration/import.md) — import eDonkey2000 part files. Not available in [`amulegui`](./amulegui.md). |
| **About** | — | About window — aMule version, copyright, and links to the website, forum, documentation and issue tracker |

In builds with the new-version check (the official release bundles; builds from OS package managers usually leave it out), the About window also has a **Check for updates** button that reports whether you are running the latest release or which newer version is available.

## Connecting to Networks

The toolbar has no Connect / Disconnect button since aMule 3.1.0: each network has its own **Connect** / **Disconnect** button on its tab of the [Networks](./networks.md) window, and the [system tray menu](./tray-icon.md#context-menu) offers **Connect** / **Disconnect** for all networks at once.
