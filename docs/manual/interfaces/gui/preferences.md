---
id: preferences
title: Preferences
---

The **Preferences** dialog controls every aspect of aMule's behaviour. Open it from the toolbar's **Preferences** button or from the menu.

Settings are grouped into sections. Click the appropriate section in the list on the left side of the window to view its options. The sections appear in the order described below.

## General

Options regarding general aspects of aMule.

![General preferences tab](/img/docs/gui_preferences/preferences_general.png)

| Setting | Description |
|---|---|
| **Nick** | Username displayed to other clients on the network. |
| **Language** | Language for the aMule interface. On UNIX systems this requires the appropriate `LC_ALL` (or `LC_MESSAGES`) environment variable. *System default* uses the system's language. |
| **Check for new version at startup** | When aMule starts it checks whether new releases are available and displays a message if so. |
| **Start aMule automatically when I log in** | Launch aMule automatically when you log in to your desktop session. |
| **Start minimized** | Minimize aMule to the taskbar when it starts. |
| **Prompt on exit** | Show a confirmation dialog when closing aMule. |
| **Enable Tray Icon** | Show a system tray icon for aMule. |
| **Hide application window when close button is pressed** | Instead of quitting, hide aMule to the tray icon when the window's close button is pressed. Requires **Enable Tray Icon**. |
| **Minimize to Tray Icon** | When minimizing aMule, hide the window completely so it can only be restored from the tray icon. Requires **Enable Tray Icon**. |
| **Show notifications when finished downloading** | Display a desktop notification each time a download completes. |
| **Tooltip delay time** | Number of seconds before the tray tooltip appears. |
| **Browser Selection** | Command used to start the browser aMule opens web sites with. Use the **Browse** button to locate the browser executable. |
| **Open in new tab if possible** | Open web sites in a new browser tab rather than the current page. |
| **Video Player** | Command to execute when previewing an audio or video file. The default is `mplayer -idx`. Use the **Browse** button to locate the player executable. |

## Connection

Options regarding aMule's network connections.

![Connection preferences tab](/img/docs/gui_preferences/preferences_connection.png)

### Bandwidth limits

| Setting | Description |
|---|---|
| **Download** | Maximum download speed to allow (kB/s). `0` = unlimited. |
| **Upload** | Maximum upload speed to allow (kB/s). `0` = unlimited. |
| **Slot Allocation** | Target speed per allocated upload slot (kB/s). |

These values are in **kilobytes per second** (kB/s), while ISP speeds are usually advertised in **megabits per second** (Mbps). To convert, multiply the Mbps figure by **125** (e.g. a 100 Mbps line ≈ 12,500 kB/s). A good starting point is roughly **80% of your actual line speed**. See [Slow Download Speeds](../../troubleshooting/slow-speeds.md) for why setting realistic limits matters.

### Ports

| Setting | Description |
|---|---|
| **Standard TCP Port** | The [standard eD2k client TCP port](../../../p2p-networks/ed2k/index.md). Default: 4662. |
| **UDP port for server requests (TCP+3)** | Read-only display. This port is always the standard TCP port + 3 (default 4665). |
| **Extended UDP port (Kad / global search)** | Enable and set the [extended client UDP port](../../../p2p-networks/ed2k/index.md) used for Kad and global searches. Default: 4672. Unchecking it frees a UDP port but reduces aMule's performance. |
| **Enable UPnP for router port forwarding** | Ask a UPnP-capable router to forward aMule's ports automatically. |
| **UPnP TCP Port (Optional)** | External TCP port to request from the router via UPnP. Default: 50000. |

### Limits

| Setting | Description |
|---|---|
| **Bind local address to IP (empty for any)** | IP address of the local interface aMule should bind to. Leave empty to use any interface. |
| **Max sources per downloading file** | Maximum number of sources remembered for each file. Default: 300. |
| **Max simultaneous connections** | Maximum number of simultaneous connections. Default: 500. |

