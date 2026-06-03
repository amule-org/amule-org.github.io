---
id: skins
title: Skins
---

A **skin** is a file or set of files that changes an application's visual appearance, allowing users to customize the icons and images displayed in the interface.

aMule supports two independent skinning systems:

1. **aMule bitmap skins** — replace aMule-specific toolbar and client icons with custom images (zip-file based).
2. **GTK theme skins** — change fonts, colors, shapes, and widget behavior for all GTK applications on the system (Linux/BSD only).

## aMule bitmap skins

### What can be skinned

aMule bitmap skins replace the icons in the [toolbar](./toolbar.md) and the per-source [client icons](./downloads.md#client-icons) shown in the download queue. Toolbar images are **32×32 px** and client images are **16×16 px**. Any image not present in the skin falls back to the aMule default.

### Enabling a skin

1. Open **[Preferences → Interface](./preferences.md#interface)**.
2. In the **Skin to use** dropdown, select the skin you want to apply.
3. Click **OK** or **Apply**. The skin takes effect immediately.

To disable skins, select **- default -** from the dropdown.

The dropdown is automatically populated with skins found in the user and system skins directories. Each entry shows the full zip file name prefixed with `User:` or `System:` respectively — for example, `System:gnome.zip` or `User:crystal-project.zip`.

![The "Skin to use" dropdown in Preferences → Interface](/img/docs/gui_skins/skins_preferences_selector.png)

### Bundled skins

aMule ships with several ready-to-use skins. They are installed to the system skins directory and appear in the **Skin to use** dropdown with a `System:` prefix. Below is how each one renders the main toolbar, with the default aMule icons shown first for comparison:

**Default** (`- default -`) — the standard aMule icons

![Default aMule toolbar icons](/img/docs/gui_skins/skin_default.png)

**`gnome`** — GNOME icon theme

![gnome skin toolbar](/img/docs/gui_skins/skin_gnome.png)

**`kde4`** — KDE 4 icon theme

![kde4 skin toolbar](/img/docs/gui_skins/skin_kde4.png)

**`Mac_Gray`** — macOS-style gray icons

![Mac_Gray skin toolbar](/img/docs/gui_skins/skin_mac_grey.png)

**`papirus`** — Papirus icon theme

![papirus skin toolbar](/img/docs/gui_skins/skin_papirus.png)

**`priscilla`** — Classic aMule skin

![priscilla skin toolbar](/img/docs/gui_skins/skin_priscilla.png)

**`tango`** — Tango icon theme

![tango skin toolbar](/img/docs/gui_skins/skin_tango.png)

**`xfce`** — Xfce icon theme

![xfce skin toolbar](/img/docs/gui_skins/skin_xfce.png)

### Community skins

The following skins are available for download. To install, copy the zip file to the user skins directory for your platform.

**Crystal Project** — version 0.2.3, download [skin-crystal-project-0.2.3.zip](/skins/skin-crystal-project-0.2.3.zip)

![Crystal Project skin toolbar](/img/docs/gui_skins/skin_cristal_project.png)

### Skin file paths

Skins are looked for in two locations: a per-user directory and a system-wide directory.

| Platform | User skins | System skins |
|---|---|---|
| Windows | `%APPDATA%\aMule\skins\` | `..\share\amule\skins\` (relative to `amule.exe` in `bin\`) |
| macOS | `~/Library/Application Support/aMule/skins/` | `aMule.app/Contents/SharedSupport/skins/` |
| Linux / Solaris / BSD | `~/.aMule/skins/` | `/usr/share/amule/skins/` (or `/usr/local/share/amule/skins/` for local builds) |

System skins are available to all users on the machine; user skins are only available to the current user.

### Installing a skin

1. Download the skin zip file.
2. Copy it to the user skins directory for your platform (see [Skin file paths](#skin-file-paths) above).
3. It will appear in the **Skin to use** dropdown the next time you open Preferences.

### Skin file format

A skin file is a standard **zip archive** containing PNG images. The file names inside the zip must match the names listed below exactly. Any missing image falls back to the aMule default.

#### Toolbar images (32×32 px)

Each of these buttons is described in detail on the [Toolbar](./toolbar.md) page.

| File | Element |
|---|---|
| `Toolbar_Connect.png` | [Connect](./toolbar.md#connect--disconnect) button |
| `Toolbar_Disconnect.png` | [Disconnect](./toolbar.md#connect--disconnect) button |
| `Toolbar_Connecting.png` | [Connecting](./toolbar.md#connect--disconnect) (in-progress) button |
| `Toolbar_Network.png` | [Networks](./networks.md) window button |
| `Toolbar_Transfers.png` | [Downloads](./downloads.md) window button |
| `Toolbar_Search.png` | [Searches](./searches.md) window button |
| `Toolbar_Shared.png` | [Shared Files](./shared-files.md) window button |
| `Toolbar_Messages.png` | [Messages](./messages.md) window button |
| `Toolbar_Stats.png` | [Statistics](./statistics.md) window button |
| `Toolbar_Prefs.png` | [Preferences](./preferences.md) window button |
| `Toolbar_Import.png` | [Import](../../migration/import.md) window button |
| `Toolbar_About.png` | About window button |
| `Toolbar_Blink.png` | Blink/notification indicator |

#### Client images (16×16 px)

The meaning of each client icon is described in [Downloads → Client Icons](./downloads.md#client-icons).

| File | Element |
|---|---|
| `Client_A4AFNoNeededPartsQueueFull.png` | A4AF client with full queue and no needed parts |
| `Client_aMule.png` | aMule client |
| `Client_BadGuy.png` | [Bad/banned](../../../p2p-networks/concepts.md#bad-guy) client |
| `Client_CommentOnly.png` | Client with [comment](./comments.md) only |
| `Client_Connecting.png` | Connecting client |
| `Client_CreditsGrey.png` | Client with [credits](../../../p2p-networks/ed2k/index.md#credits-and-scoring) (grey) |
| `Client_CreditsYellow.png` | Client with [credits](../../../p2p-networks/ed2k/index.md#credits-and-scoring) (yellow) |
| `Client_eDonkeyHybrid.png` | [eDonkey Hybrid](../../../p2p-networks/ed2k/clients.md#edonkey2000-20002005) client |
| `Client_eMule.png` | [eMule](../../../p2p-networks/ed2k/clients.md#emule-2002present) client |
| `Client_Encrypted.png` | [Encrypted](./preferences.md#protocol-obfuscation) connection |
| `Client_ExcellentRatingOnFile.png` | Client with excellent file [rating](./comments.md) |
| `Client_ExtendedProtocol.png` | Client using extended protocol |
| `Client_FairRatingOnFile.png` | Client with fair file [rating](./comments.md) |
| `Client_Friend.png` | [Friend](../../../p2p-networks/concepts.md#friend) |
| `Client_GoodRatingOnFile.png` | Client with good file [rating](./comments.md) |
| `Client_InvalidRatingOnFile.png` | Client with invalid file [rating](./comments.md) |
| `Client_lphant.png` | [lphant](../../../p2p-networks/ed2k/clients.md#lphant-20052009) client |
| `Client_mlDonkey.png` | [mlDonkey](../../../p2p-networks/ed2k/clients.md#mldonkey-2001present) client |
| `Client_OnQueue.png` | Client [on queue](../../../p2p-networks/concepts.md#queue) |
| `Client_PoorRatingOnFile.png` | Client with poor file [rating](./comments.md) |
| `Client_SecIdent.png` | [Secure identification](../../../p2p-networks/ed2k/secure-user-identification.md) active |
| `Client_Shareaza.png` | [Shareaza](../../../p2p-networks/ed2k/clients.md#shareaza-20022017) client |
| `Client_StatusUnknown.png` | Unknown client status |
| `Client_Transfer.png` | Transferring client |
| `Client_Unknown.png` | Unknown client |
| `Client_Upload.png` | Uploading client |
| `Client_xMule.png` | [xMule](../../../p2p-networks/ed2k/clients.md#xmule-20032009) client |

## GTK theme skins (Linux/BSD)

:::note
Most Windows and macOS users will not need this section. It applies only to aMule builds linked against GTK (which is the normal case on Linux/BSD).
:::

### What GTK skins do

aMule uses the GTK toolkit. GTK allows all widgets (scrollbars, buttons, fonts, colors, etc.) to be themed at the toolkit level using a GTK theme. This changes the appearance of **all GTK applications** on the system, not just aMule. GTK themes cannot replace aMule-specific icons — use aMule bitmap skins for that.

### Determine your GTK version

```sh
amule --version
```

Example output:
```
aMule 3.0.0 compiled with wxGTK3 v3.2.4 (OS: Linux)
```

The `wxGTK` version string tells you which GTK version your aMule build is linked against:

- `wxGTK3` → **GTK3** (most modern builds)
- `wxGTK2` → **GTK2** (older builds)

### Applying a GTK theme

The tool to switch GTK themes depends on your desktop environment:

| Desktop | Tool |
|---|---|
| GNOME | **GNOME Tweaks** (`gnome-tweaks`) → Appearance |
| KDE Plasma | **System Settings** → Colors & Themes → GTK Theme |
| LXDE / LXQT / general GTK | `lxappearance` |
| Command line (GTK3) | `gsettings set org.gnome.desktop.interface gtk-theme <theme-name>` |

GTK themes must be installed on the system before they can be selected. On Debian/Ubuntu:

```sh
# Install lxappearance (works for both GTK2 and GTK3)
apt-get install lxappearance

# Browse available GTK3 themes
apt-cache search gtk3-engines
apt-get install gnome-themes-extra

# Browse available GTK2 themes
apt-cache search gtk2-engines
apt-get install gtk2-engines
```
