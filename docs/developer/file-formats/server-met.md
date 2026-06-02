---
id: server-met
title: server.met
---

`server.met` is the binary database of known eD2k servers. Each entry records the server's IP address, TCP port, display name, description, ping time, failure count, user count, and capability flags. aMule reads the file at startup and writes it on exit.

**Location:** `~/.aMule/server.met`

The format is compatible with eMule's `server.met`. Servers listed in `staticservers.dat` override matching entries in `server.met`.

All multi-byte integers are stored in **little-endian** byte order.

For background on what eD2k servers are, how the server list works, fake servers, and how to maintain a safe server list, see [eD2k Servers](../../p2p-networks/ed2k/servers.md).

### Related files

| File | Role |
|---|---|
| `server.met.bak` | Backup written each time `server.met` is saved (replaces any previous backup) |
| `server.met.new` | Transient write target; renamed to `server.met` on success, otherwise discarded |
| `server.met.download` | Temporary destination for a downloaded server list; renamed to `server.met` on success |
| `server_auto.met` | Staging area where downloaded lists are held before being merged into `server.met` |

## Obtaining server.met online

A current `server.met` can be downloaded from the internet. This is useful on first run, when the local list is empty, or when all known servers are unreachable.

### Online sources

The following sources host downloadable `server.met` files compatible with aMule:

| URL | Notes |
|---|---|
| `https://upd.emule-security.org/server.met` | Default URL configured in aMule; maintained by the eMule Security project |
| `https://shortypower.org/server.met` | Aggregated server list |

:::note
These are third-party services unaffiliated with the aMule project. Their availability may change over time. If a URL no longer works, search for `server.met eMule` to find current mirrors.
:::

### Downloading from the aMule interface

The **Networks → eD2k** tab contains a URL input field next to the server list controls. Enter a URL there and press Enter (or click the play button beside the field) to trigger an immediate download. aMule merges the downloaded list into the existing `server.met`.

### Automatic download via `amule.conf`

The `Ed2kServersUrl` key in the `[eMule]` section of [`amule.conf`](../../manual/configuration/config-files/amule-conf.md) sets the URL used for automatic updates at startup:

```ini
[eMule]
Serverlist=1
Ed2kServersUrl=https://upd.emule-security.org/server.met
```

`Serverlist=1` enables the automatic download at startup. `Serverlist=0` (the default) disables it. Supported URL schemes are `http://`, `https://`, and `ftp://`.

The `addresses.dat` file in the same directory provides an additional list of URLs that are also checked at startup when auto-update is enabled (one URL per line).

## Format

### File header

| Bytes | Field | Description |
|---|---|---|
| 1 | Version | `0xE0` — written by aMule. `0x0E` (`MET_HEADER`) is also accepted on read for compatibility with older files |
| 4 | Server count | Number of server records that follow (uint32, little-endian) |

### Per-server record

Each record consists of a fixed 10-byte prefix followed by a variable number of tags:

| Bytes | Field | Description |
|---|---|---|
| 4 | IP address | IPv4 address (uint32, little-endian) |
| 2 | TCP port | Standard eD2k TCP port (uint16, little-endian) |
| 4 | Tag count | Number of tags that follow (uint32, little-endian) |
| variable | Tags | Key-value pairs in eD2k tag format (see below) |

### Tag format

Each tag begins with a 1-byte type field. The value encoding is determined by the lower 7 bits of the type byte. The tag name comes next and can take three forms:

- **Short ID form** — if the `0x80` bit of the type byte is set, the name is a single numeric byte that follows immediately. eMule may emit tags this way.
- **Length-1 numeric ID** — the form aMule actually writes: the `0x80` bit is *clear*, and the name is encoded as a 2-byte length equal to `1` followed by a single byte. A name length of exactly `1` is interpreted as a **numeric tag ID**, not as a one-character string. This is how the `ST_*` IDs below appear in files written by aMule.
- **String name** — the `0x80` bit is clear and the 2-byte length is greater than `1`; the name is a UTF-8 string of that length (used for the `"users"` and `"files"` tags).

