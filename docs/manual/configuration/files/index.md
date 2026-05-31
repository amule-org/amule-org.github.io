---
id: index
title: aMule Files Reference
---

aMule stores its configuration, data, and runtime files in a dedicated directory. Most of these files are compatible with or equivalent to eMule's files. Not all files exist at all times — many are created on demand.

## Platform paths

| Platform | Directory |
|---|---|
| Windows | `%APPDATA%\aMule\` |
| macOS | `~/Library/Application Support/aMule/` |
| Linux / Unix | `~/.aMule/` |
| FreeBSD / OpenBSD / NetBSD | `~/.aMule/` |

On macOS, whenever this reference writes `~/.aMule/`, it means `~/Library/Application Support/aMule/`.

## All files at a glance

| File | Type | Purpose | Details |
|---|---|---|---|
| `amule.conf` | Text (INI) | Main configuration — stores all user preferences | [amule.conf reference](./amule-conf.md) |
| `amule.conf.bak` | Text (INI) | Automatic backup of `amule.conf` | [Deprecated note](#deprecated-files) |
| `remote.conf` | Text (INI) | Configuration for remote tools (`amulecmd`, `amuleweb`, `amulegui`) | [remote.conf reference](./remote-conf.md) |
| `preferences.dat` | Binary | Stores the userhash and config file version | [details](#preferencesdat) |
| `preferencesKad.dat` | Binary | Stores the client IP and Kademlia ClientID | [details](#preferenceskaddat) |
| `cryptkey.dat` | Binary (PEM) | 384-bit RSA private key for Secure User Identification | [details](#cryptkeydat) |
| `server.met` | Binary | eD2k server list (IP, port, name, statistics) | [server.met reference](../../../developer/file-formats/server-met.md) |
| `server.met.bak` | Binary | Automatic backup of `server.met` | [server.met reference](../../../developer/file-formats/server-met.md) |
| `staticservers.dat` | Text | Static eD2k servers that override `server.met` entries | [details](#staticserversdat) |
| `addresses.dat` | Text | URLs to download `server.met` updates from | [details](#addressesdat) |
| `nodes.dat` | Binary | Known Kademlia contacts for network bootstrap | [nodes.dat reference](../../../developer/file-formats/nodes-dat.md) |
| `known.met` | Binary | Hash cache for shared files (avoids rehashing) | [details](#knownmet) |
| `known2_64.met` | Binary | Verified AICH hashes for shared files (large file support) | [details](#known2_64met) |
| `clients.met` | Binary | Credit ledger: bytes uploaded/downloaded per peer | [clients.met reference](../../../developer/file-formats/clients-met.md) |
| `clients.met.bak` | Binary | Automatic backup of `clients.met` | [details](../../../developer/file-formats/clients-met.md) |
| `emfriends.met` | Binary | Friends list with last known IP, port, and timestamps | [emfriends.met reference](../../../developer/file-formats/emfriends-met.md) |
| `canceled.met` | Binary | Hashes of cancelled downloads (highlights them in search results) | [details](#canceledmet) |
| `shareddir.dat` | Text | Union of all shared directories (regenerated automatically; see below) | [details](#shareddirdat) |
| `shareddir-explicit.dat` | Text | Non-recursive shared directory roots (user-added) | [details](#shareddirdat) |
| `shareddir-recursive.dat` | Text | Recursive shared directory roots (contents shared including subdirectories) | [details](#shareddirdat) |
| `ipfilter.dat` | Text | IP range block/allow list (auto-updated) | [details](#ipfilterdat) |
| `ipfilter_static.dat` | Text | Static IP range overrides (never modified by aMule) | [details](#ipfilter_staticdat) |
| `ED2KLinks` | Text | One-way interface for adding downloads to aMule | [details](#ed2klinks) |
| `amulesig.dat` | Text | aMule status signature for external apps (17-line format) | [amulesig.dat reference](../../utilities/amulesig-dat.md) |
| `onlinesig.dat` | Text | eMule-compatible 2-line status signature | [details](#onlinesigdat) |
| `muleLock` | Text | PID file that prevents two simultaneous aMule instances | [details](#mulelock) |
| `GeoLite2-Country.mmdb` | Binary | MaxMind GeoLite2 database for IP-to-country lookups | [details](#geolite2-countrymmmdb) |
| `logfile` | Text | Log of the current aMule session | [details](#logfile) |
| `logfile.bak` | Text | Log of the previous aMule session | [details](#logfile) |
| `remotelogfile` | Text | Log written by [`amulegui`](../../interfaces/gui/amulegui.md) (Remote GUI) for its own session | [details](#logfile) |
| `lastversion` | Text | History of the 10 most recently launched aMule versions | [details](#lastversion) |
| `last_version_check` | Text | Latest official aMule release version (fetched from the internet) | [details](#last_version_check) |
| `key_index.dat` | Binary | Kademlia keyword data this client publishes to the network | [details](#key_indexdat-and-load_indexdat) |
| `load_index.dat` | Binary | Kademlia client keyIDs and last-seen timestamps | [details](#key_indexdat-and-load_indexdat) |
| `casrc` | Text | CAS image/HTML generation configuration | [CAS files](../../utilities/cas.md) |
| `aMule-online-sign.html` | HTML | CAS-generated HTML status page | [CAS files](../../utilities/cas.md) |
| `aMule-online-sign.png` | Image | CAS-generated PNG status image | [CAS files](../../utilities/cas.md) |
| `*.part` | Binary | In-progress download data (in `Temp/`) | [part.met reference](../../../developer/file-formats/part-met.md) |
| `*.part.met` | Binary | Download metadata: hashes, verified chunks, tags (in `Temp/`) | [part.met reference](../../../developer/file-formats/part-met.md) |
| `*.part.met.bak` | Binary | Periodic backup of `*.part.met` | [part.met reference](../../../developer/file-formats/part-met.md) |
| `*.part.met.backup` | Binary | Write-in-progress temp (renamed to `.met` on success) | [part.met reference](../../../developer/file-formats/part-met.md) |
| `*.part.met.seeds` | Binary | Up to 10 sources for rare files (in `Temp/`) | [part.met reference](../../../developer/file-formats/part-met.md) |

## Configuration files

### `amule.conf`

**Location:** `~/.aMule/amule.conf`

This is aMule's main configuration file. It stores virtually all user preferences set through the Preferences dialog — connection limits, directories, interface settings, and more. The format is a standard Windows-style INI file. It is read on startup and written on exit.

`amule.conf.bak` is an automatic backup created each time `amule.conf` is written.

See the [amule.conf reference](./amule-conf.md) for the complete key reference and a full example file.

### `preferences.dat`

**Location:** `~/.aMule/preferences.dat`

In early eMule versions this file stored all user configuration. In current aMule it stores only two fields: the **configuration file version** and the **userhash**.

The [userhash](../../../p2p-networks/concepts.md) is a 128-bit value that uniquely identifies your client on the eD2k network. It is used for credit tracking and, when combined with `cryptkey.dat`, for Secure User Identification.

#### Format

All fields are stored in big-endian byte order.

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Version | Config file version — currently `0x14` (decimal 20) |
| 1 | 16 bytes | Userhash | 128-bit client identifier, big-endian |

**Total size:** 17 bytes.

#### Example

```
14 2C 16 62 17 9C 0E CE 02 45 55 A8 5A 56 6C 6F 49
```

Decoded:
- **Version:** `0x14` = 20
- **Userhash:** `2C1662179C0ECE024555A85A566C6F49`

### `preferencesKad.dat`

**Location:** `~/.aMule/preferencesKad.dat`

Stores the client's IP address and its Kademlia ClientID. Both are used to identify the client on the Kad network.

#### Format

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 4 bytes | IP | Client IP address, little-endian (LSB first) |
| 4 | 2 bytes | Deprecated | Unused, always `0x0000` |
| 6 | 16 bytes | ClientID | 128-bit Kademlia ID (special encoding, see below) |
| 22 | 1 byte | End-of-tags | Always `0x00` (for compatibility with old eMule clients) |

**ClientID encoding:** The 128-bit value is stored as four 32-bit little-endian integers, which together represent the value in big-endian order. aMule ignores the end-of-tags byte when reading, but writes it for compatibility.

#### Example

```
01 40 52 5B 00 00 B4 F1 52 14 18 17 9A 80 44 57 29 8A B9 3A 2B 6F 00
```

Decoded:
- **IP:** `0x5B524001` → `91.82.64.1`
- **Deprecated:** `0x0000`
- **ClientID:** `1452F1B4809A17188A2957446F2B3AB9`
- **End-of-tags:** `0x00`

### `cryptkey.dat`

**Location:** `~/.aMule/cryptkey.dat`

Contains the client's **384-bit RSA private key**, used for [Secure User Identification](../../../p2p-networks/ed2k/secure-user-identification.md). This key is unique to each client and is generated automatically the first time aMule runs.

The key is stored in a PEM-like format: 5 lines of 72 characters each, with the last line followed by a newline character.

#### Example

```
M22BCQIBADANBgkqhkiG9w0BAQEFAASB9DCB8QIBAAIxALuwVap2WUdpELRZr2VhbqoHE+P5
aiGwS1Euc8d/8kxiUK0hkYMV4YcLdeAWHQpQywIBEQIwIR8eLSPxozComEwP5LbXSy5s6/7W
fmpnV4yti/lG9SsmShKwoK1ySii9YAPnMXUhAhkA2+W8tYcsF5lm+a+Sm8H6Kkh0zW1xr9Lz
AhkA2oDfo3Q0HNRmD7LArieBObwlR+fil5JCAhkAjklb/P0ch72c++oTkfX8OXotdd1nrgD3
AhhzraOSxQyHu72P1xq2jX1wv9eAa7QyH3kCGQC7jgzTqW+wGGP/Bll2YXu8bRYphVTVZgo=
```

:::warning
This file contains your private key. Never share it. If it is compromised, anyone can impersonate your client on the eD2k network.
:::

## Network data files

### `server.met`

**Location:** `~/.aMule/server.met`

Binary database of known eD2k servers. Each entry records the server's IP address, TCP port, name, description, ping time, failure count, user count, and capability flags. The format is compatible with eMule's `server.met`. Servers listed in `staticservers.dat` override matching entries here.

See the [server.met reference](../../../developer/file-formats/server-met.md) for the complete binary format, tag reference, and a list of online sources where a current `server.met` can be downloaded.

### `staticservers.dat`

**Location:** `~/.aMule/staticservers.dat`

A text file listing eD2k servers that should always be treated as [static servers](../../interfaces/gui/preferences.md). When aMule loads, entries from this file override matching entries in `server.met`. This file is never modified by aMule.

#### Format

One server per line:

```
Host:Port,Priority,Name
```

- **Host** — IP address or hostname
- **Port** — TCP port
- **Priority** — `0` (normal), `1` (high), `2` (low). Any other value defaults to normal.
- **Name** — display name; if empty, `Host:Port` is used

Lines beginning with `/` or `#` are treated as comments and ignored. Any line that does not contain exactly three comma-separated fields is ignored.

