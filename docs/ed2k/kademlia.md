---
id: kademlia
title: Kademlia Network
---

**Kademlia** (Kad) is a fully decentralised peer-to-peer network for \*Mule clients. Unlike eD2k, it requires no central servers — every participating client simultaneously acts as both a client and a server within the distributed hash table (DHT). aMule has supported Kademlia since version **2.1.0**.

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

At the file-transfer level, Kademlia uses the **same protocol** as eD2k, so the same chunks and hashes are compatible across both networks.

## Bootstrapping

To join the Kademlia network you must first know the IP address and port of at least one already-connected Kademlia node. The process of joining using an initial known contact is called **bootstrapping**.

> The term "bootstrap" originates from Baron Münchhausen's tale of pulling himself out of a swamp by his own hair. In computing it means: a complex system is activated through a simpler starting mechanism until it can sustain itself.

### Automatic Bootstrapping (nodes.dat)

aMule stores previously seen Kademlia contacts in [`nodes.dat`](../developer/file-formats/nodes-dat.md) (`~/.aMule/nodes.dat`). On each startup, aMule reads this file and attempts to reconnect to known contacts. If at least some of those contacts are still online, Kademlia bootstraps automatically.

### Manual Bootstrapping

If `nodes.dat` is empty, outdated, or missing, you can bootstrap manually:

**Option 1 — From known clients already in your transfer list:**
- In the aMule interface, go to **Networks → Kad** tab.
- Click **Bootstrap from known clients** in the toolbar **Network** menu.

**Option 2 — Download a fresh nodes.dat:**
- Download a current [`nodes.dat`](../developer/file-formats/nodes-dat.md) file from a trusted source and place it in `~/.aMule/`.

**Option 3 — Connect via eD2k first:**
- Connect to an eD2k server and start a (test) download.
- After a short time, Kademlia-compatible clients will appear in your source list.
- Use those clients to bootstrap Kademlia.
- Cancel the test download and optionally disconnect from eD2k afterwards.

**Option 4 — Manual IP entry:**
- In the **Kad** tab, enter the IP address and port of a known Kademlia-compatible client in the input boxes in the upper-right corner.

## Contact Types (Trust Levels)

Kademlia assigns a **type** (0–4) to each contact to express confidence in that contact's reliability. Type is based on how long the contact has been observed to be online during the current session.

| Type | Meaning |
|---|---|
| Type 0 | Best — contact has been alive for **≥ 2 hours** in the current session |
| Type 1 | Contact has been alive for **< 2 hours** and proven still online |
| Type 2 | Contact has been alive for **< 1 hour** and proven still online |
| Type 3 | Initial type — newly discovered contact, not yet verified |
| Type 4 | Worst — contact should be **deleted** (unreachable) |

Contact types are persisted between sessions in [`nodes.dat`](../developer/file-formats/nodes-dat.md), so that aMule starts each session with a list that includes the most reliably connected contacts from previous sessions.

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
- Results include sources that have completed chunks only (partial sources are not tracked in Kad).
- No single server caps results at 300; however, the distributed nature means some rare files may be harder to find.
- The search is slower to return results but is not limited by server availability.

## Open vs. Firewalled Status

Kademlia uses the terms **Open** and **Firewalled** (analogous to eD2k's [High ID / Low ID](high-id-low-id.md)):

- **Open** — your Kademlia UDP port (4672) is reachable from the internet. You can participate fully as both a query target and a source.
- **Firewalled** — your UDP port is blocked or remapped by NAT. You can still download but your participation in the DHT is limited.

### Resolving Firewalled Status

If your eD2k status is [High ID](high-id-low-id.md) but Kademlia shows Firewalled, the most common cause is **NAT UDP port remapping**:

Your router rewrites the source port of outgoing UDP packets (e.g. changes 4672 to some ephemeral port). Other Kademlia nodes then try to contact you on the port they saw (the remapped one), which fails.

**Solution:** Configure your router to use **port 4672 for UDP** without remapping, or use a different port that your ISP does not block:

1. Choose a new port number `n` in the range 80 < n < 65530 (avoid 4662 and 4665).
2. In **Preferences → Connection**, set the Standard Client TCP Port to `n`.
3. Forward on your router: TCP `n`, UDP `n+3`, UDP 4672.
4. In **Networks → Kad**, update the node list and wait ~5 minutes.
5. If still firewalled, try a different value of `n`.

Known working ports include: **4811, 9870**.

## Is Kademlia the Same as Overnet?

No. Both are serverless networks based on the same Kademlia algorithm, but they are **incompatible**:

- **Overnet** was the serverless evolution of the original eDonkey2000 software. Its development ended and the Overnet network is no longer operational.
- **Kademlia** in aMule/eMule is an independent implementation, fully open-source from the beginning, and still actively used.

Same philosophy (XOR-metric DHT), different wire protocol.

## Limitations

Kademlia inherits the eD2k network's maximum **file size of 256 GB** and **161-character filename limit**, since both networks share the same file identification system (MD4 hash + file size).
