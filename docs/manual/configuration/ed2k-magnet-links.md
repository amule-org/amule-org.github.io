---
id: ed2k-magnet-links
title: eD2k and Magnet Links
---

aMule adds files, servers and server lists from **links**. This page explains which links aMule accepts, every way to hand one to aMule, and how to register aMule with the operating system so that clicking a link in a browser or a file manager opens it in aMule.

aMule accepts:

- **eD2k links** — `ed2k://|file|…|/` (queued for download), `ed2k://|server|…|/` (added to the server list) and `ed2k://|serverlist|…|/` (the server list at that URL is downloaded and merged). No other eD2k link type is recognised. The syntax of each type is described in [eD2k Links](../../p2p-networks/ed2k/links.md).
- **Magnet links** — only [eD2k-compatible](#magnet-links) ones (`magnet:?…`). aMule converts them to an eD2k file link before queuing them.
- **eMule collections** — [`.emulecollection` files](#emulecollection-files), which bundle several eD2k file links; opening one queues every link it contains.

## Magnet Links

aMule is not a BitTorrent client: it can only use a magnet link that identifies the file on the eD2k network. A magnet link is accepted when it contains **both**:

- an `xt=urn:ed2k:<hash>` or `xt=urn:ed2khash:<hash>` parameter with the file's MD4 hash, and
- an `xl=<size>` parameter with the exact file size in bytes.

The other parameters are optional:

- `dn=<name>` — the file name (percent-encoded). Without it the download is named `FileName.ext`.
- `xt=urn:aich:<hash>` — the file's [AICH](../../p2p-networks/ed2k/aich.md) root hash (32 upper-case Base32 characters), used to verify and repair the download. A malformed value is ignored.

Every other parameter (`tr`, `xs`, `ws`, `xt=urn:btih:…`, …) is ignored. A magnet link that only carries a BitTorrent hash (`btih`) or lacks `xl` cannot be converted and is rejected with *Cannot convert magnet link to eD2k* in the log. The `magnet:` prefix and the parameter names are case-sensitive.

An eD2k-compatible magnet link looks like this:

```
magnet:?dn=ubuntu-26.04-desktop-amd64.iso&xt=urn:ed2k:26dfb3060428acece9ec8864de7126ae&xt=urn:ed2khash:26dfb3060428acece9ec8864de7126ae&xl=6518974464
```

This is the format produced by **Copy magnet URI to clipboard** in the [Downloads](../interfaces/gui/downloads.md) and [Shared Files](../interfaces/gui/shared-files.md) context menus: `dn`, the MD4 hash twice (as `urn:ed2k` and `urn:ed2khash`, for compatibility with other clients), `xl` and, when the file has a complete AICH hash set, an extra `xt=urn:aich:` parameter. The Web UI's **Copy magnet link** button builds the same link without the AICH hash.

The general structure of magnet URIs on the eD2k network is described in [eD2k Links → Magnet Links](../../p2p-networks/ed2k/links.md#magnet-links).

## Adding Links to aMule

| Method | Accepts | Category |
|---|---|---|
| Clicking a link in a browser or opening a collection in the file manager — requires [registering aMule](#registering-amule-as-the-link-handler) | eD2k, magnet, `.emulecollection` | Default |
| The **Fast eD2k Links Handler** field (*Paste eD2k or magnet links here*, **Add links**) — see [Searches → Miscellaneous](../interfaces/gui/searches.md#miscellaneous) | eD2k, magnet; one link per line | The category selected in [Downloads](../interfaces/gui/downloads.md) |
| Command-line arguments of [`amule`](../interfaces/gui/amule.md#starting-amule), [`amulegui`](../interfaces/gui/amulegui.md) and [`amuled`](../interfaces/amuled.md) | eD2k, magnet, `.emulecollection` | Default, or `-t <n>` |
| The [`ed2k`](../utilities/ed2k.md) command-line tool | eD2k, magnet, `.emulecollection` (`-e`) | Default, or `-t <n>` (not for `-e`) |
| [`amulecmd`](../interfaces/amulecmd.md): `add <link>` | eD2k, magnet | Default |
| The [Web UI](../interfaces/amuleapi/web-ui.md) link field and the REST endpoint `POST /api/v1/downloads` | eD2k | Default, or `category_index` in the REST API |
| The legacy [`amuleweb`](../interfaces/amuleweb.md) **Download link** form | eD2k | Chosen in its drop-down |
| The [`ED2KLinks` file](../utilities/ed2k.md#ed2klinks-file) | eD2k, magnet; one link per line | Default, or a `:<n>` suffix |

The Fast eD2k Links Handler is always shown in the Searches window; **[Preferences → Interface → Show "Fast eD2k Links Handler" in every window](../interfaces/gui/preferences.md#interface)** (on by default) shows it at the bottom of every window.

## Registering aMule as the Link Handler

A browser does not start aMule by itself: when you click an `ed2k://` or `magnet:` link it hands the link to the application **the operating system has registered for that URL scheme**, usually after a one-time confirmation ("Open aMule?"). Tick **Always allow** / **Remember my choice** so the browser stops asking. File managers work the same way for `.emulecollection` files.

aMule registers itself **per user**: no administrator rights are needed, and the setting is stored by the OS (the registry on Windows, LaunchServices on macOS, `mimeapps.list` on Linux and BSD), never in [`amule.conf`](./config-files/amule-conf.md). The three associations — `ed2k://` links, `magnet:` links and `.emulecollection` files — are turned on or off independently from:

- the Windows installer's [components](../installation/index.md#installer);
- the *Integrations (optional)* page of the [first-run wizard](../../quickstart-guide.md#integrations-optional);
- the **Register aMule for ed2k:// links**, **Register aMule for magnet: links** and **Open .emulecollection files with aMule** checkboxes in [Preferences → General](../interfaces/gui/preferences.md#general), which take effect immediately and ask before replacing another application's handler;
- the command line: `--configure-protocols=<value>` (`on`, `off`, `ed2k:on`, `ed2k:off`, `magnet:on` or `magnet:off`) and `--configure-file-assoc=on|off`, accepted by `amule` and `amulegui`.

The handler is the program that registered it: `amule`, or `amulegui` when registered from [`amulegui`](../interfaces/gui/amulegui.md), which then sends the clicked links to the connected core. If you run [`amuled`](../interfaces/amuled.md), register `amulegui` connected to it. With the [AppImage](../installation/index.md#desktop-integration), click **Install** in its *Add aMule to your application menu?* prompt first: registering needs the desktop entries it installs.

:::warning Magnet links and BitTorrent clients
Only one application can handle `magnet:` links. If you also use a BitTorrent client (qBittorrent, Transmission, …), leave **Register aMule for magnet: links** off: aMule cannot download BitTorrent content, so BitTorrent magnet links clicked in the browser would fail.
:::

On **macOS**, LaunchServices cannot remove a default handler: once aMule is the handler, the Preferences checkbox is hidden, and you hand the scheme back by making another application the default. See [macOS](./macos.md#handling-ed2k-and-magnet-links).

On **Linux and BSD**, to check which application currently handles each scheme:

```bash
xdg-mime query default x-scheme-handler/ed2k
xdg-mime query default x-scheme-handler/magnet
```

:::caution Flatpak
The [Flatpak](../installation/index.md#flatpak) cannot register itself from inside its sandbox: leave the aMule checkboxes off, which have no effect there, and register it from a host terminal instead:

```bash
xdg-mime default org.amule.aMule.desktop x-scheme-handler/ed2k
xdg-mime default org.amule.aMule.desktop x-scheme-handler/magnet
xdg-mime default org.amule.aMule.desktop application/x-emule-collection
```
:::

### What Happens When You Click a Link

On Windows, Linux and BSD, the OS starts the registered program with the link as its argument. That new process validates the link (converting a magnet link to an eD2k link), writes it to the [`ED2KLinks` file](../utilities/ed2k.md#ed2klinks-file) in the configuration directory and, if aMule is already running, tells it to raise its window and exits. The running instance reads the file about once a second and queues the links; if aMule was not running, the new process becomes the running instance. On macOS the link is sent to the app (starting it if needed), which writes it to the same file.

## `.emulecollection` Files

An eMule collection is a file that lists several eD2k file links, created by eMule or by **Export selected files to an emulecollection** in aMule's [Shared Files](../interfaces/gui/shared-files.md#collections) context menu. Opening one — double-clicking it after [registering](#registering-amule-as-the-link-handler) the association, passing it on the command line, or with [`ed2k -e`](../utilities/ed2k.md#options) — queues every link it contains in the default category (or the one given with `-t <n>` on the `amule`, `amulegui` or `amuled` command line). On Windows, aMule becomes the default for `.emulecollection` files only if no other program has claimed them; otherwise it is added to the **Open with** list.

## Manual Registration

The built-in registration always passes links to the **default** configuration directory. Register a handler by hand if you run aMule with a non-default configuration directory (`-c`), or if you want the scheme to call something else — for example the [`ed2k`](../utilities/ed2k.md) tool, or `amulecmd` for [remote handling](#remote-handling-with-amulecmd). The built-in registration (installer, wizard or Preferences) replaces a manual one, so leave those options off.

### Windows {#manual-windows}

Create a file named `ed2k.reg` (adjust the path if aMule is installed elsewhere):

```reg
REGEDIT4

[HKEY_CURRENT_USER\Software\Classes\ed2k]
@="URL: ed2k Protocol"
"URL Protocol"=""

[HKEY_CURRENT_USER\Software\Classes\ed2k\DefaultIcon]
@="C:\\Program Files\\aMule\\bin\\amule.exe"

[HKEY_CURRENT_USER\Software\Classes\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\bin\\ed2k.exe\" -c D:\\amule\\config \"%1\""
```

Double-click the `.reg` file to import it. The example calls `ed2k.exe` with `-c` for an aMule configuration directory in a non-default location (`D:\amule\config`). For `magnet:` links, repeat the keys with `magnet` in place of `ed2k`. Import it again after upgrading or reinstalling aMule: the uninstaller removes any `ed2k` or `magnet` registration whose command points into the aMule installation folder.

### Linux and BSD {#manual-linux-and-bsd}

Create a desktop entry such as `~/.local/share/applications/ed2k-custom.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=ed2k link handler
Exec=/path/to/handler %u
MimeType=x-scheme-handler/ed2k;x-scheme-handler/magnet;
NoDisplay=true
```

Then make it the default and refresh the desktop database:

```bash
xdg-mime default ed2k-custom.desktop x-scheme-handler/ed2k
xdg-mime default ed2k-custom.desktop x-scheme-handler/magnet
update-desktop-database ~/.local/share/applications
```

To point the schemes back at aMule, run the same `xdg-mime default` commands with `org.amule.aMule.desktop`, or tick the checkboxes in [Preferences → General](../interfaces/gui/preferences.md#general) again.

## Remote Handling with `amulecmd`

Remote handling lets you click a link on one computer and have it added to an aMule core running on another machine (for example, a home server). Register the scheme by hand, pointing at a wrapper that runs [`amulecmd`](../interfaces/amulecmd.md) with an `add` command; the core must accept [External Connections](../interfaces/amuled.md#configuration). Alternatively, run [`amulegui`](../interfaces/gui/amulegui.md) connected to the core and register it as the handler.

### Windows {#remote-windows}

Save this batch wrapper outside the aMule installation folder, for example as `C:\Users\<you>\ed2k_remote.bat`:

```bat
@echo off
set link=%1
for /f "useback tokens=*" %%a in ('%link%') do set link=%%~a
"C:\Program Files\aMule\bin\amulecmd.exe" -h SERVER -P PASSWORD -c "add %link%"
```

Replace `SERVER` with the core's IP or DNS name and `PASSWORD` with its External Connections password (**Preferences → Remote Controls**). Then register the scheme as in [Manual Registration → Windows](#manual-windows), with this command:

```reg
[HKEY_CURRENT_USER\Software\Classes\ed2k\shell\open\command]
@="\"C:\\Users\\<you>\\ed2k_remote.bat\" \"%1\""
```

### Linux and BSD {#remote-linux-and-bsd}

Create an executable wrapper:

```bash
#!/bin/bash
/path/to/amulecmd -h SERVER_IP -P PASSWORD -c "add $1"
```

Replace `SERVER_IP` and `PASSWORD` as above, make it executable with `chmod +x`, and register it as the handler as in [Manual Registration → Linux and BSD](#manual-linux-and-bsd) (`Exec=/path/to/script %u`).

## Troubleshooting

- **A BitTorrent magnet link does nothing.** aMule only handles [eD2k-compatible magnet links](#magnet-links). If aMule was already running, a rejected link is dropped without a message; paste it into the [Fast eD2k Links Handler](../interfaces/gui/searches.md#miscellaneous) to see the reason in the log.
- **Clicking a link opens another application.** Another program owns the scheme. Tick the checkbox again in [Preferences → General](../interfaces/gui/preferences.md#general), which asks before replacing it.

:::warning Firefox and `ed2k://`
Firefox 122 and later can mangle `ed2k://` links before they reach the OS handler. If clicking an `ed2k://` link in Firefox fails, copy the link and paste it into the [Fast eD2k Links Handler](../interfaces/gui/searches.md#miscellaneous), or use another browser.
:::
