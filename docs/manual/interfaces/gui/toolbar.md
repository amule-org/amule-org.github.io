---
id: toolbar
title: Toolbar
---

The toolbar provides one-click access to all major aMule windows and to the connect/disconnect action. It is normally positioned at the top of the main window but can be moved to the left side by enabling **[Preferences → Interface → Vertical toolbar orientation](./preferences.md#interface)**.

![aMule toolbar](/img/docs/gui_toolbar/toolbar.png)

## Connect / Disconnect

The leftmost button connects and disconnects aMule from all enabled networks. The networks that aMule is allowed to connect to are configured in **[Preferences → Connection → Networks](./preferences.md#networks)**. The button has three states:

| Icon | State | Description |
|---|---|---|
| ![Connect](/img/docs/gui_toolbar/toolbar_connect.png) | **Disconnected** | aMule is not connected to any network. Clicking the button starts a connection attempt to all allowed networks. If neither the eD2k nor the Kad network is enabled in [Preferences](./preferences.md#networks), the button is disabled. |
| ![Cancel](/img/docs/gui_toolbar/toolbar_cancel.png) | **Connecting** | A connection attempt is in progress. Clicking **Cancel** aborts the attempt and returns aMule to the disconnected state. |
| ![Disconnect](/img/docs/gui_toolbar/toolbar_disconnect.png) | **Connected** | aMule is connected to at least one network. Clicking **Disconnect** disconnects aMule from all networks immediately. |

## Window Buttons

The following buttons switch the main aMule window to the corresponding panel:

| Button | Opens |
|---|---|
| **Networks** | [Networks panel](./networks.md) — eD2k server list and Kademlia status |
| **Searches** | [Searches panel](./searches.md) — search for files on the eD2k and Kad networks |
| **Downloads** | [Downloads panel](./downloads.md) — active downloads and uploads |
| **Shared Files** | [Shared Files panel](./shared-files.md) — files you are currently sharing |
| **Messages** | [Messages panel](./messages.md) — chat and friends list |
| **Statistics** | [Statistics panel](./statistics.md) — speed graphs and detailed statistics |

## Access Buttons

The last three buttons open secondary windows:

| Button | Opens |
|---|---|
| **Preferences** | [Preferences window](./preferences.md) — all aMule settings |
| **Import** | [Part-file importer](../../migration/import.md) — import eDonkey2000 part files |
| **About** | About window — aMule version, copyright, and contact information |
