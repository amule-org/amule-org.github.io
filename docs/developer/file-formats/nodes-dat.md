---
id: nodes-dat
title: nodes.dat
---

`nodes.dat` stores a list of known [Kademlia](../../p2p-networks/kademlia.md) contacts (Kad nodes). aMule reads this file at startup to bootstrap its connection to the Kad network, establishing initial contact with known nodes before building its own routing table.

**Location:** `~/.aMule/nodes.dat`

The file carries a **file-version** number in its header. Four values exist:

| File version | Status |
|---|---|
| 0 | Legacy. Used up to aMule 2.1.3. **No longer written nor read** — current aMule rejects it because it cannot tell the Kad protocol version of the stored contacts. |
| 1 | Legacy, read-only. 25-byte contact records without the KadUDPKey and Verified fields. |
| 2 | **Current standard.** Used from aMule 2.2.0 onwards; the version aMule writes. 34-byte contact records. |
| 3 | Special "bootstrap edition" — a separate kind of `nodes.dat` (see below), not a normal contact list. |

Do not confuse the **file version** (a 4-byte field in the header, described in this table) with the per-contact **Kad protocol version** (a 1-byte field inside each contact record). They are independent: the presence of the KadUDPKey and Verified fields depends on the *file* version (≥ 2), while the per-contact version byte describes the *protocol* a given node speaks.

All multi-byte integers are stored in **little-endian** byte order unless noted otherwise.

## Obtaining nodes.dat online

A fresh `nodes.dat` can be downloaded from the internet. This is useful on first run, when the local file is missing, or when it has become so stale that aMule cannot bootstrap into the Kad network.

### Online sources

The following sources host downloadable `nodes.dat` files compatible with aMule:

| URL | Notes |
|---|---|
| `https://upd.emule-security.org/nodes.dat` | Default URL configured in aMule; maintained by the eMule Security project |

:::note
These are third-party services unaffiliated with the aMule project. Their availability may change over time. If a URL no longer works, search for `nodes.dat eMule` to find current mirrors.
:::

### Downloading from the aMule interface

The **Networks → Kad** tab contains a URL input field next to the Bootstrap controls. Enter a URL there and press Enter (or click the play button beside the field) to trigger an immediate download. aMule replaces the existing file once the download completes successfully.

Once connected to Kad, aMule keeps `nodes.dat` up to date automatically while running, so manual downloads are only needed on first use or after a long period of inactivity.

### Automatic download via `amule.conf`

