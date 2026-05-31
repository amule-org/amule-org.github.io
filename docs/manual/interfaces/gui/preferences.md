---
id: preferences
title: Preferences
---

The **Preferences** dialog controls every aspect of aMule's behaviour. Open it from the toolbar's **Preferences** button or from the menu.

![aMule Preferences dialog overview](/img/docs/configuration/window_prefs1.jpg)

Settings are grouped into sections. Click the appropriate section in the list on the left side of the window to view its options.

![Preferences section list](/img/docs/configuration/window_prefs32.jpg)

## General

Options regarding general aspects of aMule.

![General preferences tab](/img/docs/configuration/window_prefs2.jpg)

| Setting | Description |
|---|---|
| **Nick** | Username displayed to other clients on the network. |
| **Language** | Language for the aMule interface. On UNIX systems this requires the appropriate `LC_ALL` (or `LC_MESSAGES`) environment variable. *System default* uses the system's language. |
| **Check for new versions at startup** | When aMule starts it checks whether new releases are available and displays a message if so. |
| **Start minimized** | Minimize aMule to the taskbar when it starts. |
| **Prompt on exit** | Show a confirmation dialog when closing aMule. |
| **Enable Tray Icon** | Show a system tray icon for aMule. |
| **Minimize to trayicon** | When minimizing aMule, hide the window completely so it can only be restored from the tray icon. Requires **Enable Tray Icon** to be enabled. |
| **Tooltip Delay Time in secs** | Number of seconds before the tray tooltip appears. |
| **Browser Selection** | Browser to use when aMule opens web sites. |
| **Custom Browser** | Command to start a custom browser. Active only when *Custom browser* is selected above. Use the Browse button to locate the browser executable. |
| **Open in new tab if possible** | Open web sites in a new browser tab rather than the current page. |

## Connection

Options regarding aMule's network connections.

![Connection preferences tab](/img/docs/configuration/window_prefs3.jpg)

### Bandwidth Limits

| Setting | Description |
|---|---|
| **Download** | Maximum download speed to allow (KiB/s). `0` = unlimited. |
| **Upload** | Maximum upload speed to allow (KiB/s). `0` = unlimited. |
| **Slot Allocation** | Target speed per allocated upload slot (KiB/s). |

### Line Capacities

These values are only used for Statistics and the speed bar in the SysTray icon — they do not throttle transfers.

| Setting | Description |
|---|---|
| **Download** | Total download speed your connection is capable of (KiB/s). |
| **Upload** | Total upload speed your connection is capable of (KiB/s). |

### Ports

| Setting | Description |
|---|---|
| **Standard client TCP Port** | The [standard eD2k client TCP port](../../../p2p-networks/ed2k/index.md). Default: 4662. |
| **Extended client UDP Port** | The [extended client UDP port](../../../p2p-networks/ed2k/index.md). Default: 4672. |
| **disable** | Disable the Extended client UDP port. This reduces aMule's performance but frees a UDP port. |
| **UDP port for extended server requests** | Read-only display. This port is always TCP port + 3 (default 4665). |

### Limits

| Setting | Description |
|---|---|
| **Max Sources per File** | Maximum number of sources remembered for each file. |
| **Connection Limits** | Maximum number of simultaneous connections. |

### Networks

| Setting | Description |
|---|---|
| **ED2K** | Enable the eD2k network. If disabled, connection is only possible by explicitly using the Networks window. |
| **Kademlia** | Enable the Kademlia network. If disabled, connection is only possible by explicitly using the Networks window. |
| **Autoconnect on startup** | Connect aMule to the enabled networks when it starts. |
| **Reconnect on loss** | Attempt to connect to a server when disconnected. On error it reconnects to the same server; on explicit server disconnect it tries another server. |
| **Show overhead bandwidth** | Show protocol overhead bandwidth in the Status bar. |

## Proxy

Options for connecting through a proxy server. See [Proxy configuration](../../configuration/proxy.md) for a full explanation of how the proxy feature works.

