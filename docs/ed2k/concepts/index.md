---
id: index
title: Concepts & Glossary
---

This page defines all technical terms and concepts used in the eD2k and Kademlia networks as implemented in aMule.

---

## Hashing

### Hash

A **hash** is the output of a mathematical algorithm that converts an arbitrary piece of data into a fixed-size fingerprint. A good hash function produces a completely different output if even one bit of the input changes.

In the eD2k network, hashes are used to:
- Uniquely identify files (by hashing all chunk hashes).
- Verify the integrity of each downloaded chunk.
- Build the AICH hash tree for sub-chunk error recovery.

The most commonly used hash type is the **MD4 hash** (for file and chunk identification). **SHA-1** is used for the [AICH](../aich.md) corruption handling system.

### MD4 Hash (eD2k Hash)

The **MD4 hash** is the primary file identifier on the eD2k network. It produces a **128-bit (16-byte, 32 hex character)** digest.

**Important:** The eD2k hash algorithm is *derived from* MD4 but is **not** a plain MD4 hash of the file. The computation is:

1. Split the file into blocks of **9,728,000 bytes** (9.28 MB).
2. Compute the MD4 digest of **each block separately**.
3. Concatenate all block digests into one byte array.
4. Compute MD4 of that concatenated array — this is the **eD2k hash**.

For a file smaller than one chunk, the eD2k hash is simply the MD4 of the entire file.

