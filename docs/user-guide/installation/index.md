---
id: index
title: Installation
---

This page explains how to install aMule on each supported platform. Pre-built binaries are available for Windows, macOS, and Linux. BSD users can install from the system package repository or ports tree. If no binary is available for your platform, see [Building from Source](#building-from-source).

## Supported Platforms

| Platform | Minimum version | Architectures | Distribution format |
|---|---|---|---|
| Windows | 10 / 11 | x64, ARM64 | Portable `.zip` |
| macOS | 11.0 (Big Sur) | Apple Silicon, Intel (Universal2) | `.dmg` disk image |
| Linux | glibc ≥ 2.35 | x86\_64, aarch64 | AppImage, Flatpak |
| FreeBSD | — | x86\_64, aarch64 | `pkg` / Ports Collection |
| OpenBSD | — | x86\_64 | `pkg_add` |
| NetBSD | — | x86\_64 | pkgin / pkgsrc |

## Downloads

The latest release is available on the [Downloads](/download) page, which links directly to the [GitHub releases page](https://github.com/amule-org/amule/releases/latest). Each release provides the following artifacts:

- `aMule-<version>-Windows-x64.zip` — portable build for Windows x86\_64
- `aMule-<version>-Windows-arm64.zip` — portable build for Windows ARM64
- `aMule-<version>-macOS.dmg` — Universal2 disk image for macOS (Apple Silicon + Intel)
- `aMule-<version>-x86_64.AppImage` — portable Linux binary for x86\_64
- `aMule-<version>-aarch64.AppImage` — portable Linux binary for aarch64
- `aMule-<version>-x86_64.flatpak` — Flatpak bundle for x86\_64
- `aMule-<version>-aarch64.flatpak` — Flatpak bundle for aarch64
- `aMule-<version>.tar.gz` — source tarball

## Windows

### Requirements

- Windows 10 or 11
- x64 or ARM64 processor

### Installation

1. Go to the [Downloads](/download) page and click the **Windows** card, or go directly to the [latest release](https://github.com/amule-org/amule/releases/latest).
2. Download the `.zip` file that matches your architecture:
   - `aMule-<version>-Windows-x64.zip` for most PCs (Intel/AMD)
   - `aMule-<version>-Windows-arm64.zip` for ARM-based Windows devices (Snapdragon X Elite, Surface Pro X, etc.)
3. Extract the `.zip` file to a folder of your choice (e.g. `C:\Users\<you>\aMule`).
4. Open the extracted folder and run `amule.exe`.

The build is fully **portable** — no installer is required. aMule stores its configuration in `%APPDATA%\aMule\` (`C:\Users\<you>\AppData\Roaming\aMule\`) and can be moved or deleted by simply moving or deleting the extracted folder.

### SmartScreen Warning

Windows Defender SmartScreen may show a warning because the aMule binary is not code-signed. This is expected for open-source software distributed outside the Microsoft Store. To proceed:

1. Click **More info** in the SmartScreen dialog.
2. Click **Run anyway**.

## macOS

### Requirements

- macOS 11.0 (Big Sur) or later
- Apple Silicon (M1/M2/M3/M4) or Intel — the `.dmg` contains a Universal2 binary that runs natively on both

### Installation

1. Go to the [Downloads](/download) page and click the **macOS** card, or go directly to the [latest release](https://github.com/amule-org/amule/releases/latest).
2. Download `aMule-<version>-macOS.dmg`.
3. Open the `.dmg` file. A window appears with the aMule application icon and a shortcut to the `/Applications` folder.
4. Drag `aMule.app` into the `/Applications` folder.
5. Eject the disk image.
6. Open `aMule.app` from `/Applications` or Launchpad.

### Gatekeeper Warning

The `.dmg` is distributed **unsigned**. macOS Gatekeeper will block the first launch with a message like *"aMule cannot be opened because the developer cannot be verified."* To allow it:

1. In **Finder**, navigate to `/Applications`.
2. Right-click (or Control-click) `aMule.app`.
3. Select **Open** from the context menu.
4. Click **Open** in the dialog that appears.

After this one-time confirmation, aMule opens normally from Launchpad or Spotlight.

Alternatively, remove the quarantine attribute from the terminal:

```sh
xattr -dr com.apple.quarantine /Applications/aMule.app
```

### Additional binaries

The `.dmg` also includes the command-line tools (`amuled`, `amulecmd`, `amuleweb`, `ed2k`) inside `aMule.app/Contents/MacOS/`. These can be run directly from the terminal:

```sh
/Applications/aMule.app/Contents/MacOS/amuled --version
```

## Linux

Linux users can install aMule through three methods: an **AppImage** (self-contained portable binary), a **Flatpak** (sandboxed package), or a **distribution package** installed via the system package manager.

### AppImage

The AppImage is the simplest installation method — no package manager or root access is needed.

**System requirements:** glibc ≥ 2.35. This covers the following distributions (and later versions):

- Ubuntu 22.04 LTS and later
- Debian 12 (Bookworm) and later
- Fedora 38 and later
- openSUSE Leap 15.5 / Tumbleweed
- Arch Linux (rolling)
- Linux Mint 21 and later
- Pop!\_OS 22.04 and later
- Steam Deck (SteamOS 3)
- Raspberry Pi OS (Bookworm)

**Installation:**

1. Go to the [Downloads](/download) page or the [latest release](https://github.com/amule-org/amule/releases/latest).
2. Download the AppImage for your architecture:
   - `aMule-<version>-x86_64.AppImage` for standard PCs
   - `aMule-<version>-aarch64.AppImage` for ARM64 boards and devices
3. Make the file executable and run it:

```sh
chmod +x aMule-<version>-x86_64.AppImage
./aMule-<version>-x86_64.AppImage
```

The AppImage is fully self-contained — it bundles wxWidgets and all required shared libraries. No system libraries need to be installed. To uninstall, delete the `.AppImage` file.

:::tip AppImage desktop integration
To integrate the AppImage into your application menu, you can use [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher), which registers the `.AppImage` as a desktop application and handles updates.
:::

:::caution Known issues in the AppImage

**System tray icon is transparent.** The [system tray icon](../usage/tray-icon.md) appears without a logo on the first launch. Accept the popup that aMule shows on startup to fix it.

**GTK theme is not applied.** The AppImage bundles its own GTK libraries and does not use the GTK theme installed on the system. The application is functional but may not match the desktop theme.
:::

#### Running other components from the AppImage

The AppImage bundles all [aMule components](../amule-components/index.md) — `amuled`, `amulegui`, `amulecmd`, `amuleweb`, and `ed2k` — in a single file. The component that runs is selected by the name used to invoke the AppImage.

**Method 1 — symlinks (recommended):**

Create one symlink per component you want to use. The `.AppImage` suffix is stripped automatically, so you can name the symlinks after the binaries:

```sh
ln -s aMule-<version>-x86_64.AppImage amuled
ln -s aMule-<version>-x86_64.AppImage amuleweb
ln -s aMule-<version>-x86_64.AppImage amulecmd
ln -s aMule-<version>-x86_64.AppImage ed2k
```

Then invoke each symlink directly:

```sh
./amuled --ec-password yourpassword
./amuleweb --webpassword yourpassword
./amulecmd
./ed2k "ed2k://|file|..."
```

**Method 2 — `ARGV0` environment variable:**

Set `ARGV0` to the component name before running the AppImage:

```sh
ARGV0=amuled ./aMule-<version>-x86_64.AppImage --ec-password yourpassword
ARGV0=amuleweb ./aMule-<version>-x86_64.AppImage --webpassword yourpassword
ARGV0=amulecmd ./aMule-<version>-x86_64.AppImage
ARGV0=ed2k ./aMule-<version>-x86_64.AppImage "ed2k://|file|..."
```

### Flatpak

The Flatpak bundle runs in a sandboxed environment and is suitable for distributions that ship Flatpak support.

**Requirements:** Flatpak with GNOME runtime 49 or later installed.

**Installation:**

```sh
flatpak install ./aMule-<version>-x86_64.flatpak
```

After installation, run aMule with:

```sh
flatpak run org.amule.aMule
```

To install from Flathub (once the submission is accepted):

```sh
flatpak install flathub org.amule.aMule
```

:::note Flatpak sandbox
The Flatpak runs in a sandboxed environment. Network access is granted by default, but access to paths outside the home directory may require additional `--filesystem` permissions. If a component cannot reach a file or socket, pass the needed permission explicitly:

```sh
flatpak run --filesystem=/mnt/data --command=amuled org.amule.aMule
```
:::

#### Running other components from the Flatpak

The Flatpak bundle also includes all [aMule components](../amule-components/index.md) — `amuled`, `amulegui`, `amulecmd`, `amuleweb`, and `ed2k`. Use the `--command` flag with `flatpak run` to select which binary to execute:

```sh
flatpak run --command=amuled org.amule.aMule --ec-password yourpassword
flatpak run --command=amuleweb org.amule.aMule --webpassword yourpassword
flatpak run --command=amulecmd org.amule.aMule
flatpak run --command=ed2k org.amule.aMule "ed2k://|file|..."
```

### Distribution Packages

Many Linux distributions include aMule in their official repositories. The version may lag behind the latest release. To get the most recent version, use the AppImage or Flatpak.

#### Debian and Ubuntu

```sh
sudo apt update
sudo apt install amule
```

To also install the daemon, web interface, and command-line client:

```sh
sudo apt install amule amule-daemon amule-utils amuleweb
```

#### Fedora

```sh
sudo dnf install amule
```

#### Arch Linux

aMule is in the official Arch Linux repository:

```sh
sudo pacman -S amule
```

Alternative and development builds are also available in the [AUR](https://aur.archlinux.org/packages/?K=amule).

#### Gentoo

```sh
emerge -av net-p2p/amule
```

To control which components are built, use USE flags:

```sh
USE="daemon webserver amulecmd nls upnp geoip" emerge -av net-p2p/amule
```

## BSD

### FreeBSD

#### Binary package

```sh
pkg install amule
```

#### Ports Collection

```sh
cd /usr/ports/net-p2p/amule
make config    # select components (daemon, web server, CLI, etc.)
make install clean
```

### OpenBSD

```sh
pkg_add amule
```

### NetBSD

Using pkgin:

```sh
pkgin install amule
```

Using pkgsrc:

```sh
cd /usr/pkgsrc/net/amule
make install clean
```

## Building from Source

If no pre-built binary is available for your platform, or you want to compile a specific version or custom configuration, see the [Compilation](../../development/compilation/index.md) documentation for full instructions, dependency lists, and build options for Linux, macOS, Windows, and BSD.

## After Installation

Once aMule is installed, the first launch creates the configuration directory:

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\aMule\` |
| macOS | `~/Library/Application Support/aMule/` |
| Linux / BSD | `~/.aMule/` |

See the [aMule Files Reference](../amule-files/index.md) for a complete description of every file and directory created by aMule.

aMule ships with reasonable defaults and can be used as-is. To connect to the eD2k network and start downloading, follow the [Quick Start Guide](../../quickstart-guide/index.md), which walks through the initial bandwidth configuration, server/Kademlia connection, and your first search.

To receive a [High ID](../configuration/get-high-id.md) (required for optimal connectivity and download speeds), you will need to open aMule's ports on your firewall or router. The [Firewall configuration](../configuration/firewall.md) page explains how to do this.
