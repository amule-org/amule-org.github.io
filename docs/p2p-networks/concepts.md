---
id: concepts
title: Concepts & Glossary
---

This page defines all technical terms and concepts used in the eD2k and Kademlia networks as implemented in aMule.

## Hashing

### Hash

A **hash** is the output of a mathematical algorithm that converts an arbitrary piece of data into a fixed-size fingerprint. A good hash function produces a completely different output if even one bit of the input changes.

In the eD2k network, hashes are used to:
- Uniquely identify files (by hashing all [chunk](#chunk) hashes).
- Verify the integrity of each downloaded [chunk](#chunk).
- Build the [AICH](./ed2k/aich.md) hash tree for sub-chunk error recovery.

The most commonly used hash type is the **MD4 hash** (for file and chunk identification). **SHA-1** is used for the [AICH](./ed2k/aich.md) corruption handling system.

### MD4 Hash (eD2k Hash)

The **MD4 hash** is the primary file identifier on the eD2k network. It produces a **128-bit (16-byte, 32 hex character)** digest.

**Important:** The eD2k hash algorithm is *derived from* MD4 but is **not** a plain MD4 hash of the file. The computation is:

1. Split the file into blocks of **9,728,000 bytes** (9.28 MB) — see [Chunk](#chunk).
2. Compute the MD4 digest of **each block separately**.
3. Concatenate all block digests into one byte array.
4. Compute MD4 of that concatenated array — this is the **eD2k hash**.

For a file smaller than one chunk, the eD2k hash is simply the MD4 of the entire file.

aMule uses the [Crypto++](https://cryptopp.com/) library for MD4 computation.

MD4 was developed by MIT professor Ronald L. Rivest and accepted by RSA in October 1990. Both MD4 and its successor MD5 are optimised for 32-bit machines. MD4 is fast but considered cryptographically weak — however, this does not affect its use for file identification on eD2k.

**References:** [RFC 1320 (MD4)](https://www.rfc-editor.org/rfc/rfc1320), [RFC 1186 (original MD4)](https://www.rfc-editor.org/rfc/rfc1186)

### AICH Hash Tree

See the dedicated [AICH & ICH page](./ed2k/aich.md) for full documentation of Block Hashes, Verifying Hashes, Root Hash, and the AICH Hashset.

### Userhash

The **userhash** is a 128-bit value that uniquely identifies a client within the eD2k network. It is stored in `~/.aMule/preferences.dat` and persists between sessions.

The userhash is used by other clients to track accumulated credits with you. When [Secure User Identification](./ed2k/secure-user-identification.md) (SUI) is enabled, the userhash is cryptographically linked to your RSA private key, preventing impersonation.

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
- **[ICH](./ed2k/aich.md#ich--intelligent-corruption-handling)** (re-downloads the minimal number of 180 KB parts).
- **[AICH](./ed2k/aich.md#aich--advanced-intelligent-corruption-handling)** (identifies the exact corrupt parts without trial-and-error).

Do not confuse **corrupt** with **[fake](#fake)**: a corrupt file is the same file with transmission errors; a fake file is a deliberately different file with the same name/hash claimed.

### Temp File

**Temp files** (also called **partial files**) are files being downloaded that have not yet been completed. In aMule, temp files are stored in the [Temp directory](#temp-directory) and use the naming convention:

```
NNN.part          — partial download data
NNN.part.met      — metadata (download progress, hash, etc.)
NNN.part.met.seeds — source seeds for rare files
```

where `NNN` is a three-digit number. The byte layout of the `.part.met` file is documented in the [part.met file format](../developer/file-formats/part-met.md) reference.

### Temp Directory

The **Temp directory** is where aMule stores all incomplete downloads. Configure it in **Preferences → Directories → Temp files** (see [Directories configuration](../manual/configuration/directories.md#temporary-directory)).

While a file is being downloaded it remains in the Temp directory with its `.part` naming. Once fully downloaded, aMule moves it to the [Incoming directory](#incoming-directory).

### Incoming Directory

The **Incoming directory** is where aMule moves completed downloads. All files in the Incoming directory are guaranteed to be complete. Configure it in **Preferences → Directories → Incoming files** (see [Directories configuration](../manual/configuration/directories.md#incoming-directory)).

Any file in the Incoming directory is also automatically [shared](#shared-file) by aMule.

### Seed

aMule can optionally store a small number of known **sources** for rare files in `NNN.part.met.seeds` files. This helps re-locate sources for files with very few peers across sessions. Only **rare files (fewer than 20 known sources)** get seeds saved.

**Priority for stored seeds:**
1. Sources that are currently actively uploading to you (you likely have more [credits](#credits) with them).
2. Most recently found sources (most likely still active next session).

aMule stores up to **10 sources** per file. Enable in **Preferences → Files → Save 10 sources on rare files (< 20 sources)**.

## File Sharing

### Shared File

aMule considers a file **shared** if it meets any of these criteria:

1. It is in one of the directories you have configured for sharing (see [Shared directories](#shared-directory)).
2. It is a completed file in the [Incoming directory](#incoming-directory).
3. It is being downloaded and at least **one [chunk](#chunk) has been completed** — only the completed chunks are shared.

### Shared Directory

A **shared directory** is any directory you have configured in **Preferences → Directories → Shared directories**. aMule indexes all files in these directories and makes them available to other [eD2k](./ed2k/index.md)/[Kademlia](./kademlia.md) clients. See [Directories configuration](../manual/configuration/directories.md#shared-directories) and [Shared files](../manual/interfaces/gui/shared-files.md) for the GUI.

### Hard Files (Server Limit)

**Hard files** is the maximum number of files a [server](./ed2k/servers.md) allows a client to share. If you share more files than the server's hard files limit, the server imposes a penalty (the nature of the penalty depends on the server).

This limit is per-server and is reported to the client upon connection.

### Soft Files (Server Limit)

**Soft files** is the minimum number of files a [server](./ed2k/servers.md) expects a client to share. If you share fewer files than the soft files limit, the server imposes a penalty.

This limit is also per-server.

### Share

In P2P terminology, **sharing** means making a file available for others to download. A client that has a file and allows others to connect to it (even if no one is downloading at that exact moment) is sharing that file.

The [eD2k](./ed2k/index.md) and [Kademlia](./kademlia.md) networks depend on sharing: the more clients share files, the more resilient and complete the network becomes.

## Client IDs and Connectivity

### ID

In the eD2k context, an **ID** is a number that uniquely identifies a client to a specific [server](./ed2k/servers.md). It is not globally unique across all servers — a client may have different IDs on different servers.

Two categories of ID exist: **High ID** and **Low ID**. It is always strongly recommended to achieve a High ID when possible.

For a full explanation of the ID system, the High ID formula, why Low ID restricts transfers, and how to get a High ID, see the dedicated **[High ID and Low ID](ed2k/high-id.md)** page.

### High ID

Clients whose Standard Client TCP port (default: 4662) is reachable from the internet receive a **High ID** (any value ≥ 16,777,216). High ID clients can accept incoming connections from any peer and are not subject to server-side restrictions.

→ See **[High ID and Low ID](ed2k/high-id.md)** for the full explanation including the ID formula, benefits, and configuration steps.

### Low ID

Clients whose TCP port is unreachable receive a **Low ID** (any value < 16,777,216). Low ID clients cannot accept direct incoming connections; two Low ID clients **cannot transfer data to each other**; and many servers reject Low ID clients. See [Network connectivity](../manual/configuration/network-connectivity.md) for opening and forwarding the required ports.

→ See **[High ID and Low ID](ed2k/high-id.md)** for consequences, troubleshooting, and how to fix a Low ID.

## Download Queue

### Queue

When you request a file from another client, you enter that client's **upload queue** — a list of clients waiting to receive an [upload slot](#upload-slot). Each queued client has a computed **score**. The client with the highest score receives the next available upload slot.

```
score = time_waiting_in_seconds × credit_multiplier × file_priority_multiplier
```

The base of the score is simply how long you have waited (in seconds); it is then scaled by your [credits](#credits) with that client and by the upload priority of the requested file. (Banned clients always score 0; a [friend](#friend) granted a dedicated slot is given an effectively unbeatable score.)

### Queue Rank (QR)

The **Queue Rank (QR)** is your position in another client's upload queue. A QR of 0 means you are currently being served (receiving data). Higher QR values mean a longer wait. aMule shows the rank and score of each queued client in the [client details](../manual/interfaces/gui/client-details.md#queue-rank) panel.

If the remote client's queue is full when you try to join, you receive a **"Queue is full"** response and are dropped immediately. Your client will retry later.

### Score Modifiers

Your waiting time (in seconds) is the linear base of the score. It is then multiplied by the following factors. Each factor is a neutral × 1.0 unless one of the conditions below applies:

| Modifier | Multiplier |
|---|---|
| Credits (based on upload/download history) | × 1.0 to × 10.0 |
| File priority: Release | × 250.0 |
| File priority: Very High | × 1.8 |
| File priority: High | × 0.9 |
| File priority: Normal | × 0.7 |
| File priority: Low | × 0.6 |
| File priority: Very Low | × 0.2 |
| Old eMule-compatible clients (version ≤ 0x19) | × 0.5 |
| Banned clients | × 0 |

The file-priority and credit multipliers are combined, so a freshly queued client on a Normal-priority file with no credit history effectively starts from `1.0 × 0.7 = 0.7 ×` its waiting time. File upload priority is set per file — see [Upload Priority](../manual/interfaces/gui/priority.md#upload-priority), including the special [Release priority](../manual/interfaces/gui/priority.md#release-priority).

### Credits

**Credits** are earned when another client uploads to you. They represent your upload history with that specific client pair — they are **bilateral** (per-pair), not global.

The credits multiplier (used in the score calculation) is:

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

Credits are stored in `~/.aMule/clients.met` (see the [clients.met file format](../developer/file-formats/clients-met.md)). They rely on [Secure User Identification](./ed2k/secure-user-identification.md) so that they cannot be claimed by a client impersonating another. Since credits are tracked by the uploading client, if a remote client does not support credits, you gain no credits on them even if you upload — but they gain credits on you if they upload.

### Upload Slot

An **upload slot** is a share of your upload bandwidth allocated to one downloading client. The number of slots is derived from a configurable **slot allocation** target (default **10 KB/s** per slot, set in **Preferences → Connection**):

```
slots = round(upload_limit / slot_allocation)
```

The result is clamped to a minimum of **2 slots** and a maximum of **250 slots**, regardless of the upload limit. When the upload limit is unlimited, aMule scales the slot count from the observed upload rate instead, with a floor of 20 slots to allow the uplink to ramp up. See [Bandwidth & Upload Slots](../manual/configuration/bandwidth-slots.md) for how aMule opens and rotates slots and which values to choose.

## Client Behaviour

### Aggressive Client

An **aggressive client** requests files too frequently. aMule does not ban on a single early request; it tracks an **aggressiveness score** per client:

- Each file request that arrives **less than ~10 minutes** (`MIN_REQUESTTIME` = 590 seconds) after the previous one adds **+3** to the score.
- A "polite" request (one that waits longer than the window) subtracts 1 from the score.
- When the score reaches **10 or more**, the client is banned.

In practice, about four rapid re-requests in a row trigger a ban. Behaviours that generate such repeated requests — for example a peer that **pauses and resumes**, or **restarts**, every couple of minutes — therefore accumulate aggressiveness quickly and get banned. The check is based on the time of the client's *last* file request (any file), not on a per-file timer.

[Leechers](#leech--leecher) and [bad guys](#bad-guy) are sometimes also referred to as aggressive clients. Aggressive clients are typically [banned](#ban) by the clients they harass.

### Leech / Leecher

**Leeching** is downloading from other clients while refusing to allow uploads. Specifically, a client is a leecher if it has disabled uploading — not merely if it happens not to be uploading at a specific moment (every client that allows uploads is legitimate, even if no one is downloading from them right now).

Leechers are detected and [banned](#ban) by other clients as soon as they are identified.

**Key distinction:** A leech cannot upload but **can** still download. A [banned](#ban) client can neither upload **nor** download from the banning client.

### Bad Guy

A **bad guy** is any client that:
- [Leeches](#leech--leecher) (does not upload).
- Does not conform to the [eD2k protocol](./ed2k/index.md) specification.

Bad guys are [banned](#ban) as soon as they are detected, and their IP is added to the [blacklist](#blacklist).

### Ban

When a client is **banned**:
- The banning client refuses both uploads to and downloads from the banned client.
- The banned client is completely ignored.

Reasons for banning:
- Detected [leeching](#leech--leecher).
- Repeated [aggressive requests](#aggressive-client).
- Behaviour that damages the network or other clients.

After a ban, the client's IP is added to the [blacklist](#blacklist). Bans are not permanent: they expire after **2 hours** (`CLIENTBANTIME`).

**Key distinction:** A banned client cannot upload *or* download; a [leecher](#leech--leecher) cannot upload but *can* download (until caught and banned).

### Blacklist

The **blacklist** is a list of clients that are refused connections. Both clients and servers maintain blacklists:

- **Client blacklist** — [bad guys](#bad-guy) and [leechers](#leech--leecher) detected this session.
- **Server blacklist** — clients that repeatedly request connections or files in a way that overloads the [server](./ed2k/servers.md).

## Social Features

### Friend

A **friend** is a client that you have added to your friends list, identified through their [Secure User Identification](./ed2k/secure-user-identification.md) key. Friends can:
- Be granted a **[friend slot](../manual/interfaces/gui/messages.md#establishing-a-friend-slot)** — a dedicated [upload slot](#upload-slot) that gives them priority over regular queued clients.
- Be easily messaged through the [Friends pane](../manual/interfaces/gui/messages.md#friends-list) in aMule.

Friends are identified by their SUI public key (not just their IP, which can change).

## Bootstrapping

### Bootstrap (Kademlia)

**Bootstrapping** is the process of joining the Kademlia network starting from a single known contact.

> The term comes from the tale of Baron Münchhausen pulling himself out of a swamp by his own hair — a system that starts itself from almost nothing.

Once connected to one Kademlia-compatible client, that client shares its routing table, which gives access to more contacts, which gives access to the full network.

See [Kademlia — Bootstrapping](./kademlia.md#bootstrapping) for full details.

## Protocol Details

### Endianness

**Endianness** defines the byte order used to store multi-byte numbers in memory:

- **Little-endian:** The byte with the **lowest** positional value (least significant byte) is stored first at the lowest memory address. (Example: Intel x86, AMD64)
- **Big-endian:** The byte with the **highest** positional value (most significant byte) is stored first. (Example: network byte order, many RISC architectures)

In the eD2k protocol, all multi-byte integers are stored in **little-endian** byte order. This is important when implementing parsers or readers for eD2k protocol packets and file formats (such as [`server.met`](../developer/file-formats/server-met.md), [`clients.met`](../developer/file-formats/clients-met.md), [`part.met`](../developer/file-formats/part-met.md), etc.).

Since Unicode became widespread, endianness affects text too: in UTF-16 and UTF-32, multi-byte code units must be stored in the correct byte order for the target platform.

### Fake

A **fake** file is one that claims to be a particular file (same name, possibly same or similar size) but is deliberately different in content. Fakes are uploaded by malicious users to pollute search results.

Fakes differ from [corrupt](#corrupt) files:
- A corrupt file is the **same** file with transmission errors — recoverable.
- A fake file is a **different** file intentionally mislabelled — it has a different hash if compared against the real file.

Common signs of a fake:
- The file's [MD4 hash](#md4-hash-ed2k-hash) does not match that of the known genuine file.
- Comments from other users indicate the file is fake.
- The file size differs significantly from the genuine file.

For practical detection and avoidance tips, see [Fake files and servers](../manual/troubleshooting/fake-files-and-servers.md#fake-files).

## Webcache

:::warning aMule position
Webcache has appeared multiple times as a feature request in aMule's forums. The team's position is unambiguous: **neither aMule nor eMule will officially support webcache in any future release.** This decision is final and the topic is not open for further discussion.
:::

**Webcache** (also written as "web cache") is a proposed extension to the eD2k/eMule transfer model in which clients upload shared file data to an ISP's HTTP proxy cache and other clients download it from the proxy instead of from the originating peer. Because ISP proxy servers have significantly more bandwidth and lower latency than residential peers, downloads could in theory be much faster.

The scheme was fully described in a post published on eMule's forums. Several eMule mods implemented it experimentally.

**History:** The idea was first posted on 13 April 2003 by user **sufcrusher** on eMule's forums. The public discussion there tracks the evolution of the concept through to the first eMule mods that implemented it.

**Pros:**

- **Bandwidth**: ISP proxy servers have far greater bandwidth than residential peers, so download speeds from the cache are substantially higher.
- **Reduced peer-to-peer traffic at the ISP level**: Once data is cached at the ISP proxy, subsequent requests are served locally, reducing the volume of long-haul P2P traffic that ISPs carry.

**Cons** — the aMule team identified the following fundamental problems:

- **Privacy**: All shared data passes through the ISP's proxy, making it visible to the ISP. Traffic encryption (e.g. protocol obfuscation) is incompatible with webcache, since encrypted content cannot be cached by standard HTTP proxies.
- **Legal uncertainty**: Using ISP HTTP caches for arbitrary P2P data rather than web content is a legally grey area. Legislation differs across jurisdictions, and eD2k clients aim for the broadest legal compatibility possible.
- **DDoS effect on ISP infrastructure**: At scale, webcache generates a high volume of writes to ISP cache servers from many clients simultaneously. This degrades cache service quality for the ISP's entire subscriber base. ISPs could legitimately terminate the contracts of clients generating this load, and P2P developers supporting webcache could be sued on the grounds of distributing a tool that performs distributed denial-of-service attacks against ISP infrastructure.
- **Governmental surveillance**: P2P networks are monitored by several governments on suspicion of illegal use. Routing shared content through ISP proxies — infrastructure that governments can easily compel ISPs to monitor — substantially increases exposure.

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
| Score | Queue sorting value: wait_seconds × credits × file_priority |
| Seed | Stored source (up to 10) for a rare file across sessions |
| Shared file | Any file aMule makes available to others |
| Soft files | Server-imposed minimum on shared files |
| Temp file / Temp dir | Incomplete download file and its storage directory |
| Userhash | 128-bit client identity stored in preferences.dat |
| Verifying Hash | Intermediate node in the AICH hash tree |
| Webcache | Proposed (never implemented) scheme to cache P2P data on ISP HTTP proxies |
