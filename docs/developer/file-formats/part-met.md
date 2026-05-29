---
id: part-met
title: Temporary download files (*.part, *.part.met, *.part.met.seeds)
---

While a file is being downloaded, aMule creates a group of temporary files in the **Temp directory** (`~/.aMule/Temp/` by default). Each in-progress download produces up to five related files.

## `*.part`

The actual download data. aMule creates this file with the **full size of the completed file** from the very beginning. Portions that have not yet been downloaded are filled with zero bytes, while received data overwrites the zeros at the correct offsets.

This design means that at any point during a download you can inspect the file — you will see correct data where chunks have been received and zeros elsewhere. It also allows aMule to download chunks from multiple peers simultaneously without having to rearrange data after the fact.

## `*.part.met`

The download **metadata** file. It records everything aMule needs to resume and verify the download:

- The date the download was added
- The file's MD4 hash
- The hashes of all individual chunks (9.28 MiB each in eD2k)
- Which chunks have been verified
- Tags: filename, file size, download priority, and other metadata

Without the `.part.met` file, the corresponding `.part` file has no meaning to aMule.

### Format

The file is binary. Fields are stored in little-endian byte order.

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Header | Magic byte identifying the file type |
| 1 | 4 bytes | Date | Unix timestamp of when the download was started |
| 5 | 16 bytes | MD4 hash | The file's full MD4 hash (used as the eD2k file ID) |
| 21 | 2 bytes | Partial hash count | Number of per-chunk hashes that follow |
| 23 | 16 × N | Partial hashes | MD4 hash for each 9.28 MiB chunk |
| 23 + 16N | 4 bytes | Tag count | Number of metadata tags |
| variable | variable | Tags | Key-value pairs (see tag format below) |

### Tag format

Each tag begins with:

| Bytes | Field | Description |
|---|---|---|
| 1 | Type | Data type: `0x01`=hash, `0x02`=string, `0x03`=uint32, `0x04`=float, `0x05`=bool, `0x06`=bool array, `0x07`=blob |
| 2 | Name length | Length of the tag name field |
| N | Name | Tag name (1 byte for standard tags, e.g. `0x01` = filename, `0x02` = file size) |

followed by the value in the format indicated by the type byte.

### Python 3 parsing script

The following script reads a `.part.met` file and prints its header fields and tags. Pass the path to a `.part.met` file as the only argument.

```python
#!/usr/bin/env python3
# part.met parser — adapted from the aMule wiki (originally Python 2)
# Usage: python3 parse_part_met.py ~/.aMule/Temp/example.part.met

import sys
import struct

def read_tag(f):
    (tag_type,) = struct.unpack("B", f.read(1))
    (name_len,) = struct.unpack("<H", f.read(2))

    if name_len == 1:
        name = "0x{:02X}".format(struct.unpack("B", f.read(1))[0])
    elif name_len == 2:
        name = "0x{:02X}{:02X}".format(*struct.unpack("2B", f.read(2)))
    else:
        name = f.read(name_len).decode("utf-8", errors="replace")

    print(f"  tag name_len={name_len} name={name!r}", end=" ")

    if tag_type == 0x00:
        print("(unknown type 0x00)")
    elif tag_type == 0x01:
        print("type=HASH (not read)")
    elif tag_type == 0x02:
        (str_len,) = struct.unpack("<H", f.read(2))
        value = f.read(str_len)
        print(f"type=String len={str_len} value={value!r}")
    elif tag_type == 0x03:
        (value,) = struct.unpack("<I", f.read(4))
        print(f"type=DWORD value={value}")
    elif tag_type == 0x04:
        print("type=FLOAT (not read)")
    elif tag_type == 0x05:
        print("type=BOOL (not read)")
    elif tag_type == 0x06:
        print("type=BOOLARRAY (not read)")
    elif tag_type == 0x07:
        print("type=BLOB (not read)")
    else:
        print(f"type=UNKNOWN (0x{tag_type:02X})")

def main():
    if len(sys.argv) != 2:
        sys.exit("Usage: parse_part_met.py <file.part.met>")

    with open(sys.argv[1], "rb") as f:
        (header,) = struct.unpack("B", f.read(1))
        print(f"Header:           0x{header:02X}")

        (date,) = struct.unpack("<I", f.read(4))
        print(f"Date (Unix):      {date}")

        raw_hash = f.read(16)
        hash_hex = "".join(f"{b:02X}" for b in raw_hash)
        print(f"MD4 hash:         {hash_hex}")

        (partial_count,) = struct.unpack("<H", f.read(2))
        print(f"Partial hashes:   {partial_count}")

        for i in range(partial_count):
            h = f.read(16)
            h_hex = "".join(f"{b:02X}" for b in h)
            print(f"  [{i}] {h_hex}")

        (tag_count,) = struct.unpack("<I", f.read(4))
        print(f"Tags:             {tag_count}")

        for i in range(tag_count):
            print(f"  [{i}]:", end=" ")
            read_tag(f)

if __name__ == "__main__":
    main()
```

