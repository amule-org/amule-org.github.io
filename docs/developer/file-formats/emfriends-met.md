---
id: emfriends-met
title: emfriends.met
---

`emfriends.met` stores aMule's friends list. For each friend it records the last known IP address and port, the last time the friend was seen online, the last time you chatted with them, and their username.

**Location:** `~/.aMule/emfriends.met`

All multi-byte integers in this file are stored in **little-endian** byte order. IP addresses are an exception: their four bytes are written in network order, so reading them in file order yields the dotted-quad octets directly (see the example below).

Username strings are **always** written **twice** (regardless of how aMule was compiled): first as a UTF-8 string prefixed with a UTF-8 byte-order mark (BOM), then as an ISO-8859-1 (Latin-1) string. On load, aMule keeps whichever of the two copies it reads first.

## Format

### File header

| Bytes | Field | Description |
|---|---|---|
| 1 | Magic byte | Always `0x0E` — the generic `.met` header byte (shared with other `.met` files such as `server.met` and `known.met`) |
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
| 4 | Tag count | Number of tags for this friend (32-bit unsigned, little-endian); `(2 if a username is present) + (1 if the friend has a reserved friend slot)`, i.e. 0–3 |
| variable | Tags | Zero to three tag blocks (see below) |

### Tag blocks

Two tag meanings are defined:

- **`0x01` — username**, a string tag (tag type `0x02`, `TAGTYPE_STRING`). The username is **always** written as two consecutive tags: the first holds the UTF-8 encoded string prefixed with the UTF-8 BOM `EF BB BF`, the second holds the same name encoded as ISO-8859-1 (Latin-1) with no BOM.
- **`0x02` — friend slot**, an 8-bit integer tag (tag type `0x09`, `TAGTYPE_UINT8`). Present only when the friend has a reserved friend (upload) slot; its value is always `0x01`.

**Username tag** (`0x01`):

| Bytes | Field | Description |
|---|---|---|
| 1 | Tag type | Always `0x02` (`TAGTYPE_STRING`) |
| 2 | Tag name length | Always `0x0001` (1-byte tag-meaning field) |
| 1 | Tag meaning | Always `0x01` (username) |
| 2 | String length | Number of bytes in the string, including the 3-byte BOM for the first copy (little-endian) |
| N | String | The username bytes (UTF-8 with leading `EF BB BF` for the first copy; Latin-1 for the second) |

**Friend slot tag** (`0x02`):

| Bytes | Field | Description |
|---|---|---|
| 1 | Tag type | Always `0x09` (`TAGTYPE_UINT8`) |
| 2 | Tag name length | Always `0x0001` (1-byte tag-meaning field) |
| 1 | Tag meaning | Always `0x02` (friend slot) |
| 1 | Value | Always `0x01` |

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
→ **Tag count:** 2 (the username is always stored in two tags; a third tag would appear here if the friend had a reserved friend slot)

**Tag #1 — username (UTF-8 with BOM):**

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
→ `EF BB BF` = UTF-8 BOM, followed by `d s a d s a` — username: **`dsadsa`**

**Tag #2 — username (Latin-1, no BOM):**

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
→ `d s a d s a` — username: **`dsadsa`** (Latin-1)

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
- **Maximum friends:** The 4-byte friend count field allows up to 4,294,967,295 (~4.3 billion) friends.
- **Maximum username length:** The 2-byte string-length field allows strings up to 65,535 bytes. For multi-byte UTF-8 characters, this may be fewer than 65,535 displayed characters.
- **Compatibility:** The file format is shared with eMule and is compatible across all Mule-family clients.
- **Inspecting the file:** aMule's [`fileview`](./fileview.md) tool can dump the decoded contents of an `emfriends.met` file, which is useful for verifying the layout described here.
