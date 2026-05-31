---
id: high-id-low-id
title: High ID and Low ID
---

In the eD2k network, every client is assigned a numeric **ID** by the server it connects to. This ID determines whether the client can accept incoming connections from other peers. The distinction between **High ID** and **Low ID** is one of the most fundamental concepts in the eD2k network, and it has a direct impact on download performance and which other clients you can exchange data with.

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

> It is **strongly recommended** to obtain a High ID whenever possible.

### The 16,777,216 threshold

The threshold `16,777,216 = 256³` is the smallest possible High ID value, corresponding to the IP `1.0.0.0`. Any ID below this value cannot represent a real IP address and is therefore treated as a Low ID.

## How to Get a High ID

Getting a High ID requires making TCP port 4662 (or your configured port) reachable from the internet. There are two common obstacles: a **firewall** on your machine and a **NAT router** between your machine and the internet.

### Ports used by aMule

aMule uses three ports to communicate with other clients and servers. All three can be changed in **Preferences → Connection**.

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| **4662** (configurable) | TCP | Incoming + Outgoing | **Primary data port.** Client-to-client transfers, identification, file requests. **Must be open for High ID.** |
| **4665** (= TCP port + 3) | UDP | Incoming + Outgoing | Extended server searches, global source queries. Recommended for extended stats on eD2k. Also used by Kademlia. |
| **4672** (configurable) | UDP | Incoming + Outgoing | Extended eMule protocol, queue rating, file re-ask ping, and **Kademlia**. Required for Kademlia "open" status. |

Additionally:

| Port | Protocol | Direction | Purpose |
|---|---|---|---|
| 4661 | TCP | Outgoing only | eD2k server listening port (server-defined, not client-configurable). |
| 4711 | TCP | Incoming | [`amuleweb`](../manual/interfaces/amuleweb.md) web interface. |
| 4712 | TCP | Incoming | [External Connections (EC)](../developer/ec-protocol.md) — used by `amulecmd`, `amulegui`. |

#### Minimum port requirements by network

The minimum requirements to avoid connectivity penalties differ for each network:

**eD2k network:**
- TCP port 4662 open → **High ID** (and full peer connectivity).
- UDP port 4665 open → recommended: provides extended file statistics and global searches. Not required for High ID.
- You can still connect to eD2k with no ports open, but you will receive a Low ID and have significantly reduced download performance.

**Kademlia network:**
- Both TCP port 4662 **and** UDP port 4672 must be reachable → Kademlia status: **"open"**.
- If either is blocked, Kademlia status: **"firewalled"** — and you cannot connect to Kademlia at all.
- UDP port 4665 is recommended for additional Kademlia source/file information.

### Step 1 — Identify your ports

1. Start aMule and open **Preferences → Connection**.
2. Note the value in the **Standard client TCP Port** field (default: `4662`).
3. Note the value in the **Extended client UDP Port** field (default: TCP + 3 = `4665`).
4. The Kad UDP port (`4672`) is shown separately in the **Preferences → Connection** page.
5. Ensure the **"Disable"** checkbox is **not** ticked for any of these ports.

