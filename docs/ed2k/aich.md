---
id: aich
title: AICH & ICH — Corruption Handling
---

aMule implements two complementary systems to detect and recover from data corruption during downloads: **ICH** (Intelligent Corrupt Handling) and **AICH** (Advanced Intelligent Corruption Handler). When both are enabled, AICH takes priority and ICH is not used.

## ICH — Intelligent Corrupt Handling

### What is ICH?

When a downloaded chunk is verified and found to be corrupt, aMule would normally have to re-download the entire chunk (9.28 MB). **ICH** is a mechanism to avoid re-downloading the whole chunk when only a small part of it is corrupt.

### How ICH Works

Each chunk (9,728,000 bytes) is divided into **180 KB parts**. When a chunk is known to be corrupt, ICH:

1. Keeps all the already-downloaded data for the chunk.
2. Deletes only the **first 180 KB** of the chunk.
3. Re-downloads that first 180 KB.
4. Hashes the entire chunk (the re-downloaded 180 KB + the rest).
5. Compares the result against the expected chunk hash.
6. **If hashes match** → the chunk is complete and correct.
7. **If hashes do not match** → deletes the next 180 KB and repeats from step 3.

This continues until either a good hash is found or the entire chunk has been re-downloaded.

### Best and Worst Cases

| Scenario | Data re-downloaded |
|---|---|
| Best case (corruption in first 180 KB) | 180 KB out of 9.28 MB |
| Worst case (corruption in last 180 KB) | Full 9.28 MB |

In the worst case, ICH performs no worse than the naive approach (re-downloading everything). On average, **ICH saves approximately 50% of corrupt data re-downloads**.

### CPU Impact

Hashing 9.28 MB on any modern CPU is negligible. Even on older hardware, the CPU cost of hashing is far outweighed by the bandwidth saved. It is strongly recommended to keep ICH enabled.

To toggle ICH: **Preferences → Files → ICH → ICH active**.

### Relationship to AICH

ICH is the predecessor of AICH. When AICH can be applied to a file, ICH is **not used** for that file. AICH provides more precise corruption recovery at sub-chunk granularity.

## AICH — Advanced Intelligent Corruption Handler

### Motivation

ICH can identify *which* 180 KB part of a chunk is corrupt, but it re-downloads parts sequentially until it finds the bad one. **AICH** goes further: it can identify the exact corrupt parts immediately, without trial-and-error, by using a cryptographic hash tree.

### Definitions

| Term | Definition |
|---|---|
| **Chunk** | A 9,728,000-byte (9.28 MB) piece of a file. Each chunk has an MD4 hash. |
| **Block Hash** | The SHA-1 hash of a single 180 KB part within a chunk. |
| **AICH Hashset** | The complete tree of all Block Hashes, Verifying Hashes, and Root Hash for a file. |
| **Verifying Hash** | An intermediate node in the hash tree — the SHA-1 of two child hashes concatenated. |
| **Root Hash** | The SHA-1 hash at the top of the AICH tree. Uniquely identifies the AICH Hashset for a file. |

### Hash Tree Structure

Each chunk is divided into **53 parts**: 52 parts of 180 KB and 1 part of 140 KB (the remainder). Each part is hashed independently with SHA-1 to produce a **Block Hash**.

The Block Hashes are then combined in pairs to produce Verifying Hashes, which are themselves combined in pairs, building up a binary hash tree. The single hash at the top of this tree is the **Root Hash**.

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

When a chunk is known to be corrupt:

1. aMule requests the **AICH Hashset** (all 53 Block Hashes + necessary Verifying Hashes) from a client that has the complete file.
2. aMule builds the hash tree from those hashes and computes the Root Hash.
3. **Validation:** The computed Root Hash is compared with the Root Hash from the original eD2k link (or the one established by peer consensus — see below).
   - If they match → the Block Hashes are trustworthy.
   - If they do not match → the received hashes are considered fake and discarded.
4. Each 180 KB part of the corrupt chunk is hashed (SHA-1) and compared to its corresponding Block Hash.
   - Matching parts → intact, no re-download needed.
   - Non-matching parts → corrupt, re-download only those specific parts.

This eliminates the sequential trial-and-error of ICH and can recover from multiple simultaneous corruption points within one chunk.

### Distributing the Root Hash

The ideal place to publish the Root Hash is in the **eD2k link** (`h=<RootHash>` field). However, many files are found through search rather than direct links, and links may not include the Root Hash.

In that case, aMule uses **peer consensus**:

- aMule asks multiple clients for the Root Hash of the file.
- If **at least 10 clients** return the same Root Hash **and** that value represents **≥ 92%** of all responses received, the Root Hash is considered reliable.
- This Root Hash is kept **in memory only** (not written to disk) and **not shared** with other clients until the download is complete.

Once the download completes:
1. aMule computes the full AICH Hashset from the finished file.
2. The Root Hash is stored in `~/.aMule/known2.met`.
3. aMule begins sharing the AICH Hashset with other clients on request.

### Storing the AICH Hashset

After a file is downloaded completely, aMule builds and stores the complete AICH Hashset in **`~/.aMule/known2.met`**. This means future requests for the Hashset are served from disk without re-computing the tree each time.

### Enabling AICH

AICH is enabled in **Preferences → Files → AICH** (on by default). When AICH is active for a given file, ICH is automatically bypassed for that file.

### Summary: ICH vs AICH

| Feature | ICH | AICH |
|---|---|---|
| Granularity | 180 KB parts, sequential trial | Exact identification of corrupt parts |
| Requires hash tree | No | Yes (AICH Hashset) |
| Works without Root Hash | Yes | No (needs Root Hash) |
| Bandwidth saved | ~50% on average | Up to ~99% in ideal cases |
| Priority | Lower | Higher (used when available) |
| Data stored | None | `known2.met` (AICH Hashset) |