aMule uses the [Crypto++](https://cryptopp.com/) library for MD4 computation.

MD4 was developed by MIT professor Ronald L. Rivest and accepted by RSA in October 1990. Both MD4 and its successor MD5 are optimised for 32-bit machines. MD4 is fast but considered cryptographically weak — however, this does not affect its use for file identification on eD2k.

**References:** [RFC 1320 (MD4)](https://www.rfc-editor.org/rfc/rfc1320), [RFC 1186 (original MD4)](https://www.rfc-editor.org/rfc/rfc1186)

### AICH Hash Tree

See the dedicated [AICH & ICH page](../aich.md) for full documentation of Block Hashes, Verifying Hashes, Root Hash, and the AICH Hashset.

### Userhash

The **userhash** is a 128-bit value that uniquely identifies a client within the eD2k network. It is stored in `~/.aMule/preferences.dat` and persists between sessions.

The userhash is used by other clients to track accumulated credits with you. When [Secure User Identification](../secure-user-identification.md) (SUI) is enabled, the userhash is cryptographically linked to your RSA private key, preventing impersonation.

---

## Chunks and Data Integrity

### Chunk

A **chunk** is the fundamental unit of file transfer on the eD2k network. Every file is divided into chunks of exactly **9,728,000 bytes (≈ 9.28 MB)**.

- A file is divided into `ceil(file_size / 9728000)` chunks.
- Each chunk has its own **MD4 hash** for integrity verification.
- Clients upload **one chunk at a time** to a given recipient.
- Only completed chunks are shared with other clients.

The chunk boundary also determines what aMule reports as a "completed chunk" in the download progress bar.

### Corrupt

A file, chunk, or 180 KB part is **corrupt** if it differs bitwise from the original. The eD2k network always detects corruption through hash verification. The chance of an undetected corruption event is astronomically small.

Corruption can be recovered by:
- **ICH** (re-downloads the minimal number of 180 KB parts).
- **AICH** (identifies the exact corrupt parts without trial-and-error).

Do not confuse **corrupt** with **[fake](#fake)**: a corrupt file is the same file with transmission errors; a fake file is a deliberately different file with the same name/hash claimed.

### Temp File

**Temp files** (also called **partial files**) are files being downloaded that have not yet been completed. In aMule, temp files are stored in the **Temp directory** and use the naming convention:

```
NNN.part          — partial download data
NNN.part.met      — metadata (download progress, hash, etc.)
NNN.part.met.seeds — source seeds for rare files
```

where `NNN` is a three-digit number.

### Temp Directory

The **Temp directory** is where aMule stores all incomplete downloads. Configure it in **Preferences → Directories → Temp files**.

While a file is being downloaded it remains in the Temp directory with its `.part` naming. Once fully downloaded, aMule moves it to the **Incoming directory**.

### Incoming Directory

The **Incoming directory** is where aMule moves completed downloads. All files in the Incoming directory are guaranteed to be complete. Configure it in **Preferences → Directories → Incoming files**.

Any file in the Incoming directory is also automatically **shared** by aMule.

### Seed

aMule can optionally store a small number of known **sources** for rare files in `NNN.part.met.seeds` files. This helps re-locate sources for files with very few peers across sessions.

**Priority for stored seeds:**
1. Sources that are currently actively uploading to you.
2. Most recently found sources (most likely still active next session).

aMule stores up to **5 seeds** per file. Enable in **Preferences → Files → Store 5 seeds for rare files**.

---

## File Sharing

### Shared File

aMule considers a file **shared** if it meets any of these criteria:

1. It is in one of the directories you have configured for sharing (see **Preferences → Directories**).
2. It is a completed file in the **Incoming directory**.
3. It is being downloaded and at least **one chunk has been completed** — only the completed chunks are shared.

### Shared Directory

A **shared directory** is any directory you have configured in **Preferences → Directories → Shared directories**. aMule indexes all files in these directories and makes them available to other eD2k/Kademlia clients.

### Hard Files (Server Limit)

**Hard files** is the maximum number of files a server allows a client to share. If you share more files than the server's hard files limit, the server imposes a penalty (the nature of the penalty depends on the server).

This limit is per-server and is reported to the client upon connection.

### Soft Files (Server Limit)

**Soft files** is the minimum number of files a server expects a client to share. If you share fewer files than the soft files limit, the server imposes a penalty.

This limit is also per-server.

### Share

In P2P terminology, **sharing** means making a file available for others to download. A client that has a file and allows others to connect to it (even if no one is downloading at that exact moment) is sharing that file.

The eD2k and Kademlia networks depend on sharing: the more clients share files, the more resilient and complete the network becomes.

---

## Client IDs and Connectivity

### ID

In the eD2k context, an **ID** is a number that uniquely identifies a client to a specific server. It is not globally unique across all servers — a client may have different IDs on different servers.

Two categories of ID exist:

- **High ID** — the client's TCP port is reachable; the client can accept incoming connections.
- **Low ID** — the client's TCP port is blocked by NAT or a firewall; the client cannot accept direct connections.

It is always strongly recommended to achieve a High ID when possible.

### High ID

Clients whose Standard Client TCP port (default: 4662) is reachable from the internet receive a **High ID**. The ID value is computed as:

```
High ID = A + 256·B + 256²·C + 256³·D
          where IP = A.B.C.D
```

**Benefits:**
- Can connect to any other client regardless of their ID.
- Not subject to server-side download restrictions.
- Many servers refuse Low ID clients; High ID avoids this.

### Low ID

Clients whose TCP port is unreachable receive a **Low ID**. Any ID below **16,777,216** is a Low ID.

**Consequences:**
- Cannot accept direct incoming connections from other clients.
- Two Low ID clients **cannot transfer data to each other**.
- The server relays connection setup on their behalf.
- Only High ID clients count as "available sources" for a Low ID client.
- Some large servers reject Low ID clients.

To get a High ID: forward TCP port 4662 (or your configured port) on your router and open it in your firewall. See [Get High ID](../../user-guide/configuration/index.md) for detailed instructions.

---

## Download Queue

### Queue

When you request a file from another client, you enter that client's **upload queue** — a list of clients waiting to receive an upload slot. Each queued client has a computed **score**. The client with the highest score receives the next available upload slot.

```
score = rate × time_waiting_in_seconds / 100
```

### Queue Rank (QR)

The **Queue Rank (QR)** is your position in another client's upload queue. A QR of 0 means you are currently being served (receiving data). Higher QR values mean a longer wait.

If the remote client's queue is full when you try to join, you receive a **"Queue is full"** response and are dropped immediately. Your client will retry later.

### Rate (Score Modifier)

The **rate** is the base multiplier for your score in another client's upload queue. It starts at 100 for every new queued client and is then multiplied by various factors:

| Modifier | Multiplier |
|---|---|
| Credits (based on upload/download history) | × 1.0 to × 10.0 |
| File priority: Release | × 1.8 |
| File priority: High | × 0.9 |
| File priority: Normal | × 0.7 |
| File priority: Low | × 0.6 |
| File priority: Very Low | × 0.2 |
| Abusive/old clients | × 0.5 |
| Banned clients | × 0 |

Clients with a rate modifier above 1 are shown in **yellow** in the queue icon.

### Credits

**Credits** are earned when another client uploads to you. They represent your upload history with that specific client pair — they are **bilateral** (per-pair), not global.

The credits multiplier (used in the rate calculation) is:

```
multiplier = min(
    (upload_total × 2) / download_total,
    sqrt(upload_total + 2)
)
```

Both totals are in MB. The multiplier is clamped to [1, 10].

Special cases:
- If `upload_total < 1 MB` → multiplier is 1.
- If `download_total == 0` → multiplier is 10.

Credits are stored in `~/.aMule/clients.met`. Since credits are tracked by the uploading client, if a remote client does not support credits, you gain no credits on them even if you upload — but they gain credits on you if they upload.

### Upload Slot

An **upload slot** is a share of your upload bandwidth allocated to one downloading client. Your upload bandwidth is divided into slots, each providing `upload_limit / active_slots` KB/s.

No client can allocate fewer than **3 slots**, so the minimum per-slot bandwidth is `upload_limit / 3` KB/s.

---

## Client Behaviour

### Aggressive Client

An **aggressive client** requests a file too frequently. The banning threshold is:

- Any client requesting the same file **more than once in 10 minutes** should be banned.
- Clients that **pause and resume too frequently** (generating repeated file requests) should be banned.
- Clients that **restart every two minutes** (generating repeated file requests) should be banned.

Leechers and bad guys are sometimes also referred to as aggressive clients. Aggressive clients are typically banned by the clients they harass.

### Leech / Leecher

**Leeching** is downloading from other clients while refusing to allow uploads. Specifically, a client is a leecher if it has disabled uploading — not merely if it happens not to be uploading at a specific moment (every client that allows uploads is legitimate, even if no one is downloading from them right now).

Leechers are detected and banned by other clients as soon as they are identified.

**Key distinction:** A leech cannot upload but **can** still download. A banned client can neither upload **nor** download from the banning client.

### Bad Guy

A **bad guy** is any client that:
- Leeches (does not upload).
- Does not conform to the eD2k protocol specification.

Bad guys are banned as soon as they are detected, and their IP is added to the blacklist.

### Ban

When a client is **banned**:
- The banning client refuses both uploads to and downloads from the banned client.
- The banned client is completely ignored.

Reasons for banning:
- Detected leeching.
- Repeated aggressive requests.
- Behaviour that damages the network or other clients.

After a ban, the client's IP is added to the blacklist for the session.

**Key distinction:** A banned client cannot upload *or* download; a leecher cannot upload but *can* download (until caught and banned).

### Blacklist

The **blacklist** is a list of clients that are refused connections. Both clients and servers maintain blacklists:

- **Client blacklist** — bad guys and leechers detected this session.
- **Server blacklist** — clients that repeatedly request connections or files in a way that overloads the server.

---

## Social Features

### Friend

A **friend** is a client that you have added to your friends list, identified through their [Secure User Identification](../secure-user-identification.md) key. Friends can:
- Be granted a **friend slot** — a dedicated upload slot that gives them priority over regular queued clients.
- Be easily messaged through the Friends pane in aMule.

Friends are identified by their SUI public key (not just their IP, which can change).

---

## Bootstrapping

### Bootstrap (Kademlia)

**Bootstrapping** is the process of joining the Kademlia network starting from a single known contact.

> The term comes from the tale of Baron Münchhausen pulling himself out of a swamp by his own hair — a system that starts itself from almost nothing.

Once connected to one Kademlia-compatible client, that client shares its routing table, which gives access to more contacts, which gives access to the full network.

See [Kademlia — Bootstrapping](../kademlia.md#bootstrapping) for full details.

---

## Protocol Details

### Endianness

**Endianness** defines the byte order used to store multi-byte numbers in memory:

- **Little-endian:** The byte with the **lowest** positional value (least significant byte) is stored first at the lowest memory address. (Example: Intel x86, AMD64)
- **Big-endian:** The byte with the **highest** positional value (most significant byte) is stored first. (Example: network byte order, many RISC architectures)

In the eD2k protocol, all multi-byte integers are stored in **little-endian** byte order. This is important when implementing parsers or readers for eD2k protocol packets and file formats (such as `server.met`, `clients.met`, `part.met`, etc.).

Since Unicode became widespread, endianness affects text too: in UTF-16 and UTF-32, multi-byte code units must be stored in the correct byte order for the target platform.

### Fake

A **fake** file is one that claims to be a particular file (same name, possibly same or similar size) but is deliberately different in content. Fakes are uploaded by malicious users to pollute search results.

Fakes differ from [corrupt](#corrupt) files:
- A corrupt file is the **same** file with transmission errors — recoverable.
- A fake file is a **different** file intentionally mislabelled — it has a different hash if compared against the real file.

Common signs of a fake:
- The file's MD4 hash does not match that of the known genuine file.
- Comments from other users indicate the file is fake.
- The file size differs significantly from the genuine file.

---

## Quick Reference Table

| Term | Short definition |
|---|---|
| AICH | Advanced Intelligent Corruption Handler — SHA-1 hash tree for precise corruption recovery |
| Ban | Block a client from both uploading and downloading |
| Blacklist | List of clients refused all connections |
| Block Hash | SHA-1 of a 180 KB chunk part (AICH) |
| Bootstrap | Initial connection to Kademlia via a single known contact |
| Chunk | 9,728,000-byte (9.28 MB) piece of a file |
| Corrupt | File/chunk that differs bitwise from the original |
| Credits | Per-client-pair upload/download history used for queue scoring |
| Endianness | Byte order: little-endian (least significant byte first) is used in eD2k |
| Fake | A deliberately mislabelled file |
| Friend | A trusted, SUI-identified client with optional priority upload slot |
| Hard files | Server-imposed maximum on shared files |
| High ID | Client with reachable TCP port; full P2P capability |
| ICH | Intelligent Corrupt Handling — sequential 180 KB part recovery |
| ID | Unique client identifier assigned by the server |
| Incoming dir | Directory for completed downloads |
| Leech / Leecher | Client that downloads but does not allow uploads |
| Low ID | Client with blocked TCP port; reduced P2P capability |
| MD4 hash | 128-bit fingerprint used to identify files and chunks in eD2k |
| Queue | List of clients waiting for an upload slot |
| Queue Rank (QR) | Position in another client's upload queue (0 = being served) |
| Root Hash | Top-level SHA-1 in the AICH tree |
| Score | Queue sorting value: rate × wait_time / 100 |
| Seed | Stored source for a rare file across sessions |
| Shared file | Any file aMule makes available to others |
| Soft files | Server-imposed minimum on shared files |
| Temp file / Temp dir | Incomplete download file and its storage directory |
| Userhash | 128-bit client identity stored in preferences.dat |
| Verifying Hash | Intermediate node in the AICH hash tree |