You can verify whether a port is reachable from outside your network at the [aMule Test Port page](http://www.amule.org/testport.php). A **"not accessible"** result means incoming connections to that port are being blocked — either by a firewall, a router doing NAT, or both.

### Step 2 — Open the ports in your firewall

If a firewall is running on your machine (for example, `iptables` on Linux, `pf` on BSD, or the Windows Firewall), you need to add rules that allow incoming connections on the three aMule ports.

If you do not administer your own firewall (e.g. corporate or university network), contact your network administrator.

For detailed per-distribution firewall instructions, see the [Firewall configuration](../manual/configuration/index.md) page.

### Step 3 — Forward the ports on your router (NAT)

If your machine is behind a NAT router (the most common scenario for home users), the router must be configured to **forward** the aMule ports to your machine's local IP address.

**General procedure:**

1. **Assign a static local IP address to your machine.** By default most routers assign IPs via DHCP, which can change. Either:
   - Configure a static IP in your operating system's network settings (edit `/etc/network/interfaces` on Debian/Ubuntu or the equivalent for your OS), or
   - Configure a DHCP reservation in your router (assign a fixed IP to your machine's MAC address).

2. **Access your router's configuration interface.** Most home routers are reachable at `http://192.168.1.1` or `http://192.168.0.1` in your browser. Your ISP's helpdesk can confirm the address if you are unsure.

3. **Find the port forwarding section.** Depending on your router model it may be labelled "Port Forwarding", "NAT", "Virtual Servers", "LAN Configuration", or "Firewall/Security".

4. **Add forwarding rules** for:
   - TCP port 4662 → your machine's local IP
   - UDP port 4665 → your machine's local IP (recommended)
   - UDP port 4672 → your machine's local IP (required for Kademlia)

5. **Save and apply.** You may need to restart the router.

> **Resources:**
> - [portforward.com](http://portforward.com/) provides step-by-step walkthroughs for hundreds of router models.
> - The aMule [Firewall](../manual/configuration/index.md) article contains instructions for specific Linux distributions and router brands.

## Kademlia: Open vs Firewalled

The Kademlia (Kad) network uses a similar but independent status system. Instead of High ID / Low ID, it uses **"open"** and **"firewalled"**:

| Status | Meaning |
|---|---|
| **Open** | Both TCP 4662 and UDP 4672 are reachable. Full Kademlia participation. |
| **Firewalled** | At least one of the two required ports is blocked. Cannot connect to Kademlia. |

### Special case: NAT remapping of UDP 4672

Some NAT routers perform **port remapping**: they change the source port of outgoing UDP packets to a different number. If your router remaps the source port of UDP packets sent from port 4672 to a different port number, other Kademlia nodes cannot reply to the correct port. The result is Kademlia reporting **"firewalled"** even when your TCP port is open and working (and you have a High ID on eD2k).

**Workaround:**

1. Choose a non-default port number `n` such that `80 < n < 65530` (some values known to work: `4811`, `9870`).
2. In **Preferences → Connection**, set the Standard client TCP port to `n`.
3. Forward the following three ports on your router:
   - TCP port `n` (instead of 4662)
   - UDP port `n + 3` (instead of 4665)
   - UDP port 4672
4. In **Networks → Kad**, update the node list and wait approximately 5 minutes.
5. If Kademlia is still "firewalled", try a different value of `n`.

The reason this works is that changing the TCP port often also changes how the router handles the associated UDP traffic, preventing remapping.

## Testing Your Port Status

aMule provides a web page to test whether your ports are reachable from the internet:

**[http://www.amule.org/testport.php](http://www.amule.org/testport.php)**

Enter each port number and run the test. The results mean:

| Result | Meaning |
|---|---|
| **Accessible** | The port is open and reachable. You should get a High ID on eD2k (TCP 4662). |
| **Not accessible** | The port is blocked. You will receive a Low ID (if TCP 4662) or be Kad-firewalled (if UDP 4672). |

If port 4662 TCP shows "accessible" but you still receive a Low ID after connecting, the server you connected to may be overloaded or misconfigured — this is rare but possible. Try connecting to a different server.

## Troubleshooting

### Low ID despite port 4662 being open

- **Server overloaded or misconfigured.** Some servers issue Low IDs to all new connections when under heavy load. Disconnect and reconnect to a different server.
- **ISP filtering port 4662.** Some internet service providers block port 4662 on their network. Change your TCP port to a non-standard value (e.g. something between 1024 and 65535 that is not commonly blocked). Forward the new port on your router.
- **Double NAT.** If your machine is behind two NAT routers (e.g. a home router connected to an ISP's own NAT gateway), port forwarding on your home router alone may not be sufficient. Contact your ISP.
- **Firewall on the machine.** Ensure no local firewall (`iptables`, `ufw`, Windows Firewall, etc.) is blocking the port even after you opened it in the router.

### Kademlia "firewalled" despite High ID

- **NAT remapping UDP 4672** (see [Kademlia: Open vs Firewalled](#kademlia-open-vs-firewalled) above).
- **UDP port 4672 not forwarded** in your router, even if TCP 4662 is.
- **ISP filtering.** Some ISPs filter both port 4662 and other P2P-associated ports. Changing to a custom port range usually resolves this.

### Two clients both with Low ID cannot transfer

This is a fundamental eD2k protocol limitation. There is no workaround other than getting at least one of the two clients to High ID status.

## Summary

| Aspect | High ID | Low ID |
|---|---|---|
| TCP port 4662 | Reachable from internet | Blocked by NAT or firewall |
| ID value | ≥ 16,777,216 | < 16,777,216 |
| ID formula | A + 256B + 256²C + 256³D (from IP) | Small number assigned by server |
| Incoming connections | Accepted from any peer | Not possible; server relays |
| Transfer with other Low ID | Yes | **No** |
| Server acceptance | All servers | Many servers reject Low ID |
| Available download sources | All peers (High + Low ID) | High ID peers only |
| Kademlia (requires TCP + UDP 4672) | Can be open | Can be firewalled (independent) |

## Related Pages

- [eD2k Network](ed2k/index.md) — network architecture, servers, file limits
- [Kademlia Network](kademlia.md) — the serverless counterpart to eD2k
- [Firewall configuration](../manual/configuration/index.md) — opening ports for aMule
- [Concepts & Glossary](concepts.md) — all eD2k/Kademlia technical terms defined
- [FAQ: Network & Connectivity](../manual/faq/network.md) — common questions about networks, ports and IDs
