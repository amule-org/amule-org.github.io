---
id: kademlia
title: Kademlia Network
---

**Kademlia** (Kad) is a fully decentralised peer-to-peer network for \*Mule clients. Unlike [eD2k](ed2k/index.md), it requires no central servers — every participating client simultaneously acts as both a client and a server within the distributed hash table (DHT). aMule has supported Kademlia since version 2.1.0.

## Algorithm

Kademlia is based on the algorithm described in the paper **"Kademlia: A Peer-to-peer Information System Based on the XOR Metric"** by Petar Maymounkov and David Mazières (New York University, 2002):

- [PDF paper](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-lncs.pdf)
- [Talk slides](https://pdos.csail.mit.edu/~petar/papers/maymounkov-kademlia-talk.ps.gz)

The key innovation is using the **XOR metric** to measure the logical "distance" between nodes in the network. Each node has a unique 128-bit ID and is responsible for storing and serving data for keys that are numerically close to its own ID. This structure makes lookups efficient (O(log n) hops) and resilient against node failure.

## Architecture

In Kademlia there are no dedicated servers. Each client:

- Has a unique **node ID** (128-bit).
- Maintains a **routing table** of known contacts, divided into "k-buckets" by XOR distance.
- Is responsible for certain portions of the global distributed index.
- Answers queries from other nodes about files and sources.

When searching, a query is propagated through the network: each node forwards it to the contacts in its routing table that are "closer" to the target key. The search converges in logarithmic time.

### Comparison with eD2k

| Aspect | eD2k | Kademlia |
|---|---|---|
| Central servers required | Yes | No |
| Single point of failure | Yes (server) | No |
| Search propagation | Server-directed | Distributed |
| Client ID | Assigned by server | Derived from node ID |
| File transfer protocol | eD2k | Same as eD2k (shared protocol) |
| Privacy | Server logs IPs | Distributed — harder to monitor |
| Scalability | Server-limited | Scales with participants |

At the file-transfer level, Kademlia uses the **same protocol** as eD2k, so the same [chunks](concepts.md#chunk) and [hashes](concepts.md#md4-hash-ed2k-hash) are compatible across both networks.

## Bootstrapping

To join the Kademlia network you must first know the IP address and port of at least one already-connected Kademlia node. The process of joining using an initial known contact is called **bootstrapping**.

> The term "bootstrap" originates from Baron Münchhausen's tale of pulling himself out of a swamp by his own hair. In computing it means: a complex system is activated through a simpler starting mechanism until it can sustain itself.

### Automatic Bootstrapping (nodes.dat)

aMule stores previously seen Kademlia contacts in [`nodes.dat`](../developer/file-formats/nodes-dat.md) (`~/.aMule/nodes.dat`). On each startup, aMule reads this file and attempts to reconnect to known contacts. If at least some of those contacts are still online, Kademlia bootstraps automatically.

### Manual Bootstrapping

If `nodes.dat` is empty, outdated, or missing, you can bootstrap manually:

**Option 1 — From known clients already in your transfer list:**
- In the aMule interface, go to the **Networks → [Kad](../manual/interfaces/gui/networks.md#kademlia-kad)** tab.
- Click **Bootstrap from known clients** in the toolbar **Network** menu.

**Option 2 — Download a fresh nodes.dat:**
- Download a current [`nodes.dat`](../developer/file-formats/nodes-dat.md) file from a trusted source and place it in `~/.aMule/`.

**Option 3 — Connect via eD2k first:**
- Connect to an [eD2k server](ed2k/servers.md) and start a (test) download.
- After a short time, Kademlia-compatible clients will appear in your source list.
- Use those clients to bootstrap Kademlia.
- Cancel the test download and optionally disconnect from eD2k afterwards.

**Option 4 — Manual IP entry:**
- In the **Kad** tab, enter the IP address and port of a known Kademlia-compatible client in the input boxes in the upper-right corner. See **[Bootstrapping from a Specific Node](../manual/interfaces/gui/networks.md#bootstrapping-from-a-specific-node)** in the User Manual.

## Contact Types (Trust Levels)

Kademlia assigns a **type** (0–4) to each contact to express confidence in that contact's reliability. Type is based on how long the contact has been observed to be online during the current session.

| Type | Meaning |
|---|---|
| Type 0 | Best — contact has been alive for **≥ 2 hours** in the current session |
| Type 1 | Contact has been alive for **1–2 hours** and proven still online |
| Type 2 | Contact has been alive for **< 1 hour** and proven still online |
| Type 3 | Initial type — newly discovered contact, not yet verified |
| Type 4 | Worst — contact should be **deleted** (unreachable) |

Contact types are **not** persisted between sessions. [`nodes.dat`](../developer/file-formats/nodes-dat.md) stores the contact list itself (node ID, IP, UDP/TCP ports, Kad version, UDP key and an *IP-verified* flag) — chosen as a good bootstrap sample — but not the type. On startup every loaded contact begins unverified, and its type is recomputed from scratch based on how long it stays reachable during the new session.

Periodically, aMule pings contacts to check if they are still alive. Based on the response (or lack thereof), contacts are promoted (Type 3 → 2 → 1 → 0) or marked for deletion (Type 4).

## Routing Table

The routing table is organised into **k-buckets**, one for each region of the XOR address space. Each k-bucket holds up to `k` contacts (typically k=10). When a bucket fills up, aMule checks whether the least-recently-seen contact is still alive before considering eviction.

This structure ensures that:
- Very close contacts (same prefix) are known precisely.
- Distant contacts are known only sparsely.
- The routing table remains balanced and self-healing as nodes join and leave.

## Searching on Kademlia

Unlike eD2k where a search goes to a centralised server, Kademlia distributes search responsibility across nodes:

1. A keyword or file hash is hashed to a 128-bit key.
2. The query is routed through the network to nodes whose ID is closest to that key.
3. Those nodes return the list of sources they are aware of.

**Key differences from eD2k search:**
- A **keyword search** finds **complete files only** — incomplete files are not published under keywords (a peer with the full file is expected to publish them). Once you know a file's hash, a **source lookup** returns both complete *and* partial sources: clients that are still downloading a file publish themselves as sources for it.
- Each Kad node still returns up to 300 results per query, but because the lookup queries many nodes there is no single point that caps the total — unlike eD2k, where [one server limits the result set](ed2k/index.md#search-results-cap). The distributed nature does mean some rare files may be harder to find.
- The search is slower to return results but is not limited by server availability.

## Open vs. Firewalled Status

Kademlia uses the terms **Open** and **Firewalled** (analogous to eD2k's [High ID / Low ID](ed2k/high-id.md)). Unlike eD2k — where a single ID summarises your reachability — Kad checks two ports **independently** and reports a state for each:

- **TCP reachability** of the standard port (4662), verified by other Kad nodes attempting a connection back to you.
- **UDP reachability** of the Kademlia port (4672), verified by a dedicated UDP firewall test.

A fully **Open** node has both ports reachable and participates as a query target and a direct source. If either port is blocked or remapped by NAT, that side is reported **Firewalled**. The aMule GUI shows the two states separately — *Connection State* (TCP) and *UDP Connection State* (UDP) — in the **[Kad Info panel](../manual/interfaces/gui/networks.md#kad-info)**.

### Firewalled nodes and buddies

Being firewalled does **not** remove you from the network. You stay connected, you can keep searching and downloading, and you can still be found as a source — your participation is simply less efficient because other nodes cannot reach you directly.

To remain reachable, a firewalled node finds a **buddy**: an *open* Kad node that agrees to relay incoming connection requests (callbacks) on its behalf. When the firewalled node publishes itself as a source, it advertises its buddy's address; an interested peer then contacts the buddy, which forwards the request so the firewalled node can call back and open the transfer. This callback mechanism is what lets a firewalled node serve files at all, and it is the Kad equivalent of the eD2k server-assisted callback used for Low ID clients. The buddy connection status is also visible in the **[Kad Info panel](../manual/interfaces/gui/networks.md#kad-info)**.

A common case is being [High ID](ed2k/high-id.md) on eD2k yet Firewalled on Kademlia, usually caused by the router remapping the source port of outgoing UDP packets. For the practical steps to reach **open** status — including the NAT-remapping workaround — see **[Network Connectivity](../manual/configuration/network-connectivity.md)** in the User Manual.

## Is Kademlia the Same as Overnet?

No. Both are serverless networks based on the same Kademlia algorithm, but they are **incompatible**:

- **[Overnet](other-networks.md#overnet)** was the serverless evolution of the original eDonkey2000 software. Its development ended and the Overnet network is no longer operational.
- **Kademlia** in aMule/eMule is an independent implementation, fully open-source from the beginning, and still actively used.

Same philosophy (XOR-metric DHT), different wire protocol.

## Limitations

Kademlia inherits the eD2k network's maximum **[file size of 256 GB](ed2k/index.md#file-size-limit)** and **[161-character filename limit](ed2k/index.md#filename-length)**, since both networks share the same file identification system ([MD4 hash](concepts.md#md4-hash-ed2k-hash) + file size).