#### Example

```
# My local test server
127.0.0.1:4662,1,LocalHost

# LAN server
192.168.0.1:4661,0,LAN server

# Low-priority server
20.19.18.17:9666,2,Backup server
```

### `addresses.dat`

**Location:** `~/.aMule/addresses.dat`

A plain-text list of URLs from which aMule downloads `server.met` files on startup (if the "Update server list on startup" preference is enabled). The downloaded lists are merged into `~/.aMule/server.met`.

#### Format

One URL per line. Supported schemes: `http://`, `https://`, `ftp://`.

#### Example

```
https://some.whe.re/server.met
http://another.file/my_preferred.met
ftp://localhost/fastservers.met
```

### `known.met`

**Location:** `~/.aMule/known.met`

Binary file that caches the hashes, names, sizes, modification dates, priorities, and notes of shared files. This prevents aMule from having to rehash every shared file each time it starts — a significant time saving for large files.

The file uses a variable-length binary block format: one block per file, whose length depends on the number of metadata tags stored. Updated whenever a file is hashed and when aMule shuts down.

### `known2_64.met`

**Location:** `~/.aMule/known2_64.met`

Binary file that stores the verified [AICH](../../../p2p-networks/ed2k/aich.md) hashes of shared files. Supports large files (64-bit sizes). This is the successor to the deprecated `known2.met`.

