---
id: shortcuts
title: Keyboard and Mouse Shortcuts
---

aMule provides a set of built-in keyboard and mouse shortcuts for navigating and controlling the application. These shortcuts are hard-coded and cannot be customized or reassigned.

## Window Shortcuts

Each main window has an `Alt`+letter shortcut, also shown in the tooltip of its [toolbar](./toolbar.md) button:

| Shortcut | Opens |
|---|---|
| `Alt+N` | [Networks](./networks.md) |
| `Alt+S` | [Searches](./searches.md) |
| `Alt+T` | [Downloads](./downloads.md) |
| `Alt+F` | [Shared Files](./shared-files.md) |
| `Alt+C` | [Clients](./clients.md) |
| `Alt+M` | [Messages](./messages.md) |
| `Alt+G` | [Statistics](./statistics.md) |
| `Alt+P` | [Preferences](./preferences.md) |

On macOS these shortcuts use the `⌥` (Option) key and are also listed in a native **Navigate** menu in the menu bar, with the same entries in the same order (see [macOS](../../configuration/macos.md#menu-bar)).

## Keyboard Shortcuts

| Shortcut | Window | Action |
|---|---|---|
| `Enter` | [Networks](./networks.md) / eD2k | Connect to the selected server |
| `Enter` | [Searches](./searches.md) | Start a search (search box), apply the filter at once (filter box), or download/expand the selected result |
| `Enter` | [Downloads](./downloads.md) / [Shared Files](./shared-files.md) | Open the selected file if it is complete, preview it if it is unfinished and a preview is possible, otherwise show its [file details](./file-details.md) |
| `Enter` | Client lists ([Clients](./clients.md), download sources, [Shared Files](./shared-files.md) clients) | Show the [client details](./client-details.md) |
| `Enter` | [Messages](./messages.md) | Open a chat with the selected friend |
| `Del` | [Downloads](./downloads.md) / [Networks](./networks.md) / [Messages](./messages.md) | Remove the selected item, after confirmation: cancel the download, remove the server, or remove the friend |
| *Any character* | All lists | Jump to the item whose first-column value starts with the typed string (resets after 1.5 s; pressing the same letter repeatedly cycles through matches) |
| `Ctrl+A` | All lists | Select all items in the current list (`⌘A` on macOS) |
| `Shift+F10` or `Menu` key | All lists | Open the context menu of the selected item |
| `Ctrl+C` | [Networks](./networks.md) / ED2K Info / Kad Info | Copy the selected rows (or the whole panel) to the clipboard as tab-separated `label`/`value` pairs |
| `Ctrl+Q` | All | Exit aMule (`⌘Q` on macOS) |
| `F1` | All | Open the online documentation in your browser (only when no modifier key is held) |
| `F2` | [Downloads](./downloads.md) | Rename the selected download (part files only, not completed files) |
| `F2` | [Shared Files](./shared-files.md) | Rename the selected shared file |

## Mouse Shortcuts

| Shortcut | Window | Action |
|---|---|---|
| Double-click | [Networks](./networks.md) / eD2k | Connect to the selected server |
| Double-click | [Searches](./searches.md) | Download the selected result (or expand/collapse it if it has children) |
| Double-click | [Downloads](./downloads.md) / [Shared Files](./shared-files.md) | Open the file if it is complete, preview it if it is unfinished and a preview is possible, otherwise show its [file details](./file-details.md) |
| Double-click | Client lists ([Clients](./clients.md), download sources, [Shared Files](./shared-files.md) clients) | Show the [client details](./client-details.md) |
| Middle-click | Download sources / [Shared Files](./shared-files.md) clients | Show the [client details](./client-details.md) |
| Double-click | [Messages](./messages.md) | Open a chat with the selected friend |
| Double-click | [Statistics](./statistics.md) | Expand or collapse the selected statistics node |
| Hover | [Statistics](./statistics.md) / Kad graph | Show the values of each line at that point in time |
| Click on a column header | All lists | Sort the list by that column (toggles ascending/descending) |
| Right-click on a column header | All lists | Show a menu to toggle which columns are visible |
| Right-click on an item | All | Open the item's context menu |
| Right-click → Copy | [Networks](./networks.md) / ED2K Info / Kad Info | Copy the selected rows (or the whole panel) to the clipboard |
| Middle-click on a tab | [Searches](./searches.md) / [Messages](./messages.md) | Close the tab |
| Right-click on a tab | [Searches](./searches.md) / [Messages](./messages.md) | Open the tab menu |
| Double-click (or, where supported, click) | [System tray icon](./tray-icon.md) | Show or hide the main window (see [Mouse Clicks](./tray-icon.md#mouse-clicks)) |
