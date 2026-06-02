---
id: part-met
title: Temporary download files (*.part, *.part.met, *.part.met.seeds)
---

While a file is being downloaded, aMule creates a group of temporary files in the **Temp directory** (`~/.aMule/Temp/` by default). Each in-progress download produces up to five related files.

These files share a common base name: a sequential three-digit number assigned in order of creation (the lowest free number, e.g. `001`, `002`, …) — for example `001.part`, `001.part.met`, `001.part.met.seeds`. The file's MD4 hash is **not** part of the filename; it is stored inside the `.part.met` file (see the MD4 hash field below).

## `*.part`

The actual download data. aMule creates this file with the **full size of the completed file** from the very beginning. Portions that have not yet been downloaded are filled with zero bytes, while received data overwrites the zeros at the correct offsets.

This design means that at any point during a download you can inspect the file — you will see correct data where chunks have been received and zeros elsewhere. It also allows aMule to download chunks from multiple peers simultaneously without having to rearrange data after the fact.

## `*.part.met`

The download **metadata** file. It records everything aMule needs to resume and verify the download:

- The last-modified date of the `.part` data file
- The file's MD4 hash
- The hashes of all individual chunks (9.28 MiB each in eD2k)
- Which chunks have been verified
- Tags: filename, file size, download priority, and other metadata

Without the `.part.met` file, the corresponding `.part` file has no meaning to aMule.

When a completed chunk fails its hash check, aMule uses [AICH](../../p2p-networks/ed2k/aich.md) to locate and re-download only the corrupted portion instead of the whole chunk.

### Format

The file is binary. Fields are stored in little-endian byte order.

| Offset | Size | Field | Description |
|---|---|---|---|
| 0 | 1 byte | Version | Format version / magic byte (see below) |
| 1 | 4 bytes | Date | Unix timestamp of the `.part` data file's last modification |
| 5 | 16 bytes | MD4 hash | The file's full MD4 hash (used as the eD2k file ID) |
| 21 | 2 bytes | Partial hash count | Number of per-chunk hashes that follow |
| 23 | 16 × N | Partial hashes | MD4 hash for each 9.28 MiB chunk |
| 23 + 16N | 4 bytes | Tag count | Number of metadata tags |
| variable | variable | Tags | Key-value pairs (see tag format below) |

#### Version byte

The first byte identifies the `.part.met` format. aMule recognizes three values:

| Value | Name | Meaning |
|---|---|---|
| `0xE0` | `PARTFILE_VERSION` | Standard part file |
| `0xE1` | `PARTFILE_SPLITTEDVERSION` | "Splitted" layout, used when importing eDonkey part files |
| `0xE2` | `PARTFILE_VERSION_LARGEFILE` | Large files (size ≥ 4 GiB) |

### Tag format

Each tag begins with:

| Bytes | Field | Description |
|---|---|---|
| 1 | Type | Data type (see table below) |
| 2 | Name length | Length of the tag name field |
| N | Name | Tag name (1 byte for standard tags, e.g. `0x01` = filename, `0x02` = file size) |

followed by the value in the format indicated by the type byte.

The data types aMule can read and write are:

| Value | Type | Value layout |
|---|---|---|
| `0x01` | hash | 16-byte MD4 hash |
| `0x02` | string | 2-byte length + UTF-8 bytes |
| `0x03` | uint32 | 4 bytes little-endian |
| `0x04` | float | 4-byte IEEE 754 |
| `0x05` | bool | 1 byte |
| `0x06` | bool array | 2-byte bit count + `(count / 8) + 1` bytes |
| `0x07` | blob | 4-byte length + raw bytes |
| `0x08` | uint16 | 2 bytes little-endian |
| `0x09` | uint8 | 1 byte |
| `0x0A` | bsob | 2-byte length + raw bytes |
| `0x0B` | uint64 | 8 bytes little-endian |
| `0x11`–`0x20` | string (fixed) | STR1…STR16: raw UTF-8 of length `type − 0x10`, no length prefix |

aMule reads all of these types (the compact integer and fixed-string variants exist for eMule compatibility), but when writing a `.part.met` it only emits `uint32` for integers — except in a **large-file** `.part.met` (version `0xE2`), where the file size and transferred-bytes tags are written as `uint64` (`0x0B`).

### Python 3 parsing script

