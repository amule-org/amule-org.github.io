---
id: macos
title: macOS
---

This guide covers macOS-specific considerations when using aMule: activating context menus with a single-button mouse, configuring the built-in macOS firewall, handling [`ed2k://` links](../utilities/ed2k.md) from the browser, and setting up video preview.

## Right-Click / Context Menus

Many of aMule's features are only accessible through **right-click context menus** — for example:

- Pausing or cancelling a download.
- Changing the upload or download [priority](../interfaces/gui/priority.md) of a file.
- Viewing [file details](../interfaces/gui/file-details.md) or [client details](../interfaces/gui/client-details.md).

On a modern trackpad or Magic Mouse, a normal secondary-click (two-finger tap, or right side) opens these menus. If you have a **single-button mouse** without secondary-click enabled, activate them by holding **Control** on the keyboard and clicking.

There are no visible indicators showing where context menus are available. Experiment by control-clicking on:
- Any list of files, clients, or servers.
- The column header labels at the top of any list (e.g., "File Name", "Size").
- The "All" bar at the top of the download window.

## Setting Up Firewall Access

What actually matters for incoming connections is **port forwarding on your router** (forward aMule's TCP and UDP ports — default **4662/TCP** and **4672/UDP**, configured in **Preferences → Connection**).

The macOS built-in firewall is **off by default**, and when enabled it works **per application**, not per port — there is no place to type a port number. If you have turned it on, allow the aMule application through it:

1. Open **System Settings → Network → Firewall** (on macOS 12 and earlier: **System Preferences → Security & Privacy → Firewall**).
2. Click **Options…**.
3. Add `aMule.app` to the list and set it to **Allow incoming connections**.

You can verify the ports are reachable using the Test Port tool (see [Troubleshooting → Remote Access](../troubleshooting/remote-access.md)).

## Handling ed2k Links

Current macOS builds of aMule do **not** register themselves as the handler for the `ed2k://` URL scheme, so clicking an `ed2k://` link in your browser will not open aMule directly (see the [`ed2k` link handler reference](../utilities/ed2k.md#macos) for details). Instead, use one of these three ways to add files:

### 1. Search Inside aMule

Use aMule's built-in [Searches](../interfaces/gui/searches.md) window to find files directly. No browser integration needed.

### 2. Paste into the ED2K-Link Handler

Copy an `ed2k://` link from a web page and paste it into the **ED2K-Link Handler** field at the bottom of the Searches window, then press the commit button.

:::note
If the link is longer than the input field, make the aMule window wider until the full link fits (you can widen it beyond the screen edge if necessary). Partial links are not accepted.
:::

### 3. Use the ED2KLinks File

Open a text editor (e.g., TextEdit) and paste `ed2k://` links — one per line — into the file:

```
~/Library/Application Support/aMule/ED2KLinks
```

aMule monitors this file and automatically processes any links found in it. You can also queue links from a terminal with the bundled [`ed2k` command-line tool](../utilities/ed2k.md).

## Setting Up Video Preview

You can preview incomplete video downloads with a media player like VLC or MPlayer. To configure this:

aMule's default video-player command is a Linux-style command (`xterm … mplayer`) that does **not** work on macOS, so on macOS you must fill this field in manually with an `open`-based command:

1. Open **[Preferences](../interfaces/gui/preferences.md) → General**.
2. Under **Video Player**, enter the path to open your player with the `/usr/bin/open -a` command:

| Player | Video Player field value |
|---|---|
| VLC | `/usr/bin/open -a "/Applications/VLC.app"` |
| IINA | `/usr/bin/open -a "/Applications/IINA.app"` |
| Default app for file type | `/usr/bin/open` |

Using just `/usr/bin/open` (without `-a`) tells macOS to open the file with whatever application is registered as the default for that file type in Finder.

The command also supports the `%PARTFILE` and `%PARTNAME` placeholders, which aMule replaces with the path of the file being previewed; if neither is present, the file path is appended to the command.
