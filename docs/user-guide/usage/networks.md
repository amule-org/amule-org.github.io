---
id: networks
title: Networks
---

The Networks window manages your connections to the [eD2k](../../ed2k/ed2k-network.md) and [Kademlia](../../ed2k/kademlia.md) networks. It is the first thing you see when aMule starts.

## Overview

The window is split into two panels separated by a draggable divider:

- **Upper panel** — a tabbed notebook with two tabs: **ED2K** and **Kad**.
- **Lower panel** — a tabbed notebook with four tabs: **aMule Log**, **Server Info**, **ED2K Info**, and **Kad Info**.

On a fresh installation the server list is empty:

![Empty server list](/img/docs/serverlist_empty.png)

After populating the server list and connecting:

![Connected to an eD2k server](/img/docs/serverlist_ed2k.png)

## ED2K

The ED2K tab manages your connection to the eDonkey server network.

### Connecting

Click the **Connect** button in the toolbar to connect to a random server from the list. aMule tries each server in priority order until a connection is established.

To connect to a specific server instead, double-click its row in the server list.

### Updating the Server List from a URL

The URL field at the top of the ED2K tab contains the address of a remote [`server.met`](../amule-files/server-met.md) file. Click **Update** (or press **Enter** while the URL field is focused) to download a fresh list of servers from that address.

The URL is also configurable in **Preferences → Server**. aMule pre-populates it with a known working URL on first run.

:::note
You only need to update the server list occasionally. Once you have a populated list, aMule keeps track of which servers are reachable.
:::

### Adding a Server Manually

Fill in the **Name** (optional), **Address** (IP or hostname), and **Port** fields, then click **Add**. The fields clear automatically on success. If the server address is already in the list, the existing entry's name is updated instead.

### Disconnecting

Click the **Disconnect** button to stop an active connection or cancel an ongoing connection attempt.

### Server List

Each row in the server list represents one known eD2k server:

| Column | Description |
|---|---|
| **Server Name** | Human-readable name of the server |
| **Address** | IP address or hostname |
| **Port** | TCP port |
| **Description** | Server description (if provided) |
| **Ping** | Round-trip latency in milliseconds |
| **Users** | Number of users currently connected |
| **Files** | Number of files available on the server |
| **Priority** | Connection priority: Low, Normal, or High |
| **Failed** | Number of consecutive failed connection attempts |
| **Static** | Whether the server is marked as static (see below) |
| **Version** | Server software version |
| **TCP Flags** | Supported TCP capabilities |
| **UDP Flags** | Supported UDP capabilities |

The currently connected server is highlighted.

### Right-Click Context Menu

Right-clicking one or more servers opens a context menu:

| Option | Action |
|---|---|
| **Connect to server** / **Reconnect to server** | Connect directly to the selected server |
| **Priority → Low / Normal / High** | Set the connection priority for the selected server(s) |
| **Mark server as static** | Prevent the server from being removed during automatic list cleanup |
| **Mark server as non-static** | Remove the static protection |
| **Remove server** / **Remove servers** | Delete the selected server(s) from the list |
| **Remove all servers** | Delete every server from the list |
| **Copy eD2k link to clipboard** / **Copy eD2k links to clipboard** | Copy the server's `ed2k://` link as plain text |

:::note
You cannot remove the server you are currently connected to. Disconnect first.
:::

Static servers are never removed during automatic list cleanup. Mark your preferred servers as static to ensure they remain in your list across restarts.

## Kademlia (Kad)

The Kad tab manages your connection to the Kademlia distributed network. Unlike ED2K, Kad does not rely on centralised servers.

![Kademlia network tab](/img/docs/serverlist_kad.png)

### Connecting

Click **Bootstrap from known clients** to connect to the Kademlia network using the node list already stored on disk (`nodes.dat`). This is the standard way to start Kad.

Alternatively, clicking the toolbar **Connect** button connects to both ED2K and Kad simultaneously (if both are enabled in Preferences).

### Updating the Nodes List from a URL

The URL field contains the address of a remote [`nodes.dat`](../amule-files/nodes-dat.md) file. Click **Update** (or press **Enter** in the URL field) to download a fresh list.

:::warning
Updating the nodes list removes your current nodes and restarts the Kademlia connection. A confirmation dialog will appear before any changes are made.
:::

You do not need to update the nodes list regularly. aMule keeps `nodes.dat` up to date while it is running. Only update manually if you cannot connect to Kad at all.

### Nodes Stats Graph

The graph displays the number of Kad nodes known to your client over time. Three lines are shown:

| Line | Description |
|---|---|
| **Current** | The node count at each sample point |
| **Running average** | Smoothed average over recent samples |
| **Session average** | Average since aMule started |

The graph auto-scales upward as the node count grows.

### Bootstrapping from a Specific Node

If you know the IP address and port of a Kad node, enter it in the four IP octet fields and the Port field, then click **Connect**. The **Connect** button is enabled only when all five fields contain a value.

### Disconnecting

Click **Disconnect Kad** to stop the Kademlia connection. You can reconnect at any time using **Bootstrap from known clients**.

## Log and Information Panels

The lower panel contains four tabs with live status information.

### aMule Log

A scrollable log of all application events: connections, downloads, errors, and internal messages. Click **Reset** to clear the log.

### Server Info

A scrollable log of eD2k server events: connection attempts, server messages, and status updates. Click **Reset** to clear the log.

### ED2K Info

Live eD2k connection details:

| Field | Value |
|---|---|
| **eD2k Status** | `Connected` or `Not Connected` |
| **IP:Port** | Your external IP address and TCP port (when HighID), or `Server` (when LowID) |
| **ID** | Your numeric eD2k user ID |
| *(blank label)* | `HighID` or `LowID` |

A **HighID** means your ports are reachable from the internet and you have full connectivity. A **LowID** means you are behind a firewall or NAT and other clients cannot connect to you directly, which significantly reduces transfer performance. See [High ID and Low ID](../configuration/get-high-id.md) for how to fix this.

### Kad Info

Live Kademlia connection details (shown only when Kad is running):

| Field | Value |
|---|---|
| **Kademlia Status** | `Running`, `Running in LAN mode`, or `Not running` |
| **Kademlia client ID** | Your 128-bit Kad identity as a hex string |
| **Status** | `Connected` or `Disconnected` |
| **Connection State** | `OK`, or `Firewalled — open TCP port N in your router or firewall` |
| **UDP Connection State** | `OK`, or `Firewalled — open UDP port N in your router or firewall` |
| **Firewalled state** | Buddy connection status (only shown when firewalled) |
| **IP address** | Your external IP address as seen by the Kad network |
| **Indexed sources** | Number of file sources your node is indexing for the network |
| **Indexed keywords** | Number of search keywords your node is indexing |
| **Indexed notes** | Number of file comments your node is indexing |
| **Indexed load** | Total indexing load |
| **Average Users** | Estimated total number of users on the Kad network |
| **Average Files** | Estimated total number of files on the Kad network |

When Kad reports a firewalled state, aMule attempts to find a *buddy* — another Kad node that relays incoming connections on your behalf. The **Firewalled state** row shows whether a buddy is being sought, connecting, or connected, and at which address.

:::tip
For the best Kad performance, both TCP and UDP ports should show `OK`. If either shows `Firewalled`, open and forward the indicated port in your router or firewall.
:::