The following script reads a `.part.met` file and prints its header fields and tags. Pass the path to a `.part.met` file as the only argument. For a quick decode without writing any code, aMule's [`fileview`](./fileview.md) tool dumps the same data.

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
        value = "".join(f"{b:02X}" for b in f.read(16))
        print(f"type=HASH value={value}")
    elif tag_type == 0x02:
        (str_len,) = struct.unpack("<H", f.read(2))
        value = f.read(str_len)
        print(f"type=String len={str_len} value={value!r}")
    elif tag_type == 0x03:
        (value,) = struct.unpack("<I", f.read(4))
        print(f"type=UINT32 value={value}")
    elif tag_type == 0x04:
        (value,) = struct.unpack("<f", f.read(4))
        print(f"type=FLOAT value={value}")
    elif tag_type == 0x05:
        (value,) = struct.unpack("B", f.read(1))
        print(f"type=BOOL value={value}")
    elif tag_type == 0x06:
        (bit_count,) = struct.unpack("<H", f.read(2))
        f.read((bit_count // 8) + 1)
        print(f"type=BOOLARRAY bits={bit_count}")
    elif tag_type == 0x07:
        (blob_len,) = struct.unpack("<I", f.read(4))
        f.read(blob_len)
        print(f"type=BLOB len={blob_len}")
    elif tag_type == 0x08:
        (value,) = struct.unpack("<H", f.read(2))
        print(f"type=UINT16 value={value}")
    elif tag_type == 0x09:
        (value,) = struct.unpack("B", f.read(1))
        print(f"type=UINT8 value={value}")
    elif tag_type == 0x0A:
        (bsob_len,) = struct.unpack("<H", f.read(2))
        f.read(bsob_len)
        print(f"type=BSOB len={bsob_len}")
    elif tag_type == 0x0B:
        (value,) = struct.unpack("<Q", f.read(8))
        print(f"type=UINT64 value={value}")
    elif 0x11 <= tag_type <= 0x20:
        str_len = tag_type - 0x10
        value = f.read(str_len)
        print(f"type=String(fixed) len={str_len} value={value!r}")
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

A recovery backup of the `.part.met` file. On every save, aMule promotes the previous `.part.met` to `.part.met.bak` (by renaming it) before installing the new one, so that if the `.part.met` file is lost or corrupted (e.g. after a crash), you can recover the download state by renaming `.part.met.bak` to `.part.met`.

## `*.part.met.tmp`

A transient write-in-progress file. aMule saves a `.part.met` atomically: it first writes the new content to `.part.met.tmp`, then renames the existing `.part.met` to `.part.met.bak`, and finally renames `.part.met.tmp` over `.part.met`. Because the live `.part.met` is replaced by a single atomic rename, it is never left in a half-written state if the process is interrupted. Under normal operation, `.part.met.tmp` files are very short-lived and should not appear in the Temp directory.

## `*.part.met.seeds`

Stores up to 10 known source addresses for the corresponding download. This allows aMule to reconnect to sources for **rare files** (files with very few sources) immediately after a restart, without having to re-discover them from scratch.

This file is only created when the **"Store sources for rare files"** preference is enabled.

### Format

Three format versions exist. aMule can **read** all three, but it only ever **writes** the newest one (v3). All values are stored in little-endian byte order.

The format is identified by the **first byte**: if it is `0x00`, the file uses the v3 (SX2) layout and the real source count follows in the next byte; otherwise the first byte *is* the source count and the file uses a legacy layout (v1 or v2).

#### v3 (SX2) format — the format aMule writes

| Bytes | Field | Description |
|---|---|---|
| 1 | Marker | Always `0x00` — distinguishes v3 from the legacy formats (and stops v2 clients from choking on the file) |
| 1 | Source count | Number of sources listed (8-bit unsigned; max 255 in format, max 10 in aMule) |
| 23 × N | Source records | One 23-byte record per source |
| 4 | Timestamp | Unix timestamp when the seeds file was written (32-bit unsigned) |

**Per-source record (v3):**

| Bytes | Field | Description |
|---|---|---|
| 4 | Source ID | The source's eD2k ID (hybrid form, little-endian). For [High ID](../../p2p-networks/ed2k/high-id.md) clients this encodes the IPv4 address. |
| 2 | Port | The source's port (little-endian) |
| 16 | User hash | The source's MD4 user hash |
| 1 | Crypt options | Encryption-support bitfield: bit 0 = supports crypt layer, bit 1 = requests crypt layer, bit 2 = requires crypt layer |

#### v2 format (legacy, read-only)

Identical to v1, with one additional field appended after all source records:

| Bytes | Field | Description |
|---|---|---|
| 4 | Timestamp | Unix timestamp when the seeds file was written (32-bit unsigned) |

For both v2 and v3, seeds files written more than **2 hours** before the current time are ignored on read; all sources in them are discarded. v1 files have no timestamp, so their sources are always accepted.

#### v1 format (legacy, read-only)

| Bytes | Field | Description |
|---|---|---|
| 1 | Source count | Number of sources listed (8-bit unsigned, non-zero) |
| 6 × N | Source records | One 6-byte record per source |

**Per-source record (v1):**

| Bytes | Field | Description |
|---|---|---|
| 4 | Source ID | The source's eD2k ID. Read with byte order swapped relative to the v3 form. |
| 2 | Port | The source's port (little-endian) |

### Example

The following is the content of a legacy **v1** seeds file (in big-endian for readability) containing 5 sources. Note that it does **not** start with the `0x00` marker, so it is read as a legacy file; a file written by current aMule would begin with `0x00` and use 23-byte records:

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

This example does not start with `0x00` and has no timestamp — it is a v1 format file.

### Notes

- **Only written for rare files.** aMule saves a seeds file only when the download has **20 or fewer** sources. Downloading sources are saved first, then the most recently added sources from the source list, up to the 10-source limit.
- **[Low ID](../../p2p-networks/ed2k/high-id.md) sources are never stored.** A Low ID encodes only a session-relative client ID, not a routable IP address. Since it cannot be used to reconnect after a restart, Low ID clients are excluded from seeds files. Seeds files contain only [High ID](../../p2p-networks/ed2k/high-id.md) sources.
- **Maximum 10 sources** per file (aMule's limit). The format itself supports up to 255 (8-bit count field).
- **2-hour TTL.** When reading a v2 or v3 seeds file, sources are discarded if the file's timestamp is older than 2 hours. v1 files have no timestamp and all sources are always accepted.
