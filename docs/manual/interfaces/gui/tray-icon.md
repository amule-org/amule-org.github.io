---
id: tray-icon
title: System Tray Icon
---

The system tray icon (also called the notification-area icon or systray icon) gives you quick access to aMule's status and basic controls without opening the [main window](./amule.md).

![System tray icon](/img/docs/usage/window_systray1.jpg)

:::note Platform differences
The exact menu and behaviour depend on your platform and desktop environment. On Windows, macOS and X11 desktops that still support the classic notification area, aMule uses the native tray icon described below. On modern Linux desktops — GNOME with the AppIndicators extension, KDE Plasma, and Wayland compositors such as Sway — aMule uses a **StatusNotifierItem** indicator instead, which offers a smaller menu and no per-icon speed bar or hover tooltip. The differences are noted in each section.
:::

## Mouse Clicks

| Action | Effect |
|---|---|
| **Single left-click** (Windows only) | Raise (show) or hide the main aMule window |
| **Double-click** | Raise (show) or hide the main aMule window |
| **Right-click** | Open the context menu (described below) |

## Context Menu

Right-clicking the tray icon opens a menu. The items below describe the native tray menu (Windows, macOS and X11). The [modern Linux indicator](#modern-linux-statusnotifieritem-menu) shows a reduced version of this menu.

| Item | Description |
|---|---|
| **aMule version** | First item; displays the running aMule version |
| **Speed Limits** | Current upload (UL) and download (DL) [speed limits](./preferences.md#bandwidth-limits) |
| **Download Speed** | Currently active download speed |
| **Upload Speed** | Currently active upload speed |
| **Client Information** | |
| ↳ **Nickname** | Your username |
| ↳ **ClientID** | Your [client ID](../../../p2p-networks/ed2k/high-id.md#what-is-a-client-id) on the server |
| ↳ **ServerName** | Name of the [eD2k server](../../../p2p-networks/ed2k/servers.md) you are connected to |
| ↳ **ServerIP** | IP address of the server you are connected to |
| ↳ **IP** | Your external IP address (if known) |
| ↳ **TCP Port** | Your standard client [TCP port](../../configuration/network-connectivity.md#ports-used-by-amule) |
| ↳ **UDP Port** | Your extended client [UDP port](../../configuration/network-connectivity.md#ports-used-by-amule) |
| ↳ **Online Signature** | Whether the [online signature](./preferences.md#online-signature) feature is enabled |
| ↳ **Uptime** | How long aMule has been running |
| ↳ **Shared Files** | Number of [files you are sharing](./shared-files.md) |
| ↳ **Queued Clients** | Number of clients currently waiting in your upload queue |
| ↳ **Total DL** | Total data downloaded ever |
| ↳ **Total UL** | Total data uploaded ever |
| **Upload Limit** | Set the upload [speed limit](./preferences.md#bandwidth-limits) |
| **Download Limit** | Set the download [speed limit](./preferences.md#bandwidth-limits) |
| **Disconnect** | Disconnect from all [networks](./networks.md) |
| **Connect** | Connect to all allowed [networks](./networks.md) |
| **Show aMule** | Raise the [main aMule window](./amule.md) |
| **Hide aMule** | Hide the main aMule window |
| **Exit** | Close aMule |

### Modern Linux (StatusNotifierItem) menu

On modern Linux desktops aMule uses a StatusNotifierItem indicator with a leaner menu. To keep the menu static between connection changes (avoiding flicker), it omits the continuously-updating values and shows only:

| Item | Description |
|---|---|
| **aMule version** | First item; displays the running aMule version |
| **Client Information** | |
| ↳ **eD2k** | [eD2k](../../../p2p-networks/ed2k/index.md) status: `Connected (HighID)`, `Connected (LowID)` or `Disconnected` |
| ↳ **Kad** | [Kademlia](../../../p2p-networks/kademlia.md) status: `Connected`, `Connected (firewalled)` or `Disconnected` (see [open vs firewalled](../../configuration/network-connectivity.md#kademlia-connectivity-open-vs-firewalled)) |
| ↳ **Server** | Name of the server you are connected to |
| ↳ **Server IP** | IP address of the server you are connected to |
| ↳ **IP** | Your external IP address (if known) |
| ↳ **TCP port** | Your standard client TCP port |
| ↳ **UDP port** | Your extended client UDP port |
| **Upload limit** | Set the upload speed limit |
| **Download limit** | Set the download speed limit |
| **Connect** / **Disconnect** | Connect to or disconnect from all networks |
| **Show aMule** / **Hide aMule** | Raise or hide the main aMule window |
| **Exit** | Close aMule |

Compared with the native menu, this version drops the live speed-limit and speed lines at the top, and the Client Information submenu does not include Nickname, ClientID, Online Signature, Uptime, Shared Files, Queued Clients or the total download/upload counters. Those live values are available in the main aMule window.

On Wayland sessions, where aMule cannot reliably detect whether the window has been minimised, the show/hide toggle is replaced by two separate **Show aMule** and **Hide aMule** entries.

## Icon Appearance

The tray icon changes to reflect aMule's current connection status and activity.

:::note
The speed bar described below applies only to the native tray icon. The [modern Linux indicator](#modern-linux-statusnotifieritem-menu) uses a static icon for each connection state and does not draw a speed bar.
:::

### Speed Bar

A vertical bar on the right side of the icon shows the **current download speed as a percentage** of the maximum download rate configured for the [graphs in Preferences](./preferences.md#graphs):

![Speed bar on tray icon](/img/docs/usage/window_systray3.jpg)

The higher the bar, the closer to that configured maximum.

### Mule Head Colour

The mule head in the icon indicates the overall connection status:

| Icon | Meaning |
|---|---|
| ![Not connected](/img/docs/usage/window_systray4.jpg) | Not connected to any network |
| ![Low ID](/img/docs/usage/window_systray5.jpg) | Connected to eD2k with a [Low ID](../../../p2p-networks/ed2k/high-id.md) |
| ![High ID](/img/docs/usage/window_systray6.jpg) | Connected with a [High ID](../../../p2p-networks/ed2k/high-id.md) (also shown when connected only to [Kademlia](../../../p2p-networks/kademlia.md)) |

## Tooltip

Hovering over the tray icon for a few seconds shows a tooltip:

![Tray icon tooltip](/img/docs/usage/window_systray2.jpg)

The tooltip has this format:

```
aMule (Up: <upload speed> | Down: <download speed> | <status>)
```

Where `<status>` is either **Connected** or **Disconnected**. If the *show overhead* option is enabled in [Preferences](./preferences.md), each speed is followed by its protocol-overhead rate in parentheses.

:::note
The [modern Linux indicator](#modern-linux-statusnotifieritem-menu) does not show this tooltip on hover; the same text is exposed as the indicator's accessible title instead (picked up by screen readers and some desktops' hover popups).
:::
