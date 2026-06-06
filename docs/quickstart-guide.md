---
id: quickstart-guide
title: Getting Started
---

This guide walks you through running [aMule](./index.md) for the first time, from setting your speed limits to downloading and sharing your first files. You don't need to be familiar with the underlying networks to follow it, but you do need aMule installed on your computer.

Each step links to the detailed reference pages in the [User Manual](./manual/index.md) if you want to go deeper.

:::tip
aMule makes extensive use of right-click context menus. If you can't find a function, try right-clicking on the item you wish to manipulate.
:::

## 1. Install aMule

If you haven't installed aMule yet, see the [Installation guide](./manual/installation/index.md) for platform-specific instructions.

Launch aMule from your desktop environment's menu, or by running [`amule`](./manual/interfaces/gui/amule.md) in a terminal. The first time it starts, aMule shows a notification telling you that you are running it for the first time.

## 2. Set your speed limits

aMule ships with both upload and download caps **disabled by default** (unlimited). On a connection that aMule can saturate this is rarely what you want: it can starve every other application sharing the link, and an uncapped upload can even slow down your own downloads. **Setting realistic limits is strongly recommended.**

Open [Preferences](./manual/interfaces/gui/preferences.md) (the **Preferences** icon at the top of the window; on macOS, the **Tools** icon), then click the **Connection** tab and set the [Bandwidth Limits](./manual/interfaces/gui/preferences.md#bandwidth-limits):

![Bandwidth limits dialog](/img/docs/quickstart/preferences_bandwidth.png)

Set both **Upload** and **Download** to roughly **80% of your actual line speed**. Values are in **kilobytes per second** (kB/s), while ISP speeds are usually advertised in **megabits per second** (Mbps) — to convert, multiply the Mbps figure by **125**.

> **Example**: a 600 Mbps / 100 Mbps fibre line ≈ 75,000 kB/s down / 12,500 kB/s up. Set the limits to about **60,000 down / 10,000 up** to stay below the line cap.

:::note
The eD2k network rewards sharing: your maximum download speed is tied to your upload limit. See [Slow Download Speeds](./manual/troubleshooting/slow-speeds.md) for the details.
:::

## 3. Connect to the networks

aMule can connect to two networks at the same time, and both are enabled by default:

- **[eD2k](./p2p-networks/ed2k/index.md)** — the classic server-based eDonkey network.
- **[Kademlia (Kad)](./p2p-networks/kademlia.md)** — a serverless, distributed network that works without relying on central servers.

You can disable either one in the lower part of the **Connection** [preferences](./manual/interfaces/gui/preferences.md#connection) page.

Open the [Networks](./manual/interfaces/gui/networks.md) window. To populate the eD2k server list, click the URL text field at the top (e.g. `https://upd.emule-security.org/server.met`) and press Enter. Once the list downloads, click the large **Connect** button near the top-left to connect to both enabled networks:

![Server list populated via ED2K](/img/docs/quickstart/networks_upper_ed2k.png)

Wait until aMule reports a successful connection before searching; the status bar at the bottom of the window shows your eD2k server and Kad state once you are connected. For Kad, the **Connect** button is enough on first run; for manual control and updating your `nodes.dat`, see the [Networks](./manual/interfaces/gui/networks.md) page.

### High or Low ID

P2P networks need clients to reach each other directly, so a firewall or router that blocks aMule's ports can cause problems. Check the [globe icon](./manual/interfaces/gui/statusbar.md#globe-icon) in the bottom-right corner of the window:

![Network connection status in the status bar](/img/docs/quickstart/statusbar_networks.png)

- **Green arrows** — you have a **[High ID](./p2p-networks/ed2k/high-id.md)** and full connectivity. Proceed normally.
- **Yellow arrows** — you have a **[Low ID](./p2p-networks/ed2k/high-id.md)**, which greatly reduces performance. You'll need to open and forward aMule's ports. See [Network Connectivity](./manual/configuration/network-connectivity.md) for step-by-step instructions.

## 4. Search and download

Once connected, click the **Searches** button to open the [Searches](./manual/interfaces/gui/searches.md) window. Enter a term in the **Name** field, pick a search type, and press Enter:

![Search dialog](/img/docs/search_dialog.png)

- **Local** — asks only the server you are currently connected to. Fast and usually enough.
- **Global** — asks every server in your list. Slower, but broader.
- **Kad** — searches the Kademlia network.

Double-click a result (or select it and click **Download**) to queue it:

![Search results](/img/docs/search_results.png)

Results are colour-coded: **blue** = not downloaded (brighter blue = more sources), **red** = already in your queue, **green** = already downloaded or shared, **magenta** = previously cancelled.

The Searches page also supports [Boolean expressions](./manual/interfaces/gui/searches.md#search-logic-boolean-operators) (`AND`, `OR`, `NOT`), file-type and size [filters](./manual/interfaces/gui/searches.md#extended-parameters), and a [regular-expression result filter](./manual/interfaces/gui/searches.md#filtering).

## 5. Manage your downloads

Click the **Downloads** button to open the [Downloads](./manual/interfaces/gui/downloads.md) window and watch your queued files:

![Transfer queue](/img/docs/transfers_queue.png)

A quick way to read the progress bar: dark blue means many sources have the file, while **red segments mean no known source has that part** — those downloads are unlikely to complete. Double-click any file to inspect its sources.

The Downloads page documents the [columns](./manual/interfaces/gui/downloads.md), source [icons](./manual/interfaces/gui/downloads.md), and [categories](./manual/interfaces/gui/downloads.md#categories) — named groups, each with its own colour and save folder — in full.

### Where your files go

aMule keeps in-progress downloads in a **Temporary** directory and finished files in an **Incoming** directory. Both can be changed in **Preferences → Directories**; see [Directories](./manual/configuration/directories.md) for the default paths on each platform.

## 6. Share files

It is **your** responsibility to ensure that you do not violate any laws regarding the material you share. There are two ways to share files:

1. **Place files in your Incoming directory.** Copy files there (see [Directories](./manual/configuration/directories.md#incoming-directory) for the path on your platform), then press the **Reload** button on the [Shared Files](./manual/interfaces/gui/shared-files.md) page:

   ![Reload shared files button](/img/docs/quickstart/shared_files_reload_button.png)

2. **Add shared directories in Preferences.** Open [**Preferences → Directories**](./manual/interfaces/gui/preferences.md#directories), browse to a folder, and double-click it to share it (or right-click to share it recursively, including subdirectories).

## Next steps

You now have aMule configured, connected, downloading, and sharing. To go further:

- [Graphical interface reference](./manual/interfaces/gui/index.md) — every window, button and preference in detail.
- [Configuration](./manual/configuration/index.md) — directories, firewall, UPnP, proxy and more.
- [Troubleshooting](./manual/troubleshooting/index.md) and the [FAQ](./manual/faq.md) — for slow speeds, Low ID, and other common problems.
- [Remote interfaces](./manual/interfaces/index.md) — run aMule headless ([`amuled`](./manual/interfaces/amuled.md)) and control it from a [web interface](./manual/interfaces/amuleweb.md) or the [command line](./manual/interfaces/amulecmd.md).
- [P2P Networks](./p2p-networks/index.md) — how the eD2k and Kademlia networks actually work.
