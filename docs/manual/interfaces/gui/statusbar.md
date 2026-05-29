---
id: statusbar
title: Status Bar
---

The status bar is located at the bottom of the main aMule window. It gives a continuous at-a-glance summary of the current session: the latest log line, network user and file counts, transfer speeds, and connection status.

![aMule status bar](/img/docs/usage/window_statusbar1.jpg)

## Sections

### Log

The leftmost section displays the last line printed to the aMule log:

![Status bar log section](/img/docs/usage/window_statusbar2.jpg)

If the line is longer than the available space it is truncated. Click the **info button** next to the text to open a popup showing the complete line:

![Info button next to the log text](/img/docs/usage/window_statusbar3.jpg)

![Popup with full log line](/img/docs/usage/window_statusbar13.jpg)

### Users

aMule estimates the number of users currently connected to each network it is participating in.

- The **first number** is the estimated number of users on the eD2k network:

  ![eD2k user count](/img/docs/usage/window_statusbar4.jpg)

- The **second number** is the estimated number of users on the Kademlia network:

  ![Kademlia user count](/img/docs/usage/window_statusbar5.jpg)

Both numbers use SI suffixes:

| Letter | Multiplier |
|---|---|
| k | 1,000 |
| M | 1,000,000 |
| G | 1,000,000,000 |
| T | 1,000,000,000,000 |

### Files

aMule also estimates the number of files available on each network.

- The **first number** is the estimated number of files on the eD2k network:

  ![eD2k file count](/img/docs/usage/window_statusbar6.jpg)

- The **second number** is the estimated number of files on the Kademlia network:

  ![Kademlia file count](/img/docs/usage/window_statusbar7.jpg)

The same SI suffixes apply as for the Users field.

### Speed

The speed section shows current upload and download bandwidth usage.

A small **connection-status icon** (two arrows surrounding a globe) appears first:

![Speed icon variants](/img/docs/usage/window_statusbar33.jpg)

The downward arrow is green when aMule is downloading and red when it is not. The upward arrow is green when aMule is uploading and red when it is not:

| Icon | Meaning |
|---|---|
| ![Not transferring](/img/docs/usage/window_statusbar29.jpg) | Not downloading or uploading |
| ![Downloading only](/img/docs/usage/window_statusbar30.jpg) | Downloading but not uploading |
| ![Uploading only](/img/docs/usage/window_statusbar31.jpg) | Uploading but not downloading |
| ![Both](/img/docs/usage/window_statusbar32.jpg) | Both downloading and uploading |

To the right of the icon:

- **Up** — current upload speed:

  ![Upload speed](/img/docs/usage/window_statusbar8.jpg)

- **Down** — current download speed:

  ![Download speed](/img/docs/usage/window_statusbar9.jpg)

If **"Show overhead bandwidth"** is enabled in Preferences, a bracketed number appears alongside each speed value showing the bandwidth consumed by overhead traffic (connection management, pings, protocol control packets):

![Overhead bandwidth display](/img/docs/usage/window_statusbar28.jpg)

### Networks

The rightmost section shows connection status for both networks.

For the **eD2k network**, the name (or IP address) of the currently connected server is displayed:

![Connected server name](/img/docs/usage/window_statusbar11.jpg)

When not connected to eD2k, the text reads **Not connected**, or **Connecting** while a connection attempt is in progress.

For the **Kademlia network**, the status appears after the **Kad** label:

![Kademlia status](/img/docs/usage/window_statusbar12.jpg)

| Text | Meaning |
|---|---|
| `ok` | Connected |
| `firewalled` | Connected but firewalled |
| `off` | Not connected |

## Globe Icon

The large earth icon in the status bar gives a combined graphical view of the connection state for both networks:

![Globe icon](/img/docs/usage/window_statusbar10.jpg)

- The **lower-left arrow** represents the eD2k network:

  ![eD2k arrow indicator](/img/docs/usage/window_statusbar23.jpg)

- The **upper-right arrow** represents the Kademlia network:

  ![Kademlia arrow indicator](/img/docs/usage/window_statusbar24.jpg)

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
| ![](/img/docs/usage/window_statusbar16.jpg) | Offline | Offline |
| ![](/img/docs/usage/window_statusbar17.jpg) | Offline | Connected (firewalled) |
| ![](/img/docs/usage/window_statusbar15.jpg) | Offline | Connected |
| ![](/img/docs/usage/window_statusbar19.jpg) | Connecting | Offline |
| ![](/img/docs/usage/window_statusbar18.jpg) | Connecting | Connected (firewalled) |
| ![](/img/docs/usage/window_statusbar14.jpg) | Connecting | Connected |
| ![](/img/docs/usage/window_statusbar26.jpg) | Connected ([Low ID](../../../p2p-networks/high-id-low-id.md) / firewalled) | Offline |
| ![](/img/docs/usage/window_statusbar25.jpg) | Connected ([Low ID](../../../p2p-networks/high-id-low-id.md) / firewalled) | Connected (firewalled) |
| ![](/img/docs/usage/window_statusbar21.jpg) | Connected | Offline |
| ![](/img/docs/usage/window_statusbar20.jpg) | Connected | Connected (firewalled) |
| ![](/img/docs/usage/window_statusbar22.jpg) | Connected | Connected |

:::note
The combination of a yellow eD2k arrow and a green Kademlia arrow does not occur in practice and is not listed above.
:::

## Quick Reference

![Status bar quick reference diagram](/img/docs/usage/window_statusbar27.jpg)

| # | Description |
|---|---|
| 1 | Button to pop up the complete last log line |
| 2 | Last log line (truncated to available width) |
| 3 | Estimated number of online eD2k users |
| 4 | Estimated number of online Kademlia users |
| 5 | Estimated number of available eD2k files |
| 6 | Estimated number of available Kademlia files |
| 7 | Current upload speed |
| 8 | Upload overhead speed (if enabled in Preferences) |
| 9 | Current download speed |
| 10 | Download overhead speed (if enabled in Preferences) |
| 11 | Combined eD2k and Kademlia connection status icon |
| 12 | Name of connected eD2k server, or eD2k connection status |
| 13 | Kademlia connection status |
| 14 | Transfer direction indicator (up/down arrows) |
