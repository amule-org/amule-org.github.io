---
id: index
title: eD2k Network
---

The **eD2k** (eDonkey2000) network is a client-server peer-to-peer network. Clients connect to a central server to search for files and obtain source lists, but actual file data is transferred directly between peers without passing through the server.

## Architecture

The eD2k network is built around a **client-server model**:

- A **server** is a central machine that maintains indexes of which clients share which files. Servers are interconnected so that global searches spanning all known servers are possible.
- A **client** (such as [aMule](../../manual/interfaces/gui/amule.md)) connects to one server at a time. Once connected, it can search for files, receive source lists, and begin downloading.
- **File transfers** happen directly between clients (peer-to-peer). The server is only involved in providing the initial source list. However, if one of the peers has a Low ID, the server may relay the connection.

### Chunks

To protect data integrity and enable parallel downloading, every file is divided into **chunks** of exactly **9,728,000 bytes (9.28 MB)**. For example:

- A 15 MB file → 2 chunks (9.28 MB + 5.72 MB)
- A 315 KB file → 1 chunk
- A 100 MB file → 11 chunks (10 × 9.28 MB + 7.2 MB)

Each chunk has its own **MD4 hash**. A client only needs to re-download a corrupt chunk, not the entire file. The integrity system is further strengthened by [AICH](aich.md).

Clients upload **one chunk at a time** to a given peer. Even if a remote client is at the top of two separate file queues for the same uploader, only one upload slot is granted at a time.

## Servers

### Role of the Server

When you connect to a server, it provides:

- **Search results** — the server returns up to **300 matching results** per query.
- **Source lists** — a list of IP addresses of clients sharing a specific file.
- **Low ID relaying** — if your client has a [Low ID](#high-id-and-low-id), the server relays connections on your behalf.

Once your client has received sources from the server, file data flows directly between clients. The server is no longer involved in the transfer.

Most servers are interconnected, allowing **global searches** that query all connected servers simultaneously.

### Server List

The **server list** (`server.met`) is a file containing the IP address, port, and name of each known server your client can connect to. aMule maintains a priority order and attempts to connect to servers in that order.

See [Server List file](../../developer/file-formats/server-met.md) for the file format details.

### Static Servers

A **static server** is one that is permanently kept in your server list and never automatically removed, even if it becomes unreachable. This is useful for servers you trust and want to ensure are always available.

Configure static servers in **Preferences → Server → Static servers** or by editing the `staticservers.dat` file.

### Avoiding Fake Servers

Some servers in the wild are operated by organisations that log user activity or serve fake search results. It is strongly recommended to maintain a curated, trusted server list. See [Fake servers and safe server list management](servers.md#fake-servers) for a detailed guide.

## High ID and Low ID

Every client on the eD2k network is assigned a unique **ID** by the server it connects to. Clients whose Standard Client TCP port (default: 4662) is reachable from the internet receive a **High ID** and can accept direct incoming connections from any peer. Clients with a blocked TCP port receive a **Low ID** (any value below 16,777,216); two Low ID clients cannot transfer data to each other, and many servers reject Low ID clients entirely.

For the full explanation of the ID system, how to calculate your High ID, how to configure your firewall and router to get a High ID, and how the Kademlia "open/firewalled" status relates to this, see **[High ID and Low ID](../high-id-low-id.md)**.

## Ports

aMule uses three configurable ports (all in **Preferences → Connection**) and two fixed service ports:

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| 4661 | TCP | Outgoing | eD2k server listening port (server-side only) |
| **4662** | TCP | Incoming + Outgoing | **Primary data port** — client-to-client transfers. Must be open for High ID. |
| 4665 | UDP | Incoming + Outgoing | Global searches, source queries, Kademlia. Always TCP port + 3. |
| 4672 | UDP | Incoming + Outgoing | eMule protocol extensions, queue rating, Kademlia. Required for Kad "open" status. |
| 4711 | TCP | Incoming | [`amuleweb`](../../manual/interfaces/amuleweb.md) listening port |
| 4712 | TCP | Incoming | [External Connections (EC)](../../developer/ec-protocol.md) port — for [`amulecmd`](../../manual/interfaces/amulecmd.md), [`amulegui`](../../manual/interfaces/gui/amulegui.md) |

For details on each port, per-network requirements, and how to forward ports on your router, see **[High ID and Low ID → Ports used by aMule](../high-id-low-id.md#ports-used-by-amule)**.

### Auxiliary Server Ports

Some servers listen on **additional ports** beyond the standard 4661, because certain ISPs block 4661. For example, Razorback 2 historically also listened on port 80.

To connect to a server via an auxiliary port:

1. Make sure the server is **not already in your server list** (duplicates cause blacklisting).
2. In the **Add Server** dialog above the server list, enter the IP and the auxiliary port (e.g. `195.245.244.243:80`).
3. Right-click the newly added server and choose **Connect**.
4. The server list will then show `4661 (80)`, meaning you are connected on port 80 but the advertised standard port is 4661.

A client must be auxiliary-port-aware to use this feature. aMule has supported auxiliary server ports since version **2.0.0**. An auxiliary-port-capable client must **advertise the standard port** (4661), not the auxiliary port, to other clients.

## Network Limitations

### Search results cap

Servers return a maximum of **300 results** per search query. There is no way to retrieve more from a single query; try narrowing your search terms.

### File size limit

The maximum file size supported by the eD2k network is **256 GB** (274,877,906,944 bytes). Older client versions (eMule ≤ 0.46, aMule 2.1.x) had a limit of approximately 4 GB (4,294,967,295 bytes).

### Filename length

File names are generally limited to **161 characters** on the eD2k network.

### Upload/download ratio enforcement

The eD2k network enforces a minimum upload contribution:

| Upload limit | Maximum download rate |
|---|---|
| 0–3.99 KB/s | Upload limit × 3 |
| 4–9.99 KB/s | Upload limit × 4 |
| ≥ 10 KB/s | No restriction |

This enforcement is implemented in the client software. It can be bypassed by modifying the client, but doing so typically results in being banned by servers.

Additionally, no client can allocate fewer than **3 upload slots**, meaning the minimum per-slot rate is `upload_limit / 3` KB/s.

### Low ID limitations

Two clients with Low IDs **cannot exchange data** with each other. For a Low ID client, "available sources" means only High ID sources. This significantly reduces download throughput.

## Credits and Scoring

The upload queue priority is determined by a **score** value:

```
score = rate × time_waiting_in_seconds / 100
```

The **rate** starts at 100 for every queued client and is modified by:

| Modifier | Factor |
|---|---|
| Credits accumulated | × 1 to × 10 |
| File priority: Release | × 1.8 |
| File priority: High | × 0.9 |
| File priority: Normal | × 0.7 |
| File priority: Low | × 0.6 |
| File priority: Very Low | × 0.2 |
| Old/abusive clients | × 0.5 |
| Banned clients | × 0 |

Clients with a modifier above 1 are shown in yellow in the queue icon.

**Credits** are earned when another client uploads to you. They are bilateral (per-client-pair) and not global. The credits modifier is:

```
modifier = min(
    (upload_total × 2) / download_total,
    sqrt(upload_total + 2)
)
```

where totals are in MB. The modifier is clamped to the range [1, 10]. Credits are stored in [`clients.met`](../../developer/file-formats/clients-met.md).

See [Concepts & Glossary](../concepts.md) for detailed definitions of queue, queue rank, and slots.
