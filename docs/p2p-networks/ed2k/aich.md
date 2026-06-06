---
id: aich
title: AICH & ICH — Corruption Handling
---

aMule uses two complementary mechanisms to detect and recover from data corruption during downloads: **ICH** (Intelligent Corruption Handling) and **AICH** (Advanced Intelligent Corruption Handling — aMule's interface labels it *Advanced I.C.H.*). They cooperate rather than exclude each other: when a part fails its hash check aMule re-downloads it, and — when a trusted AICH Root Hash is available — AICH salvages the intact 180 KB sub-blocks so that only the genuinely corrupt ones are re-fetched.

## ICH — Intelligent Corruption Handling

### What is ICH?

A file is split into [parts (chunks)](../concepts.md#chunk) of **9,728,000 bytes (9.28 MB)**, each with its own [MD4 hash](../concepts.md#md4-hash-ed2k-hash). When a part finishes downloading, aMule hashes it and compares the result with the expected MD4 hash. The naive response to a mismatch is to discard the whole part and re-download all 9.28 MB. ICH is the mechanism that lets aMule avoid re-fetching the data that is actually intact.

### How aMule handles a corrupt part

When a completed part fails MD4 verification, aMule:

1. Marks the **entire part** as missing again (queued for re-download) and flags it as corrupt.
2. Requests **AICH recovery data** for that part from a peer that has the complete file — but only if the part is larger than a single 180 KB block and a trusted AICH Root Hash is known.
3. If AICH recovery data is available, aMule re-hashes the part **block by block** (180 KB blocks) and keeps every block whose hash matches; only the genuinely corrupt blocks stay queued for re-download (see [AICH](#how-aich-recovers-corrupt-data) below).
4. The bytes salvaged this way are reported in the log as *"ICH: Recovered corrupted part … → Saved bytes: …"*.

Without a trusted AICH Root Hash aMule cannot tell which blocks are intact, so the whole part is re-downloaded.

:::note
Older write-ups describe ICH as a sequential "delete the first 180 KB, re-hash the whole part, and repeat with the next 180 KB until it matches" trial-and-error scheme. aMule does **not** implement this. Sub-block recovery is performed by AICH (next section), which identifies the corrupt blocks directly.
:::

### CPU Impact

Hashing a 9.28 MB part is negligible on any modern CPU, and even on older hardware the CPU cost is far outweighed by the bandwidth saved. It is strongly recommended to keep ICH enabled.

To toggle ICH: **[Preferences](../../manual/interfaces/gui/preferences.md#intelligent-corruption-handling-ich) → "Intelligent Corruption Handling (I.C.H.)" → "Enable"** (on by default). The amount of data lost to corruption and the packets rescued by ICH are reported in the file's [details window](../../manual/interfaces/gui/file-details.md#intelligent-corruption-handling).

## AICH — Advanced Intelligent Corruption Handling

### Motivation

ICH on its own can only re-download a whole corrupt part. **AICH** goes further: using a cryptographic hash tree, it identifies the exact corrupt 180 KB blocks immediately — no trial-and-error — so aMule re-downloads only those blocks.

### Definitions

| Term | Definition |
|---|---|
| **Chunk** | A 9,728,000-byte (9.28 MB) piece of a file. Each chunk has an MD4 hash. |
| **Block Hash** | The SHA-1 hash of a single 180 KB block within a chunk. |
| **AICH Hashset** | The complete tree of all Block Hashes, Verifying Hashes, and Root Hash for a file. |
| **Verifying Hash** | An intermediate node in the hash tree — the SHA-1 of two child hashes concatenated. |
| **Root Hash** | The SHA-1 hash at the top of the AICH tree. Uniquely identifies the AICH Hashset for a file. |

### Hash Tree Structure

Each chunk is divided into **53 blocks**: 52 blocks of 180 KB (184,320 bytes) and 1 block of 140 KB (143,360 bytes, the remainder). Each block is hashed independently with SHA-1 to produce a **Block Hash**.

The Block Hashes are then combined in pairs to produce Verifying Hashes — each Verifying Hash is the SHA-1 of the two child hashes concatenated. These are themselves combined in pairs, building up a binary hash tree. The single hash at the top of this tree is the **Root Hash**.

```
                    Root Hash (SHA-1)
                   /                 \\
          Verifying Hash         Verifying Hash
           /        \\             /          \\
     Verif. H.   Verif. H.   Verif. H.   Verif. H.
      /   \\       /   \\       /   \\       /   \\
    BH   BH    BH   BH    BH   BH    BH   BH   ...
   (53 Block Hashes at the leaves)
```

Each file has exactly **one valid AICH Hashset**.

### How AICH Recovers Corrupt Data

When a chunk is known to be corrupt (and it is larger than a single 180 KB block):

1. aMule requests the **AICH recovery data** (the Block Hashes and the Verifying Hashes needed to reconstruct the branch) from a client that has the complete file.
2. aMule rebuilds the hash tree from those hashes and computes the Root Hash.
3. **Validation:** the computed Root Hash is compared with the trusted Root Hash (from the eD2k link or established by peer consensus — see below).
   - If they match → the Block Hashes are trustworthy.
   - If they do not match → the received hashes are considered fake and discarded.
4. aMule re-hashes the corrupt chunk and compares each 180 KB block (SHA-1) against its corresponding Block Hash.
   - Matching blocks → intact; kept, no re-download needed.
   - Non-matching blocks → corrupt; only those specific blocks are re-downloaded.

This eliminates the whole-part re-download of plain ICH and can recover from multiple simultaneous corruption points within one chunk.

### Distributing the Root Hash

The ideal place to publish the Root Hash is in the **[eD2k link](./links.md#optional-fields)** (`h=<RootHash>` field, Base32-encoded). A Root Hash obtained this way is treated as **verified** — it is authenticated by the link itself. However, many files are found through search rather than direct links, and links may omit the Root Hash.

In that case, aMule uses **peer consensus** to establish a **trusted** Root Hash:

- aMule asks multiple clients for the Root Hash of the file.
- If **at least 10 clients** return the same Root Hash **and** that value represents **≥ 92%** of all responses received, the Root Hash is considered trustworthy.
- To prevent a single host from faking the consensus, aMule counts **unique IPs by subnet** (only the most significant bits of each address are considered), so multiple replies from the same network count as one.
- This Root Hash is kept **in memory only** (not written to disk) and is **not shared** with other clients until the download is complete.

Once the download completes:

1. aMule computes the full AICH Hashset from the finished file.
2. The Root Hash is stored in `known2_64.met`.
3. aMule begins sharing the AICH Hashset with other clients on request.

### Storing the AICH Hashset

After a file is downloaded completely, aMule builds and stores the complete AICH Hashset in the [`known2_64.met`](../../manual/configuration/config-files/index.md#known2_64met) file (under `~/.aMule/`; older versions used `known2.met`, the `_64` file being the current 64-bit format). This means future requests for the Hashset are served from disk without re-computing the tree each time.

### Enabling AICH

AICH has **no on/off switch** — it is always active and is used automatically whenever aMule can obtain a trusted Root Hash for a file. The only AICH-related preference is **["Advanced I.C.H. trusts every hash (not recommended)"](../../manual/interfaces/gui/preferences.md#intelligent-corruption-handling-ich)** (off by default): when enabled, aMule trusts any Root Hash it receives **without** requiring the 10-client / ≥ 92% consensus described above. Leaving it off is strongly recommended, as the consensus check is what protects against malicious peers injecting fake hashes.

### Summary: ICH vs AICH

| Feature | ICH | AICH |
|---|---|---|
| Granularity | Whole part (9.28 MB) | Individual 180 KB blocks |
| Requires AICH Hashset | No | Yes |
| Works without a trusted Root Hash | Yes | No |
| Re-downloaded on corruption | The whole part | Only the corrupt 180 KB blocks |
| Data stored on disk | None | `known2_64.met` (AICH Hashset) |
| Availability | Toggle, on by default | Always active when a Root Hash is known |
