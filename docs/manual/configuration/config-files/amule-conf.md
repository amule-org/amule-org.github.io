---
id: amule-conf
title: amule.conf
---

`amule.conf` is aMule's main configuration file. It stores every preference that can be set through the Preferences dialog, plus internal state such as window geometry and table column widths.

**Location:**

| Platform | Path |
|---|---|
| Linux / Unix | `~/.aMule/amule.conf` |
| macOS | `~/Library/Application Support/aMule/amule.conf` |
| Windows | `%APPDATA%\aMule\amule.conf` |

A backup copy is written to `amule.conf.bak` each time the file is saved.

## Format

`amule.conf` uses standard Windows INI format:
- Settings are `key=value` pairs, one per line.
- Keys are grouped into **sections** identified by `[SectionName]` headers.
- Any text following a `#` character is a comment and is ignored.
- Boolean keys use `0` (false / disabled) and `1` (true / enabled).
- `0` for speed limits means unlimited.
- Passwords are stored as MD5 hashes.

aMule writes this file on exit and reads it on startup. Manual edits take effect on the next startup.

## `[eMule]` section

The primary section. Contains the majority of user-facing preferences.

### General

| Key | Default | Description |
|---|---|---|
| `AppVersion` | `aMule 2.x.x` | aMule version string. Written by aMule; do not edit manually. |
| `Nick` | `https://amule-org.github.io` | Username displayed to other clients on the network. |
| `Language` | _(empty)_ | UI language code (e.g. `de`, `en_GB`). Empty = system default. |
| `NewVersionCheck` | `1` | Check for new aMule releases at startup. |
| `StartupMinimized` | `0` | Start aMule minimized to the taskbar. |
| `ConfirmExit` | `1` | Show a confirmation dialog when closing aMule. |
| `EnableTrayIcon` | `0` | Show a system tray icon. |
| `MinToTray` | `0` | Minimize to the tray icon instead of the taskbar. Requires `EnableTrayIcon=1`. |
| `Notifications` | `0` | Show balloon notifications from the system tray icon. |
| `ToolTipDelay` | `1` | Seconds before the tray icon tooltip appears. |
| `Address` | _(empty)_ | Hostname or IP address of this machine (optional; used if aMule cannot detect it). |
| `YourHostname` | _(empty)_ | Hostname used when building eD2k source links for this client. |
| `DateTimeFormat` | `%A, %x, %X` | `strftime`-style format string for dates and times in the UI. |
| `MaxMessageSessions` | `50` | Maximum number of simultaneous chat sessions. |
| `IndicateRatings` | `1` | Show file rating indicators in the download list. |
| `AllcatType` | `0` | Category display mode for the "All" category tab. |
| `ShowAllNotCats` | `0` | Show uncategorised files when a category tab is selected. |
| `DisableKnownClientList` | `0` | Disable the known clients list in the Transfers window. |
| `DisableQueueList` | `0` | Disable the upload queue list in the Transfers window. |
| `SplitterbarPosition` | `75` | Position (percentage) of the splitter bar in the Transfers window. |

### Connection

| Key | Default | Description |
|---|---|---|
| `MaxDownload` | `0` | Maximum download speed in KiB/s. `0` = unlimited. |
| `MaxUpload` | `0` | Maximum upload speed in KiB/s. `0` = unlimited. |
| `SlotAllocation` | `2` | Target speed per upload slot in KiB/s. |
| `DownloadCapacity` | `300` | Your line's total download capacity in KiB/s. Used for statistics and the tray speed bar only. |
| `UploadCapacity` | `100` | Your line's total upload capacity in KiB/s. Used for statistics and the tray speed bar only. |
| `Port` | `4662` | Standard eD2k client TCP port. |
| `UDPPort` | `4672` | Extended client UDP port (used for extended server requests and Kademlia). |
| `UDPEnable` | `1` | Enable the UDP port. Setting to `0` reduces performance but frees the UDP port. |
| `MaxSourcesPerFile` | `300` | Maximum number of sources remembered per file. |
| `MaxConnections` | `500` | Maximum number of simultaneous connections. |
| `MaxConnectionsPerFiveSeconds` | `20` | Maximum number of new connections to establish per 5-second window. |
| `ConnectToED2K` | `1` | Enable the eD2k network. |
| `ConnectToKad` | `1` | Enable the Kademlia network. |
| `Autoconnect` | `1` | Connect to enabled networks when aMule starts. |
| `Reconnect` | `1` | Reconnect automatically after losing a server connection. |
| `ShowOverhead` | `0` | Show protocol overhead bandwidth in the status bar. |
| `UPnPEnabled` | `0` | Enable UPnP to automatically open the eD2k TCP port (`Port`) on your router. |
| `UPnPTCPPort` | `50000` | Internal UPnP TCP port used for UPnP communication. |

### Server

