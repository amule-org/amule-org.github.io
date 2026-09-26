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
| `AppVersion` | `3.x.x` | Version of the aMule build that last saved the file (e.g. `3.1.0`, or `GIT` for untagged development builds). Written by aMule; do not edit manually. |
| `Nick` | `https://amule-org.github.io` | Username displayed to other clients on the network. |
| `Language` | _(empty)_ | UI language code (e.g. `de`, `en_GB`). Empty = system default. |
| `NewVersionCheck` | `1` | Check for new aMule releases at startup and once a day while running. Only present in builds compiled with the version check (`ENABLE_VERSION_CHECK`); the build option is meant to be turned off for OS-package builds. |
| `StartupMinimized` | `0` | Start aMule minimized to the taskbar. |
| `ConfirmExit` | `1` | Show a confirmation dialog when closing aMule. |
| `EnableTrayIcon` | `0` | Show a system tray icon. |
| `MinToTray` | `0` | Minimize to the tray icon instead of the taskbar. Requires `EnableTrayIcon=1`. |
| `Notifications` | `0` | Show balloon notifications from the system tray icon. |
| `ToolTipDelay` | `1` | Seconds (0–9) before tooltips appear; applies to every tooltip in the GUI. |
| `Address` | _(empty)_ | Local IP address (or hostname) aMule binds its sockets to — the TCP listen socket, the UDP sockets and outgoing eD2k connections to clients and servers (the **Bind local address to IP** preference). Empty = bind to any local address. Distinct from `NetworkInterface` (which binds by interface name) and from `YourHostname` (the public hostname used in source links). |
| `YourHostname` | _(empty)_ | Hostname used when building eD2k source links for this client. |
| `DateTimeFormat` | `%A, %x, %X` | `strftime`-style format string for dates and times. Stored but currently not used by aMule. |
| `AllcatType` | `0` | Category display mode for the "All" category tab. |
| `ShowAllNotCats` | `0` | Show uncategorised files when a category tab is selected. Stored but currently not used by aMule. |
| `SplitterbarPosition` | `75` | Position (percentage) of the splitter bar in the Downloads window. Stored but currently not used by aMule (the splitter is saved in `[GUI/TransferWnd] Splitter`). |
| `DefaultSearchType` | `0` | Search type last selected in the Searches window, restored on the next start: `0` = Local, `1` = Global, `2` = Kad. If that network is disabled, the first available type is used. Written by the GUI. |