## `*.part.met.bak`

A periodic backup of the `.part.met` file. aMule creates this backup at regular intervals during a download so that, if the `.part.met` file is lost or corrupted (e.g. after a crash), you can recover the download state by renaming `.part.met.bak` to `.part.met`.

## `*.part.met.backup`

A transient write-in-progress file. When aMule needs to update a `.part.met` file, it writes the new data here first and then renames it to `.part.met` once the write is complete. This prevents the `.part.met` file from being left in a half-written state if the process is interrupted. Under normal operation, `.part.met.backup` files are very short-lived and should not appear in the Temp directory.

## `*.part.met.seeds`

Stores up to 10 known source addresses for the corresponding download. This allows aMule to reconnect to sources for **rare files** (files with very few sources) immediately after a restart, without having to re-discover them from scratch.

This file is only created when the **"Store sources for rare files"** preference is enabled.

**Location:** `~/.aMule/Temp/<hash>.part.met.seeds`

### Format

Two format versions exist. All values are stored in little-endian byte order. The entire file content is treated as a sequence of 2-byte little-endian packets.

#### v1 format

| Bytes | Field | Description |
|---|---|---|
| 1 | Source count | Number of sources listed (8-bit unsigned; max 255 in format, max 10 in aMule) |
| 6 × N | Source records | One 6-byte record per source |

**Per-source record (v1):**

| Bytes | Field | Description |
|---|---|---|
| 4 | Source ID | The source's eD2k ID (little-endian). For [High ID](../../p2p-networks/high-id-low-id.md) clients this encodes the IPv4 address. |
| 2 | Port | The source's port (little-endian) |

#### v2 format

Identical to v1, with one additional field appended after all source records:

| Bytes | Field | Description |
|---|---|---|
| 4 | Timestamp | Unix timestamp when the seeds file was written (32-bit unsigned) |

Seeds files written more than **2 hours** before the current time are ignored on read; all sources in them are discarded.

### Example

The following is the content of a v2 seeds file (in big-endian for readability) containing 5 sources:

```
05
41 65 1C 50  2A 2D
6E F3 2D 53  36 12
2F F1 CA 51  36 12
BF EA 7E C8  36 12
C1 31 3C D5  D5 30
```

Decoded:

| # | Source ID (big-endian) | IP address | Port |
|---|---|---|---|
| 1 | `501C6541` | `80.28.101.65` | 11562 (`2A2D`) |
| 2 | `532DF36E` | `83.45.243.110` | 4662 (`3612`) |
| 3 | `51CAF12F` | `81.202.241.47` | 4662 |
| 4 | `C87EEABF` | `200.126.234.191` | 4662 |
| 5 | `D53C31C1` | `213.60.49.193` | 12501 (`D530`) |

This example has no timestamp — it is a v1 format file.

### Notes

- **[Low ID](../../p2p-networks/high-id-low-id.md) sources are never stored.** A Low ID encodes only a session-relative client ID, not a routable IP address. Since it cannot be used to reconnect after a restart, Low ID clients are excluded from seeds files. Seeds files contain only [High ID](../../p2p-networks/high-id-low-id.md) sources.
- **Maximum 10 sources** per file (aMule's limit). The format itself supports up to 255 (8-bit count field).
- **2-hour TTL.** When reading a v2 seeds file, sources are discarded if the file's timestamp is older than 2 hours. v1 files have no timestamp and all sources are always accepted.
