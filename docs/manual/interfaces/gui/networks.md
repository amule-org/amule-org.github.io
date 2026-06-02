---
id: networks
title: Networks
---

The Networks window manages your connections to the [eD2k](../../../p2p-networks/ed2k/index.md) and [Kademlia](../../../p2p-networks/kademlia.md) networks. It is the first thing you see when aMule starts.

## Overview

The window is split into two panels separated by a draggable divider:

- **Upper panel** — a tabbed notebook with two tabs: **[ED2K](#ed2k)** and **[Kad](#kademlia-kad)**.
- **Lower panel** — a tabbed notebook with four tabs: **[aMule Log](#amule-log)**, **[Server Info](#server-info)**, **[ED2K Info](#ed2k-info)**, and **[Kad Info](#kad-info)**.

![The Networks window](/img/docs/gui_networks/networks.png)

## ED2K

The ED2K tab manages your connection to the eDonkey server network.

![The ED2K tab](/img/docs/gui_networks/networks_upper_ed2k.png)

### Connecting

Click the **[Connect](./toolbar.md#connect--disconnect)** button in the main aMule toolbar to connect to any server in the list. This is the same button that connects to Kad: it connects to both eD2k and Kademlia at once when both networks are enabled in Preferences. aMule tries each server in priority order — High, then Normal, then Low — until a connection is established.

To connect to a specific server instead, double-click its row in the server list. aMule disconnects from the current server first if necessary.

To disconnect, click the **Disconnect** button to stop an active connection or cancel an ongoing connection attempt.

### Updating the Server List from a URL

The URL field at the top of the ED2K tab contains the address of a remote [`server.met`](../../configuration/config-files/index.md#servermet) file. Click **Update** (or press **Enter** while the URL field is focused) to download a fresh list of servers from that address.

aMule pre-populates this field with a known working URL on first run and remembers whatever you last entered.

:::note
You only need to update the server list occasionally. Once you have a populated list, aMule keeps track of which servers are reachable.
:::

### Adding a Server Manually

Fill in the **Name** (optional), **Address** (IP or hostname), and **Port** fields, then click **Add**. When a new server is added the fields clear automatically. If the server address is already in the list, the existing entry's name is updated instead and the fields are left unchanged.

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

![The ED2K server context menu](/img/docs/gui_networks/networks_upper_ed2k_menu.png)

| Option | Action |
|---|---|
| **Connect to server** / **Reconnect to server** | Connect directly to the selected server |
| **Priority → Low / Normal / High** | Set the connection priority for the selected server(s) |
| **Mark server as static** | Prevent the server from being removed during automatic list cleanup |
| **Mark server as non-static** | Remove the static protection |
| **Remove server** / **Remove servers** | Delete the selected server(s) from the list |
| **Remove all servers** | Delete every server from the list |
| **Copy eD2k link to clipboard** / **Copy eD2k links to clipboard** | Copy the server's [`ed2k://` link](../../../p2p-networks/ed2k/links.md) as plain text |

You can also press the **[Delete](./shortcuts.md#keyboard-shortcuts)** key to remove the currently selected server(s) without opening the context menu.

:::note
You cannot remove the server you are currently connected to. Disconnect first.
:::

Static servers are never removed during automatic list cleanup. Mark your preferred servers as static to ensure they remain in your list across restarts.

## Kademlia (Kad)

The Kad tab manages your connection to the Kademlia distributed network. Unlike ED2K, Kad does not rely on centralised servers.

![The Kad tab](/img/docs/gui_networks/networks_upper_kad.png)

### Connecting

Click **Bootstrap from known clients** to connect to the Kademlia network using the node list already stored on disk ([`nodes.dat`](../../configuration/config-files/index.md#nodesdat)). This is the standard way to start Kad.

Alternatively, clicking the **[Connect](./toolbar.md#connect--disconnect)** button on the main aMule toolbar connects to both ED2K and Kad simultaneously (if both are enabled in Preferences).

To disconnect, click **Disconnect Kad** to stop the Kademlia connection. You can reconnect at any time using **Bootstrap from known clients**.

### Updating the Nodes List from a URL

The URL field contains the address of a remote [`nodes.dat`](../../configuration/config-files/index.md#nodesdat) file. Click **Update** (or press **Enter** in the URL field) to download a fresh list.

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

The graph auto-scales upward as the node count grows. A **Nodes (N)** label above the graph shows the current number of known Kad nodes at a glance.

### Bootstrapping from a Specific Node

If you know the IP address and port of a Kad node, enter it in the four IP octet fields and the Port field, then click **Connect**. The **Connect** button is enabled only when all five fields contain a value.

## Log and Information Panels

The lower panel contains four tabs with live status information.

### aMule Log

A scrollable log of all application events: connections, downloads, errors, and internal messages. Click **Reset** to clear the log.

![The aMule Log tab](/img/docs/gui_networks/networks_lower_amule_logs.png)

### Server Info

A scrollable log of eD2k server events: connection attempts, server messages, and status updates. Click **Reset** to clear the log.

![The Server Info tab](/img/docs/gui_networks/networks_lower_server_info.png)

### ED2K Info

Live eD2k connection details:

![The ED2K Info tab](/img/docs/gui_networks/networks_lower_ed2k_info.png)

| Field | Value |
|---|---|
| **eD2k Status** | `Connected` or `Not Connected` |
| **IP:Port** | Your external IP address and TCP port (when HighID), or `Server` (when LowID) |
| **ID** | Your numeric eD2k user ID |
| *(blank label)* | `HighID` or `LowID` |

A **HighID** means your ports are reachable from the internet and you have full connectivity. A **LowID** means you are behind a firewall or NAT and other clients cannot connect to you directly, which significantly reduces transfer performance. See [High ID and Low ID](../../configuration/get-high-id.md) for how to fix this.

### Kad Info

Live Kademlia connection details (shown only when Kad is running):

![The Kad Info tab](/img/docs/gui_networks/networks_lower_kad_info.png)

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

The **Firewalled state** row only appears when Kad is connected **and** at least one of your ports (TCP or UDP) is firewalled. If both *Connection State* and *UDP Connection State* show `OK`, this row is not shown at all — that is the normal, healthy case.

When a port is firewalled, aMule attempts to find a *buddy* — another Kad node that relays incoming connections on your behalf. The row then reflects the current buddy status:

| Value | Meaning |
|---|---|
| `No buddy required - TCP port open` / `No buddy required - UDP port open` | Only one of the two ports is firewalled, so no buddy is needed |
| `No buddy` | A buddy is needed but none has been found yet |
| `Connecting to buddy` | aMule is establishing a buddy connection |
| `Connected to buddy at <IP:Port>` | A buddy is connected and relaying for you |

:::tip
For the best Kad performance, both TCP and UDP ports should show `OK`. If either shows `Firewalled`, open and forward the indicated port in your router or firewall.
:::