![Proxy preferences tab](/img/docs/configuration/window_prefs4.jpg)

### General

| Setting | Description |
|---|---|
| **Enable Proxy** | Enable the use of a proxy. |
| **Proxy type** | Protocol of the proxy (SOCKS4, SOCKS5, or HTTP). |
| **Proxy host** | Hostname or IP address of the proxy server. |
| **Proxy port** | Port through which the proxy is accessed. |

### Authentication

| Setting | Description |
|---|---|
| **Enable authentication** | Use a username and password to log into the proxy. If disabled, anonymous login is performed. |
| **Username** | Username to log into the proxy. |
| **Password** | Password to log into the proxy. |

| Setting | Description |
|---|---|
| **Automatic server connect without proxy** | This option is currently ignored. |

## Message Filter

Options for filtering incoming chat messages.

![Message Filter preferences tab](/img/docs/configuration/window_prefs5.jpg)

| Setting | Description |
|---|---|
| **Filter incoming messages** | Enable message filtering with the rules below. Messages already open in the Messages window will not be closed. |
| **Filter all messages** | Ignore all incoming messages. |
| **Filter messages from people not on your friend list** | Ignore all messages from users not in the friends list. |
| **Filter messages from unknown clients** | Ignore messages from clients not in any of your upload or download queues. |
| **Filter messages containing** | Ignore messages containing any of the comma-separated strings listed in the box below. All other characters are treated as part of the filter string. |

## Remote Controls

Options for controlling aMule remotely via the web interface or external connections.

![Remote Controls preferences tab](/img/docs/configuration/window_prefs6.jpg)

### Webserver Parameters

| Setting | Description |
|---|---|
| **Webserver port** | Port where `amuleweb` listens for incoming connections. |
| **Page Refresh Time** | Time between page refreshes in `amuleweb` (seconds). |
| **Enable Gzip compression** | Compress packets transferred between aMule and `amuleweb`. |
| **Enable Low rights User** | Enable a low-privilege account for `amuleweb` with view-only access. |
| **Full rights password** | Password for administration access to `amuleweb`. |
| **Low rights password** | Password for the view-only account. |
| **Web template** | Template (skin) to use for the web interface. |

### External Connection Parameters

| Setting | Description |
|---|---|
| **Accept external connections** | Allow aMule to accept External Connection requests from remote applications (`amuleweb`, `amulegui`, `amulecmd`). |
| **IP of the listening interface** | IP address of the host running aMule. Optional. |
| **TCP port** | TCP port where aMule listens for external connections. |
| **Password** | Password remote applications must supply to connect. |

## Online Signature

Options for the [Online Signature](../../utilities/cas-wxcas.md) feature used by CAS and wxCAS.

![Online Signature preferences tab](/img/docs/configuration/window_prefs7.jpg)

| Setting | Description |
|---|---|
| **Enable Online-Signature** | Enable aMule to write the Online Signature file. |
| **Update Frequency** | Interval (seconds) between Online Signature updates. |
| **Online Signature Directory** | Directory where the Online Signature file is written. |

## Server

Options for connecting aMule to eD2k servers.

![Server preferences tab](/img/docs/configuration/window_prefs8.jpg)

| Setting | Description |
|---|---|
| **Remove dead server after n retries** | Number of times a server is allowed to fail a connection or ping before being removed from the server list. After n+1 attempts it is deleted. |
| **Auto-update serverlist at startup** | Download the server list from one or more URLs at startup. Click the **List** button to edit URLs. |
| **Update serverlist when connecting to a server** | After connecting to a server, request its full list of known servers and add any new entries. |
| **Update serverlist when a client connects** | When connecting to a client, request its server ID and add it if not already known. |
| **Use priority system** | Assign Low/Normal/High priority to servers via right-click. aMule contacts servers in priority order. |
| **Use smart LowID check on connect** | Not in use. |
| **Safe connect** | When enabled, aMule tries to connect to one server at a time. When disabled, it makes two simultaneous attempts. |
| **Autoconnect to servers in static list only** | aMule attempts to connect only to servers marked as static. |
| **Set manually added servers to High Priority** | Servers added manually get High priority. The priority can be changed later. |

