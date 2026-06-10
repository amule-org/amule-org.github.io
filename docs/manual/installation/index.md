---
id: index
title: Installation
---

aMule is a multi-platform eD2k / Kad client, officially supported on **Windows, macOS, Linux, FreeBSD and OpenBSD** (x86\_64 and ARM64). As portable C++/wxWidgets code it can usually be compiled on other Unix-like systems and CPU architectures too, though those are not officially supported.

## Supported Platforms

The project publishes **official pre-built binaries** only for Windows, macOS and Linux; on the other supported platforms aMule is installed through the system package manager or [built from source](#building-from-source). Version and architecture requirements for the official binaries are listed in each platform's section below.

| Platform | Architectures | How to install |
|---|---|---|
| Windows | x64, ARM64 | [Official installer or portable build](#windows) |
| macOS | Apple Silicon, Intel | [Official `.dmg`](#macos) |
| Linux | x64, ARM64 | [Official AppImage or Flatpak](#linux), or distribution package |
| FreeBSD | x86\_64, ARM64 | [System package or Ports](#freebsd) |
| OpenBSD | x86\_64 | [System package](#openbsd) |

Additionally, an [unofficial Docker image](#docker) runs aMule on any platform with a container runtime.

## Downloads

The latest release is available on the [Downloads](/download) page, which links directly to the [GitHub releases page](https://github.com/amule-org/amule/releases/latest). Each release provides the following artifacts:

- `aMule-<version>-Windows-Setup-x64.exe` — Windows installer for x86\_64
- `aMule-<version>-Windows-Setup-arm64.exe` — Windows installer for ARM64
- `aMule-<version>-Windows-x64.zip` — portable build for Windows x86\_64
- `aMule-<version>-Windows-arm64.zip` — portable build for Windows ARM64
- `aMule-<version>-macOS-universal2.dmg` — Universal2 disk image for macOS (Apple Silicon + Intel)
- `aMule-<version>-Linux-x64.AppImage` — portable Linux binary for x86\_64
- `aMule-<version>-Linux-arm64.AppImage` — portable Linux binary for ARM64
- `aMule-<version>-Linux-x64.flatpak` — Flatpak bundle for x86\_64
- `aMule-<version>-Linux-arm64.flatpak` — Flatpak bundle for ARM64
- **Source code** (`<version>.tar.gz` and `<version>.zip`) — automatically attached by GitHub to every release.

Every official pre-built package bundles the **complete set of aMule executables**: the interface clients [`amule`](../interfaces/gui/amule.md), [`amuled`](../interfaces/amuled.md), [`amulegui`](../interfaces/gui/amulegui.md), [`amuleweb`](../interfaces/amuleweb.md) and [`amulecmd`](../interfaces/amulecmd.md), plus the standalone [utilities](../utilities/index.md) `ed2k`, `alc`, `alcc`, `wxcas` and `cas`. Each platform section below covers how to launch a specific component. (Distribution packages may instead split these across several packages.)

## Windows

aMule is distributed for Windows in two formats: an **installer** (`.exe`) that sets up Start menu shortcuts and an Add or Remove Programs entry, and a **portable** build (`.zip`) that runs from any folder without installation. Both contain the same full set of aMule executables and bundled runtime libraries. Choose whichever fits your workflow.

### Requirements

- Windows 10 or 11
- x64 or ARM64 processor

### Installer

1. Go to the [Downloads](/download) page and click the **Windows** section, or go directly to the [latest release](https://github.com/amule-org/amule/releases/latest).
2. Download the installer that matches your architecture:
   - `aMule-<version>-Windows-Setup-x64.exe` for most PCs (Intel/AMD)
   - `aMule-<version>-Windows-Setup-arm64.exe` for ARM-based Windows devices (Snapdragon X Elite, Surface Pro X, etc.)
3. Run the downloaded `.exe` and follow the on-screen steps.
4. Optionally enable **Start aMule when I log in** during setup to launch aMule automatically on login. You can change this later from [Preferences → General](../interfaces/gui/preferences.md#general).

The installer creates Start menu shortcuts and an entry in **Add or Remove Programs** for clean uninstallation. aMule stores its configuration in `%APPDATA%\aMule\` (`C:\Users\<you>\AppData\Roaming\aMule\`); uninstalling does not delete this folder, so your settings and downloads are preserved.

### Portable

1. Go to the [Downloads](/download) page and click the **Windows** section, or go directly to the [latest release](https://github.com/amule-org/amule/releases/latest).
2. Download the `.zip` file that matches your architecture:
   - `aMule-<version>-Windows-x64.zip` for most PCs (Intel/AMD)
   - `aMule-<version>-Windows-arm64.zip` for ARM-based Windows devices (Snapdragon X Elite, Surface Pro X, etc.)
3. Extract the `.zip` file to a folder of your choice (e.g. `C:\Users\<you>\aMule`).
4. Open the extracted folder and run `amule.exe`.

The portable build requires **no installer**. aMule stores its configuration in `%APPDATA%\aMule\` (`C:\Users\<you>\AppData\Roaming\aMule\`) and can be moved or deleted by simply moving or deleting the extracted folder.

### SmartScreen Warning

Windows Defender SmartScreen may show a warning when you run the installer or `amule.exe`, because the aMule binaries are not code-signed. This is expected for open-source software distributed outside the Microsoft Store. To proceed:

1. Click **More info** in the SmartScreen dialog.
2. Click **Run anyway**.

## macOS

### Requirements

- macOS 11.0 (Big Sur) or later
- Apple Silicon (M1/M2/M3/M4) or Intel — the `.dmg` contains a Universal2 binary that runs natively on both

### Installation

1. Go to the [Downloads](/download) page and click the **macOS** section, or go directly to the [latest release](https://github.com/amule-org/amule/releases/latest).
2. Download `aMule-<version>-macOS-universal2.dmg`.
3. Open the `.dmg` file. A window appears with two applications — `aMule.app` (the all-in-one client) and `aMuleGUI.app` (the remote GUI that connects to a running `amuled`) — and a shortcut to the `/Applications` folder.
4. Drag `aMule.app` (and `aMuleGUI.app`, if you want the remote GUI) into the `/Applications` folder.
5. Eject the disk image.
6. Open `aMule.app` from `/Applications` or Launchpad.

After installing, see the [macOS configuration guide](../configuration/macos.md) for macOS-specific considerations such as context menus, firewall access, and handling `ed2k://` links.

### Gatekeeper Warning

The `.dmg` is distributed **unsigned** (the project doesn't have an Apple Developer Program subscription). macOS Gatekeeper will block the first launch with a message like *"aMule cannot be opened because the developer cannot be verified."* The procedure to allow it once depends on the macOS version.

#### macOS 15 (Sequoia) and newer

Apple removed the Control-click → Open bypass in macOS 15. The supported path is now:

1. Double-click `aMule.app` — the warning dialog appears, click **Done** to dismiss.
2. Open **System Settings → Privacy & Security**.
3. Scroll to the security message about aMule being blocked, click **Open Anyway**.
4. Re-launch aMule and confirm in the dialog. macOS remembers the exception; subsequent launches go straight in.

#### macOS 14 (Sonoma) and earlier

Control-click `aMule.app` → **Open** → **Open** in the dialog. macOS remembers the exception; subsequent launches go straight in.

#### Terminal alternative (any macOS version)

Strip the quarantine attribute, no UI clicks required:

```sh
xattr -d com.apple.quarantine /Applications/aMule.app
```

### Additional binaries

The `aMule.app` bundle also includes the command-line components inside `aMule.app/Contents/MacOS/`, which can be run directly from the terminal:

```sh
/Applications/aMule.app/Contents/MacOS/amuled --version
```

## Linux

Linux users can install aMule through three methods: an **AppImage** (self-contained portable binary), a **Flatpak** (sandboxed package), or a **distribution package** installed via the system package manager. For headless server setups, see also the unofficial [Docker image](#docker).

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
   - `aMule-<version>-Linux-x64.AppImage` for standard PCs
   - `aMule-<version>-Linux-arm64.AppImage` for ARM64 boards and devices
3. Make the file executable and run it:

```sh
chmod +x aMule-<version>-Linux-x64.AppImage
./aMule-<version>-Linux-x64.AppImage
```

The AppImage is fully self-contained — it bundles wxWidgets and all required shared libraries. No system libraries need to be installed. To uninstall, delete the `.AppImage` file.

:::tip AppImage desktop integration
To integrate the AppImage into your application menu, you can use [AppImageLauncher](https://github.com/TheAssassin/AppImageLauncher), which registers the `.AppImage` as a desktop application and handles updates.
:::

:::caution Known issues in the AppImage

**System tray icon is transparent.** The [system tray icon](../interfaces/gui/tray-icon.md) appears without a logo on the first launch. Accept the popup that aMule shows on startup to fix it.

**GTK theme is not applied.** The AppImage bundles its own GTK libraries and does not use the GTK theme installed on the system. The application is functional but may not match the desktop theme.
:::

#### Running other components from the AppImage

The AppImage bundles every aMule executable in a single file. Invoking the AppImage directly runs `amule` (the GUI); the component that runs is otherwise selected by the name used to invoke the AppImage.

Create one symlink per component you want to use. The `.AppImage` suffix is stripped automatically, so you can name the symlinks after the binaries:

```sh
# one symlink per component you want — for example:
ln -s aMule-<version>-Linux-x64.AppImage amuled
ln -s aMule-<version>-Linux-x64.AppImage amuleweb
ln -s aMule-<version>-Linux-x64.AppImage amulecmd
ln -s aMule-<version>-Linux-x64.AppImage ed2k
```

Then invoke each symlink directly:

```sh
./amuled --ec-password yourpassword
./amuleweb --webpassword yourpassword
./amulecmd
./ed2k "ed2k://|file|..."
```

### Flatpak

The Flatpak bundle runs in a sandboxed environment and is suitable for distributions that ship Flatpak support.

**Requirements:** Flatpak. The bundle targets the GNOME 49 runtime (`org.gnome.Platform`), which Flatpak installs automatically when you install the bundle.

**Installation:**

```sh
flatpak install ./aMule-<version>-Linux-x64.flatpak
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

The Flatpak bundle also includes every aMule executable. Use the `--command` flag with `flatpak run` to select which binary to execute:

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

aMule is not in Fedora's official repositories; it is provided by the third-party [RPM Fusion](https://rpmfusion.org) Free repository. Enable it first (skip this step if it is already enabled):

```sh
sudo dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm
```

Then install aMule:

```sh
sudo dnf install amule
```

For a headless setup (daemon, web interface, and command-line client without the GUI), install the `amule-nogui` subpackage instead:

```sh
sudo dnf install amule-nogui
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

## Docker

An **unofficial Docker image**, maintained by a member of the aMule Team, is available at [ngosang/docker-amule](https://github.com/ngosang/docker-amule). It runs [`amuled`](../interfaces/amuled.md) with the [`amuleweb`](../interfaces/amuleweb.md) web interface enabled — a headless setup suited to home servers and NAS devices. The image is Linux-based, but it runs on any system with a container runtime, including Windows and macOS via [Docker Desktop](https://www.docker.com/products/docker-desktop/). Images are published on [Docker Hub](https://hub.docker.com/r/ngosang/amule) (`ngosang/amule`) and [GitHub Container Registry](https://github.com/ngosang/docker-amule/pkgs/container/amule) for a wide range of architectures (x64, ARM, RISC-V and more).

A minimal Docker Compose setup:

```yaml
services:
  amule:
    image: ngosang/amule
    ports:
      - "4711:4711"     # amuleweb web interface
      - "4712:4712"     # External Connections (amulegui, amulecmd, amuleweb)
      - "4662:4662"     # eD2k client-to-client TCP (required for High ID)
      - "4665:4665/udp" # eD2k server UDP (global searches)
      - "4672:4672/udp" # extended eMule protocol and Kademlia UDP
    volumes:
      - /path/to/config:/home/amule/.aMule
      - /path/to/downloads:/downloads
```

Once the container is running, open the web interface at `http://<host>:4711` or connect [`amulegui`](../interfaces/gui/amulegui.md) to port 4712. See the [repository documentation](https://github.com/ngosang/docker-amule) for the full list of environment variables (user/group IDs, passwords, timezone) and optional features.

:::note Unofficial image
The Docker image is built from the official aMule source code but is **not an official aMule project distribution**. Issues with the image should be reported on its [own issue tracker](https://github.com/ngosang/docker-amule/issues).
:::

## Building from Source

If no pre-built binary is available for your platform, or you want to compile a specific version or custom configuration, see the [Compilation](../../developer/compilation/index.md) documentation for full instructions, dependency lists, and build options for Linux, macOS, Windows, and BSD.

## After Installation

Once aMule is installed, the first launch creates the configuration directory:

| Platform | Path |
|---|---|
| Windows | `%APPDATA%\aMule\` |
| macOS | `~/Library/Application Support/aMule/` |
| Linux / BSD | `~/.aMule/` |

See the [aMule Files Reference](../configuration/config-files/index.md) for a complete description of every file and directory created by aMule.

aMule ships with reasonable defaults and can be used as-is. To connect to the [eD2k network](../../p2p-networks/ed2k/index.md) and start downloading, follow the [Quick Start Guide](../../quickstart-guide.md), which walks through the initial bandwidth configuration, eD2k server / [Kademlia](../../p2p-networks/kademlia.md) connection, and your first search.

To receive a [High ID](../configuration/network-connectivity.md) (required for optimal connectivity and download speeds), you will need to open aMule's ports on your firewall or router. The [Firewall configuration](../configuration/firewall.md) page explains how to do this.
