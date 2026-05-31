---
id: index
title: Configuration Files
---

aMule stores its configuration, data, and runtime files in a dedicated directory. Most of these files are compatible with or equivalent to eMule's files. Not all files exist at all times — many are created on demand.

This page is a **catalogue**: what each file is, what it is for, and where to find it. The only files meant to be edited by hand are [`amule.conf`](./amule-conf.md) and [`remote.conf`](./remote-conf.md). For the **on-disk format** of the non-editable files (binary layouts, byte tables, parsing scripts), each entry links to the [File Formats reference](../../../developer/file-formats/index.md) in the Developer Guide.

## Platform paths

| Platform | Directory |
|---|---|
| Windows | `%APPDATA%\aMule\` |
| macOS | `~/Library/Application Support/aMule/` |
| Linux / Unix / BSD | `~/.aMule/` |

On macOS, whenever this reference writes `~/.aMule/`, it means `~/Library/Application Support/aMule/`.

:::note
These are aMule's **configuration** paths. For the **download** directories (Incoming, Temporary, and shared folders), see [Download Folders](../download-folders.md).
:::

## All files at a glance

| File | Description |
|---|---|
| [`amule.conf`](#amuleconf) | Main configuration — stores all user preferences |
| [`amule.conf.bak`](#amuleconf) | Automatic backup of `amule.conf` (written on shutdown) |
| [`amule.conf.backup`](#amuleconf) | Backup of `amule.conf`, written only when started with `--reset-config` |
| [`remote.conf`](#remoteconf) | Configuration for remote tools (`amulecmd`, `amuleweb`, `amulegui`) |
| [`preferences.dat`](#preferencesdat) | Stores the userhash and config file version |
| [`preferencesKad.dat`](#preferenceskaddat) | Stores the client IP and Kademlia ClientID |
| [`cryptkey.dat`](#cryptkeydat) | 384-bit RSA private key for Secure User Identification |
| [`server.met`](#servermet) | eD2k server list (IP, port, name, statistics) |
| [`server.met.bak`](#servermet) | Automatic backup of `server.met` |
| [`server_auto.met`](#servermet) | Temporary file holding a server list during auto-update (deleted after merge) |
| [`staticservers.dat`](#staticserversdat) | Static eD2k servers that override `server.met` entries |
| [`addresses.dat`](#addressesdat) | URLs to download `server.met` updates from |
| [`nodes.dat`](#nodesdat) | Known Kademlia contacts for network bootstrap |
| [`known.met`](#knownmet) | Hash cache for shared files (avoids rehashing) |
| [`known2_64.met`](#known2_64met) | Verified AICH hashes for shared files (large file support) |
| [`clients.met`](#clientsmet) | Credit ledger: bytes uploaded/downloaded per peer |
| [`clients.met.bak`](#clientsmet) | Automatic backup of `clients.met` |
| [`emfriends.met`](#emfriendsmet) | Friends list with last known IP, port, and timestamps |
| [`statistics.dat`](#statisticsdat) | Lifetime traffic totals (cumulative bytes uploaded/downloaded) |
| [`canceled.met`](#canceledmet) | Hashes of cancelled downloads (highlights them in search results) |
| [`shareddir.dat`](#shareddirdat) | Union of all shared directories (regenerated automatically) |
| [`shareddir-explicit.dat`](#shareddirdat) | Non-recursive shared directory roots (user-added) |
| [`shareddir-recursive.dat`](#shareddirdat) | Recursive shared directory roots (contents shared including subdirectories) |
| [`ipfilter.dat`](#ipfilterdat) | IP range block/allow list (auto-updated) |
| [`ipfilter_static.dat`](#ipfilter_staticdat) | Static IP range overrides (never modified by aMule) |
| [`ED2KLinks`](#ed2klinks) | One-way interface for adding downloads to aMule |
| [`amulesig.dat`](#amulesigdat) | aMule status signature for external apps (17-line format) |
| [`onlinesig.dat`](#onlinesigdat) | eMule-compatible 2-line status signature |
| [`muleLock`](#mulelock) | PID file that prevents two simultaneous aMule instances |
| [`muleLockRGUI`](#mulelock) | PID file for the Remote GUI (`amulegui`) instance |
| [`GeoLite2-Country.mmdb`](#geolite2-countrymmmdb) | MaxMind GeoLite2 database for IP-to-country lookups |
| [`logfile`](#logfile) | Log of the current aMule session |
| [`logfile.bak`](#logfile) | Log of the previous aMule session |
| [`remotelogfile`](#logfile) | Log written by `amulegui` (Remote GUI) for its own session |
| [`lastversion`](#lastversion) | History of the 10 most recently launched aMule versions |
| [`last_version_check`](#last_version_check) | Latest release info fetched from GitHub (Releases API JSON) |
| [`last_version`](#last_version_check) | Rename destination of a successful version-check download |
| [`key_index.dat`](#kad-index-files) | Kademlia keyword data this client publishes to the network |
| [`src_index.dat`](#kad-index-files) | Kademlia source data this client publishes to the network |
| [`load_index.dat`](#kad-index-files) | Kademlia client keyIDs and last-seen timestamps |
| [`casrc`](#cas-files) | CAS image/HTML generation configuration |
| [`aMule-online-sign.html`](#cas-files) | CAS-generated HTML status page |
| [`aMule-online-sign.png`](#cas-files) | CAS-generated PNG status image |
| [`*.part`](#temporary-download-files) | In-progress download data (in `Temp/`) |
| [`*.part.met`](#temporary-download-files) | Download metadata: hashes, verified chunks, tags (in `Temp/`) |
| [`*.part.met.bak`](#temporary-download-files) | Periodic backup of `*.part.met` |
| [`*.part.met.backup`](#temporary-download-files) | Write-in-progress temp (renamed to `.met` on success) |
| [`*.part.met.seeds`](#temporary-download-files) | Up to 10 sources for rare files (in `Temp/`) |

## Configuration files

### `amule.conf`

**Location:** `~/.aMule/amule.conf`

This is aMule's main configuration file. It stores virtually all user preferences set through the Preferences dialog — connection limits, directories, interface settings, and more. The format is a standard Windows-style INI file. It is read on startup and written on exit.

`amule.conf.bak` is an automatic backup: on a clean shutdown aMule copies the current `amule.conf` to `amule.conf.bak`, so the previous session's configuration is always available.

A separate `amule.conf.backup` is written only when aMule is started with the `--reset-config` option: the existing configuration is renamed to `amule.conf.backup` before being reset to default values.

See the [amule.conf reference](./amule-conf.md) for the complete key reference and a full example file.

### `remote.conf`

**Location:** `~/.aMule/remote.conf`

Configuration file for the remote tools — `amulecmd`, `amuleweb`, and the Remote GUI (`amulegui`). It stores the External Connections host, port, and password, plus tool-specific settings. The format is a standard INI file.

See the [remote.conf reference](./remote-conf.md) for the complete key reference and a full example file.

### `preferences.dat`

**Location:** `~/.aMule/preferences.dat`

In early eMule versions this file stored all user configuration. In current aMule it stores only two fields: the **configuration file version** and the **userhash** — a 128-bit value that uniquely identifies your client on the eD2k network (used for credit tracking and Secure User Identification).

This file is not meant to be edited by hand. For its binary layout, see the [`preferences.dat` format reference](../../../developer/file-formats/index.md#preferencesdat).

### `preferencesKad.dat`

**Location:** `~/.aMule/preferencesKad.dat`

Stores the client's IP address and its Kademlia ClientID. Both are used to identify the client on the Kad network.

For its binary layout, see the [`preferencesKad.dat` format reference](../../../developer/file-formats/index.md#preferenceskaddat).

### `cryptkey.dat`

**Location:** `~/.aMule/cryptkey.dat`

Contains the client's **384-bit RSA private key**, used for [Secure User Identification](../../../p2p-networks/ed2k/secure-user-identification.md). This key is unique to each client and is generated automatically the first time aMule runs.

:::warning
This file contains your private key. Never share it. If it is compromised, anyone can impersonate your client on the eD2k network.
:::

For its storage format, see the [`cryptkey.dat` format reference](../../../developer/file-formats/index.md#cryptkeydat).

## Network data files

### `server.met`

**Location:** `~/.aMule/server.met`

Binary database of known eD2k servers. Each entry records the server's IP address, TCP port, name, description, ping time, failure count, user count, and capability flags. The format is compatible with eMule's `server.met`. Servers listed in `staticservers.dat` override matching entries here. `server.met.bak` is an automatic backup. During an automatic server-list update, the downloaded list is written to `server_auto.met` first, then merged into `server.met` and deleted on success.

#### Obtaining server.met online

A current `server.met` can be downloaded on first run, when the local list is empty, or when all known servers are unreachable:

| URL | Notes |
|---|---|
| `https://upd.emule-security.org/server.met` | Default URL configured in aMule; maintained by the eMule Security project |
| `https://shortypower.org/server.met` | Aggregated server list |