## Files

Options for downloading files.

### Intelligent Corruption Handling

| Setting | Description |
|---|---|
| **I.C.H. active** | Enable [Intelligent Corruption Handling](../../../p2p-networks/ed2k/aich.md). |
| **AICH trusts every hash** | When unchecked (recommended), aMule applies sanity checks to received AICH hashes instead of blindly trusting them. |

### Download Behaviour

| Setting | Description |
|---|---|
| **Add files to download in pause mode** | Newly added downloads start in the paused state. |
| **Add files to download with auto priority** | Newly added downloads get automatic priority. |
| **Try to download first and last chunks first** | Always try to download the beginning and end of files first. Useful for previewing audio and video files. |
| **Add new shared files with auto priority** | Files added to shared directories, or completed downloads, get automatic share priority. |
| **Try to transfer full chunks to all uploads** | (Recommended) Once uploading to a client, no other client can take that slot until the full chunk is delivered. |
| **Start next paused file when a file completed** | When a file completes, automatically resume the highest-priority paused file. |
| **From the same category** | When the above option is enabled, resume the highest-priority paused file in the same category (if one exists). |
| **Save 10 sources on rare files** | On shutdown, save 10 sources for files with few sources so they can be reused on next startup. |

### Disk Space

| Setting | Description |
|---|---|
| **Check Disk Space** | Stop downloads when free disk space would fall below the minimum. |
| **Min Disk Space** | Minimum free disk space (MB) that must remain available. |

### Execute Command on File Completion

| Setting | Description |
|---|---|
| **Enable command execution** | Execute a command each time a file completes downloading. |
| **Command** | Command to execute on completion. The following substitutions are available: `%FILE` (full path), `%NAME` (filename only), `%SIZE` (size in bytes), `%HASH` (file hash). |

See [Events](../../configuration/events.md) for a more flexible event system that also covers chat notifications and disk-space alerts.

## Sources Dropping

Options for the source-dropping algorithm — what aMule does with sources it no longer needs.

![Sources Dropping preferences tab](/img/docs/configuration/window_prefs10.jpg)

| Setting | Description |
|---|---|
| **Sources with no needed file-parts** | What aMule does with sources for a file where you already have all the parts those sources possess. |
| **Enable auto drop Full Queue Sources** | Ignore sources whose upload queue is full. |
| **Enable auto drop High Queue Rating Sources** | Ignore sources that have given you a queue rank higher than the value in *High Queue Rating value*. |
| **Auto Drop Sources Timer** | Time (seconds) a source can be known before being ignored. |

## Directories

Options for aMule's file system paths.

![Directories preferences tab](/img/docs/configuration/window_prefs11.jpg)

| Setting | Description |
|---|---|
| **Incoming Directory** | Directory where completed files are stored. |
| **Temporary Directory** | Directory where incomplete downloads are placed. |
| **Shared Directories** | Directories whose files are shared with the network. Double-click an icon to select a directory; right-click to select all contents recursively. |
| | **Normal font** — directory is not shared. **Bold font** — directory is shared. **Yellow folder** — no subdirectories marked as shared. **Red folder** — subdirectories are marked as shared. |
| **Share hidden files** | Include hidden files from shared directories. |
| **Video Player** | Command to execute when previewing an audio or video file. The filename is appended to the command. |
| **Create Backup to preview** | Copy the file to a temporary location before previewing, to avoid conflicts with the download process. |

## Statistics

Options for aMule's statistics display.

![Statistics preferences tab](/img/docs/configuration/window_prefs12.jpg)

| Setting | Description |
|---|---|
| **Graphs Update delay** | Refresh interval for statistics graphs (seconds). |
| **Time for average graph** | Time interval used to calculate running averages in graphs. |
| **Connections Graph Scale** | Maximum number of connections the connections graph can represent. |
| **Select Statistics Colors** | Select colours for each item in the statistics display. Choose the item from the menu, then click **Select**. |
| **Statistics Tree Update delay** | Refresh interval for the statistics tree. |
| **Number of Client Versions shown** | Maximum number of client versions displayed for each client application in the statistics tree. |