### `canceled.met`

**Location:** `~/.aMule/canceled.met`

Binary file storing the MD4 hashes of all downloads the user has cancelled. When a file appears in a search result but its hash is listed here, aMule marks it with a distinct colour to indicate it was previously cancelled.

#### Format

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Magic | Always `0x21` — identifies a valid `canceled.met` |
| 1 | 4 bytes | Count | Number of hashes stored (32-bit unsigned, little-endian) |
| 5 | 16 × Count | Hashes | MD4 hash of each cancelled file, 16 bytes each |

## Shared files

### `shareddir.dat`, `shareddir-explicit.dat`, `shareddir-recursive.dat` {#shareddirdat}

aMule uses three related files to track shared directories:

| File | Purpose |
|---|---|
| `shareddir-explicit.dat` | **Canonical.** Non-recursive roots: only the immediate files in each listed directory are shared (subdirectories are not included). |
| `shareddir-recursive.dat` | **Canonical.** Recursive roots: aMule expands each listed directory to include all subdirectories. |
| `shareddir.dat` | **Derived.** Union of the expanded contents of the two canonical files. aMule regenerates this file automatically on every save. External tools that only know `shareddir.dat` (e.g. old scripts or older aMule versions) can still read it. |

When aMule starts and neither `shareddir-explicit.dat` nor `shareddir-recursive.dat` exists (fresh install or migration from an older version), all entries in `shareddir.dat` are loaded as explicit (non-recursive) shares. This is the safe default for migration.