The **Start aMule automatically when I log in** preference is deliberately not stored in `amule.conf` — the state lives in the OS autostart store (Windows registry Run key, macOS LaunchAgent, Linux XDG `.desktop` autostart entry) and is managed via the [Preferences checkbox](../../interfaces/gui/preferences.md#general) or the `--configure-autostart=on|off` command-line option (see [Starting aMule Automatically](../autostart.md)).

### Connection

| Key | Default | Description |
|---|---|---|
| `MaxDownload` | `0` | Maximum download speed in KiB/s. `0` = unlimited. |
| `MaxUpload` | `0` | Maximum upload speed in KiB/s. `0` = unlimited. |
| `SlotAllocation` | `10` | Target speed per upload slot in KiB/s. See [Bandwidth & Upload Slots](../bandwidth-slots.md). |
| `Port` | `4662` | Standard eD2k client TCP port. |
| `UDPPort` | `4672` | Extended client UDP port (used for extended server requests and Kademlia). |
| `UDPEnable` | `1` | Enable the UDP port. Setting to `0` reduces performance but frees the UDP port. |
| `MaxSourcesPerFile` | `300` | Maximum number of sources remembered per file. |
| `MaxConnections` | `500` | Maximum number of simultaneous connections. The default is derived from the operating system's connection (file-descriptor) limit; `500` is used when that limit is high or cannot be determined, otherwise a lower value is chosen. |
| `MaxConnectionsPerFiveSeconds` | `50` | Maximum number of new connections to establish per 5-second window. |
| `ConnectToED2K` | `1` | Enable the eD2k network. |
| `ConnectToKad` | `1` | Enable the Kademlia network. |
| `KadMaxSourceSearches` | `30` | Maximum number of concurrent Kad source searches. Clamped to the range 5–50 when the file is loaded. |
| `KadSourceReaskMinutes` | `30` | Minimum interval, in minutes, between Kad source re-asks. Clamped to the range 30–60 when the file is loaded. |
| `SourceReaskMinutes` | `15` | Minimum interval, in minutes, before re-asking a source for a file. Clamped to the range 15–60 when the file is loaded. |
| `Autoconnect` | `1` | Connect to enabled networks when aMule starts. |
| `Reconnect` | `1` | Reconnect automatically after losing a server connection. |
| `ShowOverhead` | `0` | Show protocol overhead bandwidth in the status bar. |
| `UPnPEnabled` | `0` | Enable UPnP to automatically open aMule's ports on your router: the eD2k TCP port (`Port`), the server UDP port (`Port`+3) and the extended UDP port (`UDPPort`). |
| `UPnPTCPPort` | `50000` | Internal UPnP TCP port used for UPnP communication. |
| `NetworkInterface` | _(empty)_ | Bind aMule's own network sockets to a single egress interface, given by name (e.g. `tun0`, `eth0`, `en0`) or index — **not** an IP address. Uses the platform's interface-binding facility (`SO_BINDTODEVICE` on Linux, `IP_BOUND_IF` on macOS, `IP_UNICAST_IF` on Windows). Empty = use all interfaces. Useful for keeping aMule traffic on a specific VPN interface. On Windows the name is the adapter's friendly name (e.g. `Ethernet`, `Wi-Fi`). HTTP downloads (server list, IP filter, GeoIP updates) are only bound where wxWidgets' curl backend is available — never on Windows. Not supported on BSD. |

### Server

| Key | Default | Description |
|---|---|---|
| `RemoveDeadServer` | `1` | Remove servers that repeatedly fail to connect or respond. |
| `DeadServerRetry` | `3` | Maximum number of failures before a server is removed (1–10). Failed connection attempts and failed UDP pings add to one shared counter: the periodic ping sweep removes a server once the counter reaches `DeadServerRetry`, and the sweep after a successful server connection removes servers whose counter exceeds it. Static servers are never removed. |
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
| `Endgame` | `1` | Enable endgame source rotation. When a file with more than 4 parts has no more than 4 parts' worth of data (about 38.9 MB) left to download, a source that has run out of blocks to request cancels the transfer of another source downloading at less than half its speed (one that holds blocks it can use) and takes over those blocks, so a download does not stall at 99% behind one slow peer. No block is requested twice. |
| `AddNewFilesPaused` | `0` | Add new downloads in paused state. |
| `DAPPref` | `1` | Set the priority of new downloads to Auto (Dynamic Auto-Priority). |
| `PreviewPrio` | `0` | Always download the first and last chunks of a file first (useful for previewing video). |
| `UAPPref` | `1` | Set the share priority of newly completed or newly shared files to Auto (Upload Auto-Priority). |
| `StartNextFile` | `0` | Automatically resume the highest-priority paused file when a download completes. |
| `StartNextFileSameCat` | `0` | When `StartNextFile=1`, resume from the same category first. |
| `StartNextFileAlpha` | `0` | When `StartNextFile=1`, resume the next file in alphabetical order instead of by priority. |
| `CheckDiskspace` | `1` | Monitor free disk space and pause downloads when space falls below `MinFreeDiskSpace`. |
| `MinFreeDiskSpace` | `500` | Minimum free disk space in MiB before downloads are paused (requires `CheckDiskspace=1`). |
| `AllocateFullFile` | `0` | Pre-allocate the full file size on disk when a download starts. Prevents fragmentation but uses disk space immediately. |
| `CreateSparseFiles` | `1` | Create part files as sparse files, saving disk space when `AllocateFullFile=0`. Only has an effect when the core runs on Windows; on macOS, Linux and BSD part files are sparse anyway. Exposed as a checkbox in the Files preferences panel on Windows and in `amulegui`. |
| `MMapEnabled` | `0` | Use memory-mapped file I/O for part files. Can be toggled at runtime; the change is applied when preferences are saved. The key is always stored, but it only takes effect (and the checkbox is only shown) where the core is built with memory-mapping support (`MMAP_SUPPORTED`; never on Windows). |

:::note
The keys `ExecOnCompletion` and `ExecOnCompletionCommand` existed in aMule 2.2.x and earlier. They were removed and replaced by the `[UserEvents]` section in current versions. See the [`[UserEvents]` section](#userevents-section) below.
:::

### Directories

| Key | Default | Description |
|---|---|---|
| `IncomingDir` | _(per platform)_ | Directory where completed downloads are moved. Windows and macOS: `aMule Downloads` in the user's Documents folder. Linux and BSD: `~/.aMule/Incoming`. |
| `TempDir` | `<config dir>/Temp` | Directory for in-progress downloads (`*.part` files), inside the configuration directory (e.g. `~/.aMule/Temp` on Linux). |
| `ShareHiddenFiles` | `0` | Include hidden files when sharing the contents of shared directories. |
| `AutoRescanSharedDirs` | `1` | Automatically rescan shared directories for new or removed files using a filesystem watcher. When disabled, you must click "Reload shared files" manually. |
| `FollowSymlinksInShares` | `1` | Follow symbolic links (to files or directories) when scanning shared folders. When disabled, symlinked entries are skipped. |
| `ExcludeSharePatterns` | _(see note)_ | Names of files to exclude from sharing, given as `\|`-separated wildcard patterns (or a single regular expression when `ExcludeSharePatternsUseRegex=1`). Ships with a non-empty default list of common OS junk files. |
| `ExcludeSharePatternsUseRegex` | `0` | Treat the whole `ExcludeSharePatterns` string as one regular expression instead of a `\|`-separated list of wildcards. |
| `VideoPlayer` | _(empty)_ | Command used to preview files. For completed files it is only used for audio and video; other types open with the desktop's default application, which is also the fallback if the player cannot be started. The file path is appended as the last argument, unless the command contains `%PARTFILE` (full path), `%PARTNAME` (file name — for an unfinished download, the `.part` file's name) or the legacy `$file`. Empty = completed files open with the desktop's default application; previewing an unfinished download requires a player. |

:::note Default `ExcludeSharePatterns`
The default value is a `|`-separated list of common OS junk files:

```
.DS_Store|._*|.Spotlight-V100|.Trashes|.fseventsd|.DocumentRevisions-V100|.TemporaryItems|.apdisk|Thumbs.db|ehthumbs.db|desktop.ini|.directory
```
:::

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
| `OSDirectory` | `<config dir>` | Directory where the signature files are written. Defaults to the configuration directory (e.g. `~/.aMule/` on Linux). |

### Message Filter

| Key | Default | Description |
|---|---|---|
| `FilterMessages` | `1` | Enable message filtering. Gates `FilterAllMessages` and `FilterWordMessages`; `MessagesFromFriendsOnly` and `MessageFromValidSourcesOnly` apply regardless of it. Messages from a client you are currently chatting with are never filtered. |
| `FilterAllMessages` | `0` | Ignore all incoming messages. |
| `MessagesFromFriendsOnly` | `0` | Ignore messages from users not in the friends list. |
| `MessageFromValidSourcesOnly` | `1` | Ignore messages from unknown clients — clients that have not sent a user name. |
| `FilterWordMessages` | `0` | Ignore messages containing words from `MessageFilter`. |
| `MessageFilter` | _(empty)_ | Comma-separated list of words to filter (requires `FilterWordMessages=1`). Each entry is trimmed and matched case-insensitively as a substring of the message; a value of exactly `*` filters every message. |
| `ShowMessagesInLog` | `1` | Include the text of accepted incoming chat messages in the log. Filtered messages are only logged as *Message filtered from …*, without their text. |
| `AdvancedSpamFilter` | `1` | Enable the advanced spam filter (heuristic detection of spam messages). |
| `MessageUseCaptchas` | `1` | Require new contacts to solve a CAPTCHA before their messages are shown. Requires `AdvancedSpamFilter=1`. |
| `FilterComments` | `0` | Filter file comments containing words from `CommentFilter`. |
| `CommentFilter` | _(empty)_ | Comma-separated list of words to filter in file comments. |

### Security

| Key | Default | Description |
|---|---|---|
| `SeeShare` | `2` | Who can see your shared files list. `0` = everyone, `1` = friends only, `2` = nobody. |
| `IPFilterAutoLoad` | `0` | Download and apply the IP filter from `IPFilterURL` at startup. |
| `IPFilterURL` | `https://upd.emule-security.org/ipfilter.zip` | URL to download the IP filter from. Supports `http://`, `https://`, and `ftp://`. |
| `FilterLevel` | `127` | IP filter level (0–255). Ranges whose access level is **less than** this value are blocked. |
| `FilterLanIPs` | `1` | Always block LAN IP addresses (`10.0.0.0/8`, `172.16.0.0/12`, `192.168.0.0/16`). |
| `ParanoidFiltering` | `1` | Paranoid handling of non-matching IPs: reject a packet if the client IP differs from the IP it was received from. |
| `IPFilterSystem` | `0` | Fall back to the system-wide `ipfilter.dat` if the local file cannot be loaded. |

### GeoIP

Settings for [IP2Country](../ip2country.md), the country flags shown next to clients and servers.

| Key | Default | Description |
|---|---|---|
| `GeoIPEnabled` | `1` | Show country flags next to clients and servers (requires a GeoIP country database). Only written by builds compiled with GeoIP support (`ENABLE_IP2COUNTRY`). aMule sets it to `0` itself when no download URL can be built for the selected source (e.g. MaxMind without a license key), or when a download fails and no database file exists. |
| `GeoIPSource` | `dbip` | GeoIP database provider — the key you edit by hand to switch source. One of `dbip` (DB-IP, the default), `maxmind` (MaxMind GeoLite2) or `custom` (your own URL). Any other value falls back to `dbip`. |
| `GeoIPAutoUpdate` | `1` | At startup (and, in `amule`, when GeoIP is enabled in Preferences), check for a newer GeoIP database and download it if there is one (conditional GET, see [`[HTTPDownload]`](#httpdownload-section)). Only when `GeoIPEnabled=1`. |
| `GeoIPMaxMindLicense` | _(empty)_ | MaxMind license key, used only when `GeoIPSource=maxmind`. |
| `GeoIPCustomUrl` | _(empty)_ | URL of a custom GeoIP database, used only when `GeoIPSource=custom`. |

:::note
`GeoIPLoadedSource` records which provider the currently loaded database came from (provenance, written by aMule), and `GeoLiteCountryUpdateUrl` is a legacy key kept only to migrate older configurations (a non-empty value is moved once into `GeoIPCustomUrl`, with `GeoIPSource` set to `custom` — only if `GeoIPSource` is still `dbip` and `GeoIPCustomUrl` is empty). On every load, a Custom URL pointing to a legacy libGeoIP `.dat` file (such as the 2.3.x default) is cleared and `GeoIPSource` reset to `dbip`. Neither selects the provider — use `GeoIPSource` for that.
:::

### Statistics

Settings behind the [Statistics](../../interfaces/gui/statistics.md) window's graphs and tree.

| Key | Default | Description |
|---|---|---|
| `StatGraphsInterval` | `3` | Graph update interval in seconds. |
| `StatsAverageMinutes` | `5` | Time window (minutes) used to calculate running average in graphs. |
| `VariousStatisticsMaxValue` | `100` | Maximum connections value shown in the connections graph (the **Connections Graph Scale**). |
| `DownloadCapacity` | `12500` | Download line capacity in KiB/s (the **Download graph scale**): the maximum the download graph represents. Also drives the tray-icon speed bar and the download-limit presets in the tray menu; does not throttle transfers by itself. |
| `UploadCapacity` | `2500` | Upload line capacity in KiB/s (the **Upload graph scale**): the maximum the upload graph represents. Also drives the upload-limit presets in the tray menu; does not throttle transfers by itself. |
| `statsInterval` | `30` | Statistics tree update interval in seconds. |
| `StatsServerName` | `Shorty's ED2K stats` | Display name of the external ED2K stats server used for file lookups. |
| `StatsServerURL` | `https://ed2k.shortypower.org/?hash=` | URL prefix for the external stats server. The file hash is appended. |
| `StatColor0`–`StatColor14` | _(various)_ | RGB colour values for the 15 statistics graph elements. Not written by `amuled`. |

### Interface

| Key | Default | Description |
|---|---|---|
| `LiveListSort` | `1` | Keep the list views (downloads, uploads and others) sorted live as rows update, not only when you click a column header. |
| `SearchHistoryEnabled` | `1` | Remember the search history across restarts: past search terms ([`searchhistory.dat`](./index.md#searchhistorydat)) and the results of the searches still open at exit ([`StoredSearches.met`](./index.md#storedsearchesmet)). |
| `ShowInfoOnCatTabs` | `1` | Show file counts on category tabs. |
| `ShowRatesOnTitle` | `0` | Show transfer speeds in the window title. `0` = off, `1` = after app name, `2` = before app name. |
| `ShowVersionOnTitle` | `0` | Show the aMule version in the window title (release builds only). |
| `VerticalToolbar` | `0` | Show the toolbar vertically instead of horizontally. |
| `3DDepth` | `10` | 3D rounding depth of the progress/chunk bars in the download, sources and shared-files lists (the unlabelled Flat–Round slider next to **Show progress bar** in the Interface preferences). `0` = flat. |

### Advanced

| Key | Default | Description |
|---|---|---|
| `FileBufferSizePref` | `16` | Maximum memory per file for write buffering, in KiB. |
| `QueueSizePref` | `50` | Maximum number of clients in the upload queue (multiplied by 100 internally). |
| `ServerKeepAliveTimeout` | `0` | Interval in minutes for server keep-alive pings (see [Server](#server) section). |
| `DropSlowSources` | `0` | When a source has run out of blocks to request, cancel the transfer of another downloading source running at less than half its speed (instead of dropping the source that ran out) and let the faster one take over its blocks. Config-only; `Endgame` does the same automatically near completion. |

### Debugging

| Key | Default | Description |
|---|---|---|
| `VerboseDebug` | `0` | Enable verbose debug logging to `logfile`. When enabled, additional message categories can be selected in the Debugging preferences panel. Only available in debug builds. |
| `VerboseDebugLogfile` | `0` | Write non-critical debug messages only to `logfile`, not to the on-screen log. Only available in debug builds. |

### Internal / layout

These keys are managed by aMule. Editing them manually is not recommended, except where a key's description says otherwise.

| Key | Description |
|---|---|
| `SmartIdState` | Cached result of the Smart ID check (internal state). |
| `FirstRunWizardDone` | Whether the [first-run setup wizard](../../../quickstart-guide.md#setup-wizard) is done. Written by aMule: set to `1` when the wizard is finished, when it is cancelled and the user chooses not to see it again, and on installs upgraded from a version without this key. Set it to `0` while aMule is closed to run the wizard again on the next start. |
| `MaxConPerFiveDefaultBumped` | One-shot migration marker, set after the `MaxConnectionsPerFiveSeconds` default was raised from 20 to 50. Written by aMule; do not edit. |
| `TableOrdering<Name>`, `TableWidths<Name>` | Column sort order and widths for each list. `<Name>` is the list name: `Server`, `Download`, `Shared`, `Search`, `Sources`, `Peers`, `ClientsDown`, `ClientsUp`, `ClientHistory`, `Friend`, `FileDetail`. `TableOrdering` is a comma-separated list of `<column>:<descending 0/1>:<alternate 0/1>` entries; `TableWidths` is a comma-separated list of `<column>:<width>` entries, where a zero or negative width marks a hidden column. `<column>` is the column's short internal code (e.g. `S`). |

## `[Browser]` section

Browser selection for opening web links from within aMule.

| Key | Default | Description |
|---|---|---|
| `OpenPageInTab` | `1` | Open links in a new tab when possible. |
| `CustomBrowserString` | _(empty)_ | Command for a custom browser. Empty = the system default browser. On macOS the default is `/usr/bin/open`. |

## `[MediaMetadata]` section

Extraction of media metadata (duration, bitrate, codec, and tags such as artist, album and title) from media files, using `ffprobe`. The extracted fields appear as columns in the shared-files and search-result lists, and are published with the file to eD2k servers and Kad, where the servers and Kad nodes that index the file can use them to answer other clients' searches.

| Key | Default | Description |
|---|---|---|
| `Enabled` | `1` | Extract media metadata with `ffprobe`. |
| `FFProbePath` | _(empty)_ | Path to the `ffprobe` binary. Empty = auto-detect from the system `PATH` and the standard install locations. |

## `[ExternalConnect]` section

[External Connections (EC)](../../../developer/ec-protocol.md) settings used by remote tools ([`amulegui`](../../interfaces/gui/amulegui.md), [`amuleapi`](../../interfaces/amuleapi/index.md), [`amulecmd`](../../interfaces/amulecmd.md), [`amuleweb`](../../interfaces/amuleweb.md)), plus several display and security preferences.

| Key | Default | Description |
|---|---|---|
| `AcceptExternalConnections` | `0` | Enable the EC interface so that remote tools can connect. |
| `ECAddress` | `127.0.0.1` | IP address on which aMule listens for EC connections. Empty = listen on all interfaces. |
| `ECNetworkInterface` | _(empty)_ | Bind the EC listener to a single interface, given by name (e.g. `tun0`, `eth0`, `en0`) or index — not an IP address. Empty = all interfaces. |
| `ECPort` | `4712` | TCP port for EC connections. |
| `ECPassword` | _(empty)_ | MD5 hash of the EC password. |
| `RequireEncryption` | `0` | Require EC connections to be encrypted; reject unencrypted clients. |
| `AuthFailureWindowSeconds` | `60` | Sliding window, in seconds, over which failed EC authentications are counted. **Config-only** — no dialog field. |
| `AuthFailureThreshold` | `10` | Number of failed EC authentications within the window that triggers a lockout. **Config-only** — no dialog field. |
| `AuthLockoutSeconds` | `300` | Duration, in seconds, of the lockout after the failure threshold is reached. **Config-only** — no dialog field. |
| `UPnPECEnabled` | `0` | Enable UPnP to automatically open the EC port (`ECPort`) on your router. Only takes effect when `UPnPEnabled=1`. |
| `UseSecIdent` | `1` | Enable Secure User Identification. |
| `UseSrcSeeds` | `0` | Save sources for rare files (corresponds to "Save 10 sources on rare files" in Files preferences). |
| `IpFilterClients` | `1` | Apply the IP filter to client connections. |
| `IpFilterServers` | `1` | Apply the IP filter to server connections. |
| `ShowPercent` | `1` | Show completion percentage in the download list. |
| `ShowProgressBar` | `1` | Show the chunk availability progress bar in the download list. |
| `TransmitOnlyUploadingClients` | `0` | When sending the client list over EC to EC clients (`amulegui`, `amuleapi`), include only the clients you are currently uploading to. Config-only. |

:::note
The three `AuthFailure*` / `AuthLockout*` keys throttle EC login attempts. [`amuleapi`](../../interfaces/amuleapi/index.md) has its own, separate equivalents in [`amuleapi.conf`](./amuleapi-conf.md).
:::

## `[WebServer]` section

[`amuleweb`](../../interfaces/amuleweb.md) built-in web server settings.

| Key | Default | Description |
|---|---|---|
| `Enabled` | `0` | Start the `amuleweb` server automatically when aMule launches. |
| `Port` | `4711` | Port on which `amuleweb` listens for browser connections. |
| `PageRefreshTime` | `120` | Browser page auto-refresh interval in seconds. |
| `UseGzip` | `1` | Gzip-compress the HTTP responses `amuleweb` sends to the browser. |
| `UseLowRightsUser` | `0` | Enable the guest (low-rights) account. |
| `Password` | _(empty)_ | MD5 hash of the administrator password. |
| `PasswordLow` | _(empty)_ | MD5 hash of the guest password. |
| `Template` | _(empty)_ | Web template (skin) name. Empty = default template. |
| `UPnPWebServerEnabled` | `0` | Enable UPnP to automatically open the web server port (`Port`) on your router. |
| `WebUPnPTCPPort` | `50001` | Value of the **Web server UPnP TCP port (Optional)** preference. Stored but currently not used: `amuleweb` reads `UPnPTCPPort` instead. |
| `UPnPTCPPort` | `50001` | Internal UPnP TCP port used by `amuleweb`. Never written by aMule itself; add it by hand to change the port. |
| `Path` | `amuleweb` | Path or name of the `amuleweb` binary. |

## `[AmuleApi]` section

Controls the built-in [`amuleapi`](../../interfaces/amuleapi/index.md) daemon (REST API and Web UI), which aMule can auto-start as a child process. Everything else `amuleapi` needs lives in its own [`amuleapi.conf`](./amuleapi-conf.md); only the keys below are stored in `amule.conf`.

| Key | Default | Description |
|---|---|---|
| `Enabled` | `0` | Auto-start `amuleapi` as a child process when aMule launches. Requires External Connections (`AcceptExternalConnections=1`). |
| `HttpPort` | `4713` | HTTP port on which `amuleapi` serves the REST API and Web UI. Note the key is `HttpPort`, not `Port`. |
| `BindAddress` | `127.0.0.1` | Address `amuleapi` listens on. `127.0.0.1` = loopback only. |
| `Path` | `amuleapi` | Path or name of the `amuleapi` binary. |

:::note
The admin and guest passwords are **not** stored in `amule.conf`. They live in the shared [`amuleapi-passwords`](./index.md#amuleapi-passwords) credential store. None of the `Password`, `GuestPassword` or `GuestEnabled` keys is read from or written to `amule.conf`; they exist only in memory, to relay a change from the Preferences dialog. Leftover `Password`/`GuestPassword` entries are deleted on load.
:::

## `[Proxy]` section

SOCKS5, SOCKS4, SOCKS4a, or HTTP proxy configuration. See [Proxy](../proxy.md) for a full explanation of how the proxy feature works.

| Key | Default | Description |
|---|---|---|
| `ProxyEnableProxy` | `0` | Enable proxy use. |
| `ProxyType` | `0` | Proxy protocol: `0` = SOCKS5, `1` = SOCKS4, `2` = HTTP, `3` = SOCKS4a. |
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

Fast eD2k links panel toggle and main window geometry.

| Key | Default | Description |
|---|---|---|
| `FastED2KLinksHandler` | `1` | Show the Fast eD2k Links Handler panel in all windows, not only the Search window. |
| `MAIN_X_POS`, `MAIN_Y_POS` | _(varies)_ | Main window position (pixels from screen edge). |
| `MAIN_X_SIZE`, `MAIN_Y_SIZE` | _(varies)_ | Main window size in pixels. |
| `Maximized` | `1` | Whether the main window is maximised. Written automatically. |
| `SRV_SPLITTER_POS` | _(varies)_ | Splitter position in the Servers window. |

## `[UserEvents]` section {#userevents-section}

Shell commands executed when specific events occur. This page documents only the file structure and keys; for the full description of each event, the available substitution variables, command syntax and ready-made example scripts, see the [Events](../events.md) page.

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

### Events and their sections

| Section | Event |
|---|---|
| `[UserEvents/DownloadCompleted]` | Download completed |
| `[UserEvents/NewChatSession]` | New chat session started |
| `[UserEvents/OutOfDiskSpace]` | Out of disk space |
| `[UserEvents/ErrorOnCompletion]` | Error on completion |

See the [Events](../events.md) page for the substitution variables available to each event, the command syntax (aMule does not run commands through a shell) and ready-made example scripts.

## `[Statistics]` section

| Key | Default | Description |
|---|---|---|
| `MaxClientVersions` | `0` | Maximum number of client version entries to show in the statistics tree (`0` = unlimited). |

## `[SkinGUIOptions]` section

| Key | Default | Description |
|---|---|---|
| `Skin` | _(empty)_ | Skin `.zip` file used to customise aMule's bitmaps, stored as `User:<file>.zip` (from the `skins/` folder of the configuration directory) or `System:<file>.zip` (from the system data directory) — not as a full path. Empty = no skin (default appearance). See [Skins](../../interfaces/gui/skins.md). |

## `[GUI]`, `[GUI/TransferWnd]` and `[GUI/SharedWnd]` sections

Window and panel layout settings. Written and read by aMule automatically; not intended for manual editing.

| Key | Default | Description |
|---|---|---|
| `HideOnClose` | `0` | Hide the main window to the tray instead of quitting when the window is closed. Requires `EnableTrayIcon=1`. |
| `AppImageIntegrationDeclined` | `0` | Set to `1` if the user has declined the AppImage `.desktop` integration prompt. Written automatically; do not edit. |
| `[GUI/TransferWnd] Splitter` | `463` | Vertical splitter position (pixels) in the Downloads window. |
| `[GUI/TransferWnd] ShowClientList` | `1` | Show the client list panel in the Downloads window. |
| `[GUI/SharedWnd] Splitter` | `463` | Vertical splitter position (pixels) in the Shared Files window. |
| `[GUI/SharedWnd] ShowClientList` | `1` | Show the client list panel in the Shared Files window. |
| `[GUI/SharedWnd] ClientShowMode` | `0` | Which clients the Shared Files client list shows. `0` = clients of all shared files, `1` = clients of the selected file only, `2` = active uploads only. |

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

aMule uses this section to implement **conditional GET** for the IP filter and the GeoIP database: before downloading one of them, it checks whether the URL matches the last successful download for that type. If it does and the local file exists, aMule sends an `If-Modified-Since` HTTP header — the server responds with `304 Not Modified` if the file has not changed, saving bandwidth.

Each key stores the last URL that was successfully downloaded for one specific resource type:

| Key | Resource type | Enum value |
|---|---|---|
| `URL_1` | IP filter (`ipfilter.dat` / `ipfilter.zip`) | `HTTP_IPFilter` |
| `URL_2` | Server list ([`server.met`](../../../developer/file-formats/server-met.md)) — manual download | `HTTP_ServerMet` |
| `URL_3` | Server list ([`server.met`](../../../developer/file-formats/server-met.md)) — auto-update from `addresses.dat` | `HTTP_ServerMetAuto` |
| `URL_4` | Version check file (`last_version_check`) | `HTTP_VersionCheck` |
| `URL_5` | Kademlia nodes list ([`nodes.dat`](../../../developer/file-formats/nodes-dat.md)) | `HTTP_NodesDat` |
| `URL_6` | GeoIP database (`geoip.mmdb`) | `HTTP_GeoIP` |

Keys are only written after a successful download. The `URL_2`–`URL_5` keys are written but not used for conditional GET. A key that was never written (or whose URL has changed) simply causes a full download without the `If-Modified-Since` optimisation.

## `[Debug]` section

:::warning Debug builds only
This section is only read and written by aMule when compiled with the `__DEBUG__` flag (debug builds). It has no effect in release builds. The `VerboseDebug` and `VerboseDebugLogfile` keys in the [`[eMule]` Debugging subsection](#debugging) are debug-build only too.
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
| `Cat_Kademlia Node Tracking` | Kademlia node tracking (per-node activity and flood protection). |
| `Cat_External Connect` | External Connections (EC) protocol: all packet traffic. |
| `Cat_HTTP` | HTTP download requests and responses (`server.met`, `nodes.dat`, IP filter, GeoIP). |
| `Cat_Asio Sockets` | Boost.Asio networking layer (socket events, async I/O). |
| `Cat_Media Probe` | Media metadata extraction via `ffprobe` (the `[MediaMetadata]` feature). |
| `Cat_Verify Local Data` | The Verify Local Data operation (re-hashing on-disk data against known hashes). |

The following keys existed in older versions of aMule and are automatically migrated or removed when an old `amule.conf` is loaded:

| Old key | Replacement | Notes |
|---|---|---|
| `UDPDisable` | `UDPEnable` | Semantics inverted. `UDPDisable=1` becomes `UDPEnable=0`. |
| `ExecOnCompletion` | `[UserEvents/DownloadCompleted] CoreEnabled` | Migrated automatically on first load. |
| `ExecOnCompletionCommand` | `[UserEvents/DownloadCompleted] CoreCommand` | Migrated automatically on first load. |
| `[SkinGUIOptions] UseSkinFiles` | `[SkinGUIOptions] Skin` | Key renamed; empty string replaces the boolean disable state. |
| `GeoIPUpdateUrl` | `GeoIPSource` / `GeoIPCustomUrl` | Old key removed on load (its value is not carried over); select the provider with `GeoIPSource` and, for your own URL, set `GeoIPCustomUrl`. |
| `GeoIPMaxMindAccount` | `GeoIPMaxMindLicense` | Removed on load (its value is not carried over). Only written by unreleased 3.0.x development builds; MaxMind needs only the license key. |

## Per-file comment sections

Your own comment and rating for a shared or downloaded file (set with **Add Comment/Rating** in the Shared Files list) are stored in a section named after the file's eD2k hash in hexadecimal, e.g. `[31D6CFE0D16AE931B73C59D7E0C089C0]`. The section is removed when both the comment and the rating are cleared. Written by the core; not read by `amulegui`.

| Key | Default | Description |
|---|---|---|
| `Comment` | _(empty)_ | Comment text shown to other clients. |
| `Rate` | `0` | Rating: `0` = not rated, `1` = invalid / corrupt / fake, `2` = poor, `3` = fair, `4` = good, `5` = excellent. |

## Complete example

The following is a representative `amule.conf` with current defaults. Paths will differ on your system.

```ini
[eMule]
AppVersion=3.1.0
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
SlotAllocation=10
DownloadCapacity=12500
UploadCapacity=2500
Port=4662
UDPPort=4672
UDPEnable=1
MaxSourcesPerFile=300
MaxConnections=500
ConnectToED2K=1
ConnectToKad=1
KadMaxSourceSearches=30
KadSourceReaskMinutes=30
SourceReaskMinutes=15
Autoconnect=1
Reconnect=1
ShowOverhead=0
UPnPEnabled=0
UPnPTCPPort=50000
NetworkInterface=
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
Endgame=1
AddNewFilesPaused=0
DAPPref=1
PreviewPrio=0
UAPPref=1
StartNextFile=0
StartNextFileSameCat=0
StartNextFileAlpha=0
CheckDiskspace=1
MinFreeDiskSpace=500
AllocateFullFile=0
CreateSparseFiles=1
MMapEnabled=0
IncomingDir=/home/user/.aMule/Incoming
TempDir=/home/user/.aMule/Temp
ShareHiddenFiles=0
AutoRescanSharedDirs=1
FollowSymlinksInShares=1
ExcludeSharePatterns=.DS_Store|._*|.Spotlight-V100|.Trashes|.fseventsd|.DocumentRevisions-V100|.TemporaryItems|.apdisk|Thumbs.db|ehthumbs.db|desktop.ini|.directory
ExcludeSharePatternsUseRegex=0
VideoPlayer=
KadNodesUrl=https://upd.emule-security.org/nodes.dat
StatGraphsInterval=3
StatsAverageMinutes=5
VariousStatisticsMaxValue=100
statsInterval=30
MaxConnectionsPerFiveSeconds=50
FileBufferSizePref=16
QueueSizePref=50
DropSlowSources=0
3DDepth=10
LiveListSort=1
SearchHistoryEnabled=1
ShowInfoOnCatTabs=1
ShowRatesOnTitle=0
ShowVersionOnTitle=0
VerticalToolbar=0
SeeShare=2
IPFilterAutoLoad=0
IPFilterURL=https://upd.emule-security.org/ipfilter.zip
FilterLevel=127
FilterLanIPs=1
ParanoidFiltering=1
IPFilterSystem=0
GeoIPEnabled=1
GeoIPSource=dbip
GeoIPAutoUpdate=1
GeoIPMaxMindLicense=
GeoIPCustomUrl=
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
# VerboseDebug and VerboseDebugLogfile are only written by debug builds (__DEBUG__).
VerboseDebug=0
VerboseDebugLogfile=0
Language=
SplitterbarPosition=75
YourHostname=
DateTimeFormat=%A, %x, %X
AllcatType=0
ShowAllNotCats=0
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
TableOrderingServer=N:0:0
TableWidthsServer=N:150,A:140,P:25,D:150,p:25,U:40,m:85,F:45,r:60,f:40,S:40,V:80,s:85,h:85,t:0,u:0
TableOrderingDownload=N:0:0
TableWidthsDownload=a:30,N:260,Z:60,T:65,C:65,S:65,P:170,u:50,p:55,s:70,r:110,c:220,R:220

[Browser]
OpenPageInTab=1
CustomBrowserString=

[MediaMetadata]
Enabled=1
FFProbePath=

[ExternalConnect]
AcceptExternalConnections=0
ECAddress=127.0.0.1
ECNetworkInterface=
ECPort=4712
ECPassword=
RequireEncryption=0
AuthFailureWindowSeconds=60
AuthFailureThreshold=10
AuthLockoutSeconds=300
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

[AmuleApi]
Enabled=0
HttpPort=4713
BindAddress=127.0.0.1
Path=amuleapi

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
MAIN_X_POS=217
MAIN_Y_POS=100
MAIN_X_SIZE=800
MAIN_Y_SIZE=600
Maximized=1
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

[SkinGUIOptions]
Skin=

[General]
Count=0

[GUI]
HideOnClose=0
AppImageIntegrationDeclined=0

[GUI/TransferWnd]
Splitter=463
ShowClientList=1

[GUI/SharedWnd]
Splitter=463
ShowClientList=1
ClientShowMode=0

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
Cat_Kademlia Node Tracking=0
Cat_External Connect=0
Cat_HTTP=0
Cat_Asio Sockets=0
Cat_Media Probe=0
Cat_Verify Local Data=0
```