### Networks

| Setting | Description |
|---|---|
| **Kademlia** | Enable the Kademlia network. If disabled, connection is only possible by explicitly using the Networks window. |
| **ED2K** | Enable the eD2k network. If disabled, connection is only possible by explicitly using the Networks window. |
| **Autoconnect on startup** | Connect aMule to the enabled networks when it starts. |
| **Reconnect on loss** | Attempt to connect to a server when disconnected. On error it reconnects to the same server; on explicit server disconnect it tries another server. |

## Directories

Options for aMule's file system paths. For full details — default locations on each platform, per-category incoming folders, and how shared directories work — see [Directories](../../configuration/directories.md).

![Directories preferences tab](/img/docs/gui_preferences/preferences_directories.png)

| Setting | Description |
|---|---|
| **Destination folder for downloads** | Directory where completed files are stored. All files in this folder are shared with other peers. |
| **Folder for temporary download files** | Directory where incomplete downloads are placed. |
| **Shared folders** | Directories whose files are shared with the network. Right-click a folder icon to select all its contents recursively. |
| | **Normal font** — directory is not shared. **Bold font** — directory is shared. **Yellow folder** — no subdirectories marked as shared. **Red folder** — subdirectories are marked as shared. |
| **Share hidden files** | Include hidden files from shared directories. |
| **Automatically rescan shared folders for changes** | Periodically rescan the shared folders so files added or removed outside aMule are picked up automatically. |
| **Follow symbolic links in shared folders** | Follow symbolic links (to files or directories) when scanning shared folders. Enabled by default; disable it to skip symlinked entries. |

## Servers

Options for connecting aMule to eD2k servers.

![Servers preferences tab](/img/docs/gui_preferences/preferences_servers.png)

| Setting | Description |
|---|---|
| **Remove dead server after _n_ retries** | Number of times a server is allowed to fail a connection or ping before being removed from the server list. After n+1 attempts it is deleted. |
| **Auto-update server list at startup** | Download the server list from one or more URLs at startup. Click the **List** button to edit URLs. |
| **Update server list when connecting to a server** | After connecting to a server, request its full list of known servers and add any new entries. |
| **Update server list when a client connects** | When connecting to a client, request its server ID and add it if not already known. |
| **Use priority system** | Assign Low/Normal/High priority to servers via right-click. aMule contacts servers in priority order. |
| **Use smart LowID check on connect** | Perform a smart check for a LowID when connecting to a server. |
| **Safe connect** | When enabled, aMule tries to connect to one server at a time. When disabled, it makes two simultaneous attempts. |
| **Autoconnect to servers in static list only** | aMule attempts to connect only to servers marked as static. |
| **Set manually added servers to High Priority** | Servers added manually get High priority. The priority can be changed later. |

## Files

Options for downloading and sharing files.

![Files preferences tab](/img/docs/gui_preferences/preferences_files.png)

### Intelligent Corruption Handling (I.C.H.)

| Setting | Description |
|---|---|
| **Enable** | Enable [Intelligent Corruption Handling](../../../p2p-networks/ed2k/aich.md). |
| **Advanced I.C.H. trusts every hash (not recommended)** | When unchecked (recommended), aMule applies sanity checks to received AICH hashes instead of blindly trusting them. |

### Downloads