| Key | Default | Description |
|---|---|---|
| `RemoveDeadServer` | `1` | Remove servers that repeatedly fail to connect or respond. |
| `DeadServerRetry` | `3` | Number of failures allowed before a server is removed. The server is removed after `DeadServerRetry + 1` failures. |
| `Serverlist` | `0` | Auto-update the server list from external URLs at startup. |
| `AddServerListFromServer` | `0` | Request the server's full server list after connecting. |
| `AddServerListFromClient` | `0` | Add the server of a connecting client to the server list if it is unknown. |
| `Scoresystem` | `1` | Use the server priority (score) system. |
| `SmartIdCheck` | `1` | Use the smart Low ID check when connecting (detects Low ID quickly). |
| `SafeServerConnect` | `0` | Connect to servers one at a time. Disabling allows two simultaneous connection attempts. |
| `AutoConnectStaticOnly` | `0` | Auto-connect only to servers marked as static. |
| `ManualHighPrio` | `0` | Assign High Priority to servers you add manually. |
| `ServerKeepAliveTimeout` | `0` | Interval in **minutes** for pinging the connected eD2k server to prevent disconnection. `0` disables keep-alive pings. |
| `Ed2kServersUrl` | `https://upd.emule-security.org/server.met` | URL to download [`server.met`](../../../developer/file-formats/server-met.md) updates from. Used when auto-update is enabled. Supports `http://`, `https://`, and `ftp://`. |

### Files

| Key | Default | Description |
|---|---|---|
| `ICH` | `1` | Enable Intelligent Corruption Handling (ICH). |
| `AICHTrust` | `0` | Trust every AICH hash received without verification. Leaving this `0` is recommended. |
| `AddNewFilesPaused` | `0` | Add new downloads in paused state. |
| `DAPPref` | `1` | Set the priority of new downloads to Auto (Dynamic Auto-Priority). |
| `PreviewPrio` | `0` | Always download the first and last chunks of a file first (useful for previewing video). |
| `UAPPref` | `1` | Set the share priority of newly completed or newly shared files to Auto (Upload Auto-Priority). |
| `FullChunkTransfers` | `1` | Hold an upload slot open until the receiving client has a complete 9.28 MiB chunk (recommended). |
| `StartNextFile` | `0` | Automatically resume the highest-priority paused file when a download completes. |
| `StartNextFileSameCat` | `0` | When `StartNextFile=1`, resume from the same category first. |
| `StartNextFileAlpha` | `0` | When `StartNextFile=1`, resume the next file in alphabetical order instead of by priority. |
| `CheckDiskspace` | `1` | Monitor free disk space and pause downloads when space falls below `MinFreeDiskSpace`. |
| `MinFreeDiskSpace` | `1` | Minimum free disk space in MiB before downloads are paused (requires `CheckDiskspace=1`). |
| `AllocateFullFile` | `0` | Pre-allocate the full file size on disk when a download starts. Prevents fragmentation but uses disk space immediately. |
| `CreateSparseFiles` | `1` | Create sparse files for in-progress downloads on supported filesystems (Linux/NTFS). Saves disk space when `AllocateFullFile=0`. |

