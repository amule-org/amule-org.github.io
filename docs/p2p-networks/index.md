---
id: index
title: eD2k & Kademlia Networks
---

aMule connects simultaneously to two peer-to-peer networks: the classic **[eD2k](ed2k/index.md)** (eDonkey2000) network and the serverless **[Kademlia (Kad)](kademlia.md)** network. Both networks share the same file identification system and can be used together to maximise download sources.

## History

The eD2k protocol was created by the **eDonkey2000** application, a proprietary P2P client that pioneered the network. eDonkey2000 was eventually displaced by open-source alternatives: first **mlDonkey** (Unix-focused), then **eMule** (Windows), which spawned many derivatives including **xMule** and ultimately **aMule** — the cross-platform, open-source implementation.

The eDonkey2000 website was shut down in 2006 following a RIAA lawsuit and the software is no longer maintained. aMule is a completely independent project and is not affiliated with the original eDonkey2000 in any way.

Kademlia was introduced into the \*Mule ecosystem in response to the architectural limitations of the server-based [eD2k network](ed2k/index.md). It is based on the Kademlia algorithm by Petar Maymounkov and David Mazières (New York University, 2002). aMule has supported [Kademlia](kademlia.md) since version **2.1.0**.

## How the Networks Differ

| Feature | eD2k | Kademlia |
|---|---|---|
| Architecture | Client-server | Fully decentralised (DHT) |
| Requires servers | Yes | No |
| Search scope | Server-local or global (all servers) | Distributed across all nodes |
| Connection type | Client connects to a central server | Client bootstraps from any known node |
| ID system | High ID / Low ID assigned by server | Open / Firewalled assigned by network |
| Privacy | Server sees your IP and searches | No central point of observation |
| Scalability | Limited by server capacity | Scales with number of participants |
| Introduced | Original eD2k protocol | aMule 2.1.0 (2006) |

Both networks use the same **MD4-based file hashes** and **9.28 MB chunk** system, so the same files can be downloaded from sources on either network simultaneously.

## In This Section

| Page | Description |
|---|---|
| [eD2k Network](ed2k/index.md) | Architecture, servers, ports, network limitations |
| [eD2k Servers](ed2k/servers.md) | Server software, server list management, static servers, fake servers |
| [eD2k Clients](ed2k/clients.md) | Compatible client applications |
| [eD2k Links](ed2k/links.md) | Link format specification and browser configuration |
| [Kademlia Network](kademlia.md) | DHT algorithm, bootstrapping, contact types, firewalled status |
| [High ID and Low ID](high-id-low-id.md) | Client ID system, getting a High ID, port forwarding, Kademlia open/firewalled |
| [AICH & ICH](ed2k/aich.md) | Advanced Intelligent Corruption Handler and chunk recovery |
| [Secure User Identification](ed2k/secure-user-identification.md) | RSA-based identity and credit system |
| [Concepts & Glossary](concepts.md) | Definitions for all technical terms used in the networks |
| [Other P2P Networks](other-networks.md) | Overview of P2P protocols alternative to eD2k and Kademlia |
