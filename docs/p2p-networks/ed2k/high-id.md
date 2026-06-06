---
id: high-id
title: High ID and Low ID
---

In the eD2k network, every client is assigned a numeric **ID** by the server it connects to. This ID determines whether the client can accept incoming connections from other peers. The distinction between **High ID** and **Low ID** is one of the most fundamental concepts in the eD2k network, and it has a direct impact on download performance and which other clients you can exchange data with.

:::note Concept vs. configuration
This page describes the **eD2k protocol concept**. For the practical steps to actually obtain a High ID — port numbers, firewall and router configuration, testing and troubleshooting — see **[Network Connectivity](../../manual/configuration/network-connectivity.md)** in the User Manual. The equivalent connectivity status on the Kademlia network is **open / firewalled**, described in **[Kademlia Network](../kademlia.md)**.
:::

## What is a Client ID?

When a client successfully connects to an eD2k server, the server assigns it a **unique numeric ID** for that session. This ID:

- Identifies the client to that specific server only — it is **not global** across all servers.
- Is reassigned every time the client reconnects to a server.
- Determines whether the client is reachable by other peers without server assistance.

Two categories of ID exist: **High ID** and **Low ID**.

## High ID

A client receives a **High ID** when its **Standard Client TCP port** (default: 4662) is reachable from the internet — that is, no NAT router or firewall is blocking incoming connections to that port.

### Value

The High ID is not an arbitrary number: it is derived directly from the client's public IP address using the following formula:

```
High ID = A + 256·B + 256²·C + 256³·D
          where the client's IP address is A.B.C.D
```

For example, IP `80.12.34.56` produces:

```
80 + (12 × 256) + (34 × 65,536) + (56 × 16,777,216) = 939,851,344
```

Any ID value **at or above 16,777,216** (16 million) is a High ID.

### Benefits

- **Full peer-to-peer connectivity.** Clients with High ID can accept incoming connections from any other client — both High ID and Low ID.
- **Direct transfers.** Two High ID clients connect directly to each other without server involvement.
- **No server restrictions.** Many large eD2k servers refuse connections from Low ID clients to reduce their own relay load; having a High ID avoids this.
- **Full source availability.** A High ID client sees all sources (both High ID and Low ID) as "available sources" for download.

## Low ID

A client receives a **Low ID** when its Standard Client TCP port is blocked by a NAT router or firewall, so that other clients cannot initiate connections to it. Any ID value **below 16,777,216** (16 million) is a Low ID.

Low IDs are typically small numbers assigned incrementally by the server — they carry no information about the client's IP address.

### Consequences

- **Cannot accept direct incoming connections.** The server must relay connection setup on behalf of the Low ID client.
- **Two Low ID clients cannot transfer data to each other.** A direct connection between two Low ID peers is impossible. Transferring data between them would require both to relay through the server simultaneously — a model eD2k servers do not support.
- **Reduced available sources.** For a Low ID client, only **High ID peers** count as "available sources". Low ID sources exist in the source list, but the Low ID client cannot initiate a connection to them.
- **Server rejection.** Many large servers reject Low ID clients outright to reduce relay overhead. This further limits which servers you can use.
- **Lower effective download speed.** Because only High ID peers can upload to a Low ID client (and the connection must be relayed through the server initially), download throughput is significantly reduced compared to High ID.

> It is **strongly recommended** to obtain a High ID whenever possible. See [Network Connectivity](../../manual/configuration/network-connectivity.md) for how to do it.

### The 16,777,216 threshold

The threshold `16,777,216 = 256³` is the smallest possible High ID value, corresponding to the IP `1.0.0.0`. Any ID below this value cannot represent a real IP address and is therefore treated as a Low ID.

## Summary

| Aspect | High ID | Low ID |
|---|---|---|
| ID value | ≥ 16,777,216 | < 16,777,216 |
| ID derivation | A + 256B + 256²C + 256³D (from public IP) | Small number assigned by server |
| Standard client TCP port | Reachable from internet | Blocked by NAT or firewall |
| Incoming connections | Accepted from any peer | Not possible; server relays |
| Transfer with another Low ID | Yes | **No** |
| Server acceptance | All servers | Many servers reject Low ID |
| Available download sources | All peers (High + Low ID) | High ID peers only |

## Related Pages

- [eD2k Network](index.md) — network architecture, servers, file limits
- [Network Connectivity](../../manual/configuration/network-connectivity.md) — how to obtain a High ID (ports, firewall, router, troubleshooting)
- [Kademlia Network](../kademlia.md) — the serverless counterpart, with its own open / firewalled status
- [Concepts & Glossary](../concepts.md) — all eD2k/Kademlia technical terms defined
- [FAQ: Network and Connectivity](../../manual/faq.md#network-and-connectivity) — common questions about networks, ports and IDs