| Setting | Description |
|---|---|
| **Add files to download in pause mode** | Newly added downloads start in the paused state. |
| **Add files to download with auto priority** | Newly added downloads get automatic priority. |
| **Try to download first and last chunks first** | Always try to download the beginning and end of files first. Useful for previewing audio and video files. |
| **Start next paused file when a file completes** | When a file completes, automatically resume the highest-priority paused file. |
| **From the same category** | When the above option is enabled, resume the highest-priority paused file in the same category (if one exists). |
| **In alphabetic order** | When resuming the next paused file, pick it in alphabetic order instead of by priority. |
| **Preallocate disk space for new files** | Reserve the full file size on disk when a download starts, reducing fragmentation. |
| **Stop downloads when free disk space reaches _n_ MB** | Pause downloads when free disk space would fall below the given minimum (in MB). See [Disk Space Protection](../../configuration/directories.md#disk-space-protection). |
| **Save 10 sources on rare files (< 20 sources)** | On shutdown, save 10 sources for files with few sources so they can be reused on next startup. |

### Uploads

| Setting | Description |
|---|---|
| **Add new shared files with auto priority** | Files added to shared directories, or completed downloads, get automatic share priority. |

See [Events](../../configuration/events.md) for a flexible event system that can run a command when a download completes, plus chat notifications and disk-space alerts.

## Security

Options for aMule's security features, including protocol obfuscation and IP filtering.

![Security preferences tab](/img/docs/gui_preferences/preferences_security.png)

| Setting | Description |
|---|---|
| **Use Secure User Identification** | Use the [Secure User Identification](../../../p2p-networks/ed2k/secure-user-identification.md) protocol when identifying to other clients. Recommended. |

### Protocol Obfuscation

| Setting | Description |
|---|---|
| **Support Protocol Obfuscation** | Enable protocol obfuscation, which disguises aMule traffic to make it harder to detect and throttle. |
| **Use obfuscation for outgoing connections** | Initiate outgoing connections using obfuscation when supported by the remote client. |
| **Accept only obfuscated connections** | Reject incoming connections that are not obfuscated. |

| Setting | Description |
|---|---|
| **Who can see my shared files** | Controls who can browse your shared files: **Everybody**, **Friends**, or **No one**. Hiding them from everyone is recommended. |

### IP-Filtering

The IP filter blocks all traffic to and from a configurable list of IP addresses and ranges, read from [`ipfilter.dat` and `ipfilter_static.dat`](../../configuration/config-files/index.md#ip-filter-files). Each option below maps to a key in [`amule.conf`](../../configuration/config-files/amule-conf.md).

| Setting | Description |
|---|---|
| **Filter clients** | Apply the IP filter to client connections (`IpFilterClients`). |
| **Filter servers** | Apply the IP filter to server connections (`IpFilterServers`). |
| **Reload List** | Reload `ipfilter.dat` and `ipfilter_static.dat` from disk and re-check all active connections. |
| **URL** | URL of the `ipfilter.dat` file to download (`IPFilterURL`). |
| **Update now** | Download the filter from the **URL** immediately. |
| **Auto-update ipfilter at startup** | Download an updated filter from the **URL** every time aMule starts (`IPFilterAutoLoad`). |
| **Filtering Level** | Filter level, 0–255 (default 127). A range is blocked when its access level is **strictly less than** this value, so a higher level blocks more ranges and a lower level blocks fewer (`FilterLevel`). |
| **Always filter LAN IPs** | Always block IPs that claim to be in a local LAN range (`FilterLanIPs`). See [always-filtered ranges](../../configuration/config-files/index.md#always-filtered-ranges-hard-coded). |
| **Paranoid handling of non-matching IPs** | Reject a packet if the client IP differs from the IP it was received from. Use with caution (`ParanoidFiltering`). |
| **Use system-wide ipfilter.dat if available** | If the local `ipfilter.dat` cannot be loaded, fall back to the [system-wide file](../../configuration/config-files/index.md#ip-filter-files) (`IPFilterSystem`). |

aMule always blocks the reserved RFC 3330 IP ranges regardless of these settings; see [always-filtered ranges](../../configuration/config-files/index.md#always-filtered-ranges-hard-coded).

## Interface

Options for aMule's graphical interface.

![Interface preferences tab](/img/docs/gui_preferences/preferences_interface.png)

| Setting | Description |
|---|---|
| **Skin to use** | Select the skin (bitmap theme) for aMule. `- default -` uses the built-in bitmaps. See [Skins](./skins.md). |
| **Show "Fast eD2k Links Handler" in every window** | Show the eD2k Link Handler in all windows, not only the Searches window. |
| **Show extended info on categories tabs** | Display the number of downloading files and total files in each category tab title. |
| **Show application version on title** | Show the aMule version in the window title bar. |
| **Show transfer rates on title** | Show transfer speeds in the window title bar, either **before** or **after** the application name. |
| **Show overhead bandwidth** | Show protocol overhead bandwidth in the status bar. |
| **Vertical toolbar orientation** | Show the toolbar vertically (enabled) or horizontally (disabled). |
| **Show country flags for clients** | Display a country flag next to clients, based on their IP address. |

### Download Queue Files

| Setting | Description |
|---|---|
| **Show progress percentage** | Display the completed percentage for each file in the download queue, above the progress bar. |
| **Show progress bar** | Show a progress bar indicating chunk availability for each file in the download queue. |
| **Progress bar style** | Slider that sets the progress bar's 3D depth, from **Flat** to **Round**. Active only when **Show progress bar** is enabled. |
| **Auto-sort files (high CPU)** | Resort the download list more frequently. Not recommended — high CPU usage. |

## Statistics

Options for aMule's [Statistics](./statistics.md) display.

![Statistics preferences tab](/img/docs/gui_preferences/preferences_statistics.png)

### Graphs

| Setting | Description |
|---|---|
| **Update delay** | Refresh interval for statistics graphs (seconds). |
| **Time for average graph** | Time interval used to calculate running averages in graphs (minutes). |
| **Connections Graph Scale** | Maximum number of connections the connections graph can represent. |
| **Download graph scale** | Maximum download speed (kB/s) the download graph represents. Used only to scale the graph; it does not throttle transfers. |
| **Upload graph scale** | Maximum upload speed (kB/s) the upload graph represents. Used only to scale the graph; it does not throttle transfers. |
| **Colors** | Select colours for each item in the statistics display. Choose the item from the menu, then click **Select**. |

### Tree

| Setting | Description |
|---|---|
| **Update delay** | Refresh interval for the statistics tree (seconds). |
| **Number of Client Versions shown (0 = unlimited)** | Maximum number of client versions displayed for each client application in the statistics tree. |

## Proxy

Options for connecting through a proxy server. See [Proxy configuration](../../configuration/proxy.md) for a full explanation of how the proxy feature works.

![Proxy preferences tab](/img/docs/gui_preferences/preferences_proxy.png)

| Setting | Description |
|---|---|
| **Enable Proxy** | Enable the use of a proxy. |
| **Proxy type** | Protocol of the proxy: SOCKS5, SOCKS4, HTTP, or SOCKS4a. |
| **Proxy host** | Hostname or IP address of the proxy server. |
| **Proxy port** | Port through which the proxy is accessed. |
| **Enable authentication** | Use a username and password to log into the proxy. If disabled, anonymous login is performed. |
| **Username** | Username to log into the proxy. |
| **Password** | Password to log into the proxy. |

## Filters

Options for filtering incoming chat messages and file comments.

![Filters preferences tab](/img/docs/gui_preferences/preferences_filters.png)

### Messages

| Setting | Description |
|---|---|
| **Filter incoming messages (except current chat)** | Enable message filtering with the rules below. Messages already open in the Messages window will not be closed. |
| **Filter all messages** | Ignore all incoming messages. |
| **Filter messages from people not on your friend list** | Ignore all messages from users not in the friends list. |
| **Filter messages from unknown clients** | Ignore messages from clients not in any of your upload or download queues. |
| **Filter messages containing (use ',' as separator)** | Ignore messages containing any of the comma-separated strings listed in the box. All other characters are treated as part of the filter string. |
| **Show received messages in the log** | Log every received message (including filtered ones) to the aMule log. |

### Comments

| Setting | Description |
|---|---|
| **Filter comments containing (use ',' as separator)** | Hide file comments containing any of the comma-separated strings listed in the box. |

## Remote Controls

Options for controlling aMule remotely via the web interface or external connections.

![Remote Controls preferences tab](/img/docs/gui_preferences/preferences_remote_controls.png)

### External Connection Parameters

| Setting | Description |
|---|---|
| **Accept external connections** | Allow aMule to accept External Connection requests from remote applications (`amuleweb`, `amulegui`, `amulecmd`). |
| **IP of the listening interface** | IP address of the interface that listens for external connections, in `a.b.c.d` format. Empty or `0.0.0.0` means any interface. |
| **TCP port** | TCP port where aMule listens for external connections. |
| **Enable UPnP port forwarding on the EC port** | Ask a UPnP-capable router to forward the external-connection port. |
| **Password** | Password remote applications must supply to connect. |

### Web server parameters

| Setting | Description |
|---|---|
| **Run webserver on startup** | Start `amuleweb` automatically when aMule launches. |
| **Web template** | Template (skin) to use for the web interface. |
| **Full rights password** | Password for administration (full rights) access to `amuleweb`. |
| **Enable Low rights User** | Enable a low-privilege account for `amuleweb` with view-only access. |
| **Low rights password** | Password for the view-only account. |
| **TCP port** | Port where `amuleweb` listens for incoming connections. |
| **Enable UPnP port forwarding of the web server port** | Ask a UPnP-capable router to forward the web server port. |
| **Web server UPnP TCP port (Optional)** | External TCP port to request for the web server via UPnP. |
| **Page Refresh Time (in secs)** | Time between page refreshes in `amuleweb` (seconds). |
| **Enable Gzip compression** | Compress packets transferred between aMule and `amuleweb`. |

## Online Signature

Options for the [Online Signature](../../utilities/wxcas-cas.md) feature used by `cas` and `wxcas`.

![Online Signature preferences tab](/img/docs/gui_preferences/preferences_online_signature.png)

| Setting | Description |
|---|---|
| **Enable Online-Signature** | Enable aMule to write the Online Signature file. |
| **Update Frequency (Secs)** | Interval (seconds) between Online Signature updates. |
| **Save online signature file in** | Directory where the Online Signature file is written. Use the **Browse** button to select it. |

## Advanced

Advanced options for aMule's core engine. A **!!! WARNING !!!** banner reminds you that wrong values here can harm aMule's performance — change them only if you understand their effect.

![Advanced preferences tab](/img/docs/gui_preferences/preferences_advanced.png)

| Setting | Description |
|---|---|
| **Max new connections / 5 secs** | Maximum number of new connections to establish per 5-second window. |
| **File Buffer Size** | Maximum amount of memory (bytes) each file can use for write buffering. |
| **Upload Queue Size** | Maximum number of clients that can be queued in the upload queue. |
| **Server connection refresh interval** | Ping interval to the server (seconds), to avoid being disconnected due to inactivity. *Disable* turns the keep-alive ping off. |
| **Disable computer's timed standby mode** | Prevent the computer from entering automatic standby/sleep while aMule is running. |

## Events

Configure actions aMule takes when specific events occur, such as sending an email notification when a download completes or when disk space runs out.

![Events preferences tab](/img/docs/gui_preferences/preferences_events.png)

This section lists the available event types. See the dedicated [Events](../../configuration/events.md) page for a full description of event types, variables, and example scripts.

## Debugging

Advanced options for logging and debugging aMule.

:::note
This section only appears in aMule builds compiled with debugging enabled (`__DEBUG__`). It is not present in standard release builds used by most users.
:::

| Setting | Description |
|---|---|
| **Enable Verbose Debug-Logging** | Write extra debug output to the aMule log. |
| **Only to Logfile** | Write verbose debug output only to the log file, not to the on-screen log. |
| **Message Categories** | Once verbose logging is enabled, select exactly which categories of debug messages to include. |

This section is intended for developers and advanced troubleshooting only. The options will not be described further here.
