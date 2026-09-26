---
id: clients-met
title: clients.met
---

`clients.met` is the **credit ledger** — a binary database that records how many bytes aMule has uploaded to and downloaded from each known peer. The eD2k [credit system](../../p2p-networks/concepts.md) uses these values to prioritise upload slots for peers that have previously uploaded to you.

Since aMule 3.1.0 the file also carries an optional [metadata trailer](#metadata-trailer) after the credit records, which feeds the known-clients history of the [Clients](../../manual/interfaces/gui/clients.md) page. The credit records themselves keep the eMule layout, so older aMule builds still read the file.

**Location:** `~/.aMule/clients.met`

A backup copy is maintained at `clients.met.bak`. The backup is refreshed while **loading** `clients.met` (right after the version byte is validated, before any record is read) — not when saving. aMule will not overwrite the backup if it is larger than the current file (the backup is preserved in case the current file is corrupt or truncated).

All multi-byte integers in this file are stored in **little-endian** byte order.

:::warning
The file is discarded under two conditions: if the version byte does not match the version expected by the running aMule build (the file is silently ignored and rebuilt on the next save), or if any record reports a SecureIdent hash size greater than 80 bytes — treated as a corruption sentinel that causes the **entire** in-memory list to be dropped. A truncated or otherwise unreadable file aborts loading cleanly, keeping whatever records were read so far. Edit this file with care.
:::

## Format

### File header

| Bytes | Field | Description |
|---|---|---|
| 1 | Version | File format version. aMule currently supports version **18** (`0x12`). |
| 4 | Client count | Number of client records that follow (32-bit unsigned). Only peers with a non-zero upload **or** download total are written, so this counts persisted peers, not every peer aMule has ever seen. |

### Per-client record (119 bytes fixed)

Each client occupies exactly **119 bytes**:

| Offset | Bytes | Field | Description |
|---|---|---|---|
| 0 | 16 | Userhash | The peer's 128-bit user hash (MD4) |
| 16 | 4 | Upload low bytes | Lower 4 bytes of the total bytes uploaded **to** this client |
| 20 | 4 | Download low bytes | Lower 4 bytes of the total bytes downloaded **from** this client |
| 24 | 4 | Last seen | Unix timestamp (32-bit unsigned seconds since 1970-01-01 UTC) of the last identification |
| 28 | 4 | Upload high bytes | Upper 4 bytes of the total bytes uploaded **to** this client |
| 32 | 4 | Download high bytes | Upper 4 bytes of the total bytes downloaded **from** this client |
| 36 | 2 | Reserved | Set to any value; reserved for future use |
| 38 | 1 | SecureIdent hash size | Number of significant bytes in the SecureIdent public hash (e.g., `0x38` = 56 bytes). Must be ≤ 80; a larger value marks the file as corrupt |
| 39 | 80 | SecureIdent hash | The peer's [Secure User Identification](../../p2p-networks/ed2k/secure-user-identification.md) public key hash. Always occupies 80 bytes; only the first *SecureIdent hash size* bytes are significant. The remainder is ignored on load (aMule writes whatever happens to be there) |

**Total per record:** 16 + 4 + 4 + 4 + 4 + 4 + 2 + 1 + 80 = **119 bytes**.

### Reconstructing full byte counts

The 8-byte upload and download totals are split across two 4-byte fields for compatibility with older 32-bit eMule code:

```
Total uploaded   = Upload_high   × 2³²  +  Upload_low
Total downloaded = Download_high × 2³²  +  Download_low
```

### Metadata trailer

:::note
This functionality is available from aMule 3.1.0 onwards.
:::

aMule 3.1.0 records extra per-peer metadata (first seen, number of sessions, last address, client software, nickname, …) in a block **appended after the last credit record**. The block is optional: a file written by an older build simply ends after the records, and aMule writes no trailer at all when no saved peer has metadata yet — in that case the file is byte-identical to the pre-3.1.0 format.

**Trailer header** (13 bytes):

| Bytes | Field | Description |
|---|---|---|
| 8 | Magic | ASCII `AMULEMD1` (`41 4D 55 4C 45 4D 44 31`), no terminator. Marks the presence of the trailer |
| 1 | Trailer version | Currently **1** |
| 4 | Entry count | Number of metadata entries that follow (32-bit unsigned) |

**Per-entry layout** (39 fixed bytes, then the nickname):

| Offset | Bytes | Field | Description |
|---|---|---|---|
| 0 | 16 | Userhash | The peer's 128-bit user hash (MD4); links the entry to its credit record |
| 16 | 4 | First seen | Unix timestamp (32-bit unsigned) of the first time aMule recorded metadata for this peer. For a peer that already had credits before 3.1.0, this is the first time a 3.1.0+ build met it, not the start of the relationship |
| 20 | 4 | Sessions | Number of times aMule has met this peer (counted once per encounter — per client instance — not per hello packet) |
| 24 | 4 | Last IP | Last IPv4 address of the peer, in aMule's IP representation (the octets appear on disk in dotted order: `C0 A8 00 01` = `192.168.0.1`). The country shown in the GUI is derived from it; it is not stored |
| 28 | 2 | Last port | Last eD2k TCP port of the peer |
| 30 | 2 | Kad port | Kad UDP port of the peer |
| 32 | 4 | Version | Numeric client software version |
| 36 | 1 | Client software | Client software identifier (eMule, aMule, MLDonkey, …) |
| 37 | 1 | Source from | How the peer was found (server, Kad, source exchange, passive/incoming) |
| 38 | 1 | Obfuscation | The peer's protocol obfuscation status |
| 39 | 2 + *n* | Nickname | Last known user name: a 16-bit length *n* followed by *n* bytes of UTF-8 (no BOM, no terminator). aMule caps it at 64 characters when writing; a handshake without a name keeps the stored one |

Only peers that also have a credit record written to the file (non-zero upload or download total) get an entry.

**Backward compatibility.** The file version byte stays at **18** on purpose: raising it would make an older aMule discard every credit. aMule's loader, in older builds as in 3.1.0, reads exactly *Client count* records and never looks at the rest of the file, so the trailer is invisible to older builds and the credits load as before. The only cost is that when an older build **saves** the file, it drops the trailer: the metadata is lost, the credits are kept.

**Reading rules.** aMule 3.1.0 treats the trailer as best-effort; the credits are already loaded and never depend on it:

- Fewer than 13 bytes after the last record, a magic that does not match, or a trailer version other than 1 → the trailing data is ignored.
- A truncated or malformed trailer → reading stops, the problem is written to the Credits debug log, and the metadata read so far is kept.
- An entry whose userhash has no loaded credit record (for example, one expired by the 150-day rule) is skipped.

The trailer is written last, so an I/O error while saving it loses only the metadata, never the credit records.

## Annotated example

The following is a valid `clients.met` file with two client records and no metadata trailer, annotated field by field. All values are in hexadecimal, bytes separated by spaces.

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
00 00 0A 00 00 10 11 64
```
→ **Padding:** 80 − 56 = 24 random bytes to complete the 80-byte field

**Client #2:**

```
00 00 00 00 00 0F 00 00 00 00 00 00 00 00 6F 00
...
```
→Second client record follows in the same layout.

## Notes

- **Credit expiry:** Credits for a client expire after **12,960,000 seconds (150 days)** without seeing that client. Expired entries are skipped while loading and therefore dropped on the next save.
- **What gets saved:** A peer is only written to disk if its total uploaded or downloaded byte count is non-zero. Peers with no recorded transfer in either direction are not persisted.
- **Backup preservation:** If `clients.met.bak` is larger than the current `clients.met`, the backup is not overwritten. This protects against accidental truncation.
- **Capacity:** The 4-byte client count field allows up to ~4.3 billion records. The practical size limit of the credit records is approximately 475 GiB (119 bytes × 4,294,967,296), plus the optional [metadata trailer](#metadata-trailer), which no real-world filesystem will ever reach.
- **Record size:** Each client record is exactly 119 bytes (952 bits).
- **Inspecting the file:** aMule's [`fileview`](./fileview.md) utility can dump the decoded credit records of a `clients.met` file, which is useful for verifying the layout described here. It does not decode the metadata trailer.
