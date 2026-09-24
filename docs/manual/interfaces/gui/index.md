---
id: index
title: GUI — amule & amulegui
---

The graphical interface is shared by the all-in-one [`amule`](./amule.md) client and the remote [`amulegui`](./amulegui.md) client: both present the same panels and windows. The pages below document day-to-day usage of that interface — its elements, searching and downloading files, managing shared content, messaging, statistics, configuration, and appearance.

## The GUI clients

| Page | Description |
|---|---|
| [`amule`](./amule.md) | All-in-one GUI client that bundles the core and interface in one process |
| [`amulegui`](./amulegui.md) | Remote GUI that connects to a running `amuled` instance via the EC protocol |

## Interface elements

| Page | Description |
|---|---|
| [Toolbar](./toolbar.md) | Window-switching buttons and access buttons |
| [Status Bar](./statusbar.md) | Network status, user/file counts, speed indicators, and globe icon |
| [System Tray Icon](./tray-icon.md) | Tray icon colours, tooltip, and right-click menu |

## Networks & searching

| Page | Description |
|---|---|
| [Networks](./networks.md) | eD2k and Kademlia network status and controls |
| [Searches](./searches.md) | Search types, extended parameters, result filtering and tabs |

## Downloads, files & clients

| Page | Description |
|---|---|
| [Downloads](./downloads.md) | Download queue, source list, categories, and transfer management |
| [Shared Files](./shared-files.md) | Shared files panel, per-file controls, statistics, and how to configure shared directories |
| [Clients](./clients.md) | Active clients split by direction and the known-clients history |
| [File Details](./file-details.md) | File properties window: status, sources, ICH stats, rename, and comments |
| [Client Details](./client-details.md) | Client details window: identity, transfer history, and queue scores |
| [Comments](./comments.md) | Comments and ratings window; comment/rating icons in the download queue |
| [Priority](./priority.md) | Download and upload priority levels: Auto, Very Low, Low, Normal, High, Very High, Release |

## Communication & statistics

| Page | Description |
|---|---|
| [Messages](./messages.md) | Messaging system, friends list, chat tabs, and friend slots |
| [Statistics](./statistics.md) | Statistics window: speed graphs and the detailed statistics tree |

## Configuration & appearance

| Page | Description |
|---|---|
| [Preferences](./preferences.md) | Preferences window: all configuration panels and options |
| [Skins](./skins.md) | Installing and applying aMule bitmap skins and GTK themes |

## Reference

| Page | Description |
|---|---|
| [Keyboard & Mouse Shortcuts](./shortcuts.md) | Complete shortcut reference |

## Working with lists

Every major list in the interface — servers, search results, downloads and their sources, shared files, clients, friends and the file-names list in [File Details](./file-details.md) — is built on the same list control and behaves the same way:

- **Sorting** — click a column header to sort by that column; click it again to reverse the order. Sorting is live: rows are re-sorted as their values change.
- **Choosing columns** — right-click a column header to show or hide columns. Column widths, hidden columns and the sort order are remembered between sessions.
- **Type to jump** — with the list focused, type the first letters of an entry to jump to it.
- **Context menus** — right-click a row, or press `Shift+F10` or the `Menu` key, to open its context menu.

See [Keyboard & Mouse Shortcuts](./shortcuts.md) for the full list.

The interface follows the system's light or dark appearance, and the lists paint their colour-coded text (for example the [search result colours](./searches.md#result-row-colours)) in shades that stay readable on either background. On Windows this requires a build against wxWidgets 3.3 or later.
