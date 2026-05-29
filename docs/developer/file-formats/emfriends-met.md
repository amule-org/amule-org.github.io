---
id: emfriends-met
title: emfriends.met
---

`emfriends.met` stores aMule's friends list. For each friend it records the last known IP address and port, the last time the friend was seen online, the last time you chatted with them, and their username.

**Location:** `~/.aMule/emfriends.met`

All multi-byte integers in this file are stored in **little-endian** byte order, with the exception of IP addresses and username strings, which are stored in **big-endian**.

When aMule is compiled with Unicode support, username strings are written **twice**: first as a Unicode (UTF-16) string, then as a plain ASCII string.

The entire file is written in packets of 2 bytes, little-endian.

## Format

### File header

| Bytes | Field | Description |
|---|---|---|
| 1 | Magic byte | Always `0x0E` — identifies a valid `emfriends.met` |
| 4 | Friend count | Number of friend records that follow (32-bit unsigned, little-endian) |

### Per-friend record

Each friend block is variable-length because the username string length varies.

| Bytes | Field | Description |
|---|---|---|
| 16 | Hash | Friend's 128-bit user hash (all zeros if not yet identified) |
| 4 | IP | Last known IP address (big-endian) |
| 2 | Port | Last known port (16-bit unsigned) |
| 4 | Last seen | Unix timestamp of when the friend was last seen online (little-endian); `0` if added manually |
| 4 | Last chatted | Unix timestamp of the last chat session (little-endian); `0` if never chatted |
| 4 | Tag count | Number of additional tags for this friend (32-bit unsigned, little-endian) |
| variable | Tags | One or two tag blocks (see below) |

### Tag block

Only one tag type is supported: **tag type `0x02`** (byte array / string). Only one tag meaning is defined: **`0x01`** (username).

When compiled with Unicode support, the username is written as two consecutive tags: the first contains the UTF-16 encoded string (with BOM `EF BB BF`), the second contains the plain ASCII string.

| Bytes | Field | Description |
|---|---|---|
| 1 | Tag type | Always `0x02` (byte array) |
| 2 | Tag type length | Always `0x0001` (1 byte tag-meaning field) |
| 1 | Tag meaning | Always `0x01` (username) |
| 2 | String length | Number of bytes in the string (little-endian) |
| N | String | The username bytes |

## Annotated example

```
0E
```
→ **Magic:** `0x0E` — valid `emfriends.met`

```
02 00 00 00
```
→ **Friend count:** 2 (little-endian: `0x00000002`)

**Friend #1:**

```
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```
→ **Hash:** all zeros (friend added manually, hash not yet known)

```
50 18 4C 36
```
→ **IP:** `80.24.76.54` (big-endian)

```
EA 00
```
→ **Port:** 234

```
00 00 00 00
```
→ **Last seen:** `0` (unknown / manually added)

```
00 00 00 00
```
→ **Last chatted:** `0` (never chatted)

```
02 00 00 00
```
→ **Tag count:** 2 (Unicode build: username stored in two tags)

**Tag #1 — Unicode username:**

```
02
```
→ Tag type: `0x02` (byte array)

```
01 00
```
→ Tag type length: 1

```
01
```
→ Tag meaning: `0x01` (username)

```
09 00
```
→ String length: 9 bytes

```
EF BB BF 64 73 61 64 73 61
```
→ `EF BB BF` = UTF-8/UTF-16 BOM, followed by `d s a d s a` — username: **`dsadsa`**

**Tag #2 — ASCII username:**

```
02
```
→ Tag type: `0x02`

```
01 00
```
→ Tag type length: 1

```
01
```
→ Tag meaning: `0x01` (username)

```
06 00
```
→ String length: 6 bytes

```
64 73 61 64 73 61
```
→ `d s a d s a` — username: **`dsadsa`** (plain ASCII)

**Friend #2:**

```
00 00 00 00 00 00 00 00 00 00 00 00 00 00 00 00
```
→ Hash: all zeros

```
55 28 50 36
```
→ IP: `85.40.80.54`

```
EA 00
```
→ Port: 234

```
00 00 00 00
00 00 00 00
```
→ Last seen / Last chatted: unknown

```
00 00 00 00
```
→ Tag count: 0 (no username stored for this friend)

## Notes

- **Last seen = 0** means the friend was added manually by the user (not encountered on the network).
- **Maximum friends:** The 4-byte friend count field allows up to 4,294,967,296 (~4.3 billion) friends.
- **Maximum username length:** The 2-byte string-length field allows strings up to 65,536 bytes. For multi-byte Unicode characters, this may be fewer than 65,536 displayed characters.
- **Compatibility:** The file format is shared with eMule and is compatible across all Mule-family clients.
