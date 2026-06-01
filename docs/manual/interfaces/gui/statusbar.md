---
id: statusbar
title: Status Bar
---

The status bar is located at the bottom of the main aMule window. It gives a continuous at-a-glance summary of the current session: the latest log line, network user and file counts, transfer speeds, and connection status.

![aMule status bar](/img/docs/gui_statusbar/statusbar.png)

## Log

The leftmost section displays the last line printed to the aMule log:

![Status bar log section](/img/docs/gui_statusbar/statusbar_logs.png)

If the line is longer than the available space it is truncated. The **info button** next to the text to shows a tooltip with the complete line when you hover the mouse.

## Users & Files

The second section shows aMule's estimate of the number of users connected to, and files available on, each network it is participating in. When both networks are enabled, the field reads:

![Status bar users & files section](/img/docs/gui_statusbar/statusbar_users_files.png)

```
Users: E: <eD2k> K: <Kad> | Files: E: <eD2k> K: <Kad>
```

where **E:** is the eD2k count and **K:** is the Kademlia count.

- The **eD2k user count** is the estimated number of users on the eD2k network.
- The **Kademlia user count** is the estimated number of users on the Kademlia network.
- The **eD2k file count** is the estimated number of files on the eD2k network.
- The **Kademlia file count** is the estimated number of files on the Kademlia network.

When only one network is enabled, the `E:`/`K:` prefixes are dropped and the field shows a single value for each:

```
Users: <count> | Files: <count>
```

If no network is enabled, the field reads **No networks selected**.

All counts use SI suffixes:

| Letter | Multiplier |
|---|---|
| k | 1,000 |
| M | 1,000,000 |
| G | 1,000,000,000 |
| T | 1,000,000,000,000 |

## Speed

The speed section shows current upload and download bandwidth usage:

![Status bar speed section](/img/docs/gui_statusbar/statusbar_speed.png)

A small **transfer-direction icon** (an upward and a downward arrow) appears first. It indicates current transfer activity and is distinct from the connection-state globe described in the [Globe Icon](#globe-icon) section.

The downward arrow is green when aMule is downloading and red when it is not. The upward arrow is green when aMule is uploading and red when it is not:

| Icon | Meaning |
|---|---|
| ![Not transferring](/img/docs/gui_statusbar/statusbar_icon_transfer_none.png) | Not downloading or uploading |
| ![Downloading only](/img/docs/gui_statusbar/statusbar_icon_transfer_download.png) | Downloading but not uploading |
| ![Uploading only](/img/docs/gui_statusbar/statusbar_icon_transfer_upload.png) | Uploading but not downloading |
| ![Both](/img/docs/gui_statusbar/statusbar_icon_transfer_both.png) | Both downloading and uploading |

To the right of the icon:

- **Up** — current upload speed.
- **Down** — current download speed.

If **"Show overhead bandwidth"** is enabled in [Preferences → Interface](preferences.md#interface), a bracketed number appears alongside each speed value showing the bandwidth consumed by overhead traffic (connection management, pings, protocol control packets):

![Overhead bandwidth display](/img/docs/gui_statusbar/statusbar_speed_overhead.png)

## Networks

The rightmost section shows connection status for both networks. Each status is prefixed with its network name (`eD2k:` and `Kad:`) and the two are joined by a `|` separator:

![Status bar spnetwork section](/img/docs/gui_statusbar/statusbar_networks.png)

For the **eD2k network**, the name (or IP address) of the currently connected server is displayed after the `eD2k:` label.

When not connected, the text reads **eD2k: Disconnected**, or **eD2k: Connecting** while a connection attempt is in progress.

For the **Kademlia network**, the status appears after the `Kad:` label.

| Text | Meaning |
|---|---|
| `Kad: Connected` | Connected |
| `Kad: Firewalled` | Connected but firewalled |
| `Kad: Connecting` | Connection attempt in progress |
| `Kad: Off` | Not connected |

### Globe Icon

The large earth icon in the status bar gives a combined graphical view of the connection state for both networks:

- The **lower-left arrow** represents the eD2k network.
- The **upper-right arrow** represents the Kademlia network.

Arrow colour meanings:

| Colour | Meaning |
|---|---|
| Red | Offline / not connected |
| Orange | Connecting |
| Yellow | Connected but firewalled ([Low ID](../../../p2p-networks/high-id-low-id.md) for eD2k) |
| Green | Connected with [High ID](../../../p2p-networks/high-id-low-id.md) |

All possible globe icons and their combined meanings:

| Icon | eD2k | Kademlia |
|---|---|---|
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_offline_kad_offline.png) | Offline | Offline |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_offline_kad_firewalled.png) | Offline | Connected (firewalled) |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_offline_kad_connected.png) | Offline | Connected |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_connecting_kad_offline.png) | Connecting | Offline |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_connecting_kad_firewalled.png) | Connecting | Connected (firewalled) |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_connecting_kad_connected.png) | Connecting | Connected |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_lowid_kad_offline.png) | Connected ([Low ID](../../../p2p-networks/high-id-low-id.md) / firewalled) | Offline |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_lowid_kad_firewalled.png) | Connected ([Low ID](../../../p2p-networks/high-id-low-id.md) / firewalled) | Connected (firewalled) |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_connected_kad_offline.png) | Connected | Offline |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_connected_kad_firewalled.png) | Connected | Connected (firewalled) |
| ![](/img/docs/gui_statusbar/statusbar_icon_globe_ed2k_connected_kad_connected.png) | Connected | Connected |

:::note
The combination of a yellow eD2k arrow and a green Kademlia arrow does not occur in practice and is not listed above.
:::