:::note
These are third-party services unaffiliated with the aMule project. Their availability may change over time.
:::

Enter a URL in the **Networks → eD2k** tab to download immediately, or set `Ed2kServersUrl` in [`amule.conf`](./amule-conf.md) for automatic updates at startup.

For the complete binary format and tag reference, see the [server.met reference](../../../developer/file-formats/server-met.md).

### `staticservers.dat`

**Location:** `~/.aMule/staticservers.dat`

A text file listing eD2k servers that should always be treated as [static servers](../../interfaces/gui/preferences.md). When aMule loads, entries from this file override matching entries in `server.met`. This file is never modified by aMule.

For its line format, see the [`staticservers.dat` format reference](../../../developer/file-formats/index.md#staticserversdat).

### `addresses.dat`

**Location:** `~/.aMule/addresses.dat`

A plain-text list of URLs from which aMule downloads `server.met` files on startup (if the "Update server list on startup" preference is enabled). The downloaded lists are merged into `~/.aMule/server.met`.

For its format, see the [`addresses.dat` format reference](../../../developer/file-formats/index.md#addressesdat).

### `nodes.dat`

**Location:** `~/.aMule/nodes.dat`

Binary file storing known Kademlia contacts used to bootstrap the Kad network on startup.

#### Obtaining nodes.dat online

A fresh `nodes.dat` is useful on first run, when the local file is missing, or when it has become too stale to bootstrap into Kad:

| URL | Notes |
|---|---|
| `https://upd.emule-security.org/nodes.dat` | Default URL configured in aMule; maintained by the eMule Security project |

:::note
This is a third-party service unaffiliated with the aMule project. Its availability may change over time.
:::

Enter a URL in the **Networks → Kad** tab to download immediately, or set `KadNodesUrl` in [`amule.conf`](./amule-conf.md) for automatic updates. Once connected to Kad, aMule keeps `nodes.dat` up to date automatically.

For the complete binary format, see the [nodes.dat reference](../../../developer/file-formats/nodes-dat.md).

### `known.met`

**Location:** `~/.aMule/known.met`

Binary file that caches the hashes, names, sizes, modification dates, priorities, and notes of shared files. This prevents aMule from having to rehash every shared file each time it starts — a significant time saving for large files.

For its format, see the [`known.met` format reference](../../../developer/file-formats/index.md#knownmet).

### `known2_64.met`

**Location:** `~/.aMule/known2_64.met`

Binary file that stores the verified [AICH](../../../p2p-networks/ed2k/aich.md) hashes of shared files. Supports large files (64-bit sizes). This is the successor to the deprecated `known2.met`.

For more detail, see the [`known2_64.met` format reference](../../../developer/file-formats/index.md#known2_64met).

### `clients.met`

**Location:** `~/.aMule/clients.met`

Binary credit ledger: for every peer you have exchanged data with, it records the bytes uploaded and downloaded, used to compute the credits that influence your position in other clients' upload queues. `clients.met.bak` is an automatic backup.

See the [clients.met reference](../../../developer/file-formats/clients-met.md) for the complete binary format.

### `emfriends.met`

**Location:** `~/.aMule/emfriends.met`

Binary file storing your friends list: each entry keeps a friend's userhash, last known IP, port, and timestamps.

See the [emfriends.met reference](../../../developer/file-formats/emfriends-met.md) for the complete binary format.

### `canceled.met`

**Location:** `~/.aMule/canceled.met`

Binary file storing the MD4 hashes of all downloads the user has cancelled. When a file appears in a search result but its hash is listed here, aMule marks it with a distinct colour to indicate it was previously cancelled.

For its format, see the [`canceled.met` format reference](../../../developer/file-formats/index.md#canceledmet).

### `statistics.dat`

**Location:** `~/.aMule/statistics.dat`

Small binary file storing aMule's **lifetime traffic totals** — the cumulative number of bytes ever uploaded and downloaded across all sessions. These totals were previously kept in the `[Statistics]` section of `amule.conf`; current aMule migrates them into this file on first load.

For its format, see the [`statistics.dat` format reference](../../../developer/file-formats/index.md#statisticsdat).

## Shared files

### `shareddir.dat`, `shareddir-explicit.dat`, `shareddir-recursive.dat` {#shareddirdat}

aMule uses three related files to track shared directories:

| File | Purpose |
|---|---|
| `shareddir-explicit.dat` | **Canonical.** Non-recursive roots: only the immediate files in each listed directory are shared (subdirectories are not included). |
| `shareddir-recursive.dat` | **Canonical.** Recursive roots: aMule expands each listed directory to include all subdirectories. |
| `shareddir.dat` | **Derived.** Union of the expanded contents of the two canonical files. aMule regenerates this file automatically on every save. External tools that only know `shareddir.dat` (e.g. old scripts or older aMule versions) can still read it. |

When aMule starts and neither `shareddir-explicit.dat` nor `shareddir-recursive.dat` exists (fresh install or migration from an older version), all entries in `shareddir.dat` are loaded as explicit (non-recursive) shares. This is the safe default for migration.

For the shared file format, see the [shared directory files reference](../../../developer/file-formats/index.md#shareddirdat).

## IP filter files

The IP filter blocks all traffic to and from a configurable list of IP addresses and ranges: blocked IPs cannot upload to you or download from you. The list is read from the two files below. aMule's `ipfilter.dat` is 100% compatible with eMule's. To enable and tune the filter, see [Preferences → Security → IP-Filtering](../../interfaces/gui/preferences.md#ip-filtering).

### `ipfilter.dat`

**Location:** `~/.aMule/ipfilter.dat`

Text file containing IP ranges that aMule should block or allow. aMule can auto-update this file by downloading a new one from a configurable URL. During the download, the new data is written to `ipfilter.download` first, then renamed to `ipfilter.dat` on success. The downloaded file may be a ZIP archive; aMule decompresses it automatically and accepts any of the entries named `ipfilter.dat`, `guardian.p2p`, or `guarding.p2p` (the PeerGuardian list filenames). For how to enable and tune the filter, see [Preferences → Security → IP-Filtering](../../interfaces/gui/preferences.md#ip-filtering); for the line format, see the [ipfilter format reference](../../../developer/file-formats/index.md#ipfilterdat).

If the local file cannot be loaded and **Use system-wide ipfilter.dat if available** (`IPFilterSystem`) is enabled, aMule falls back to a system-wide `ipfilter.dat` (on Linux, typically `/usr/share/amule/ipfilter.dat`). This lets a package manager or cron job maintain a shared file, so aMule does not have to re-download a large list at every startup.

#### Obtaining ipfilter.dat online

| URL | Notes |
|---|---|
| `https://upd.emule-security.org/ipfilter.zip` | Maintained by the eMule Security project; distributed as a ZIP archive that aMule decompresses automatically |

:::note
This is a third-party service unaffiliated with the aMule project. Its availability may change over time.
:::

Configure the URL via the `IPFilterURL` key in [`amule.conf`](./amule-conf.md):

```ini
[eMule]
IPFilterURL=https://upd.emule-security.org/ipfilter.zip
```

### `ipfilter_static.dat`

**Location:** `~/.aMule/ipfilter_static.dat`

Same purpose as `ipfilter.dat`, but with two important differences: its entries override conflicting entries in `ipfilter.dat`, and aMule never modifies it. Use it for custom IP ranges that must survive auto-updates.

For its format (identical to `ipfilter.dat`) and the default comment block aMule writes, see the [ipfilter format reference](../../../developer/file-formats/index.md#ipfilterdat).

### Always-filtered ranges (hard-coded)

In addition to the ranges loaded from the files above, aMule **always** blocks the reserved IP ranges
defined by [RFC 3330](https://www.rfc-editor.org/rfc/rfc3330). These are reserved, special-use, or
non-routable addresses that should never appear as eD2k peers. This list is compiled into aMule and
**cannot be disabled** by any preference:

```
0.0.0.0/8         "This" Network                     [RFC1700]
39.0.0.0/8        Reserved but subject to allocation [RFC1797]
127.0.0.0/8       Loopback                           [RFC1700]
128.0.0.0/16      Reserved but subject to allocation
169.254.0.0/16    Link Local
191.255.0.0/16    Reserved but subject to allocation
192.0.0.0/24      Reserved but subject to allocation
192.0.2.0/24      Test-Net
192.88.99.0/24    6to4 Relay Anycast                 [RFC3068]
198.18.0.0/15     Network Interconnect Benchmarking  [RFC2544]
223.255.255.0/24  Reserved but subject to allocation
224.0.0.0/4       Multicast                          [RFC3171]
240.0.0.0/4       Reserved for Future Use            [RFC1700]
```

Separately, the private LAN ranges below are blocked **only** when **Always filter LAN IPs**
(`FilterLanIPs`, in [`amule.conf`](./amule-conf.md)) is enabled, which is the default:

```
10.0.0.0/8        Private-Use Networks               [RFC1918]
172.16.0.0/12     Private-Use Networks               [RFC1918]
192.168.0.0/16    Private-Use Networks               [RFC1918]
```

## Status and interface files

### `ED2KLinks`

**Location:** `~/.aMule/ED2KLinks`

A plain-text interface for sending commands to a running aMule instance. As soon as aMule detects that this file exists, it reads it, processes each entry, and **deletes the file**. The interface is one-directional (write-only from the user's perspective). It is used by browser plugins and the [`ed2k`](../../utilities/ed2k.md) command-line tool to pass links to a running aMule session.

For its format, see the [`ED2KLinks` format reference](../../../developer/file-formats/index.md#ed2klinks).

### `amulesig.dat` {#amulesigdat}

**Location:** `~/.aMule/amulesig.dat`

aMule's native status signature file: a 17-line text file that external applications (such as the [`cas`](../../utilities/cas-wxcas.md) tool) read to display the client's current status. See the [amulesig.dat reference](../../../developer/file-formats/index.md#amulesigdat) for details.

### `onlinesig.dat` {#onlinesigdat}

**Location:** `~/.aMule/onlinesig.dat`

eMule-compatible 2-line status file. aMule generates it for compatibility with eMule utilities. The native aMule status file is [`amulesig.dat`](#amulesigdat), which carries far more information.

For its format, see the [`onlinesig.dat` format reference](../../../developer/file-formats/index.md#onlinesigdat).

### `muleLock`

**Location:** `~/.aMule/muleLock`

Plain-text file containing the PID of the currently running aMule process. It is created when aMule starts and deleted when aMule exits normally.

On startup, aMule checks whether `muleLock` exists. If it does, aMule reads the PID and checks whether a process with that PID is currently running. If one is found, aMule refuses to start, preventing two simultaneous instances for the same user.

:::note
aMule does not verify that the running process is actually another aMule. Any process with the stored PID will block startup. If `muleLock` is left behind after a crash, delete it manually before restarting aMule.
:::

The Remote GUI (`amulegui`) uses its own lock file, `muleLockRGUI`, with the same mechanism, so a local aMule instance and the Remote GUI do not block each other.

This file replaces the old `muleconn` socket file used in versions before 2.1.0.

### `GeoLite2-Country.mmdb` {#geolite2-countrymmmdb}

**Location:** `~/.aMule/GeoLite2-Country.mmdb`

Binary database in **MaxMind DB format** (`.mmdb`), used to look up the country of any IP address. aMule uses this to display country flags next to clients and servers in the user interface.

The feature requires the `libmaxminddb` library at compile time (`ENABLE_IP2COUNTRY` CMake option).

:::note
Since aMule 3.0.0 the legacy GeoIP system (libGeoIP v1 / `GeoIP.dat`) is **no longer used**; it has been replaced by MaxMindDB. MaxMind discontinued the legacy `.dat` databases in 2019.
:::

The configuration key `GeoIPEnabled` (in `[eMule]`) controls whether the feature is active. Country flag display can be disabled without deleting the file.

#### Obtaining the database

aMule does **not** ship the database. MaxMind requires a free account to download GeoLite2 databases:

1. Register at [maxmind.com](https://www.maxmind.com/) and obtain a free license key.
2. Download the **GeoLite2-Country** database in the binary `.mmdb` format (the *GZIP* download, not the CSV variant).
3. Decompress it: `gunzip GeoLite2-Country*.mmdb.gz`.
4. Place the resulting file at `~/.aMule/GeoLite2-Country.mmdb`.

Some community mirrors redistribute the same database; use them at your own risk and verify checksums when possible. Replacing the file requires an aMule restart.

#### Auto-update

aMule can refresh the database itself if you set a direct download URL in the `GeoLiteCountryUpdateUrl` key under `[eMule]`. **There is no field for this in the GUI** — edit `amule.conf` directly while aMule is not running:

```ini
GeoLiteCountryUpdateUrl=https://example.org/path/GeoLite2-Country.mmdb.gz
```

During an auto-update, aMule writes `GeoLite2-Country.mmdb.download` first, then renames it to `GeoLite2-Country.mmdb` on success. The `.download` file is temporary and can be deleted if it is left behind after a failed update. Leave the key empty (the default) to manage the file manually.

:::caution
aMule's auto-updater only understands `.mmdb` or `.mmdb.gz` files. MaxMind's official download URL (`…&suffix=tar.gz`) delivers a `.tar.gz` with a date-stamped subdirectory and **does not work** end-to-end — use a mirror that serves a plain `.mmdb.gz`, or download manually. This is why `GeoLiteCountryUpdateUrl` is empty by default; when the file is missing aMule logs a message asking for a manual download.
:::

The on-disk layout is the standard MaxMind DB format and is not aMule-specific; see the [GeoLite2 note](../../../developer/file-formats/index.md#geolite2-countrymmmdb) in the File Formats reference.

## Log files

### `logfile`

**Location:** `~/.aMule/logfile`

Plain-text log of the current aMule session, capturing all messages, warnings, and errors reported during operation. When a new session starts, the previous `logfile` is renamed to `logfile.bak` and a fresh one is created. Each line is prefixed with a `YYYY-MM-DD HH:MM:SS:` timestamp.

The [`amulegui`](../../interfaces/gui/amulegui.md) writes its own separate log to `~/.aMule/remotelogfile`, in the same format but recording only events from the GUI process.

## Version tracking files

### `lastversion`

**Location:** `~/.aMule/lastversion`

Plain-text file recording the last 10 aMule versions launched on this machine, in reverse chronological order (most recent first), one version string per line. aMule uses it to detect version upgrades and show first-run messages. When an 11th version is added, the oldest entry is dropped.

### `last_version_check`

**Location:** `~/.aMule/last_version_check`

File holding the response of aMule's update check. aMule queries the GitHub Releases API (`https://api.github.com/repos/amule-org/amule/releases/latest`) and stores the returned JSON here; it then extracts the `tag_name` field and compares it with the running version to notify the user of updates. On a successful download the file is renamed to `last_version`.

This replaces the legacy single-line `lastversion` text file that was fetched from SourceForge, which has been unmaintained since the project moved to GitHub.

## Kademlia index files

### `key_index.dat`, `src_index.dat` and `load_index.dat` {#kad-index-files}

**Location:** `~/.aMule/key_index.dat`, `~/.aMule/src_index.dat`, `~/.aMule/load_index.dat`

Binary files that store the Kademlia network index data this client maintains as a node of the Kad network:

- `key_index.dat` — keyword index: the keywords this client publishes so other clients can search for files through it.
- `src_index.dat` — source index: the sources (which clients hold which files) this client publishes.
- `load_index.dat` — keyIDs of known Kademlia clients with their last-seen dates, used to gauge network load.

All three are internal to the Kad implementation and are not intended for manual editing.

For more detail, see the [Kad index files format reference](../../../developer/file-formats/index.md#key_indexdat-and-load_indexdat).

## CAS files

### `casrc`, `aMule-online-sign.html`, `aMule-online-sign.png` {#cas-files}

Files used by the [`cas`](../../utilities/cas-wxcas.md) status-image tool: `casrc` is its configuration, and `aMule-online-sign.html` / `aMule-online-sign.png` are the HTML and PNG status outputs it generates. See the [`cas` / `wxcas` documentation](../../utilities/cas-wxcas.md) for details.

## Temporary download files

### `*.part`, `*.part.met` and related {#temporary-download-files}

Each in-progress download in the `Temp/` directory is represented by a group of files: `*.part` (the partial data), `*.part.met` (metadata: hashes, verified chunks, tags), `*.part.met.bak` / `*.part.met.backup` (backups), and `*.part.met.seeds` (up to 10 sources for rare files).

See the [Temporary download files reference](../../../developer/file-formats/part-met.md) for the complete formats.

## Deprecated files

These files are no longer created by current aMule versions but may be present in older installations.

| File | Replaced by | Deprecated since |
|---|---|---|
| `~/.eMule/` | `~/.aMule/amule.conf` | aMule 2.0.0 |
| `~/.aMule/aMule.tmpl` | `~/.aMule/webserver/` (skin directory) | aMule 2.0.0 |
| `~/.aMule/known2.met` | `~/.aMule/known2_64.met` (large-file support) | — |
| `~/.aMule/muleconn` | `~/.aMule/muleLock` | aMule 2.1.0 |
| `~/.aMule/server_met.old` | (backup of `server.met`, no longer written) | — |
| `~/.aMule/GeoIP.dat` | `~/.aMule/GeoLite2-Country.mmdb` (MaxMind DB format) | aMule 3.0.0 |
