---
id: macos
title: macOS Usage
---

This guide covers macOS-specific considerations when using aMule: activating context menus with a single-button mouse, configuring the built-in macOS firewall, handling `ed2k://` links from the browser, and setting up video preview.

## Right-Click / Context Menus

Many of aMule's features are only accessible through **right-click context menus** — for example:

- Pausing or cancelling a download.
- Changing the upload or download [priority](./priority.md) of a file.
- Viewing [file details](./file-details.md) or [client details](./client-details.md).

If you have a **single-button mouse**, activate these menus by holding **Control** on the keyboard and clicking.

There are no visible indicators showing where context menus are available. Experiment by control-clicking on:
- Any list of files, clients, or servers.
- The column header labels at the top of any list (e.g., "File Name", "Size").
- The "All" bar at the top of the download window.

## Setting Up Firewall Access

In addition to configuring port forwarding on your router, you need to allow aMule through the macOS built-in firewall.

1. Open **Apple Menu → System Preferences**.
2. Click **Security**.
3. Click the **Firewall** tab.
4. Click **New…** on the right side of the tab. A drop-down dialog appears.
5. Set:
   - **Port Name**: Other
   - **TCP Port Number(s)**: the same port number configured in aMule's **Preferences → Connection** (default: 4662)
   - **Description**: something recognisable, e.g., `aMule`
6. Click **OK**.
7. Back on the Firewall tab, make sure the port you just created (**aMule**) is **checked**.

You can verify the port is reachable using the Test Port tool (see **Troubleshooting → Remote Access**).

## Handling ed2k Links

There are four ways to add files to aMule from `ed2k://` links in the browser or on web pages:

### 1. Search Inside aMule

Use aMule's built-in [Searches](./searches.md) window to find files directly. No browser integration needed.

### 2. Paste into the ED2K-Link Handler

Copy an `ed2k://` link from a web page and paste it into the **ED2K-Link Handler** field at the bottom of the Searches window, then press the commit button.

:::note
If the link is longer than the input field, make the aMule window wider until the full link fits (you can widen it beyond the screen edge if necessary). Partial links are not accepted.
:::

### 3. Import via Browser Integration

For direct browser-to-aMule link passing, see the [aMule forum thread on browser integration](http://forum.amule.org/index.php?topic=5679.0) for platform-specific instructions.

### 4. Use the ED2KLinks File

Open a text editor (e.g., TextEdit) and paste `ed2k://` links — one per line — into the file:

```
~/Library/Application Support/aMule/ED2KLinks
```

aMule monitors this file and automatically processes any links found in it.

### 5. Set ed2k as a Handled Protocol (More Internet / RCDefaultApp)

Install **More Internet Preference Pane** or **RCDefaultApp** and configure it to handle `ed2k://` links using:

```
/Applications/aMule.app/Contents/MacOS/ed2kHelperScript.app
```

This lets you click `ed2k://` links in the browser and have them sent directly to aMule.

## Setting Up Video Preview

You can preview incomplete video downloads with a media player like VLC or MPlayer. To configure this:

1. Open **Preferences → General**.
2. Under **Video Player**, enter the path to open your player with the `/usr/bin/open -a` command:

| Player | Video Player field value |
|---|---|
| VLC | `/usr/bin/open -a "/Applications/VLC.app"` |
| VLC (alternative path) | `/usr/bin/open -a "/Applications/vlc-0.8.4a/VLC.app"` |
| MPlayer OS X | `/usr/bin/open -a "/Applications/MPlayer OS X 2.0b8r5/MPlayer OS X 2.app"` |
| Default app for file type | `/usr/bin/open` |

Using just `/usr/bin/open` (without `-a`) tells macOS to open the file with whatever application is registered as the default for that file type in Finder.