String tags (`0x02`) write a 2-byte length followed by UTF-8 bytes. For compatibility with eMule, aMule writes the four string fields `ST_SERVERNAME`, `ST_DYNIP`, `ST_DESCRIPTION` and `ST_VERSION` **twice in a row**: first a copy whose value is prefixed with a UTF-8 byte order mark (BOM, `0xEF 0xBB 0xBF`), then an identical copy without the BOM. Both carry the same tag ID, so a reader keeps the first occurrence (stripping any leading BOM) and ignores the duplicate.

### Server tag reference

aMule always writes the same set of tags for every server: `ST_FAIL`, `ST_PREFERENCE`, `"users"`, `"files"`, `ST_PING`, `ST_LASTPING`, `ST_MAXUSERS`, `ST_SOFTFILES`, `ST_HARDFILES`, `ST_UDPFLAGS` and `ST_LOWIDUSERS`. The remaining tags are written only when the corresponding field is non-empty or non-zero. Readers must treat every tag as optional, since files from other clients may omit any of them.

| Tag ID | Constant | Value type | Description |
|---|---|---|---|
| `0x01` | `ST_SERVERNAME` | string | Display name |
| `0x0B` | `ST_DESCRIPTION` | string | Description text |
| `0x0C` | `ST_PING` | uint32 | Last measured round-trip time (ms) |
| `0x0D` | `ST_FAIL` | uint32 | Number of consecutive connection failures |
| `0x0E` | `ST_PREFERENCE` | uint32 | Priority: `0` = Normal, `1` = High, `2` = Low |
| `0x85` | `ST_DYNIP` | string | Dynamic hostname (for servers without a static IP) |
| `0x86` | `ST_LASTPING_DEPRECATED` | uint32 | Deprecated — use `ST_LASTPING` (`0x90`) instead |
| `0x87` | `ST_MAXUSERS` | uint32 | Maximum user capacity |
| `0x88` | `ST_SOFTFILES` | uint32 | Soft file limit (files per user session) |
| `0x89` | `ST_HARDFILES` | uint32 | Hard file limit (global maximum files on the server) |
| `0x90` | `ST_LASTPING` | uint32 | Unix timestamp of the last successful ping |
| `0x91` | `ST_VERSION` | string or uint32 | Server software version. aMule writes a string; if read as a uint32 it is decoded as `major.minor` (high 16 bits `.` low 16 bits) |
| `0x92` | `ST_UDPFLAGS` | uint32 | UDP capability flags (see below) |
| `0x93` | `ST_AUXPORTSLIST` | string | Auxiliary TCP ports, comma-separated. On read, the first port in the list becomes the active TCP port (the original record port is kept as a fallback); empty values are ignored |
| `0x94` | `ST_LOWIDUSERS` | uint32 | Number of Low ID users currently connected |
| `0x95` | `ST_UDPKEY` | uint32 | Server UDP key for obfuscation |
| `0x96` | `ST_UDPKEYIP` | uint32 | Client IP to which the UDP key was issued |
| `0x97` | `ST_TCPPORTOBFUSCATION` | uint16 | Obfuscated TCP port |
| `0x98` | `ST_UDPPORTOBFUSCATION` | uint16 | Obfuscated UDP port |
| `"users"` | — | uint32 | Current connected user count (string-named tag) |
| `"files"` | — | uint32 | Current file count on the server (string-named tag) |

#### `ST_UDPFLAGS` bit field

| Bit | Constant | Meaning |
|---|---|---|
| `0x00000001` | `SRV_UDPFLG_EXT_GETSOURCES` | Supports extended GetSources UDP request |
| `0x00000002` | `SRV_UDPFLG_EXT_GETFILES` | Supports extended GetFiles UDP request |
| `0x00000008` | `SRV_UDPFLG_NEWTAGS` | Supports the new eD2k tag format |
| `0x00000010` | `SRV_UDPFLG_UNICODE` | Supports Unicode filenames over UDP |
| `0x00000020` | `SRV_UDPFLG_EXT_GETSOURCES2` | Supports GetSources v2 |
| `0x00000100` | `SRV_UDPFLG_LARGEFILES` | Supports large files (> 4 GiB) |
| `0x00000200` | `SRV_UDPFLG_UDPOBFUSCATION` | Supports UDP obfuscation |
| `0x00000400` | `SRV_UDPFLG_TCPOBFUSCATION` | Supports TCP obfuscation |

