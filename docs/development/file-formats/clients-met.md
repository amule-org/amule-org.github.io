---
id: clients-met
title: clients.met
---

`clients.met` is the **credit ledger** — a binary database that records how many bytes aMule has uploaded to and downloaded from each known peer. The eD2k credit system uses these values to prioritise upload slots for peers that have previously uploaded to you.

**Location:** `~/.aMule/clients.met`

A backup copy is maintained at `clients.met.bak`. aMule will not overwrite the backup if it is larger than the current file (the backup is preserved in case the current file is corrupt or truncated).

All multi-byte integers in this file are stored in **little-endian** byte order.

:::warning
The entire file is discarded if any byte violates the format rules, or if the file's version number does not match the version expected by the running aMule build. Edit this file with care.
:::

## Format

### File header

| Bytes | Field | Description |
|---|---|---|
| 1 | Version | File format version. aMule currently supports version **18** (`0x12`). |
| 4 | Client count | Number of client records that follow (32-bit unsigned). |

### Per-client record (119 bytes fixed)

Each client occupies exactly **119 bytes**:

| Offset | Bytes | Field | Description |
|---|---|---|---|
| 0 | 16 | Userhash | The peer's 128-bit user hash (MD4) |
| 16 | 4 | Upload low bytes | Lower 4 bytes of the total bytes uploaded **to** this client |
| 20 | 4 | Download low bytes | Lower 4 bytes of the total bytes downloaded **from** this client |
| 24 | 4 | Last seen | Unix timestamp (seconds since 1970-01-01 UTC) of the last identification |
| 28 | 4 | Upload high bytes | Upper 4 bytes of the total bytes uploaded **to** this client |
| 32 | 4 | Download high bytes | Upper 4 bytes of the total bytes downloaded **from** this client |
| 36 | 2 | Reserved | Set to any value; reserved for future use |
| 38 | 1 | SecureIdent hash size | Number of significant bytes in the SecureIdent public hash (e.g., `0x38` = 56 bytes) |
| 39 | 80 | SecureIdent hash | The peer's SecureIdent public key hash, padded with random bytes to exactly 80 bytes |

**Total per record:** 16 + 4 + 4 + 4 + 4 + 4 + 2 + 1 + 80 = **119 bytes**.

### Reconstructing full byte counts

The 8-byte upload and download totals are split across two 4-byte fields for compatibility with older 32-bit eMule code:

```
Total uploaded   = Upload_high   × 2³²  +  Upload_low
Total downloaded = Download_high × 2³²  +  Download_low
```

## Annotated example

The following is a valid `clients.met` file with two client records, annotated field by field. All values are in hexadecimal, bytes separated by spaces.

```
12
```
→ **Version:** `0x12` = 18

```
02 00 00 00
```
→ **Client count:** 2 (little-endian)

**Client #1:**

```
00 00 00 00 00 0F 00 00 00 00 00 00 00 00 6F 00
```
→ **Userhash:** `0000000000 0F000000000000006F00` (16 bytes)

```
00 00 00 00
```
→ **Upload low:** `0x00000000` = 0 bytes uploaded

```
12 F2 01 00
```
→ **Download low:** `0x0001F212` = 127,506 bytes downloaded

```
BF 29 12 42
```
→ **Last seen:** `0x421229BF` = 1,108,486,591 = Tue 15 Feb 2005 17:56:31 UTC

```
00 00 00 00
```
→ **Upload high:** `0x00000000`

```
01 00 00 00
```
→ **Download high:** `0x00000001`

→ **Total downloaded:** `1 × 2³² + 127,506` = **4,295,094,802 bytes ≈ 4 GiB**

```
4E 65
```
→ **Reserved:** (random data)

```
38
```
→ **SecureIdent hash size:** `0x38` = 56 bytes

```
F4 69 E7 27 34 D7 6A 2F 74 E7 C2 CE E5 89 43 65
BB 26 73 24 83 DC 3A 2E 84 24 7A E3 89 73 E7 8F
78 C7 86 9D 69 E7 8A 90 8B 89 07 B7 8C 87 E8 79
D4 F8 76 A9 E7 C7 D8 9A
```
→ **SecureIdent hash:** 56 significant bytes

```
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
00 00 0A 00 00 10 11 64 F4 00 00 00 FA EE E4 00
00 00
```
→ **Padding:** 80 − 56 = 24 random bytes to complete the 80-byte field

**Client #2:**

```
00 00 00 00 00 0F 00 00 00 00 00 00 00 00 6F 00
...
```
→Second client record follows in the same layout.

## Notes

- **Credit expiry:** Credits for a client expire after **12,960,000 seconds (150 days)** without seeing that client. Expired entries are purged on next load.
- **Backup preservation:** If `clients.met.bak` is larger than the current `clients.met`, the backup is not overwritten. This protects against accidental truncation.
- **Capacity:** The 4-byte client count field allows up to ~4.3 billion records. The practical size limit of `clients.met` is approximately 475 GiB (119 bytes × 4,294,967,296), which no real-world filesystem will ever reach.
- **Record size:** Each client record is exactly 119 bytes (952 bits).
