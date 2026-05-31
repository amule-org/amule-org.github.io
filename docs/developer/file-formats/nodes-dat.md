---
id: nodes-dat
title: nodes.dat
---

`nodes.dat` stores a list of known [Kademlia](../../p2p-networks/kademlia) contacts (Kad nodes). aMule reads this file at startup to bootstrap its connection to the Kad network, establishing initial contact with known nodes before building its own routing table.

**Location:** `~/.aMule/nodes.dat`

Two binary formats exist. Format v0 was used up to aMule 2.1.3 and is no longer written. Format v2 is used from aMule 2.2.0 onwards and is the current standard.

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

The `KadNodesUrl` key in the `[eMule]` section of [`amule.conf`](../../manual/configuration/files/amule-conf.md#network-urls) configures the URL aMule uses for this download:

```ini
[eMule]
KadNodesUrl=https://upd.emule-security.org/nodes.dat
```

The download is triggered from the Kad tab in the interface. Supported URL schemes are `http://`, `https://`, and `ftp://`.

## Format v2 (current, aMule 2.2.0+)

Format v2 begins with four null bytes (`00 00 00 00`), followed by the version number `2` (also stored as a 4-byte little-endian integer), then the contact count, then the contact records. Each record is 34 bytes (9 bytes larger than v0) due to the addition of the Kademlia protocol version, the KadUDPKey, and the Verified flag.

### File layout

| Bytes | Field | Description |
|---|---|---|
| 4 | Null header | Always `0x00000000` — distinguishes v2 from v0 |
| 4 | Version | Always `0x00000002` (value 2, little-endian) |
| 4 | Contact count | Number of contacts that follow (32-bit unsigned, little-endian) |
| 34 × N | Contact records | One 34-byte record per contact |

### Per-contact record (34 bytes)

| Bytes | Field | Description |
|---|---|---|
| 16 | ClientID | 128-bit Kademlia node ID |
| 4 | IP address | IPv4 address, little-endian |
| 2 | UDP port | UDP port for Kad communication |
| 2 | TCP port | TCP port for eD2k communication |
| 1 | Version | Kademlia protocol version: `0` = Kad v1; any value `> 0` = Kad v2. Determines which packet types and features the node supports. |
| 8 | KadUDPKey | Kad v2 only (node version ≥ 5). A 32-bit key bound to the receiver's IP address, used in encrypted communication to verify node validity. |
| 1 | Verified | `0` = not verified; any non-zero value = contact has been verified |

### Notes

- The maximum number of contacts representable in the format (4-byte count field) is ~4.3 billion. aMule, eMule, and all compatible clients impose a **hard limit of 5000 contacts** in practice.
- **Type 4 contacts** are marked for deletion. If any appear in a file being read, they are silently ignored.
- The format does not support IPv6 addresses (IP field is only 4 bytes).

## Format v0 (deprecated, pre-2.2.0)

Format v0 files begin directly with a 4-byte contact count. There is no file-version header, which is how v0 is distinguished from v2 (a v2 file begins with four null bytes).

### File layout

| Bytes | Field | Description |
|---|---|---|
| 4 | Contact count | Number of contacts that follow (32-bit unsigned, little-endian) |
| 25 × N | Contact records | One 25-byte record per contact |

### Per-contact record (25 bytes)

| Bytes | Field | Description |
|---|---|---|
| 16 | ClientID | 128-bit Kademlia node ID |
| 4 | IP address | IPv4 address, little-endian |
| 2 | UDP port | UDP port for Kad communication |
| 2 | TCP port | TCP port for eD2k communication |
| 1 | Type | Confidence level: 0 (best) to 4 (worst) |

### Example

The following is a hex dump of a hypothetical v0 `nodes.dat` file with 2 contacts:

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

## Python 3 dump script

The following script reads both v0 and v2 `nodes.dat` files and prints their contents in a human-readable table. Pass the path to a `nodes.dat` file as the only argument.

## Python 3 dump script

```python
#!/usr/bin/env python3
# nodes.dat dump script — public domain
# Usage: python3 dump_nodes.py ~/.aMule/nodes.dat

import struct
import sys

def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: dump_nodes.py <nodes.dat>")

    with open(sys.argv[1], "rb") as f:
        (first_word,) = struct.unpack("<I", f.read(4))

        if first_word == 0:
            # Format v2: first 4 bytes are 0x00000000
            (version,) = struct.unpack("<I", f.read(4))
            (count,)   = struct.unpack("<I", f.read(4))
        else:
            # Format v0: first 4 bytes are the contact count
            version = 0
            count   = first_word

        if version not in (0, 2):
            sys.exit(f"Unsupported nodes.dat version: {version}")

        print(f"nodes.dat version : {version}")
        print(f"Contact count     : {count}")
        print()

        if version == 0:
            print(f"{'idx':>4}  {'type':>4}  {'IP address':<15}  {'UDP':>5}  {'TCP':>5}")
        else:
            print(f"{'idx':>4}  {'ver':>3}  {'IP address':<15}  {'UDP':>5}  {'TCP':>5}"
                  f"  {'KadUDPKey':>16}  {'verified':>8}")

        for i in range(count):
            if version == 0:
                (clientid,
                 ip1, ip2, ip3, ip4,
                 udp, tcp,
                 node_type) = struct.unpack("<16s4BHHB", f.read(25))
                ip = f"{ip1}.{ip2}.{ip3}.{ip4}"
                print(f"{i:>4}  {node_type:>4}  {ip:<15}  {udp:>5}  {tcp:>5}")
            else:
                (clientid,
                 ip1, ip2, ip3, ip4,
                 udp, tcp,
                 node_ver,
                 kad_udp_key,
                 verified) = struct.unpack("<16s4BHHBQB", f.read(34))
                ip  = f"{ip1}.{ip2}.{ip3}.{ip4}"
                ver = f"Y" if verified else "N"
                print(f"{i:>4}  {node_ver:>3}  {ip:<15}  {udp:>5}  {tcp:>5}"
                      f"  {kad_udp_key:>16x}  {ver:>8}")

if __name__ == "__main__":
    main()
```