#### Format

All three files use the same format: one absolute directory path per line, UTF-8 encoded.

#### Example

`shareddir-explicit.dat`:
```
/home/user/Music
/mnt/share/books
```

`shareddir-recursive.dat`:
```
/mnt/downloads
```

`shareddir.dat` (regenerated union — includes `/mnt/downloads` and all its subdirectories):
```
/home/user/Music
/mnt/share/books
/mnt/downloads
/mnt/downloads/series
/mnt/downloads/series/season1
```

## IP filter files

### `ipfilter.dat`

**Location:** `~/.aMule/ipfilter.dat`

Text file containing IP ranges that aMule should block or allow, in the format described in the [IP Filter](../ipfilter.md) configuration guide. aMule can auto-update this file by downloading a new one from a configurable URL. During the download, the new data is written to `ipfilter.download` first, then renamed to `ipfilter.dat` on success.

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

Same format as `ipfilter.dat`, but with two important differences:

1. **Precedence:** entries in this file override conflicting entries in `ipfilter.dat`.
2. **Immutable:** aMule never modifies this file. Use it for custom IP ranges that must survive auto-updates.

#### Format

Same as `ipfilter.dat`: `RangeStart - RangeEnd , AccessLevel , Description`

- Access level `< 127` → blocked
- Access level `> 127` → allowed

#### Default comment block

When aMule creates this file for the first time, it includes the following header:

```
# This file is used to store ipfilter-ranges that should
# not be overwritten by aMule. If you wish to keep a custom
# set of ipfilter-ranges that take precedence over ipfilter-
# ranges acquired through the auto-update functionality, then
# place them in this file. aMule will not change this file.
#
# Format:
# "IPs range" , "Access level" , "Description"
# Access level values < 127 are blocked
# Access level values > 127 are allowed
#
# Example:
# RangeStart - RangeEnd , NNN , Text
# 000.000.000.000 - 000.255.255.255 , 000 , invalid ip
```

## Status and interface files

### `ED2KLinks`

**Location:** `~/.aMule/ED2KLinks`

