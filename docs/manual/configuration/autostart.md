---
id: autostart
title: Starting aMule Automatically
---

aMule can start by itself when you log in to your desktop session, so it keeps sharing and downloading without having to be launched by hand. The feature registers a **per-user** autostart entry with the operating system: no administrator rights are needed, it only affects your own login, and the setting is stored by the OS, never in [`amule.conf`](./config-files/amule-conf.md).

For a headless server that should run aMule without anyone logging in, use a [system service](#running-amuled-as-a-service) instead.

## Turning It On or Off

Autostart is **off by default**. You can change it in any of these places:

| Where | How |
|---|---|
| Windows installer | The **Start aMule when I log in** component — see [Installation → Windows](../installation/index.md#installer). Tick it again when you upgrade. |
| [First-run wizard](../../quickstart-guide.md#integrations-optional) | The **Start aMule automatically when I log in** checkbox on the *Integrations (optional)* page |
| [Preferences → General](../interfaces/gui/preferences.md#general) | The **Start aMule automatically when I log in** checkbox, which takes effect immediately |
| Command line | `--configure-autostart=on\|off`, accepted by [`amule`](../interfaces/gui/amule.md#starting-amule), [`amulegui`](../interfaces/gui/amulegui.md#command-line-options) and [`amuled`](../interfaces/amuled.md); the program writes or removes the entry and exits |

The entry starts the program it was enabled from — `amule`, `amulegui` or `amuled`. If you move aMule, start the same program once by hand so it updates the entry.

The autostart entry starts aMule normally. To have it start in the background, also enable **Start minimized** and, optionally, the [tray icon](../interfaces/gui/tray-icon.md) options in [Preferences → General](../interfaces/gui/preferences.md#general).

## Where the Entry Is Stored

| Platform | Autostart entry |
|---|---|
| Windows | Registry value `aMule` under `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run` |
| macOS | LaunchAgent `~/Library/LaunchAgents/org.amule.amule.plist` |
| Linux / BSD | XDG autostart file `$XDG_CONFIG_HOME/autostart/amule.desktop` (usually `~/.config/autostart/amule.desktop`) |

To turn autostart off, use the aMule checkbox or `--configure-autostart=off` rather than disabling the entry in the OS settings: aMule only checks whether the entry exists, so it would still report autostart as on.

:::caution Flatpak
The [Flatpak](../installation/index.md#flatpak) cannot register an autostart entry from inside its sandbox: leave the aMule checkbox off, which has no effect there, and create an entry on the host instead, for example `~/.config/autostart/amule-flatpak.desktop`:

```ini
[Desktop Entry]
Type=Application
Name=aMule
Exec=flatpak run org.amule.aMule
Terminal=false
```
:::

## Running `amuled` as a Service

The autostart entry only runs when you log in to a desktop session. To run the daemon on a server — at boot, without a logged-in user, and restarted if it fails — use the system's service manager. aMule does not ship service files, but many distributions package one (for example Debian/Ubuntu's `amule-daemon`); see [`amuled` → Running as a System Service](../interfaces/amuled.md#running-as-a-system-service) for systemd and OpenRC examples.