The `KadNodesUrl` key in the `[eMule]` section of [`amule.conf`](../../manual/configuration/config-files/amule-conf.md#network-urls) configures the URL aMule uses for this download:

```ini
[eMule]
KadNodesUrl=https://upd.emule-security.org/nodes.dat
```

The download is triggered from the Kad tab in the interface. Supported URL schemes are `http://`, `https://`, and `ftp://`.

### A note on byte order

Two fields need care when decoding by hand:

- **IP address.** The 4 IP bytes are stored little-endian, so the dotted-decimal address is the four bytes **read in reverse**. For example, the bytes `E5 5E 04 DE` decode to `222.4.94.229` (`0xDE.0x04.0x5E.0xE5`). The same applies to the IP embedded inside the KadUDPKey.
- **ClientID.** The 128-bit ID is stored on disk as **four little-endian 32-bit words, most-significant word first**. The 16 ClientID bytes are shown throughout this page exactly as they appear on disk (raw byte order). To recover the canonical ID that aMule displays in its GUI, reverse the bytes **within each 4-byte word** (the order of the four words is unchanged). For example, the on-disk bytes `12 25 74 25 …` become the word `0x25742512 …`.

UDP and TCP ports are plain little-endian 16-bit integers (`40 12` → `0x1240` → 4672).

## Format v2 (current, aMule 2.2.0+)

Format v2 begins with four null bytes (`00 00 00 00`), followed by the version number `2` (also stored as a 4-byte little-endian integer), then the contact count, then the contact records. Each record is 34 bytes — 9 bytes larger than the legacy v1 record — because it adds the KadUDPKey (8 bytes) and the Verified flag (1 byte).

### File layout

| Bytes | Field | Description |
|---|---|---|
| 4 | Null header | Always `0x00000000` — marks a versioned file (legacy v0 files start directly with the contact count) |
| 4 | Version | Always `0x00000002` (value 2, little-endian) |
| 4 | Contact count | Number of contacts that follow (32-bit unsigned, little-endian) |
| 34 × N | Contact records | One 34-byte record per contact |

### Per-contact record (34 bytes)

| Bytes | Field | Description |
|---|---|---|
| 16 | ClientID | 128-bit Kademlia node ID |
| 4 | IP address | IPv4 address, little-endian (decode the 4 bytes in reverse) |
| 2 | UDP port | UDP port for Kad communication |
| 2 | TCP port | TCP port for eD2k communication |
| 1 | Version | Per-contact Kad protocol version. A value `≤ 1` means the legacy Kad1 protocol; values `> 1` are Kad2. Determines which packet types and features the node supports. Contacts with version `≤ 1` are ignored on read. |
| 8 | KadUDPKey | A 32-bit key (first 4 bytes) plus the 32-bit IP it is bound to (next 4 bytes), used in encrypted communication to verify node validity. Present only when the file version is ≥ 2. |
| 1 | Verified | `0` = not verified; any non-zero value = contact has been verified |

### Example

A v2 file with a single contact:

```
00 00 00 00
02 00 00 00
01 00 00 00
12 25 74 25 DB A4 ED DB D0 97 15 07 57 40 44 86
E5 5E 04 DE 40 12 36 12 08
AA BB CC DD 04 03 02 01
01
```

Decoded:

| Field | Value |
|---|---|
| File version | 2 |
| Contact count | 1 |
| ClientID | `12257425DBA4EDDBD097150757404486` |
| IP | `222.4.94.229` (`E5 5E 04 DE`) |
| UDP port | 4672 (`40 12`) |
| TCP port | 4662 (`36 12`) |
| Version | 8 (Kad2) |
| KadUDPKey | key `0xDDCCBBAA`, bound to IP `1.2.3.4` (`04 03 02 01`) |
| Verified | 1 (verified) |

### Notes

- The maximum number of contacts representable in the format (4-byte count field) is ~4.3 billion. aMule, eMule, and all compatible clients impose a **hard limit of 5000 contacts** in practice. aMule itself is far more conservative: it writes at most **~200 contacts** per save, capped by an internal safety limit of **500** (`CONTACT_FILE_LIMIT` in `RoutingZone.cpp`), and does not write the file at all if fewer than 25 contacts are available. On read, aMule imposes no count limit and loads every contact listed.
- Contacts whose per-contact Kad version is `≤ 1` (Kad1) are silently ignored on read.
- The format does not support IPv6 addresses (IP field is only 4 bytes).

## Format v1 (legacy, read-only)

Version 1 added the `00 00 00 00` + version header and a per-contact Kad protocol version byte, but its contact records are only 25 bytes: there is no KadUDPKey and no Verified flag. aMule still reads v1 files for backwards compatibility but no longer writes them. When a file contains no verified contacts (always the case for v1), aMule marks all loaded contacts as verified once to speed up the next bootstrap.

### File layout

| Bytes | Field | Description |
|---|---|---|
| 4 | Null header | Always `0x00000000` |
| 4 | Version | Always `0x00000001` (value 1, little-endian) |
| 4 | Contact count | Number of contacts that follow (32-bit unsigned, little-endian) |
| 25 × N | Contact records | One 25-byte record per contact |

### Per-contact record (25 bytes)

| Bytes | Field | Description |
|---|---|---|
| 16 | ClientID | 128-bit Kademlia node ID |
| 4 | IP address | IPv4 address, little-endian (decode the 4 bytes in reverse) |
| 2 | UDP port | UDP port for Kad communication |
| 2 | TCP port | TCP port for eD2k communication |
| 1 | Version | Per-contact Kad protocol version |

### Example

A v1 file with a single contact:

```
00 00 00 00
01 00 00 00
01 00 00 00
12 25 74 25 DB A4 ED DB D0 97 15 07 57 40 44 86
E5 5E 04 DE 40 12 36 12 08
```

Decoded:

| Field | Value |
|---|---|
| File version | 1 |
| Contact count | 1 |
| ClientID | `12257425DBA4EDDBD097150757404486` |
| IP | `222.4.94.229` (`E5 5E 04 DE`) |
| UDP port | 4672 (`40 12`) |
| TCP port | 4662 (`36 12`) |
| Version | 8 (Kad2) |

## Format v0 (legacy, no longer read)

Version 0 is the original eMule format. The file begins directly with a 4-byte contact count — there is no file-version header, which is how v0 is distinguished from later versions (versioned files begin with four null bytes). Its 25-byte records carry a per-contact "Type" confidence field instead of a Kad protocol version. Because this field cannot tell which Kad version each contact speaks, **current aMule no longer reads v0 files** (`RoutingZone.cpp` rejects them with a "too old" message) and never writes them. The format is documented here for reference and for parsing old files.

### File layout

| Bytes | Field | Description |
|---|---|---|
| 4 | Contact count | Number of contacts that follow (32-bit unsigned, little-endian) |
| 25 × N | Contact records | One 25-byte record per contact |

### Per-contact record (25 bytes)

| Bytes | Field | Description |
|---|---|---|
| 16 | ClientID | 128-bit Kademlia node ID |
| 4 | IP address | IPv4 address, little-endian (decode the 4 bytes in reverse) |
| 2 | UDP port | UDP port for Kad communication |
| 2 | TCP port | TCP port for eD2k communication |
| 1 | Type | Contact confidence level: 0 (best) to 4 (worst) |

### Example

A v0 file with 2 contacts:

```
02 00 00 00
12 25 74 25 DB A4 ED DB D0 97 15 07 57 40 44 86
E5 5E 04 DE 40 12 36 12 02
1F 64 63 25 87 A3 1E C2 FC 85 66 C4 A9 BA B1 84
E6 E9 B7 D4 40 12 36 12 02
```

Decoded:

| Field | Value |
|---|---|
| Contact count | 2 (`02 00 00 00`) |
| **Contact #1** | |
| ClientID | `12257425DBA4EDDBD097150757404486` |
| IP | `222.4.94.229` (`E5 5E 04 DE`) |
| UDP port | 4672 (`40 12`) |
| TCP port | 4662 (`36 12`) |
| Type | 2 |
| **Contact #2** | |
| ClientID | `1F64632587A31EC2FC8566C4A9BAB184` |
| IP | `212.183.233.230` (`E6 E9 B7 D4`) |
| UDP port | 4672 (`40 12`) |
| TCP port | 4662 (`36 12`) |
| Type | 2 |

## Format v3 (bootstrap edition)

Version 3 is **not a normal contact list**. It is a special "bootstrap" `nodes.dat` intended only to seed a fresh client: it holds many more contacts than usual (typically 500–1000) which are used solely to *send* bootstrap packets, and are **not** added to the routing table. This avoids the problem where a small, widely distributed `nodes.dat` would cause its handful of nodes to be hammered by every new client. A v3 bootstrap file is identified by an **edition** field set to `1`, placed right after the version. aMule reads bootstrap files but does not write them in normal operation.

### File layout

| Bytes | Field | Description |
|---|---|---|
| 4 | Null header | Always `0x00000000` |
| 4 | Version | Always `0x00000003` (value 3) |
| 4 | Edition | `1` marks a bootstrap-edition file (a normal `nodes.dat` would carry `0` here) |
| 4 | Contact count | Number of contacts that follow (32-bit unsigned, little-endian) |
| 25 × N | Contact records | One 25-byte record per contact, in the same layout as v1 (no KadUDPKey or Verified field) |

### Example

A v3 bootstrap file with a single contact:

```
00 00 00 00
03 00 00 00
01 00 00 00
01 00 00 00
12 25 74 25 DB A4 ED DB D0 97 15 07 57 40 44 86
E5 5E 04 DE 40 12 36 12 08
```

Decoded:

| Field | Value |
|---|---|
| File version | 3 |
| Edition | 1 (bootstrap) |
| Contact count | 1 |
| ClientID | `12257425DBA4EDDBD097150757404486` |
| IP | `222.4.94.229` (`E5 5E 04 DE`) |
| UDP port | 4672 (`40 12`) |
| TCP port | 4662 (`36 12`) |
| Version | 8 (Kad2) |

## Python 3 dump script

The following script parses every `nodes.dat` format — v0, v1, the current v2, and the v3 bootstrap edition — and prints the contents in a human-readable table. Pass the path to a `nodes.dat` file as the only argument. For a quick decode without writing any code, aMule's [`fileview`](./fileview.md) tool dumps the same data.

```python
#!/usr/bin/env python3
# nodes.dat dump script — public domain
# Usage: python3 dump_nodes.py ~/.aMule/nodes.dat

import struct
import sys

def fmt_ip(b):
    # IP bytes are little-endian: the dotted address is the 4 bytes reversed.
    return f"{b[3]}.{b[2]}.{b[1]}.{b[0]}"

def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: dump_nodes.py <nodes.dat>")

    with open(sys.argv[1], "rb") as f:
        (first_word,) = struct.unpack("<I", f.read(4))

        edition = 0
        if first_word == 0:
            # Versioned file: 0x00000000 marker, then the file version.
            (version,) = struct.unpack("<I", f.read(4))
            if version == 3:
                # v3 has an extra "edition" field (1 = bootstrap edition).
                (edition,) = struct.unpack("<I", f.read(4))
            (count,) = struct.unpack("<I", f.read(4))
        else:
            # Legacy v0: the first word is already the contact count.
            version = 0
            count = first_word

        # The v3 bootstrap edition uses the compact 25-byte record; every other
        # file version >= 2 carries the KadUDPKey and Verified fields (34 bytes).
        # v0 and v1 records are 25 bytes.
        bootstrap = version == 3 and edition == 1
        wide = version >= 2 and not bootstrap
        last_label = "type" if version == 0 else "ver"

        print(f"nodes.dat version : {version}"
              f"{' (bootstrap edition)' if bootstrap else ''}")
        print(f"Contact count     : {count}")
        print()

        header = (f"{'idx':>4}  {'ClientID (raw)':<32}  {last_label:>4}  "
                  f"{'IP address':<15}  {'UDP':>5}  {'TCP':>5}")
        if wide:
            header += f"  {'KadUDPKey':>10}  {'key bound IP':<15}  {'verified':>8}"
        print(header)

        for i in range(count):
            clientid = f.read(16)
            ip = f.read(4)
            udp, tcp, last = struct.unpack("<HHB", f.read(5))
            row = (f"{i:>4}  {clientid.hex().upper():<32}  {last:>4}  "
                   f"{fmt_ip(ip):<15}  {udp:>5}  {tcp:>5}")
            if wide:
                (key,) = struct.unpack("<I", f.read(4))
                key_ip = f.read(4)
                (verified,) = struct.unpack("<B", f.read(1))
                row += (f"  {key:>10x}  {fmt_ip(key_ip):<15}"
                        f"  {'Y' if verified else 'N':>8}")
            print(row)

if __name__ == "__main__":
    main()
```
