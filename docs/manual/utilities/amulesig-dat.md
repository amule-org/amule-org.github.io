---
id: amulesig-dat
title: amulesig.dat
---

`amulesig.dat` is aMule's status signature file. It is written periodically by aMule to inform external applications — such as [CAS](./cas.md), [wxCAS](./cas-wxcas.md), and IRC bots — of the current state of the running aMule instance.

**Location:** `~/.aMule/amulesig.dat`

`amulesig.dat` is the native aMule format and is a superset of eMule's `onlinesig.dat`. It carries considerably more information across 17 lines, while `onlinesig.dat` provides only 2 lines of basic status for compatibility with older eMule utilities.

## Format

The file is plain text. Each data field occupies exactly one line. The 17th (last) line **must** be followed by a newline character (`\n`). Line endings are always Unix (`\n`); never DOS (`\r\n`), even on Windows.

### Line reference

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

## Complete example

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

## Offline example

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