## Python 3 dump script

The following script reads a `server.met` file and prints a table of all server records. Pass the path to a `server.met` file as the only argument. For a quick decode without writing any code, aMule's [`fileview`](./fileview.md) tool dumps the same data.

```python
#!/usr/bin/env python3
# server.met dump script — public domain
# Usage: python3 dump_server_met.py ~/.aMule/server.met

import socket
import struct
import sys

TAGTYPE_STRING  = 0x02
TAGTYPE_UINT32  = 0x03
TAGTYPE_FLOAT32 = 0x04
TAGTYPE_UINT16  = 0x08
TAGTYPE_UINT8   = 0x09
TAGTYPE_UINT64  = 0x0B
TAGTYPE_STR1    = 0x11
TAGTYPE_STR16   = 0x20

ST_SERVERNAME = 0x01

def read_tag(f):
    (type_byte,) = struct.unpack("B", f.read(1))
    tag_type   = type_byte & 0x7F
    short_name = bool(type_byte & 0x80)

    if short_name:
        # Short ID form: name is a single numeric byte.
        (name,) = struct.unpack("B", f.read(1))
    else:
        (nlen,) = struct.unpack("<H", f.read(2))
        if nlen == 1:
            # A name length of exactly 1 is a numeric tag ID, not a string.
            (name,) = struct.unpack("B", f.read(1))
        else:
            name = f.read(nlen).decode("utf-8", errors="replace")

    if tag_type == TAGTYPE_STRING:
        (slen,) = struct.unpack("<H", f.read(2))
        value = f.read(slen).decode("utf-8", errors="replace").lstrip("\ufeff")
    elif tag_type == TAGTYPE_UINT64:
        (value,) = struct.unpack("<Q", f.read(8))
    elif tag_type == TAGTYPE_UINT32:
        (value,) = struct.unpack("<I", f.read(4))
    elif tag_type == TAGTYPE_FLOAT32:
        (value,) = struct.unpack("<f", f.read(4))
    elif tag_type == TAGTYPE_UINT16:
        (value,) = struct.unpack("<H", f.read(2))
    elif tag_type == TAGTYPE_UINT8:
        (value,) = struct.unpack("B", f.read(1))
    elif TAGTYPE_STR1 <= tag_type <= TAGTYPE_STR16:
        slen = tag_type - TAGTYPE_STR1 + 1
        value = f.read(slen).decode("utf-8", errors="replace").lstrip("\ufeff")
    else:
        raise ValueError(f"Unknown tag type 0x{tag_type:02X}")

    return name, value

def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: dump_server_met.py <server.met>")

    with open(sys.argv[1], "rb") as f:
        (version,) = struct.unpack("B", f.read(1))
        if version not in (0x0E, 0xE0):
            sys.exit(f"Unrecognised version byte: 0x{version:02X}")

        (count,) = struct.unpack("<I", f.read(4))

        print(f"server.met version : 0x{version:02X}")
        print(f"Server count       : {count}")
        print()
        print(f"{'#':>4}  {'IP address':<15}  {'Port':>5}  {'Users':>6}  {'Files':>6}  Name")

        for i in range(count):
            ip_raw, port, tag_count = struct.unpack("<IHI", f.read(10))
            ip = socket.inet_ntoa(struct.pack(">I", ip_raw))

            tags = {}
            for _ in range(tag_count):
                name, value = read_tag(f)
                tags[name] = value

            server_name = tags.get(ST_SERVERNAME, "")
            users       = tags.get("users", "")
            files       = tags.get("files", "")

            print(f"{i:>4}  {ip:<15}  {port:>5}  {str(users):>6}  {str(files):>6}  {server_name}")

if __name__ == "__main__":
    main()
```
