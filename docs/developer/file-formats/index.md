---
id: index
title: File Formats
---

Reference for the **binary and textual formats** of the files aMule reads and writes. These are
the files that are **not meant to be edited by hand**: their on-disk layout is documented here for
developers, integrators, and expert users who need to parse, repair, or build aMule's data files.

For the **editable configuration files** (`amule.conf`, `remote.conf`), see the
[aMule Files Reference](../../manual/configuration/config-files/index.md) in the User Manual — editing
those is a user task, so their key reference lives there. The same registry lists every file aMule
creates, with a one-line description and a link to its format here.

## Files with a dedicated page

The most complex formats have their own reference pages:

- [`server.met`](./server-met.md) — eD2k server list
- [`nodes.dat`](./nodes-dat.md) — Kademlia contacts (bootstrap)
- [`clients.met`](./clients-met.md) — credit ledger
- [`emfriends.met`](./emfriends-met.md) — friends list
- [Temporary download files](./part-met.md) — `*.part`, `*.part.met`, `*.part.met.seeds`

The remaining formats are documented inline below.

## `preferences.dat` {#preferencesdat}

In early eMule versions this file stored all user configuration. In current aMule it stores only
two fields: the **configuration file version** and the **userhash**.

The [userhash](../../p2p-networks/concepts.md) is a 128-bit value that uniquely identifies a client
on the eD2k network. It is used for credit tracking and, when combined with `cryptkey.dat`, for
Secure User Identification.

### Format

All fields are stored in big-endian byte order.

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Version | Config file version — currently `0x14` (decimal 20) |
| 1 | 16 bytes | Userhash | 128-bit client identifier, big-endian |

**Total size:** 17 bytes.

### Example

```
14 2C 16 62 17 9C 0E CE 02 45 55 A8 5A 56 6C 6F 49
```

Decoded:
- **Version:** `0x14` = 20
- **Userhash:** `2C1662179C0ECE024555A85A566C6F49`

## `preferencesKad.dat` {#preferenceskaddat}

Stores the client's IP address and its Kademlia ClientID. Both are used to identify the client on
the Kad network.

### Format

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 4 bytes | IP | Client IP address, little-endian (LSB first) |
| 4 | 2 bytes | Deprecated | Unused, always `0x0000` |
| 6 | 16 bytes | ClientID | 128-bit Kademlia ID (special encoding, see below) |
| 22 | 1 byte | End-of-tags | Always `0x00` (for compatibility with old eMule clients) |

**ClientID encoding:** The 128-bit value is stored as four 32-bit little-endian integers, which
together represent the value in big-endian order. aMule ignores the end-of-tags byte when reading,
but writes it for compatibility.

### Example

```
01 40 52 5B 00 00 B4 F1 52 14 18 17 9A 80 44 57 29 8A B9 3A 2B 6F 00
```

Decoded:
- **IP:** `0x5B524001` → `91.82.64.1`
- **Deprecated:** `0x0000`
- **ClientID:** `1452F1B4809A17188A2957446F2B3AB9`
- **End-of-tags:** `0x00`

## `cryptkey.dat` {#cryptkeydat}

Contains the client's **384-bit RSA private key**, used for
[Secure User Identification](../../p2p-networks/ed2k/secure-user-identification.md). This key is
unique to each client and is generated automatically the first time aMule runs.

The key is stored in a PEM-like format: 5 lines of 72 characters each, with the last line followed
by a newline character.

### Example

```
M22BCQIBADANBgkqhkiG9w0BAQEFAASB9DCB8QIBAAIxALuwVap2WUdpELRZr2VhbqoHE+P5
aiGwS1Euc8d/8kxiUK0hkYMV4YcLdeAWHQpQywIBEQIwIR8eLSPxozComEwP5LbXSy5s6/7W
fmpnV4yti/lG9SsmShKwoK1ySii9YAPnMXUhAhkA2+W8tYcsF5lm+a+Sm8H6Kkh0zW1xr9Lz
AhkA2oDfo3Q0HNRmD7LArieBObwlR+fil5JCAhkAjklb/P0ch72c++oTkfX8OXotdd1nrgD3
AhhzraOSxQyHu72P1xq2jX1wv9eAa7QyH3kCGQC7jgzTqW+wGGP/Bll2YXu8bRYphVTVZgo=
```

:::warning
This file contains your private key. Never share it. If it is compromised, anyone can impersonate
your client on the eD2k network.
:::

## `staticservers.dat` {#staticserversdat}