## Security

Options for aMule's security features, including IP filtering.

### File Options

| Setting | Description |
|---|---|
| **Who can see shared files** | Controls who can browse your shared files. Hiding them from everyone is recommended. |
| **Default Permissions — Files** | Permissions assigned to newly created files. Note: this may conflict with your system `umask`. |
| **Default Permissions — Directories** | Permissions assigned to newly created directories. Note: this may conflict with your system `umask`. |

### IP-Filtering

| Setting | Description |
|---|---|
| **Enable IP-Filtering** | Enable filtering of IPs known to be bad. |
| **Reload List** | Reload the filtered IP list and verify all connections are filtered correctly. |
| **Auto-update ipfilter at startup** | Download the IP filter list from the URL in the **URL** box at startup. |
| **Update now** | Immediately update the IP filter from the URL in the **URL** box. |
| **Filtering Level** | Select the filtering level. See [IPFilter](../../configuration/ipfilter.md) for details. |
| **Always filter LAN IPs** | Always filter IPs that claim to be on your local LAN. |

### Identification

| Setting | Description |
|---|---|
| **Use Secure Identification** | Use the [Secure User Identification](../../../p2p-networks/ed2k/secure-user-identification.md) protocol when identifying to other clients. Recommended. |

## GUI Tweaks

Advanced options for aMule's graphical interface.

![GUI Tweaks preferences tab](/img/docs/configuration/window_prefs14.jpg)

### Download Queue — Files Progress

| Setting | Description |
|---|---|
| **Show percentage** | Display the completed percentage for each file in the download queue, above the progress bar. |
| **Show progressbar** | Show a progress bar indicating chunk availability for each file in the download queue. |
| **Progressbar Style** | Select the progress bar style when **Show progressbar** is enabled. |

### Skin Support

| Setting | Description |
|---|---|
| **Use skin file to set aMule bitmaps** | Enable bitmap skinning. See [Skins](./skins.md). |
| **Skin file** | Path to the skin zip file to use. |

### Misc GUI Tweaks

| Setting | Description |
|---|---|
| **Auto-sort files in the download queue** | Resort the download list more frequently. Not recommended — high CPU usage. |
| **Show Fast ED2K Links Handler** | Show the ED2K Link Handler in all windows, not only the Searches window. |
| **Show extended info on categories tabs** | Display the number of downloading files and total files in each category tab title. |
| **Show transfer rates on title** | Show transfer speeds in the window title bar. |
| **Vertical toolbar orientation** | Show the toolbar vertically (enabled) or horizontally (disabled). |

## Core Tweaks

Advanced options for aMule's core engine.

![Core Tweaks preferences tab](/img/docs/configuration/window_prefs15.jpg)

| Setting | Description |
|---|---|
| **Max new connections / 5 secs** | Maximum number of new connections to establish per 5-second window. |
| **File Buffer Size** | Maximum amount of memory (bytes) each file can use for write buffering. |
| **Upload Queue Size** | Maximum number of clients that can be queued in the upload queue. |
| **Server connection refresh interval** | Ping interval to the server (seconds), to avoid being disconnected due to inactivity. |

## Debugging

Advanced options for logging and debugging aMule.

![Debugging preferences tab](/img/docs/configuration/window_prefs16.jpg)

Enable **Enable Verbose Debug-Logging** to write extra debug output to the aMule log. Once enabled, select exactly which categories of debug messages to include in the **Message Categories** list.

This section is intended for developers and advanced troubleshooting only. The options will not be described further here.

## Events

Configure actions aMule takes when specific events occur, such as sending an email notification when a download completes or when disk space runs out.

See the dedicated [Events](../../configuration/events.md) page for a full description of event types, variables, and example scripts.
