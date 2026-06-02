---
id: network-connectivity
title: Network Connectivity
---

Your connectivity status determines how well aMule can exchange data with other peers. The two networks aMule uses express this status differently:

- On **[eD2k](../../p2p-networks/ed2k/index.md)**, you get a **[High ID](../../p2p-networks/ed2k/high-id.md)** when your TCP port is reachable from the internet, or a **Low ID** when it is not. A Low ID means many servers reject you, two Low ID clients cannot exchange data, and download speeds are reduced.
- On **[Kademlia](../../p2p-networks/kademlia.md)**, the equivalent status is **open** (UDP port reachable) or **firewalled** (blocked or remapped). The two statuses are **independent** — you can have a High ID on eD2k but still be firewalled on Kad.

This page explains the practical steps to make your ports reachable so you get a High ID on eD2k and an open status on Kademlia.

## Ports used by aMule

aMule uses three ports to communicate with other clients and servers. All three can be changed in **Preferences → Connection**.

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| **4662** (configurable) | TCP | Incoming + Outgoing | **Primary data port.** Client-to-client transfers, identification, file requests. **Must be open for High ID.** |
| **4665** (= TCP port + 3) | UDP | Incoming + Outgoing | **eD2k server UDP port.** Extended server searches and global source queries sent to eD2k servers. Recommended for extended stats on eD2k. |
| **4672** (configurable) | UDP | Incoming + Outgoing | Extended eMule protocol, queue rating, file re-ask ping, and **Kademlia**. Required for Kademlia "open" status. |

Additionally:

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| 4661 | TCP | Outgoing only | Conventional eD2k server listening port. aMule connects to whatever port each [server](../../p2p-networks/ed2k/servers.md) in the server list defines — it is not hardcoded in aMule nor client-configurable. |
| 4711 | TCP | Incoming | [`amuleweb`](../interfaces/amuleweb.md) web interface. |
| 4712 | TCP | Incoming | [External Connections (EC)](../../developer/ec-protocol.md) — used by [`amulecmd`](../interfaces/amulecmd.md) and [`amulegui`](../interfaces/gui/amulegui.md). |

### Minimum port requirements by network

The minimum requirements to avoid connectivity penalties differ for each network:

**eD2k network:**
- TCP port 4662 open → **High ID** (and full peer connectivity).
- UDP port 4665 open → recommended: provides extended file statistics and global searches. Not required for High ID.
- You can still connect to eD2k with no ports open, but you will receive a Low ID and have significantly reduced download performance.

**Kademlia network:**
- TCP port 4662 **and** UDP port 4672 both open → Kademlia status **"open"** (full participation).
- If either is blocked, Kad reports **"firewalled"** for that side — you stay connected and can still download, just with reduced efficiency.

