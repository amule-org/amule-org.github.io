---
id: quickstart-guide
title: Getting Started
---

## What is aMule

aMule is a peer-to-peer (P2P) client for the [eD2k](https://en.wikipedia.org/wiki/EDonkey_network) network, commonly known as the eDonkey network or eD2k network (eDonkey2000). This guide does not require you to be familiar with these networks, but it does require that you have aMule installed on your computer. If you haven't installed aMule yet, please refer to the installation guide for your platform.

## Installation

If you haven't installed aMule yet, see the [Installation guide](./manual/installation/index.md) for platform-specific instructions.

## Running aMule for the first time

Launch aMule by running the command `amule` in a terminal, or by using whatever shortcut your desktop environment provides.

Once started, aMule will display a notification telling you that you are running it for the first time.

> **Note:** aMule makes extensive use of right-click context menus. If you can't find a function, try right-clicking on the item you wish to manipulate.

### Configuring aMule

Before you begin file sharing, you will need to properly configure aMule. This includes connection speeds and limits, directories, proxies, port settings and other options. Access [Preferences](./manual/interfaces/gui/preferences.md) by clicking the **Preferences** icon at the top of the aMule window. On macOS, click the **Tools** icon in the toolbar.

#### Connection Speed

The eDonkey network enforces upload. In order to download, you must share files yourself (don't worry if you don't have anything to share yet). This is enforced in two ways:

- Your download speed depends on how fast you upload. If your upload speed is set below 10 kB/s, your maximum download speed will be roughly 3–4× your upload speed. Limiting upload to 5 kB/s means you can only download at ~20 kB/s.
- Partially downloaded files are shared automatically once you have received at least one chunk (a chunk is a 9.28 MB piece of a file).

When you first open the [Preferences](./manual/interfaces/gui/preferences.md) dialog, the **General** page is shown. To configure bandwidth, click the **Connection** tab:

![Bandwidth limits dialog](/img/docs/bandwidth_limits.png)

aMule ships with both upload and download caps **disabled by default** (`MaxUpload=0`, `MaxDownload=0` — both interpreted as literal unlimited). On a connection that aMule can saturate, this means aMule will eat all the bandwidth available to it, starving every other application sharing the link; an uncapped upload can also slow down your own downloads (saturated upstream kills the TCP ACKs that drive your downloads). **Setting realistic limits is strongly recommended.**

Under **Bandwidth Limits** — the **Upload** and **Download** fields — set both to roughly **80% of your actual line speed**. Values are in **kilobytes per second** (kB/s); ISP advertised speeds are usually in **megabits per second** (Mbps). To convert, multiply Mbps by **125**.

> **Example**: a 100 Mbps / 20 Mbps fibre line → roughly 12,500 kB/s downstream and 2,500 kB/s upstream. Set the limits to about **10,000 down / 2,000 up** to stay below the line cap.

Once you have entered the correct values, click **OK** to save.

### ED2K and Kademlia

aMule can connect to two networks simultaneously:

- **ED2K** — the classic server-based eDonkey network.
- **Kademlia (Kad)** — a serverless distributed network. This allows aMule and other eDonkey clients to function without relying on centralised servers.

Both networks are enabled by default. You can disable either from the lower part of the **Connection** [preferences](./manual/interfaces/gui/preferences.md#connection) page. Users with slow upload speeds should consider enabling only one network to reduce overhead.

### Connecting to a Server

After opening aMule you should see the [Networks](./manual/interfaces/gui/networks.md) window:

![Empty server list](/img/docs/serverlist_empty.png)

The server list is empty on first run. To populate it, click the text field that contains the URL (e.g. `https://upd.emule-security.org/server.met`) and press Enter. A dialog will appear briefly while the list downloads.

![Server list populated via ED2K](/img/docs/serverlist_ed2k.png)

Once you have a list of servers, click the large **Connect** button near the top-left of the window to connect to a random server. aMule will contact servers and establish a connection — wait until it reports a successful connection before proceeding.

### Connecting to the Kademlia Network

To connect to the Kademlia network (when it is enabled in preferences), press the **Connect** button on the top toolbar. Note that manually connecting to a specific ED2K server by double-clicking it does **not** connect you to Kademlia.

Alternatively, go to the **Kad** sub-page of the [Networks](./manual/interfaces/gui/networks.md) window and press **Bootstrap from known clients**. If this is your first time using Kad, update your `nodes.dat` file by clicking the URL text field and pressing Enter. You do not need to repeat this later — aMule keeps the node list updated while it is running.

![Kademlia network page](/img/docs/serverlist_kad.png)

### High and Low ID

Because P2P networks require clients to connect directly to each other, being behind a firewall or a router that blocks specific ports can cause problems.

Check the globe icon in the bottom-right corner of the window:

- **Green arrows** — you have a **[High ID](p2p-networks/ed2k/high-id.md)** and full connectivity. Proceed normally.
- **Yellow arrows** — you have a **[Low ID](p2p-networks/ed2k/high-id.md)**. A Low ID greatly reduces P2P performance. You will need to open and forward ports 4662 (TCP), 4665 (UDP), and 4672 (UDP) in your router or firewall. See [Network Connectivity](manual/configuration/network-connectivity.md) for step-by-step instructions.

## Basic Usage

### Searching and Downloading

To search for a file, make sure you are connected to a server or the Kademlia network, then click the **Searches** button to open the [Searches](./manual/interfaces/gui/searches.md) window:

![Search dialog](/img/docs/search_dialog.png)

To narrow results by type, check **Extended Parameters** and choose a **File Type** from the dropdown (e.g. *CD-Images*). Select a search type:

- **Local** — asks only the currently connected ED2K server. Fast and sufficient in most cases.
- **Global** — asks all servers in your server list. Slower (approximately 0.75 s per server).
- **Kad** — searches the Kademlia network.

Enter a search term in the **Name** field and press Enter or click **Search**:

![Search results](/img/docs/search_results.png)

Click **Sources** twice to sort by popularity. Double-click a result (or select it and click **Download**) to queue it for download.

Result colours:

- **Blue** — file is not yet downloaded. The brighter/more vivid the blue, the more sources it has; files with few sources appear dark navy or black.
- **Red** — file is already in your download queue.
- **Green** — file you have already downloaded or shared.
- **Magenta** — file was queued for download but was cancelled.

#### Advanced Searches

aMule supports Boolean search expressions using `AND`, `OR`, and `NOT`. Expressions can be grouped with parentheses:

```
(knoppix AND V5.1.1) OR (knoppix AND V6.0)
```

#### Filtering Results

Use the filter field in the search dialog to remove unwanted results. The field accepts regular expressions ([wxRegEx](https://docs.wxwidgets.org/stable/overview_resyntax.html) syntax). By default the filter removes anything that does **not** match; this behaviour can be inverted.

Examples:

| Expression | Effect |
|---|---|
| `porn\|sex` | Removes entries containing "porn" or "sex" |
| `^word` | Removes entries that begin with "word" |
| `word$` | Removes entries that end with "word" |

### Search Types

| Type | Description |
|---|---|
| **Local** | Queries only the currently connected server. Fast; sufficient in most cases. |
| **Global** | Queries every server in your list (~0.75 s per server). Use when Local returns no results. |
| **Kad** | Queries the Kademlia network. Results represent complete sources only (unlike ED2K, which counts both complete and incomplete sources). |

### The Download Queue

Click the **Downloads** button to open the [Downloads](./manual/interfaces/gui/downloads.md) window and see your queued downloads:

![Transfer queue](/img/docs/transfers_queue.png)

If the progress bar turns a dark blue, many sources have that file. Avoid files with red segments — red means no known source has that part, and the download is unlikely to complete.

Double-click any file to inspect the sources found for it.

#### Download Queue Columns

| Column | Description |
|---|---|
| **Filename** | Name of the file. |
| **Size** | File size. The eD2k network supports files up to 4 GB. |
| **Transferred** | Total bytes received so far. |
| **Completed** | How much of the file is actually complete. May be less than *Transferred* if corrupted data was received and discarded. |
| **Progress** | Visual progress bar. Blue = sources available (darker = more sources); Red = no source has this part; Black = already downloaded; Yellow = currently downloading. The thin green bar on top shows overall completion. |
| **Sources** | Format: `<Asked>[/All] [+A4AF] [(Transferring)]`. *Asked* = sources that have been queried; *All* = all known sources; *A4AF* = sources asked for another file; *Transferring* = sources uploading to you right now. |
| **Priority** | Download priority. Auto-priority (default) lets aMule manage allocation automatically. Higher-priority files attract more sources. |
| **Status** | Current state of the download. *Waiting* means aMule is waiting for a source to start uploading. |
| **Time Remaining** | Estimated time to completion. Only shown when actively receiving data. |
| **Last Seen Complete** | Last time a source had the complete file. |
| **Last Reception** | Last time data was received for this file. |

### The Upload Queue

The upload queue appears below the download queue and shows clients currently downloading files from you. You cannot manually stop uploads.

Click the blue icon next to the **Uploads** label to toggle between viewing active uploaders and the clients queued and waiting to download from you.

### Icons and What They Signify

The Transfers page uses small icons to indicate the state of each source connection.

**Source status**

| Icon meaning | Description |
|---|---|
| Sending | Client is sending you a file or a hashset. |
| Queued / Asking | You are in this client's queue or currently requesting a file from it. |
| Connecting | You are currently connecting to this client. |
| Unavailable | Client has been asked for another file, has no needed parts, or cannot be reached (Low ID). |
| Unknown | Status is unknown. |

**Client type**

| Client | Description |
|---|---|
| aMule | aMule client |
| [eDonkey2000](./p2p-networks/ed2k/clients.md#edonkey2000-20002005) | Original eDonkey client |
| [eMule](./p2p-networks/ed2k/clients.md#emule-2002present) | eMule client |
| [lphant](./p2p-networks/ed2k/clients.md#lphant-20052009) | lphant client |
| [mlDonkey](./p2p-networks/ed2k/clients.md#mldonkey-2001present) | mlDonkey client |
| [Shareaza](./p2p-networks/ed2k/clients.md#shareaza-20022017) | Shareaza client |
| [xMule](./p2p-networks/ed2k/clients.md#xmule-20032009) | xMule client |
| Friend | Client marked as a Friend |
| Unknown | Unrecognised client |

**Modifier overlays**

| Overlay | Meaning |
|---|---|
| eMule protocol | Client supports extended eMule protocol extensions (source sharing, etc.). |
| Good credit | Client has a good credit rating. |
| Normal credit | Client has a normal credit rating. |
| Secure ID (good) | Client has been securely identified. |
| Secure ID (bad) | Client has been flagged as a bad actor. |

### Categories for Downloads

Downloads can be assigned to named categories, each with a unique colour and a separate save folder.

- **Create a category:** right-click the **All** tab (below the toolbar on the Transfers page) and select **Add Category**.
- **Assign a file:** right-click a download in the list, then choose a category from **Assign to Category**. Select *Unassigned* to use the default category.
- **Filter by category:** left-click any category tab to show only its files. Right-click the **All** tab and use **Select view filter** for additional filtering options.

### Where Are The Files?

aMule uses a **Temporary directory** for in-progress downloads and an **Incoming directory** for completed files. Both can be changed in **Preferences → Directories**. See [Directories](./manual/configuration/directories.md) for the default paths on each platform.

If a directory named `config` exists next to the aMule executable, configuration files are stored there instead — useful for running aMule from a USB drive.

If you have incomplete downloads from eMule, copy their temp files into aMule's Temp directory and aMule will resume them.

### Sharing Files

The eD2k network is optimised for large files, not small clips or documents. It is **your** responsibility to ensure that you do not violate any laws regarding the material you share.

There are two ways to share files:

**1. Place files in the Incoming directory**

Copy files to your Incoming directory (see [Directories](./manual/configuration/directories.md#incoming-directory) for the path on your platform). Then either restart aMule or press the **Reload** button on the [Shared Files](./manual/interfaces/gui/shared-files.md) page:

![Reload shared files button](/img/docs/reload_button.png)

**2. Add shared directories in Preferences**

Click [**Preferences → Directories**](./manual/interfaces/gui/preferences.md#directories):

![Preferences — Directories page](/img/docs/prefs_directories.png)

Browse to the directory you want to share. Double-click a folder to share it, or right-click to share it recursively (including all subdirectories).

## Conclusion

This guide has covered the essentials for getting aMule up and running: configuring bandwidth, connecting to the ED2K and Kademlia networks, searching for and downloading files, and sharing your own content. If you find anything missing or unclear, contributions are welcome.