A text file listing eD2k servers that should always be treated as
[static servers](../../manual/interfaces/gui/preferences.md). When aMule loads, entries from this
file override matching entries in `server.met`. This file is never modified by aMule.

### Format

One server per line:

```
Host:Port,Priority,Name
```

- **Host** — IP address or hostname
- **Port** — TCP port
- **Priority** — `0` (normal), `1` (high), `2` (low). Any other value defaults to normal.
- **Name** — display name; if empty, `Host:Port` is used

Lines beginning with `/` or `#` are treated as comments and ignored. Any line that does not contain
exactly three comma-separated fields is ignored.

### Example

```
# My local test server
127.0.0.1:4662,1,LocalHost

# LAN server
192.168.0.1:4661,0,LAN server

# Low-priority server
20.19.18.17:9666,2,Backup server
```

## `addresses.dat` {#addressesdat}

A plain-text list of URLs from which aMule downloads `server.met` files on startup (if the "Update
server list on startup" preference is enabled). The downloaded lists are merged into
`~/.aMule/server.met`.

### Format

One URL per line. Supported schemes: `http://`, `https://`, `ftp://`.

### Example

```
https://some.whe.re/server.met
http://another.file/my_preferred.met
ftp://localhost/fastservers.met
```

## `known.met` {#knownmet}

Binary file that caches the hashes, names, sizes, modification dates, priorities, and notes of
shared files. This prevents aMule from having to rehash every shared file each time it starts — a
significant time saving for large files.

The file uses a variable-length binary block format: one block per file, whose length depends on
the number of metadata tags stored. Updated whenever a file is hashed and when aMule shuts down.

## `known2_64.met` {#known2_64met}

Binary file that stores the verified [AICH](../../p2p-networks/ed2k/aich.md) hashes of shared files.
Supports large files (64-bit sizes). This is the successor to the deprecated `known2.met`.

## `canceled.met` {#canceledmet}

Binary file storing the MD4 hashes of all downloads the user has cancelled. When a file appears in
a search result but its hash is listed here, aMule marks it with a distinct colour to indicate it
was previously cancelled.

### Format

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Magic | Always `0x21` — identifies a valid `canceled.met` |
| 1 | 4 bytes | Count | Number of hashes stored (32-bit unsigned, little-endian) |
| 5 | 16 × Count | Hashes | MD4 hash of each cancelled file, 16 bytes each |

## Shared directory files {#shareddirdat}

aMule uses three related files to track shared directories: `shareddir-explicit.dat`,
`shareddir-recursive.dat`, and the derived `shareddir.dat`.

| File | Purpose |
|---|---|
| `shareddir-explicit.dat` | **Canonical.** Non-recursive roots: only the immediate files in each listed directory are shared (subdirectories are not included). |
| `shareddir-recursive.dat` | **Canonical.** Recursive roots: aMule expands each listed directory to include all subdirectories. |
| `shareddir.dat` | **Derived.** Union of the expanded contents of the two canonical files. aMule regenerates this file automatically on every save. External tools that only know `shareddir.dat` (e.g. old scripts or older aMule versions) can still read it. |

When aMule starts and neither `shareddir-explicit.dat` nor `shareddir-recursive.dat` exists (fresh
install or migration from an older version), all entries in `shareddir.dat` are loaded as explicit
(non-recursive) shares. This is the safe default for migration.

### Format

All three files use the same format: one absolute directory path per line, UTF-8 encoded.

### Example

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

## `ipfilter.dat` and `ipfilter_static.dat` {#ipfilterdat}

Text files containing the IP ranges that aMule blocks or allows. `ipfilter.dat` is the main list
(auto-updatable); `ipfilter_static.dat` holds custom overrides that aMule never modifies. For how
to enable and configure IP filtering, and where to download `ipfilter.dat`, see the
[aMule Files Reference](../../manual/configuration/config-files/index.md#ip-filter-files) and
[Preferences → Security → IP-Filtering](../../manual/interfaces/gui/preferences.md#ip-filtering).

### Format

One range per line. aMule accepts two line formats:

**PeerGuardian format** (the common one, compatible with eMule):

```
RangeStart - RangeEnd , AccessLevel , Description
```

**AntiP2P format** (the description precedes the range; the access level is implicitly `0`):

```
Description : RangeStart - RangeEnd
```

A range is blocked when its `AccessLevel` is **less than** the configured *Filtering Level*
(`FilterLevel`, default 127); equal or higher levels are allowed. Because AntiP2P entries default to
access level `0`, they are always blocked at any filtering level above 0.

Lines beginning with `#` are comments. Malformed lines are skipped and logged.

`ipfilter_static.dat` uses the exact same format, with two differences:

1. **Precedence:** entries in it override conflicting entries in `ipfilter.dat`.
2. **Immutable:** aMule never modifies it. Use it for custom IP ranges that must survive
   auto-updates.

### Default comment block

When aMule creates `ipfilter_static.dat` for the first time, it includes the following header:

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

## `ED2KLinks` {#ed2klinks}

A plain-text interface for sending commands to a running aMule instance. As soon as aMule detects
that this file exists, it reads it, processes each entry, and **deletes the file**. The interface
is one-directional (write-only from the user's perspective).

### Format

One `ed2k://` link per line. The file must end with a newline after the last entry.

A line containing only `RAISE_DIALOG` tells aMule to raise its window if it is minimized.

### Example

```
ed2k://|file|Mandrake%20Linux%2010.0-Official-Powerpack-Cd1%20i586.iso|722343936|13048F2EC3B917E33BB9593D956E81AC|/
ed2k://|file|Knoppix%20v3.6-2004-08-16-En.iso|733499392|E1A848648CF99A2295909799FA45F0A8|/
ed2k://|file|debian-30r1-i386-binary-2.iso|676495360|557B59750976519476DA071BDF79A014|/
```

This mechanism is used by browser plugins and the [`ed2k`](../../manual/utilities/ed2k.md)
command-line tool to pass links to a running aMule session.

## `amulesig.dat` {#amulesigdat}

aMule's status signature file. It is written periodically by aMule to inform external applications — such as [`cas`, `wxcas`](../../manual/utilities/wxcas-cas.md), and IRC bots — of the current state of the running aMule instance. **Location:** `~/.aMule/amulesig.dat`.

`amulesig.dat` is the native aMule format and is a superset of eMule's [`onlinesig.dat`](#onlinesigdat). It carries considerably more information across 17 lines, while `onlinesig.dat` provides only 2 lines of basic status for compatibility with older eMule utilities.

### Format

The file is plain text, one field per line, written through wxWidgets' text-file facility
(`wxTextFile`). Line endings are therefore the host platform's **native** ones — LF (`\n`) on Linux,
macOS and BSD, and CRLF (`\r\n`) on Windows — and a trailing newline follows the last (17th) line.
Note that the fixed sentinel blocks aMule emits while connecting or after a clean shutdown embed
literal `\n` separators regardless of platform, so on Windows such a file can mix `\n` and `\r\n`;
parsers should split on `\n` and strip a trailing `\r`.

| Line | Field | Values | Notes |
|---|---|---|---|
| 1 | ED2K connection status | `0` = disconnected, `1` = connected, `2` = connecting | Value `2` introduced in aMule 2.0.0-rc4 |
| 2 | Server name | Server name string, or `0` | `0` when offline, connecting, or cleanly closed |
| 3 | Server IP | Server IP address string, or `0` | `0` when offline, connecting, or cleanly closed |
| 4 | Server port | Server port number, or `0` | `0` when offline, connecting, or cleanly closed |
| 5 | Client ID type | `H` ([High ID](../../p2p-networks/high-id-low-id.md)), `L` ([Low ID](../../p2p-networks/high-id-low-id.md)), or `0` | `0` when disconnected, connecting, or cleanly closed |
| 6 | Kademlia status | `0` = disconnected, `1` = connected (firewalled), `2` = connected (ok) | Introduced in aMule 2.1.0 |
| 7 | Download speed | Decimal number with exactly one decimal place (e.g., `157.2`) | `0.0` when cleanly closed (since rc4) |
| 8 | Upload speed | Decimal number with exactly one decimal place (e.g., `21.5`) | `0.0` when cleanly closed (since rc4) |
| 9 | Upload queue count | Integer — number of clients in the upload queue | `0` when cleanly closed |
| 10 | Shared file count | Integer — number of files currently shared | `0` when cleanly closed |
| 11 | Nickname | The user's configured nickname string | |
| 12 | Total bytes downloaded | Integer — cumulative bytes downloaded across all sessions | |
| 13 | Total bytes uploaded | Integer — cumulative bytes uploaded across all sessions | |
| 14 | aMule version | Version string, e.g. `2.3.3` or `CVS` | |
| 15 | Session bytes downloaded | Integer — bytes downloaded in the current session | `0` when connecting or cleanly closed (since rc4) |
| 16 | Session bytes uploaded | Integer — bytes uploaded in the current session | `0` when connecting or cleanly closed (since rc4) |
| 17 | Uptime | Seconds aMule has been running | `0` when cleanly closed (since rc6); see version notes below |

### Version history notes

- **aMule 2.0.0-rc4:** Introduced the `2` (connecting) status for line 1. Lines 2–5, 7, 8, 15, and 16 all report `0` / `0.0` when aMule is in connecting state or was cleanly closed.
- **aMule 2.0.0-rc5:** No format changes.
- **aMule 2.0.0-rc6:** Line 17 (uptime) changed from a human-readable string with unit (e.g., `3 mins`) to an integer number of seconds. When aMule is cleanly closed, line 17 is now `0` (previously it was `00 secs`).
- **aMule 2.1.0:** Line 6 (Kademlia status) was added. Files written by versions before 2.1.0 do not contain this line.

### Complete example

The following is a valid `amulesig.dat` file while aMule is online:

```
1
eD2k Server
23.48.235.15
4661
H
2
157.2
21.5
521
34
Happy aMule user
23496736693
3296032695
CVS
143534593
23387432
3865
```

Decoded:

| Line | Field | Value | Meaning |
|---|---|---|---|
| 1 | ED2K status | `1` | Connected |
| 2 | Server name | `eD2k Server` | |
| 3 | Server IP | `23.48.235.15` | |
| 4 | Server port | `4661` | |
| 5 | ID type | `H` | [High ID](../../p2p-networks/high-id-low-id.md) |
| 6 | Kad status | `2` | Kad connected (OK, not firewalled) |
| 7 | Download speed | `157.2` | 157.2 KiB/s |
| 8 | Upload speed | `21.5` | 21.5 KiB/s |
| 9 | Upload queue | `521` | 521 clients waiting |
| 10 | Shared files | `34` | 34 files shared |
| 11 | Nickname | `Happy aMule user` | |
| 12 | Total downloaded | `23496736693` | ~21.9 GiB total |
| 13 | Total uploaded | `3296032695` | ~3.1 GiB total |
| 14 | Version | `CVS` | Development build |
| 15 | Session downloaded | `143534593` | ~136.9 MiB this session |
| 16 | Session uploaded | `23387432` | ~22.3 MiB this session |
| 17 | Uptime | `3865` | 3865 seconds ≈ 64 minutes |

### Offline example

When aMule is cleanly closed, the file is left in the following state:

```
0
0
0
0
0
0
0.0
0.0
0
0
Happy aMule user
23496736693
3296032695
CVS
0
0
0
```

## `onlinesig.dat` {#onlinesigdat}

eMule-compatible 2-line status file. aMule generates it for compatibility with eMule utilities.
The native aMule status file is `amulesig.dat`, which carries far more information.

### Format

Two content lines. aMule always joins them with a literal LF (`0x0A`), then writes the file through
wxWidgets' text-file facility (`wxTextFile`), which appends a trailing newline using the host
platform's **native** line ending (LF on Linux, macOS and BSD; CRLF on Windows).

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

Speeds are shown with exactly one decimal place.

### Examples

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

## `GeoLite2-Country.mmdb` {#geolite2-country-mmdb}

Binary database in **MaxMind DB format** (`.mmdb`), used to look up the country of any IP address.
The on-disk layout is the standard MaxMind DB format and is not aMule-specific. For how to obtain
and configure the database, see the
[aMule Files Reference](../../manual/configuration/config-files/index.md#geolite2-country-mmdb).

## `key_index.dat`, `src_index.dat` and `load_index.dat` {#key_indexdat-and-load_indexdat}

Binary files that store the Kademlia network index data this client maintains as a Kad node:

- **`key_index.dat`** — keyword index: the keywords this client publishes to the Kad network, so
  other clients can search for files through it.
- **`src_index.dat`** — source index: the sources (which clients hold which files) this client
  publishes to the Kad network.
- **`load_index.dat`** — stores keyIDs of known Kademlia clients along with the date when each was
  last seen. Used to calculate load distribution across the Kad network.

All three files are internal to the Kad implementation and are not intended for manual editing.

## `statistics.dat` {#statisticsdat}

Small binary file storing aMule's lifetime traffic totals: the cumulative number of bytes
ever uploaded and downloaded across all sessions. These totals were previously kept in the
`[Statistics]` section of `amule.conf` (`TotalUploadedBytes` / `TotalDownloadedBytes`); aMule now
migrates those keys into this file on first load and deletes them from the config.

### Format

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Version | Always `0x00` — identifies the current `statistics.dat` layout |
| 1 | 8 bytes | Total uploaded | Cumulative bytes sent (64-bit unsigned, little-endian) |
| 9 | 8 bytes | Total downloaded | Cumulative bytes received (64-bit unsigned, little-endian) |
