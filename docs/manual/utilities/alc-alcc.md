---
id: alc-alcc
title: alc / alcc — ed2k Link Generator
---

ALinkCreator is a tool that generates ed2k links for files on your local filesystem. It supports all optional ed2k link values and is very fast at hashing files. It ships in two variants:

| Binary | Interface |
|---|---|
| `alc` | Graphical (windowed) |
| `alcc` | Command-line (text-only) |

Both variants compute the full ed2k hash of a file — including part hashes — and output the complete ed2k link. They work independently of a running aMule instance and are compatible with `--disable-monolithic` builds.

## Installation

Most distributions include ALinkCreator in their aMule packages:

```bash
# Debian/Ubuntu:
apt install amule-utils

# Fedora/RHEL:
dnf install amule

# Arch:
pacman -S amule
```

`alcc` is typically in the `amule-utils` package on Debian-based systems.

## Compilation

ALinkCreator is built as part of the main aMule build using CMake options:

**GUI version (`alc`):**

```sh
cmake -B build -DBUILD_ALC=YES
cmake --build build -j"$(nproc)"
sudo cmake --install build
```

**Console version (`alcc`):**

```sh
cmake -B build -DBUILD_ALCC=YES
cmake --build build -j"$(nproc)"
sudo cmake --install build
```

Both options can be combined with any other aMule CMake options. For dependency installation and the full options reference see [Compilation](../../developer/compilation/index.md).

### RPM Packaging Note

If you build an RPM using the aMule spec file, you must add the following line to the `%files` section; otherwise `rpmbuild` aborts with the error `/usr/bin/alcc installed but not packaged`:

```spec
%{_bindir}/alcc
```

## Using alc (GUI)

Launch with:

```bash
alc
```

The graphical interface provides a file browser for selecting files. Select one or more files, click the hash button, and copy the generated ed2k link from the output field.

## Using alcc (Console)

`alcc` is used from the command line. Change to the directory containing the file, or specify an absolute path.

**Single file:**

```bash
alcc filename.iso
```

**Multiple files in one command:**

```bash
alcc file1.iso file2.mkv file3.zip
```

Each file produces one ed2k link on stdout:

```
ed2k://|file|filename.iso|734003200|A1B2C3D4E5F6A7B8C9D0E1F2A3B4C5D6|h=AABBCCDDEEFF00112233445566778899|/
```

The link can be:
- Pasted into an aMule search bar or ed2k link handler.
- Shared with others on forums or chat.
- Saved to a text file for later use.
- Passed to `amulecmd -c "add <link>"` to queue the download remotely.