:::note
The keys `ExecOnCompletion` and `ExecOnCompletionCommand` existed in aMule 2.2.x and earlier. They were removed and replaced by the `[UserEvents]` section in current versions. See the [`[UserEvents]` section](#userevents-section) below.
:::

### Directories

| Key | Default | Description |
|---|---|---|
| `IncomingDir` | `~/.aMule/Incoming` | Directory where completed downloads are moved. |
| `TempDir` | `~/.aMule/Temp` | Directory for in-progress downloads (`*.part` files). |
| `ShareHiddenFiles` | `0` | Include hidden files when sharing the contents of shared directories. |
| `AutoRescanSharedDirs` | `1` | Automatically rescan shared directories for new or removed files using a filesystem watcher. When disabled, you must click "Reload shared files" manually. |
| `VideoPlayer` | _(empty)_ | Command used to preview audio/video files. The filename is appended at the end. |
| `VideoPreviewBackupped` | `1` | Copy the file to a temp location before previewing (avoids corruption of the in-progress download). |

### Network URLs

| Key | Default | Description |
|---|---|---|
| `KadNodesUrl` | `https://upd.emule-security.org/nodes.dat` | URL to download a fresh [`nodes.dat`](../../../developer/file-formats/nodes-dat.md) for Kademlia bootstrap. Supports `http://`, `https://`, and `ftp://`. |

### Online Signature

These keys control the signature files read by the [`cas` / `wxcas`](../../utilities/wxcas-cas.md) statistics tools.

| Key | Default | Description |
|---|---|---|
| `OnlineSignature` | `0` | Enable writing of [`amulesig.dat`](./index.md#amulesigdat) and [`onlinesig.dat`](./index.md#onlinesigdat). |
| `OnlineSignatureUpdate` | `5` | Interval in seconds between signature file updates. |
| `OSDirectory` | `~/.aMule/` | Directory where the signature files are written. |

### Message Filter

| Key | Default | Description |
|---|---|---|
| `FilterMessages` | `1` | Enable message filtering. |
| `FilterAllMessages` | `0` | Ignore all incoming messages. |
| `MessagesFromFriendsOnly` | `0` | Ignore messages from users not in the friends list. |
| `MessageFromValidSourcesOnly` | `1` | Ignore messages from clients not in any upload or download queue. |
| `FilterWordMessages` | `0` | Ignore messages containing words from `MessageFilter`. |
| `MessageFilter` | _(empty)_ | Comma-separated list of words to filter. |
| `ShowMessagesInLog` | `1` | Also log incoming chat messages to `logfile`. |
| `AdvancedSpamFilter` | `1` | Enable the advanced spam filter (heuristic detection of spam messages). |
| `MessageUseCaptchas` | `1` | Require new contacts to solve a CAPTCHA before their messages are shown. Requires `AdvancedSpamFilter=1`. |
| `FilterComments` | `0` | Filter file comments containing words from `CommentFilter`. |
| `CommentFilter` | _(empty)_ | Comma-separated list of words to filter in file comments. |

### Security

| Key | Default | Description |
|---|---|---|
| `SeeShare` | `2` | Who can see your shared files list. `0` = everyone, `1` = friends only, `2` = nobody. |
| `PermissionsFiles` | `416` | Unix permissions assigned to newly created files (octal 0640). |
| `PermissionsDirs` | `488` | Unix permissions assigned to newly created directories (octal 0750). |
| `IPFilterAutoLoad` | `1` | Download and apply the IP filter from `IPFilterURL` at startup. |
| `IPFilterURL` | _(empty)_ | URL to download the IP filter from. Supports `http://`, `https://`, and `ftp://`. |
| `FilterLevel` | `127` | IP filter level (0–255). Ranges whose access level is **less than** this value are blocked. |
| `FilterLanIPs` | `1` | Always block LAN IP addresses (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`). |
| `ParanoidFiltering` | `1` | Paranoid handling of non-matching IPs: reject a packet if the client IP differs from the IP it was received from. |
| `IPFilterSystem` | `0` | Fall back to the system-wide `ipfilter.dat` if the local file cannot be loaded. |

### GeoIP

| Key | Default | Description |
|---|---|---|
| `GeoIPEnabled` | `1` | Show country flags next to clients and servers (requires `GeoLite2-Country.mmdb`). |
| `GeoLiteCountryUpdateUrl` | _(empty)_ | Direct URL to a `.mmdb` or `.mmdb.gz` database (the auto-updater does not handle `.tar.gz`, so MaxMind's official download URL is unsupported). No GUI field — edit this file directly. Leave empty to manage the database manually (a free MaxMind account is required to download it). |

### Statistics

| Key | Default | Description |
|---|---|---|
| `StatGraphsInterval` | `3` | Graph update interval in seconds. |
| `StatsAverageMinutes` | `5` | Time window (minutes) used to calculate running average in graphs. |
| `VariousStatisticsMaxValue` | `100` | Maximum connections value shown in the connections graph. |
| `statsInterval` | `30` | Statistics tree update interval in seconds. |
| `StatsServerName` | `Shorty's ED2K stats` | Display name of the external ED2K stats server used for file lookups. |
| `StatsServerURL` | `https://ed2k.shortypower.org/?hash=` | URL prefix for the external stats server. The file hash is appended. |
| `StatColor0`–`StatColor14` | _(various)_ | RGB colour values for the 15 statistics graph elements. |

### Interface

| Key | Default | Description |
|---|---|---|
| `AutoSortDownloads` | `0` | Continuously re-sort the download list (high CPU usage; not recommended). |
| `ShowInfoOnCatTabs` | `1` | Show file counts on category tabs. |
| `ShowRatesOnTitle` | `0` | Show transfer speeds in the window title. `0` = off, `1` = after app name, `2` = before app name. |
| `ShowVersionOnTitle` | `0` | Show the aMule version in the window title (release builds only). |
| `VerticalToolbar` | `0` | Show the toolbar vertically instead of horizontally. |
| `3DDepth` | `10` | 3D depth effect for statistics graphs. `0` = flat. |

### Advanced

| Key | Default | Description |
|---|---|---|
| `FileBufferSizePref` | `16` | Maximum memory per file for write buffering, in KiB. |
| `QueueSizePref` | `50` | Maximum number of clients in the upload queue (multiplied by 100 internally). |
| `ServerKeepAliveTimeout` | `0` | Interval in minutes for server keep-alive pings (see [Server](#server) section). |
| `DropSlowSources` | `0` | Drop slow sources when the source queue is full, to make room for faster ones. |

### Debugging

| Key | Default | Description |
|---|---|---|
| `VerboseDebug` | `0` | Enable verbose debug logging to `logfile`. When enabled, additional message categories can be selected in the Debugging preferences panel. Only available in debug builds. |
| `VerboseDebugLogfile` | `0` | Also write verbose debug output to `logfile` (in addition to the UI log). Only available in debug builds. |

### Internal / layout

These keys are managed by aMule. Editing them manually is not recommended.

| Key | Description |
|---|---|
| `SmartIdState` | Cached result of the Smart ID check (internal state). |
| `TableSortingServer`, `TableWidthsServer` | Server list column sorting and widths. |
| `TableSortingDownload`, `TableWidthsDownload` | Download list column sorting and widths. |
| `TableSortingUploads`, `TableWidthsUploads` | Upload list column sorting and widths. |
| `TableSortingShared`, `TableWidthsShared` | Shared files list column sorting and widths. |

## `[Browser]` section

Browser selection for opening web links from within aMule.

| Key | Default | Description |
|---|---|---|
| `OpenPageInTab` | `1` | Open links in a new tab when possible. |
| `CustomBrowserString` | _(empty)_ | Command for a custom browser. On macOS the default is `/usr/bin/open`. |

## `[ExternalConnect]` section

[External Connections (EC)](../../../developer/ec-protocol.md) settings used by remote tools ([`amuleweb`](../../interfaces/amuleweb.md), [`amulecmd`](../../interfaces/amulecmd.md), [`amulegui`](../../interfaces/gui/amulegui.md)), plus several display and security preferences.

| Key | Default | Description |
|---|---|---|
| `AcceptExternalConnections` | `0` | Enable the EC interface so that remote tools can connect. |
| `ECAddress` | _(empty)_ | IP address on which aMule listens for EC connections. Empty = listen on all interfaces. |
| `ECPort` | `4712` | TCP port for EC connections. |
| `ECPassword` | _(empty)_ | MD5 hash of the EC password. |
| `UPnPECEnabled` | `0` | Enable UPnP to automatically open the EC port (`ECPort`) on your router. |
| `UseSecIdent` | `1` | Enable Secure User Identification. |
| `UseSrcSeeds` | `0` | Save sources for rare files (corresponds to "Save 10 sources on rare files" in Files preferences). |
| `IpFilterClients` | `1` | Apply the IP filter to client connections. |
| `IpFilterServers` | `1` | Apply the IP filter to server connections. |
| `ShowPercent` | `1` | Show completion percentage in the download list. |
| `ShowProgressBar` | `1` | Show the chunk availability progress bar in the download list. |
| `TransmitOnlyUploadingClients` | `0` | Only transmit data for clients that are actively uploading to you. |

## `[WebServer]` section

[`amuleweb`](../../interfaces/amuleweb.md) built-in web server settings.

| Key | Default | Description |
|---|---|---|
| `Enabled` | `0` | Start the `amuleweb` server automatically when aMule launches. |
| `Port` | `4711` | Port on which `amuleweb` listens for browser connections. |
| `PageRefreshTime` | `120` | Browser page auto-refresh interval in seconds. |
| `UseGzip` | `1` | Enable gzip compression for web pages. |
| `UseLowRightsUser` | `0` | Enable the guest (low-rights) account. |
| `Password` | _(empty)_ | MD5 hash of the administrator password. |
| `PasswordLow` | _(empty)_ | MD5 hash of the guest password. |
| `Template` | _(empty)_ | Web template (skin) name. Empty = default template. |
| `UPnPWebServerEnabled` | `0` | Enable UPnP to automatically open the web server port (`Port`) on your router. |
| `WebUPnPTCPPort` | `50001` | Internal UPnP TCP port used for web server UPnP communication. |
| `Path` | `amuleweb` | Path or name of the `amuleweb` binary. |

## `[Proxy]` section

SOCKS4, SOCKS5, or HTTP proxy configuration.

| Key | Default | Description |
|---|---|---|
| `ProxyEnableProxy` | `0` | Enable proxy use. |
| `ProxyType` | `0` | Proxy protocol: `0` = SOCKS4, `1` = SOCKS5, `2` = HTTP. |
| `ProxyName` | _(empty)_ | Proxy hostname or IP address. |
| `ProxyPort` | `1080` | Proxy port. |
| `ProxyEnablePassword` | `0` | Enable proxy authentication. |
| `ProxyUser` | _(empty)_ | Proxy username. |
| `ProxyPassword` | _(empty)_ | Proxy password (stored in plain text). |

## `[Obfuscation]` section

Protocol obfuscation settings. Obfuscation makes aMule traffic harder to detect and throttle by ISPs.

| Key | Default | Description |
|---|---|---|
| `IsClientCryptLayerSupported` | `1` | Support protocol obfuscation: accept obfuscated connections from peers that request it. |
| `IsCryptLayerRequested` | `1` | Request protocol obfuscation from peers when connecting to them. |
| `IsClientCryptLayerRequired` | `0` | Require obfuscation from all connecting peers; reject unobfuscated connections. Not recommended — reduces the number of reachable peers. |
| `CryptoPaddingLenght` | `254` | Maximum random padding length (bytes) added to TCP connections for obfuscation. Note: the key name contains a typo ("Lenght") that is preserved for compatibility. |
| `CryptoKadUDPKey` | _(random)_ | Secret 32-bit key used for Kad UDP verification. Generated randomly on first run; do not edit manually. |

## `[PowerManagement]` section

| Key | Default | Description |
|---|---|---|
| `PreventSleepWhileDownloading` | `0` | Prevent the operating system from suspending or sleeping while aMule has active downloads. |

## `[Razor_Preferences]` section

Source-dropping algorithm settings and main window geometry.

| Key | Default | Description |
|---|---|---|
| `FastED2KLinksHandler` | `1` | Show the Fast eD2k Links Handler panel in all windows, not only the Search window. |
| `NoNeededSourcesHandling` | `2` | What to do with sources that have no file parts you need. `0` = keep, `1` = drop after a delay, `2` = drop immediately. |
| `FullQueueSources` | `0` | Drop sources whose upload queue is full. |
| `HighQueueRankingSources` | `0` | Drop sources that assign you a queue rank higher than `HighQueueRanking`. |
| `HighQueueRanking` | `1200` | Queue rank threshold for `HighQueueRankingSources`. |
| `AutoDropTimer` | `240` | Seconds a source can be known before it is dropped (used with `NoNeededSourcesHandling`). |
| `MAIN_X_POS`, `MAIN_Y_POS` | _(varies)_ | Main window position (pixels from screen edge). |
| `MAIN_X_SIZE`, `MAIN_Y_SIZE` | _(varies)_ | Main window size in pixels. |
| `SRV_SPLITTER_POS` | _(varies)_ | Splitter position in the Servers window. |

## `[UserEvents]` section {#userevents-section}

Shell commands executed when specific events occur. Commands can use substitution variables (see below). For the full description of each event, usage examples and ready-made scripts, see the [Events](../events.md) page.

:::note
aMule writes an empty `[UserEvents]` section header in the file before the event subsections. This is a wxFileConfig artifact (parent group written before child groups) and carries no configuration of its own.
:::

Each event is stored as a subsection of `[UserEvents]`. For example, the "Download completed" event uses the section `[UserEvents/DownloadCompleted]`. Each event has four keys:

| Key | Default | Description |
|---|---|---|
| `CoreEnabled` | `0` | Execute the core command when this event fires. |
| `CoreCommand` | _(empty)_ | Shell command run by [`amuled`](../../interfaces/amuled.md) or the monolithic [`amule`](../../interfaces/gui/amule.md) binary. |
| `GUIEnabled` | `0` | Execute the GUI command when this event fires. |
| `GUICommand` | _(empty)_ | Shell command run by the GUI component. |

### Events and their variables

| Section | Event | Available variables |
|---|---|---|
| `[UserEvents/DownloadCompleted]` | Download completed | `%FILE`, `%NAME`, `%HASH`, `%SIZE`, `%DLACTIVETIME` |
| `[UserEvents/NewChatSession]` | New chat session started | `%SENDER` |
| `[UserEvents/OutOfDiskSpace]` | Out of disk space | `%PARTITION` |
| `[UserEvents/ErrorOnCompletion]` | Error on completion | `%FILE` |

### Variable reference

| Variable | Description |
|---|---|
| `%FILE` | Full path to the file (including filename) |
| `%NAME` | Filename without path |
| `%HASH` | eD2k (MD4) hash of the file |
| `%SIZE` | File size in bytes |
| `%DLACTIVETIME` | Total time the download was active (human-readable string) |
| `%SENDER` | Username of the person starting a chat session |
| `%PARTITION` | Always the fixed text `Temporary partition`, not the real partition name or device |

### Syntax notes

aMule does not run the command through a shell, so pipes, redirections and operators are not interpreted; a command is a single program with arguments, or a script. If the filename might contain spaces, quote the variable:

```
CoreCommand=notify-send "Download complete" "%NAME"
```

Or call a script:

```
CoreCommand=/usr/local/bin/doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

If you specify both a core command and a GUI command, the monolithic [`amule`](../../interfaces/gui/amule.md) binary will execute both.

### Example: email notification on download complete (bash)

```bash
#!/bin/bash
# doneDL.sh — sends an email when aMule completes a download
# Add to amule.conf under [UserEvents/DownloadCompleted]:
#   CoreEnabled=1
#   CoreCommand=doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
#
# Set your email address:
EMAIL=you@example.com

NAME="$1"
FILE="$2"
HASH="$3"
SIZE="$4"
DLTIME="$5"

{
  echo "aMule completed this download:"
  echo "------------------------------"
  echo ""
  echo "File:   $FILE"
  echo "Hash:   $HASH"
  echo -n "Size:   $SIZE bytes"
  if [ "$SIZE" -gt 102400 ]; then
    echo " ($(( SIZE / 1024 / 1024 )) MiB)"
  else
    echo ""
  fi
  if [ -n "$DLTIME" ]; then
    echo "Active download time: $DLTIME"
  fi
} | mail -s "$NAME" "$EMAIL"
```

## `[Statistics]` section

Persistent statistics counters updated by aMule. These are informational and are not edited manually.

| Key | Default | Description |
|---|---|---|
| `MaxClientVersions` | `0` | Maximum number of client version entries to show in the statistics tree (`0` = unlimited). |
| `TotalDownloadedBytes` | `0` | Cumulative bytes downloaded across all sessions. |
| `TotalUploadedBytes` | `0` | Cumulative bytes uploaded across all sessions. |

## `[SkinGUIOptions]` section

| Key | Default | Description |
|---|---|---|
| `Skin` | _(empty)_ | Path to the skin `.zip` file used to customise aMule's bitmaps. Empty = no skin (default appearance). |

## `[GUI]` and `[GUI/TransferWnd]` sections

Window and panel layout settings. Written and read by aMule automatically; not intended for manual editing.

| Key | Default | Description |
|---|---|---|
| `HideOnClose` | `0` | Hide the main window to the tray instead of quitting when the window is closed. Requires `EnableTrayIcon=1`. |
| `AppImageIntegrationDeclined` | `0` | Set to `1` if the user has declined the AppImage `.desktop` integration prompt. Written automatically; do not edit. |
| `[GUI/TransferWnd] Splitter` | `114` | Vertical splitter position (pixels) in the Transfers window. |
| `[GUI/TransferWnd] ShowClientList` | `1` | Show the client list panel in the Transfers window. |

## `[General]` section

Stores the number of download categories and their definitions.

| Key | Default | Description |
|---|---|---|
| `Count` | `0` | Number of additional download categories (not counting the default "All" category). |

Each category is stored as a `[Cat#N]` subsection (N = 1, 2, …):

| Key | Description |
|---|---|
| `Title` | Category name. |
| `Incoming` | Directory where files in this category are saved. |
| `Comment` | Optional notes. |
| `Color` | Category colour (stored as a decimal integer). |
| `Priority` | Default priority for downloads in this category. |

## `[HTTPDownload]` section

Internal cache written and managed by aMule automatically. **Do not edit manually.**

aMule uses this section to implement **conditional GET**: before downloading a file, it checks whether the URL matches the last successful download for that type. If it does and the local file exists, aMule sends an `If-Modified-Since` HTTP header — the server responds with `304 Not Modified` if the file has not changed, saving bandwidth.

Each key stores the last URL that was successfully downloaded for one specific resource type:

| Key | Resource type | Enum value |
|---|---|---|
| `URL_1` | IP filter (`ipfilter.dat` / `ipfilter.zip`) | `HTTP_IPFilter` |
| `URL_2` | Server list ([`server.met`](../../../developer/file-formats/server-met.md)) — manual download | `HTTP_ServerMet` |
| `URL_3` | Server list ([`server.met`](../../../developer/file-formats/server-met.md)) — auto-update from `addresses.dat` | `HTTP_ServerMetAuto` |
| `URL_4` | Version check file (`last_version_check`) | `HTTP_VersionCheck` |
| `URL_5` | Kademlia nodes list ([`nodes.dat`](../../../developer/file-formats/nodes-dat.md)) | `HTTP_NodesDat` |
| `URL_6` | GeoIP database (`GeoLite2-Country.mmdb`) | `HTTP_GeoIP` |

Keys are only written after a successful download. A key that was never written (or whose URL has changed) simply causes a full download without the `If-Modified-Since` optimisation.

## `[Debug]` section

:::warning Debug builds only
This section is only read and written by aMule when compiled with the `__DEBUG__` flag (debug builds). It has no effect in release builds. See `VerboseDebug` and `VerboseDebugLogfile` in the [`[eMule]` Debugging subsection](#debugging) for the release-build logging controls.
:::

Each key enables or disables one debug log category. A value of `1` enables verbose output for that subsystem; `0` disables it. Categories only produce output when `VerboseDebug=1` is also set in `[eMule]`.

Key format: `Cat_<name>` where `<name>` is the exact category name, including spaces.

:::note
wxFileConfig (the INI library used by aMule) escapes spaces in key names with a backslash when writing to disk. A key like `Cat_ED2k Client` appears in the file as `Cat_ED2k\ Client`. Both forms refer to the same key; aMule reads and writes them correctly either way.
:::

| Key | Description |
|---|---|
| `Cat_General` | General warnings and errors not covered by a specific category. |
| `Cat_Hasher` | Main file-hashing thread. |
| `Cat_ED2k Client` | ED2k client object lifecycle and state. |
| `Cat_Local Client Protocol` | Packets sent by this client (outgoing protocol traffic). |
| `Cat_Remote Client Protocol` | Packets received from remote clients (incoming protocol traffic). |
| `Cat_Packet Parsing Errors` | Errors encountered while parsing incoming packets. |
| `Cat_CFile` | `CFile` class: low-level file open/close/seek/read/write operations. |
| `Cat_FileIO` | Higher-level file I/O (part files, known files). |
| `Cat_ZLib` | zLib compression/decompression. |
| `Cat_AICH-Hasher` | AICH synchronisation thread (hashing). |
| `Cat_AICH-Transfer` | AICH hash-set exchange with remote clients. |
| `Cat_AICH-Recovery` | Corrupt chunk recovery using AICH. |
| `Cat_ListenSocket` | TCP listen socket for incoming client connections. |
| `Cat_Credits` | Credit system: upload-ratio calculations, secure identification. |
| `Cat_ClientUDPSocket` | Client UDP socket (extended server requests, Kad). |
| `Cat_DownloadQueue` | Download queue management and source handling. |
| `Cat_IPFilter` | IP filter: range loading, lookups, and auto-updates. |
| `Cat_KnownFileList` | Known-files list: hash cache load/save. |
| `Cat_PartFiles` | Part-file management: chunk state, verification, completion. |
| `Cat_SHAHashSet` | SHA hash-set (AICH) creation and storage. |
| `Cat_Servers` | ED2k server connections and server list management. |
| `Cat_Proxy` | Proxy connection handling. |
| `Cat_Searching` | File search requests and results. |
| `Cat_ServerUDP` | Server UDP socket (extended server requests). |
| `Cat_Client Kademlia UDP` | Kademlia UDP communication initiated by this client. |
| `Cat_Kademlia Search` | Kademlia file and keyword search. |
| `Cat_Kademlia Routing` | Kademlia routing table (k-buckets, contact management). |
| `Cat_Kademlia Indexing` | Kademlia indexing: publish and store operations. |
| `Cat_Kademlia Main Thread` | Kademlia main thread coordination. |
| `Cat_Kademlia Preferences` | Kademlia configuration and preference handling. |
| `Cat_PartFileConvert` | Part-file import/conversion tool. |
| `Cat_MuleUDPSocket` | Base UDP socket class used by all UDP subsystems. |
| `Cat_ThreadScheduler` | Thread scheduler: task queue and worker threads. |
| `Cat_Universal Plug and Play` | UPnP port mapping requests and responses. |
| `Cat_Kademlia UDP Firewall Tester` | Kademlia UDP firewall/NAT detection. |
| `Cat_Kademlia Packet Tracking` | Kademlia packet-level tracking (flood protection). |
| `Cat_Kademlia Entry Tracking` | Kademlia entry tracking (publish throttling). |
| `Cat_External Connect` | External Connections (EC) protocol: all packet traffic. |
| `Cat_HTTP` | HTTP download requests and responses (`server.met`, `nodes.dat`, IP filter, GeoIP). |
| `Cat_Asio Sockets` | Boost.Asio networking layer (socket events, async I/O). |

The following keys existed in older versions of aMule and are automatically migrated or removed when an old `amule.conf` is loaded:

| Old key | Replacement | Notes |
|---|---|---|
| `UDPDisable` | `UDPEnable` | Semantics inverted. `UDPDisable=1` becomes `UDPEnable=0`. |
| `ExecOnCompletion` | `[UserEvents/DownloadCompleted] CoreEnabled` | Migrated automatically on first load. |
| `ExecOnCompletionCommand` | `[UserEvents/DownloadCompleted] CoreCommand` | Migrated automatically on first load. |
| `[SkinGUIOptions] UseSkinFiles` | `[SkinGUIOptions] Skin` | Key renamed; empty string replaces the boolean disable state. |
| `GeoIPUpdateUrl` | `GeoLiteCountryUpdateUrl` | Renamed after MaxMind changed their licensing model. |
| `[FakeCheck] Browser` | `[Browser] OpenPageInTab` | Section renamed from `[FakeCheck]` to `[Browser]`. |

## Complete example

The following is a representative `amule.conf` with current defaults. Paths will differ on your system.

```ini
[eMule]
AppVersion=aMule 2.3.3
Nick=https://amule-org.github.io
NewVersionCheck=1
StartupMinimized=0
ConfirmExit=1
EnableTrayIcon=0
MinToTray=0
Notifications=0
ToolTipDelay=1
MaxDownload=0
MaxUpload=0
SlotAllocation=2
DownloadCapacity=300
UploadCapacity=100
Port=4662
UDPPort=4672
UDPEnable=1
MaxSourcesPerFile=300
MaxConnections=500
ConnectToED2K=1
ConnectToKad=1
Autoconnect=1
Reconnect=1
ShowOverhead=0
UPnPEnabled=0
UPnPTCPPort=50000
RemoveDeadServer=1
DeadServerRetry=3
Serverlist=0
AddServerListFromServer=0
AddServerListFromClient=0
Scoresystem=1
SmartIdCheck=1
SafeServerConnect=0
AutoConnectStaticOnly=0
ManualHighPrio=0
ServerKeepAliveTimeout=0
Ed2kServersUrl=https://upd.emule-security.org/server.met
ICH=1
AICHTrust=0
AddNewFilesPaused=0
DAPPref=1
PreviewPrio=0
UAPPref=1
FullChunkTransfers=1
StartNextFile=0
StartNextFileSameCat=0
StartNextFileAlpha=0
CheckDiskspace=1
MinFreeDiskSpace=1
AllocateFullFile=0
CreateSparseFiles=1
IncomingDir=/home/user/.aMule/Incoming
TempDir=/home/user/.aMule/Temp
ShareHiddenFiles=0
AutoRescanSharedDirs=1
VideoPlayer=
VideoPreviewBackupped=1
KadNodesUrl=https://upd.emule-security.org/nodes.dat
StatGraphsInterval=3
StatsAverageMinutes=5
VariousStatisticsMaxValue=100
statsInterval=30
MaxConnectionsPerFiveSeconds=20
FileBufferSizePref=16
QueueSizePref=50
DropSlowSources=0
3DDepth=10
AutoSortDownloads=0
ShowInfoOnCatTabs=1
ShowRatesOnTitle=0
ShowVersionOnTitle=0
VerticalToolbar=0
SeeShare=2
IPFilterAutoLoad=1
IPFilterURL=
FilterLevel=127
FilterLanIPs=1
ParanoidFiltering=1
IPFilterSystem=0
GeoIPEnabled=1
GeoLiteCountryUpdateUrl=
OnlineSignature=0
OnlineSignatureUpdate=5
OSDirectory=/home/user/.aMule/
FilterMessages=1
FilterAllMessages=0
MessagesFromFriendsOnly=0
MessageFromValidSourcesOnly=1
FilterWordMessages=0
MessageFilter=
ShowMessagesInLog=1
AdvancedSpamFilter=1
MessageUseCaptchas=1
FilterComments=0
CommentFilter=
VerboseDebug=0
VerboseDebugLogfile=0
Language=
SplitterbarPosition=75
YourHostname=
DateTimeFormat=%A, %x, %X
IndicateRatings=1
AllcatType=0
ShowAllNotCats=0
DisableKnownClientList=0
DisableQueueList=0
MaxMessageSessions=50
PermissionsFiles=416
PermissionsDirs=488
Address=
StatsServerName=Shorty's ED2K stats
StatsServerURL=https://ed2k.shortypower.org/?hash=
StatColor0=4194304
StatColor1=16761024
StatColor2=8454016
StatColor3=53760
StatColor4=32768
StatColor5=8421631
StatColor6=200
StatColor7=140
StatColor8=16750230
StatColor9=12583104
StatColor10=8454143
StatColor11=0
StatColor12=8454016
StatColor13=53760
StatColor14=32768
TableSortingServer=0
TableWidthsServer=150,140,25,150,25,40,45,60,40,40,80
TableSortingDownload=0
TableWidthsDownload=260,60,65,65,65,170,50,55,70,110,220,220
TableSortingUploads=0
TableWidthsUploads=150,275,100,60,65,60,60,110,100,100,100
TableSortingShared=0
TableWidthsShared=250,100,50,70,220,100,100,120,120,120,220

[Browser]
OpenPageInTab=1
CustomBrowserString=

[ExternalConnect]
AcceptExternalConnections=0
ECAddress=
ECPort=4712
ECPassword=
UPnPECEnabled=0
UseSecIdent=1
UseSrcSeeds=0
IpFilterClients=1
IpFilterServers=1
ShowPercent=1
ShowProgressBar=1
TransmitOnlyUploadingClients=0

[WebServer]
Enabled=0
Port=4711
PageRefreshTime=120
UseGzip=1
UseLowRightsUser=0
Password=
PasswordLow=
Template=
UPnPWebServerEnabled=0
WebUPnPTCPPort=50001
Path=amuleweb

[Proxy]
ProxyEnableProxy=0
ProxyType=0
ProxyName=
ProxyPort=1080
ProxyEnablePassword=0
ProxyUser=
ProxyPassword=

[Obfuscation]
IsClientCryptLayerSupported=1
IsCryptLayerRequested=1
IsClientCryptLayerRequired=0
CryptoPaddingLenght=254
CryptoKadUDPKey=0

[PowerManagement]
PreventSleepWhileDownloading=0

[Razor_Preferences]
FastED2KLinksHandler=1
NoNeededSourcesHandling=2
FullQueueSources=0
HighQueueRankingSources=0
HighQueueRanking=1200
AutoDropTimer=240
MAIN_X_POS=217
MAIN_Y_POS=100
MAIN_X_SIZE=800
MAIN_Y_SIZE=600
SRV_SPLITTER_POS=463

[UserEvents]

[UserEvents/DownloadCompleted]
CoreEnabled=0
CoreCommand=
GUIEnabled=0
GUICommand=

[UserEvents/NewChatSession]
CoreEnabled=0
CoreCommand=
GUIEnabled=0
GUICommand=

[UserEvents/OutOfDiskSpace]
CoreEnabled=0
CoreCommand=
GUIEnabled=0
GUICommand=

[UserEvents/ErrorOnCompletion]
CoreEnabled=0
CoreCommand=
GUIEnabled=0
GUICommand=

# [HTTPDownload] — written automatically by aMule after each successful download.
# Stores the last URL per resource type for conditional GET (If-Modified-Since).
# Do not edit manually.
[HTTPDownload]
URL_1=https://upd.emule-security.org/ipfilter.zip

[Statistics]
MaxClientVersions=0
TotalDownloadedBytes=0
TotalUploadedBytes=0

[SkinGUIOptions]
Skin=

[General]
Count=0

[GUI]
HideOnClose=0
AppImageIntegrationDeclined=0

[GUI/TransferWnd]
Splitter=114
ShowClientList=1

# [Debug] section — only present and active in debug builds (__DEBUG__).
# Requires VerboseDebug=1 in [eMule] to take effect.
# All categories default to 0 (disabled).
[Debug]
Cat_General=0
Cat_Hasher=0
Cat_ED2k Client=0
Cat_Local Client Protocol=0
Cat_Remote Client Protocol=0
Cat_Packet Parsing Errors=0
Cat_CFile=0
Cat_FileIO=0
Cat_ZLib=0
Cat_AICH-Hasher=0
Cat_AICH-Transfer=0
Cat_AICH-Recovery=0
Cat_ListenSocket=0
Cat_Credits=0
Cat_ClientUDPSocket=0
Cat_DownloadQueue=0
Cat_IPFilter=0
Cat_KnownFileList=0
Cat_PartFiles=0
Cat_SHAHashSet=0
Cat_Servers=0
Cat_Proxy=0
Cat_Searching=0
Cat_ServerUDP=0
Cat_Client Kademlia UDP=0
Cat_Kademlia Search=0
Cat_Kademlia Routing=0
Cat_Kademlia Indexing=0
Cat_Kademlia Main Thread=0
Cat_Kademlia Preferences=0
Cat_PartFileConvert=0
Cat_MuleUDPSocket=0
Cat_ThreadScheduler=0
Cat_Universal Plug and Play=0
Cat_Kademlia UDP Firewall Tester=0
Cat_Kademlia Packet Tracking=0
Cat_Kademlia Entry Tracking=0
Cat_External Connect=0
Cat_HTTP=0
Cat_Asio Sockets=0
```
