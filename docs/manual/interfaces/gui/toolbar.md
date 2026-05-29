---
id: toolbar
title: Toolbar
---

The toolbar provides one-click access to all major aMule windows and to the connect/disconnect action. It is normally positioned at the top of the main window but can be moved to the left side through **Preferences → General → Toolbar orientation**.

![Toolbar at the top of the aMule window](/img/docs/usage/window_toolbar1.jpg)

When positioned on the left side:

![Toolbar on the left side of the aMule window](/img/docs/usage/window_toolbar2.jpg)

## Buttons

### Connect / Disconnect

The leftmost button connects and disconnects aMule from all enabled networks. The networks that aMule is allowed to connect to are configured in **Preferences → Connections**.

**Disconnected** — when aMule is not connected to any network the button shows a connect icon:

![Connect button](/img/docs/usage/window_toolbar9.jpg)

Clicking it starts a connection attempt to all allowed networks. If no network is explicitly allowed, aMule defaults to the eD2k network. While connecting, the button changes to a **Cancel** button:

![Cancel connection button](/img/docs/usage/window_toolbar10.jpg)

Clicking Cancel while connecting aborts the attempt and returns aMule to the disconnected state.

**Connected** — once aMule connects to at least one network the button becomes a **Disconnect** button:

![Disconnect button](/img/docs/usage/window_toolbar11.jpg)

Clicking it disconnects aMule from all networks immediately.

### Window Buttons

The following buttons switch the main aMule window to the corresponding panel:

| Button | Panel |
|---|---|
| ![Networks](/img/docs/usage/window_toolbar3.jpg) | **[Networks](./networks.md)** — eD2k server list and Kademlia status |
| ![Searches](/img/docs/usage/window_toolbar4.jpg) | **[Searches](./searches.md)** — search for files on the eD2k and Kad networks |
| ![Transfers](/img/docs/usage/window_toolbar5.jpg) | **[Transfers](./transfers.md)** — active downloads and uploads |
| ![Shared Files](/img/docs/usage/window_toolbar6.jpg) | **[Shared Files](./shared-files.md)** — files you are currently sharing |
| ![Messages](/img/docs/usage/window_toolbar7.jpg) | **[Messages](./messages.md)** — chat and friends list |
| ![Statistics](/img/docs/usage/window_toolbar8.jpg) | **[Statistics](./statistics.md)** — speed graphs and detailed statistics |

### Access Buttons

The last three buttons open secondary windows:

| Button | Window |
|---|---|
| ![Preferences](/img/docs/usage/window_toolbar12.jpg) | **[Preferences](./preferences.md)** — all aMule settings |
| ![Import](/img/docs/usage/window_toolbar13.jpg) | **Import** — import eDonkey2000 part files (see [Import](../../migration/import.md)) |
| ![About](/img/docs/usage/window_toolbar14.jpg) | **About** — aMule version, copyright, contact information |

The About window:

![aMule About window](/img/docs/usage/window_toolbar15.jpg)

## Quick Reference

![Toolbar quick reference](/img/docs/usage/window_toolbar16.jpg)

| # | Description |
|---|---|
| 1 | Connect / Disconnect from all networks |
| 2 | Switch to Networks window |
| 3 | Switch to Searches window |
| 4 | Switch to Transfers window |
| 5 | Switch to Shared Files window |
| 6 | Switch to Messages window |
| 7 | Switch to Statistics window |
| 8 | Open Preferences |
| 9 | Open part-files importer |
| 10 | Open About window |
