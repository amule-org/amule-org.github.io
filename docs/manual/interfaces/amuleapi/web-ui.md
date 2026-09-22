---
id: web-ui
title: Web UI
---

The Web UI is a complete browser interface served by [`amuleapi`](./index.md). It is not a cut-down remote panel: it covers the same ground as the desktop [GUI](../gui/index.md) — networks, searching, downloads, shared files, clients, messaging, statistics and preferences — and is the recommended replacement for [`amuleweb`](../amuleweb.md).

:::note
This functionality is available from aMule 3.1.0 onwards.
:::

## Accessing the Web UI

`amuleapi` serves the Web UI itself, on its own HTTP port and the same origin as the REST API and the SSE stream. With a default configuration, open:

```
http://127.0.0.1:4713/
```

Replace `127.0.0.1` with the server's hostname or IP for [remote access](../../troubleshooting/remote-access.md) (put a reverse proxy in front to add TLS — see the [`amuleapi` security model](./index.md#security-model)).

The interface assets are found automatically when `[Server] StaticRoot` is empty: `amuleapi` discovers the installed `amuleapi-static` directory (searching the app bundle, the directory beside the binary, `AMULEAPI_STATIC_DIR`, and the resources directory). Set `StaticRoot` only to serve assets from a custom location.

**Logging in** is password-only — there is no username field. The password you enter selects your role: the **admin** password grants full access, the **guest** password (when one is set) grants read-only access. See [Authentication](./index.md#authentication) for how the session token is issued and stored.

![The aMule Web UI login screen](/img/docs/gui_amuleapi/amuleapi_web_ui_login.png)

## Sections

The navigation bar exposes the following sections:

- **[Networks](../gui/networks.md)** — eD2k server and Kademlia status, with log panes for the aMule log, server info and the per-network info grids.

  ![The Networks section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_networks.png)

- **[Search](../gui/searches.md)** — one tab per search, like the desktop's notebook, so several searches stay open at once.

  ![The Search section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_search.png)

- **[Downloads](../gui/downloads.md)** — the download queue with per-file controls. Category management is available inline here (it replaces the category tabs when *Manage categories* is toggled), and a detail panel below the list mirrors the desktop's [File Details](../gui/file-details.md) dialog for the selected download.

  ![The Downloads section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_downloads.png)

- **[Shared Files](../gui/shared-files.md)** — a sortable list of your shared files with per-file details.

  ![The Shared Files section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_shared_files.png)

- **[Clients](../gui/clients.md)** — active peers (all, downloads, or uploads) and the known-clients history, with a per-peer detail panel below the list that mirrors the desktop's [Client Details](../gui/client-details.md) dialog.

  ![The Clients section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_clients.png)

- **[Messages](../gui/messages.md)** — chat with peers and friends: the friends list on the left, conversations on the right.

  ![The Messages section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_messages.png)

- **[Statistics](../gui/statistics.md)** — the speed graphs and statistics tree.

  ![The Statistics section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_statistics.png)

- **[Preferences](../gui/preferences.md)** — aMule's configuration, including the shared-directories editor.

  ![The Preferences section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_preferences.png)

- **About** — version information, with an update-available banner and a warning when the Web UI and core versions differ.

  ![The About section of the Web UI](/img/docs/gui_amuleapi/amuleapi_web_ui_about.png)

## Features

- **Live, without polling.** The interface is driven by the [SSE stream](./index.md#server-sent-events); bursty deltas are coalesced so re-renders stay smooth. It falls back to periodic requests only if the stream fails repeatedly.
- **Themes.** System, light and dark — it follows the operating system by default and can be forced either way.
- **Download to your browser.** Finished shared files have a download button that streams the file straight to the browser, with the correct filename.
- **Country flags** on peers and servers, as the desktop lists show them.
- **Comments over SSE.** Kad notes and source comments appear on a file's Comments tab as they arrive, without polling.
- **Languages.** Internationalized, with support for multiple languages.
- **Responsive.** Usable down to phone width.

  ![The aMule Web UI on a smartphone](/img/docs/gui_amuleapi/amuleapi_web_ui_smartphone.png)