See [Kademlia connectivity](#kademlia-connectivity-open-vs-firewalled) below for what "open" and "firewalled" mean and how the *buddy* relay works.

## Step 1 — Identify your ports

1. Start aMule and open **[Preferences → Connection](../interfaces/gui/preferences.md#connection)**.
2. Note the value in the **Standard client TCP Port** field (default: `4662`).
3. Note the value in the **Extended client UDP Port** field (default: TCP + 3 = `4665`).
4. The Kad UDP port (`4672`) is shown separately in the **Preferences → Connection** page.
5. Ensure the **"Extended UDP port (Kad / global search)"** checkbox is **ticked** — if it is unchecked, the UDP port (`4672`) is disabled and Kademlia cannot reach "open" status.

You can verify whether a port is reachable from outside your network using an online port checker (see [Testing your port status](#testing-your-port-status) below). A **closed** result means incoming connections to that port are being blocked — either by a firewall, a router doing NAT, or both.

## Step 2 — Open the ports in your firewall

If a firewall is running on your machine (for example, `iptables` on Linux, `pf` on BSD, or the Windows Firewall), you need to add rules that allow incoming connections on the three aMule ports.

If you do not administer your own firewall (e.g. corporate or university network), contact your network administrator.

For detailed per-distribution firewall instructions, see the [Firewall and Router Configuration](./firewall.md) page.

## Step 3 — Forward the ports on your router (NAT)

If your machine is behind a NAT router (the most common scenario for home users), the router must be configured to **forward** the aMule ports to your machine's local IP address.

**General procedure:**

1. **Assign a fixed local IP address to your machine.** By default most routers assign IPs via DHCP, which can change. Either:
   - Configure a DHCP reservation in your router (assign a fixed IP to your machine's MAC address), or
   - Configure a static IP in your operating system's network settings (edit `/etc/network/interfaces` on Debian/Ubuntu or the equivalent for your OS).

2. **Access your router's configuration interface.** Most home routers are reachable at `http://192.168.1.1` or `http://192.168.0.1` in your browser. Your ISP's helpdesk can confirm the address if you are unsure.

3. **Find the port forwarding section.** Depending on your router model it may be labelled "Port Forwarding", "NAT", "Virtual Servers", "LAN Configuration", or "Firewall/Security".

4. **Add forwarding rules** for:
   - TCP port 4662 → your machine's local IP
   - UDP port 4665 → your machine's local IP (recommended)
   - UDP port 4672 → your machine's local IP (required for Kademlia)

5. **Save and apply.** You may need to restart the router.

> **Resources:**
> - The [Firewall and Router Configuration](./firewall.md) page contains step-by-step instructions for specific Linux distributions, BSD, and consumer router brands.
> - [portforward.com](http://portforward.com/) provides walkthroughs for hundreds of router models.
> - aMule supports [UPnP](./upnp.md), which can configure the router ports automatically if your router supports it.

## Kademlia connectivity (open vs firewalled)

[Kademlia](../../p2p-networks/kademlia.md) uses **"open"** and **"firewalled"** instead of [High ID / Low ID](../../p2p-networks/ed2k/high-id.md). Kad tracks the TCP port (4662) and the UDP port (4672) as **separate** states — the GUI shows them as **Connection State** (TCP) and **UDP Connection State** (UDP) in the [Kad Info panel](../interfaces/gui/networks.md#kad-info):

| Status | Meaning |
|---|---|
| **Open** | Both TCP 4662 and UDP 4672 are reachable. Full Kademlia participation as both a query target and a direct source. |
| **Firewalled** | At least one of the two ports is blocked or remapped. You remain connected to Kademlia and can still download, but participation is reduced: incoming connections are relayed through a *buddy* instead of reaching you directly. |

When a port is firewalled, aMule looks for a **buddy** — an open Kad node that relays incoming connections (callbacks) on your behalf, so you stay reachable as a source even while firewalled. The buddy status is shown in the [Kad Info panel](../interfaces/gui/networks.md#kad-info), and the concept is explained in detail in [Kademlia → Open vs. Firewalled Status](../../p2p-networks/kademlia.md#open-vs-firewalled-status).

### NAT remapping of UDP 4672

Some NAT routers perform **port remapping**: they change the source port of outgoing UDP packets to a different number. If your router remaps the source port of UDP packets sent from port 4672, other Kademlia nodes cannot reply to the correct port. The result is Kademlia reporting **"firewalled"** even when your TCP port is open and you have a High ID on eD2k.

aMule already tries to cope with this automatically: it asks several Kad nodes which source port they see, and if they agree on a remapped external port it uses that for its firewall check (preferring the internal port whenever a directly forwarded one is confirmed). The manual workaround below is for the cases where this automatic detection is not enough — typically when the router assigns an *unstable* external port that changes between packets.

**Workaround:**

1. Choose a non-default port number `n` such that `80 < n < 65530` (some values known to work: `4811`, `9870`).
2. In **[Preferences → Connection](../interfaces/gui/preferences.md#connection)**, set the Standard client TCP port to `n`.
3. Forward the following three ports on your router:
   - TCP port `n` (instead of 4662)
   - UDP port `n + 3` (instead of 4665)
   - UDP port 4672
4. In **[Networks → Kad](../interfaces/gui/networks.md#kademlia-kad)**, update the node list and wait approximately 5 minutes.
5. If Kademlia is still "firewalled", try a different value of `n`.

This often works because changing the TCP port also changes how the router handles the associated UDP traffic, which can stop it from remapping the source port.

## Testing your port status

Use one of these online port checkers to verify that your ports are reachable from the internet:

- [https://portcheck.ing/](https://portcheck.ing/)
- [https://portchecker.co/](https://portchecker.co/)

Enter each port number and run the check. These tools test generic **TCP** reachability — the most important check is your TCP port `4662` (or your configured TCP port), since that is what determines a High ID on eD2k. The results mean:

| Result | Meaning |
|---|---|
| **Open** | The port is reachable. With TCP 4662 open you should get a High ID on eD2k. |
| **Closed** | The port is blocked by a firewall or not forwarded by your router. You will receive a Low ID. |

UDP reachability (UDP `4672` for Kademlia, UDP `4665` for eD2k extended queries) is not reliably reported by generic port checkers, since UDP is connectionless. If TCP 4662 tests as open but Kademlia still shows "firewalled", see the [Troubleshooting](#troubleshooting) section below.

If port 4662 TCP shows "open" but you still receive a Low ID after connecting, the server you connected to may be overloaded or misconfigured — this is rare but possible. Try connecting to a different server.

## Troubleshooting

### Low ID despite port 4662 being open

- **Server overloaded or misconfigured.** Some servers issue Low IDs to all new connections when under heavy load. Disconnect and reconnect to a different server.
- **ISP filtering port 4662.** Some internet service providers block port 4662 on their network. Change your TCP port to a non-standard value (e.g. something between 1024 and 65535 that is not commonly blocked). Forward the new port on your router.
- **Double NAT.** If your machine is behind two NAT routers (e.g. a home router connected to an ISP's own NAT gateway), port forwarding on your home router alone may not be sufficient. Contact your ISP.
- **Firewall on the machine.** Ensure no local firewall (`iptables`, `ufw`, Windows Firewall, etc.) is blocking the port even after you opened it in the router.

### Kademlia "firewalled" despite High ID

- **NAT remapping UDP 4672** (see [NAT remapping of UDP 4672](#nat-remapping-of-udp-4672) above).
- **UDP port 4672 not forwarded** in your router, even if TCP 4662 is.
- **ISP filtering.** Some ISPs filter both port 4662 and other P2P-associated ports. Changing to a custom port range usually resolves this.

### Two clients both with Low ID cannot transfer

This is a fundamental eD2k protocol limitation. There is no workaround other than getting at least one of the two clients to High ID status.

## Related Pages

- [High ID and Low ID](../../p2p-networks/ed2k/high-id.md) — the eD2k ID system explained
- [Kademlia Network](../../p2p-networks/kademlia.md) — the serverless network and its open / firewalled status
- [Firewall and Router Configuration](./firewall.md) — per-OS and per-router port setup
- [UPnP](./upnp.md) — automatic port forwarding
