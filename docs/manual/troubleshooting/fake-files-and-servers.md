---
id: fake-files-and-servers
title: Fake Files and Servers
---

The eD2k network provides little built-in protection against fake content and malicious servers. This page explains how to detect fake files, identify fake servers, and maintain a safe server list.

## Fake files

### What is a fake file?

A **fake file** is one that is intentionally mislabeled to appear as something it is not. The actual content may be:
- An unrelated file (e.g., a video file that is actually a virus executable)
- A corrupt file that cannot be used
- An empty or near-empty file
- Malware disguised as popular content (music, movies, software)

The eD2k network does not authenticate content, so any client can share any file under any name and hash. Once a file hash is associated with malicious content, it propagates through the network as sources share it with each other.

:::note
Do not confuse **fake** with [**corrupt**](../../p2p-networks/concepts.md#corrupt). A corrupt file has the correct content but some bytes were damaged during transfer; aMule's [ICH and AICH](../../p2p-networks/ed2k/aich.md) integrity checking handles corruption automatically. A fake file has completely wrong content that happens to match the expected hash — which is extremely rare due to the mathematical properties of MD4, but fake files more commonly work by being re-shared under a different name than their actual hash, or by being newly created fakes with their own hash.
:::

### How do I detect fake files?

aMule provides two built-in mechanisms, both reachable from the right-click menu of a file in the [Downloads](../interfaces/gui/downloads.md) window:

#### 1. User comments and ratings

Other clients that share the same file can attach short comments and quality ratings, which aMule collects and shows to everyone. Right-click a download and select **Show all comments** (or open [File Details](../interfaces/gui/file-details.md) and click **Show all comments**) to read them. If multiple users have rated a file as **Invalid / Corrupt / Fake** or described wrong content, treat it as suspicious. See the [Comments](../interfaces/gui/comments.md) window for details.

#### 2. File details inspection

Right-click a download and select **File Details**. The [**File Names**](../interfaces/gui/file-details.md#file-names) list shows every name that other sources have reported for the same hash, sorted by how many sources use each one. If the most-reported names suggest different content from what you expect, the file may be a fake.

### Practical tips for avoiding fake files

- **Cross-check comments** before downloading. Files with a high source count but many "FAKE" comments should be avoided.
- **Check file size**: a 700 MB movie file that appears as 2 MB is obviously wrong.
- **Check extension consistency**: a file named `movie.avi` that has an `application/exe` magic number in the first bytes (visible in a hex editor on the first downloaded chunk) is suspicious.
- **Prefer files with many complete sources**: the number in brackets in the [search results](../interfaces/gui/searches.md#getting-results) (clients known to have the complete file) correlates with legitimacy, though it is not conclusive.
- **Use AICH**: the [AICH (Advanced Intelligent Corruption Handler)](../../p2p-networks/ed2k/aich.md) system verifies sub-chunk integrity using a hash tree. While AICH does not detect a fake (a file that is internally consistent but not what you wanted), it does prevent accidentally accepting corrupted chunks from a fake source that has mixed legitimate and corrupted data.

## Fake servers

### What are fake servers?

Fake servers are malicious eD2k servers operated with one of three intents: **manipulating search results** to spread viruses or DRM-encumbered media disguised as the content you searched for; **logging the IP addresses and queries** of connected clients without providing useful sources; or **impersonating well-known servers** by copying their name and inflated user counts to appear trustworthy.

For the full description of each variant, their history (including the post-Razorback 2 impersonation servers), and how they propagate into your list, see [eD2k Servers — Fake servers](../../p2p-networks/ed2k/servers.md#fake-servers).

### How do I identify a fake server?

- **Unusual search results**: if searches consistently return many small files with high source counts and suspicious "catch phrase" names, you are likely connected to a [fake server](../../p2p-networks/ed2k/servers.md#fake-servers).
- **Verify against known good lists**: check the server's IP against the verified lists referenced on the [`server.met`](../configuration/config-files/index.md#servermet) page.
- **Block known-bad addresses**: enable the [IP filter](../interfaces/gui/preferences.md#ip-filtering) (Preferences → Security → IP-Filtering) with a maintained [`ipfilter.dat`](../configuration/config-files/index.md#ip-filter-files) list to reject traffic from flagged servers.

### How do I protect myself from fake servers?

The full step-by-step procedure lives on the protocol reference page — see [Maintaining a safe server list](../../p2p-networks/ed2k/servers.md#maintaining-a-safe-server-list). In short:

#### Disable automatic server list updates

When aMule automatically adds servers announced by other servers and clients, fake servers can propagate into your list. In **Preferences → [Servers](../interfaces/gui/preferences.md#servers)**, uncheck:

- **Update server list when connecting to a server**
- **Update server list when a client connects**

#### Use a curated server list

Remove any servers you cannot verify, then download a list from a trusted source. See the [`server.met`](../configuration/config-files/index.md#servermet) page for current sources, and the [`addresses.dat`](../configuration/config-files/index.md#addressesdat) reference (`~/.aMule/addresses.dat`) for configuring the URLs aMule uses to auto-update the list. Add only trusted URLs.

#### Use Kademlia instead of eD2k servers

The most robust solution is to **disable eD2k entirely** and use only [Kademlia](../../p2p-networks/kademlia.md). Since Kademlia is serverless and decentralized, there are no fake servers to connect to.

Disable eD2k in **Preferences → [Connection](../interfaces/gui/preferences.md#connection) → Networks** by unchecking the **ED2K** option.

:::note
Disabling eD2k and using only Kademlia should not result in fewer sources or lower download speeds under normal conditions. Searches and source finding will take somewhat longer because Kademlia queries propagate through the distributed network rather than going to a central server, but the results are equivalent for most files.
:::
