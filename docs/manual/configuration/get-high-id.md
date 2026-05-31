---
id: get-high-id
title: Getting a High ID
---

A **High ID** means your TCP port (default 4662) is reachable from the internet, so any peer can connect to you directly. A **Low ID** means it is not — two Low ID clients cannot exchange data, and many servers reject Low ID clients, resulting in lower transfer speeds.

To get a High ID you need to forward three ports to your machine:

| Port | Protocol | Default |
|---|---|---|
| Standard client TCP port | TCP | 4662 |
| Extended client UDP port | UDP | 4672 |
| Extended server requests UDP port | UDP | 4665 (always TCP + 3) |

For a full explanation of the ID system, step-by-step port forwarding instructions, firewall configuration, and Kademlia connectivity requirements, see **[High ID and Low ID](../../p2p-networks/high-id-low-id.md)**.