A plain-text interface for sending commands to a running aMule instance. As soon as aMule detects that this file exists, it reads it, processes each entry, and **deletes the file**. The interface is one-directional (write-only from the user's perspective).

#### Format

One `ed2k://` link per line. The file must end with a newline after the last entry.

A line containing only `RAISE_DIALOG` tells aMule to raise its window if it is minimized.

#### Example

```
ed2k://|file|Mandrake%20Linux%2010.0-Official-Powerpack-Cd1%20i586.iso|722343936|13048F2EC3B917E33BB9593D956E81AC|/
ed2k://|file|Knoppix%20v3.6-2004-08-16-En.iso|733499392|E1A848648CF99A2295909799FA45F0A8|/
ed2k://|file|debian-30r1-i386-binary-2.iso|676495360|557B59750976519476DA071BDF79A014|/
```

This mechanism is used by browser plugins and the [`ed2k`](../../utilities/ed2k.md) command-line tool to pass links to a running aMule session.

### `onlinesig.dat` {#onlinesigdat}

**Location:** `~/.aMule/onlinesig.dat`

eMule-compatible 2-line status file. aMule generates it for compatibility with eMule utilities. The native aMule status file is [`amulesig.dat`](../../utilities/amulesig-dat.md), which carries far more information.

#### Format

Two lines separated by a Unix newline (`0x0A`). **Never** uses DOS newlines (`\r\n`), even on Windows.

**When online:**
```
Line 1: 1|<server name>|<server IP>|<server port>
Line 2: <download speed>|<upload speed>|<queue count>
```

**When offline or cleanly closed:**
```
Line 1: 0
Line 2: 0.0|0.0|0
```

Speeds are shown with exactly one decimal place. The second line does **not** end with a newline.

#### Examples

Online:
```
1|eD2k Server|20.34.253.32|4661
20.3|12.9|134
```

Offline:
```
0
0.0|0.0|0
```

### `muleLock`

**Location:** `~/.aMule/muleLock`

Plain-text file containing the PID of the currently running aMule process. It is created when aMule starts and deleted when aMule exits normally.

On startup, aMule checks whether `muleLock` exists. If it does, aMule reads the PID and checks whether a process with that PID is currently running. If one is found, aMule refuses to start, preventing two simultaneous instances for the same user.

:::note
aMule does not verify that the running process is actually another aMule. Any process with the stored PID will block startup. If `muleLock` is left behind after a crash, delete it manually before restarting aMule.
:::

#### Format

A single integer (the PID), followed by a newline.

#### Example

```
3865
```

This file replaces the old `muleconn` socket file used in versions before 2.1.0.

### `GeoLite2-Country.mmdb` {#geolite2-countrymmmdb}

**Location:** `~/.aMule/GeoLite2-Country.mmdb`

Binary database in **MaxMind DB format** (`.mmdb`), used to look up the country of any IP address. aMule uses this to display country flags next to clients and servers in the user interface.

The feature requires the `libmaxminddb` library at compile time (`ENABLE_IP2COUNTRY` CMake option). It replaces the legacy `GeoIP.dat` (libGeoIP v1 / `.dat` format), which MaxMind discontinued in 2019.

The configuration key `GeoIPEnabled` (in `[eMule]`) controls whether the feature is active. Country flag display can be disabled without deleting the file.

#### Obtaining the database

MaxMind requires a free account to download GeoLite2 databases:

1. Register at [maxmind.com](https://www.maxmind.com/) and obtain a free license key.
2. Download the **GeoLite2-Country** database in `.mmdb` format.
3. Place the file at `~/.aMule/GeoLite2-Country.mmdb`.

If you have a direct download URL (e.g. built with your MaxMind license key, or from a trusted mirror), configure it with the `GeoLiteCountryUpdateUrl` key in `[eMule]`:

```ini
GeoLiteCountryUpdateUrl=https://download.maxmind.com/app/geoip_download?edition_id=GeoLite2-Country&license_key=YOUR_KEY&suffix=tar.gz
```

aMule will download and unpack the archive automatically. Leave the key empty to manage the file manually.

#### Transient files

During an auto-update, aMule writes `GeoLite2-Country.mmdb.download` first, then renames it to `GeoLite2-Country.mmdb` on success. The `.download` file is temporary and can be deleted if it is left behind after a failed update.

## Log files

### `logfile`

**Location:** `~/.aMule/logfile`

Plain-text log of the current aMule session. Captures all messages, warnings, and errors reported by aMule during operation. When a new session starts, the previous `logfile` is renamed to `logfile.bak` and a fresh one is created.

The [`amulegui`](../../interfaces/gui/amulegui.md) writes its own separate log to `~/.aMule/remotelogfile`. It follows the same format but records only events from the GUI process.

#### Format

```
YYYY-MM-DD HH:MM:SS: <message>
```

Multi-line messages receive a timestamp only on the first line.

#### Example

```
2005-12-11 06:57:57: Creditfile loaded, 21523 clients are known
2005-12-11 06:57:58:
2005-12-11 06:57:58: - This is aMule CVS using wxGTK2 v2.6.1 (Unicoded) (Snapshot: rev. 5953) based on eMule.
2005-12-11 06:57:58: Running on Linux 2.6.14.3 i686
2005-12-11 06:57:58: - Visit http://www.amule.org to check if a new version is available.
2005-12-11 06:57:58:
2005-12-11 06:57:58: Loading ipfilter.dat files.
2005-12-11 06:57:58: Loaded 571 IP-ranges from 'ipfilter.dat'. 1 malformed lines were discarded.
2005-12-11 06:57:59: Loaded 0 IP-ranges from 'ipfilter_static.dat'. 0 malformed lines were discarded.
2005-12-11 06:57:59: Loading server.met file: /home/user/.aMule/server.met
2005-12-11 06:57:59: 73 servers in server.met found
2005-12-11 06:58:01: Found 168 part files
2005-12-11 06:58:01: *** TCP socket (ECServer) listening on 0.0.0.0:4712
2005-12-11 06:58:01: Found 87 known shared files
2005-12-11 06:58:06: AICH Thread: Synchronization thread started.
2005-12-11 06:58:06: AICH Thread: Masterhashes of known files have been loaded.
2005-12-11 06:58:06: AICH Thread: No new files found.
2005-12-11 06:58:06: AICH Thread: Terminated.
2005-12-11 06:58:06: Connecting
2005-12-11 06:58:07: Connecting to Rasorpack 2.0 (19.25.44.23 - 19.25.44.23:80)
2005-12-11 06:58:07: Read 0 Kad contacts
2005-12-11 06:58:08: Connected to Rasorpack 2.0 (19.25.44.23:4661)
2005-12-11 06:58:08: Connected to Kad (firewalled)
2005-12-11 06:58:09: Connection established on: Rasorpack 2.0
2005-12-11 06:58:09: Connected to Rasorpack 2.0 with HighID
2005-12-11 06:58:09: New clientid is 675249139
```

## Version tracking files

### `lastversion`

**Location:** `~/.aMule/lastversion`

Plain-text file recording the last 10 aMule versions that were launched on this machine, in reverse chronological order (most recent first). aMule uses it to detect version upgrades and show first-run messages.

#### Format

- One version string per line.
- The last line must be followed by a newline character.
- No version appears more than once.
- Versions are stored in launch order, not numerically sorted.
- Maximum 10 entries. When a new version is added and 10 already exist, the oldest entry (last line) is dropped.

#### Example

```
CVS
1.2.5
1.2.6
2.0.0
1.1.0
1.2.0
1.2.2
1.0.1
1.2.1
1.1.1
```

### `last_version_check`

**Location:** `~/.aMule/last_version_check`

Single-line plain-text file containing the version number of the latest official aMule release. aMule downloads this from `http://amule.sourceforge.net/lastversion` and compares it with the running version to notify the user of updates.

#### Format

A single version string consisting only of digits and dots (e.g., `2.3.3`). The file is considered corrupt if it does not contain at least two dot characters.

#### Example

```
2.0.3
```

## Kademlia index files

### `key_index.dat` and `load_index.dat`

**Location:** `~/.aMule/key_index.dat`, `~/.aMule/load_index.dat`

Binary files that store Kademlia network index data:

- **`key_index.dat`** — stores keyword and source information that this client is currently publishing to the Kad network (i.e., what other clients can look up from this node).
- **`load_index.dat`** — stores keyIDs of known Kademlia clients along with the date when each was last seen. Used to calculate load distribution across the Kad network.

Both files are internal to the Kad implementation and are not intended for manual editing.

## Deprecated files

These files are no longer created by current aMule versions but may be present in older installations.

| File | Replaced by | Deprecated since |
|---|---|---|
| `~/.eMule/` | `~/.aMule/amule.conf` | aMule 2.0.0 |
| `~/.aMule/aMule.tmpl` | `~/.aMule/webserver/` (skin directory) | aMule 2.0.0 |
| `~/.aMule/known2.met` | `~/.aMule/known2_64.met` (large-file support) | — |
| `~/.aMule/muleconn` | `~/.aMule/muleLock` | aMule 2.1.0 |
| `~/.aMule/server_met.old` | (backup of `server.met`, no longer written) | — |
| `~/.aMule/src_index.dat` | `~/.aMule/key_index.dat` (renamed in later versions) | — |
| `~/.aMule/GeoIP.dat` | `~/.aMule/GeoLite2-Country.mmdb` (MaxMind DB format; libGeoIP v1 discontinued in 2019) | — |

## Directories

| Directory | Purpose |
|---|---|
| `~/.aMule/Incoming/` | Default location for completed downloads on Linux/Unix |
| `~/.aMule/Temp/` | In-progress downloads (`*.part`, `*.part.met`, and related files) |
| `~/.aMule/webserver/` | `amuleweb` skin files |
| `~/Documents/aMule Downloads/` | Default completed-downloads location on macOS and Windows (since aMule 2.0.0) |
| `~/aMule Downloads/` | Old Windows completed-downloads location (before aMule 2.1.0) |
| `<app_dir>/Incoming/` | Fallback on macOS/Windows if the Documents folder cannot be determined |
