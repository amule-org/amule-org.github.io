---
id: tray-icon
title: System Tray Icon
---

The system tray icon (also called the notification-area icon or systray icon) gives you quick access to aMule's status and basic controls without opening the main window.

![System tray icon](/img/docs/usage/window_systray1.jpg)

## Mouse Clicks

| Action | Effect |
|---|---|
| **Double-click** | Raise (show) or hide the main aMule window |
| **Right-click** | Open the context menu (described below) |

## Context Menu

Right-clicking the tray icon opens a menu with the following items:

| Item | Description |
|---|---|
| **aMule version** | First item; displays the running aMule version |
| **Speed Limits** | Current upload (UL) and download (DL) speed limits |
| **Download Speed** | Currently active download speed |
| **Upload Speed** | Currently active upload speed |
| **Client Information** | |
| ↳ **Nickname** | Your username |
| ↳ **ClientID** | Your client ID on the server |
| ↳ **ServerName** | Name of the server you are connected to |
| ↳ **ServerIP** | IP address of the server you are connected to |
| ↳ **IP** | Your external IP address (if known) |
| ↳ **TCP Port** | Your standard client TCP port |
| ↳ **UDP Port** | Your extended client UDP port |
| ↳ **Online Signature** | Whether the online signature feature is enabled |
| ↳ **Uptime** | How long aMule has been running |
| ↳ **Shared Files** | Number of files you are sharing |
| ↳ **Queued Clients** | Number of clients currently waiting in your upload queue |
| ↳ **Total DL** | Total data downloaded ever |
| ↳ **Total UL** | Total data uploaded ever |
| **Upload Limit** | Set the upload speed limit |
| **Download Limit** | Set the download speed limit |
| **Disconnect** | Disconnect from all networks |
| **Connect** | Connect to all allowed networks |
| **Show aMule** | Raise the main aMule window |
| **Hide aMule** | Hide the main aMule window |
| **Exit** | Close aMule |

## Icon Appearance

The tray icon changes to reflect aMule's current connection status and activity.

### Speed Bar

A vertical bar on the right side of the icon shows the **current download speed as a percentage** of the maximum download bandwidth configured in Preferences:

![Speed bar on tray icon](/img/docs/usage/window_systray3.jpg)

The higher the bar, the closer to the configured maximum download speed.

### Mule Head Colour

The mule head in the icon indicates the overall connection status:

| Icon | Meaning |
|---|---|
| ![Not connected](/img/docs/usage/window_systray4.jpg) | Not connected to any network |
| ![Low ID](/img/docs/usage/window_systray5.jpg) | Connected to one or more networks, but all connections have [Low ID](../../../p2p-networks/high-id-low-id.md) |
| ![High ID](/img/docs/usage/window_systray6.jpg) | Connected to one or more networks with at least one [High ID](../../../p2p-networks/high-id-low-id.md) connection |

## Tooltip

Hovering over the tray icon for a few seconds shows a tooltip:

![Tray icon tooltip](/img/docs/usage/window_systray2.jpg)

The tooltip has this format:

```
aMule (Up: <upload speed> | Down: <download speed> | <status>)
```

Where `<status>` is either **Connected** or **Disconnected**.
