---
id: bug-reports
title: Bug Reports
---

Bug reports are a vital contribution to aMule. A problem cannot be fixed if it is not reported, and the faster and more accurately a bug is described, the sooner it can be resolved. This page explains what information to include in a report and how to provide a useful backtrace when aMule crashes.

## Where to File a Bug Report

Open an issue on the [aMule GitHub issue tracker](https://github.com/amule-org/amule/issues). You will need a GitHub account.

Before opening a new issue, search existing issues to avoid duplicates. Include a clear, descriptive title.

## What to Include in Every Report

A useful bug report contains at minimum:

| Field | How to obtain |
|---|---|
| **aMule version** | `amule --version` or `amuled --version` |
| **Operating system and version** | e.g. Ubuntu 24.04, Fedora 40, macOS 14.5, Windows 11 |
| **Steps to reproduce** | The exact sequence of actions that triggers the bug |
| **Expected behaviour** | What you expected to happen |
| **Actual behaviour** | What actually happened |
| **Log output** | Relevant lines from the aMule log (`~/.aMule/logfile`) |
| **Crash backtrace** | For crashes and freezes — see below |

Be as specific as possible. "aMule crashed" is not a useful report. "aMule crashed reproducibly when clicking the search button while connected to Kad, after approximately 20 seconds of searching, on Ubuntu 24.04 with aMule 3.0.0" is.

## Generating a Backtrace

When aMule crashes, the built-in crash reporter only provides a minimal trace. A **full GDB backtrace** gives the aMule team the exact call stack at the moment of the crash, which is essential to diagnose the problem.

### Step 1 — Install GDB

Verify that GDB is installed:

```sh
which gdb
```

If the command returns nothing, install GDB:

```sh
# Debian / Ubuntu
sudo apt install gdb

# Fedora / RHEL
sudo dnf install gdb

# Arch / Manjaro
sudo pacman -S gdb

# macOS (Homebrew)
brew install gdb
```

### Step 2 — Build aMule with Debug Symbols

A debug build retains symbol information that makes backtraces readable. Without it, gdb can only show memory addresses.

```sh
git clone https://github.com/amule-org/amule.git
cd amule
cmake -B build -DCMAKE_BUILD_TYPE=Debug -DBUILD_MONOLITHIC=YES
cmake --build build -j"$(nproc)"
```

If you cannot or do not want to recompile, proceed anyway with your installed binary, but be aware that the backtrace will contain fewer details.

:::note Gentoo-specific
On Gentoo, edit `/etc/portage/make.conf` and add `-ggdb` to `CFLAGS` and `FEATURES="splitdebug"`. Then emerge aMule with `USE="debug" emerge amule`. After the build, remove those flags from `make.conf`.
:::

### Step 3 — Configure GDB Signal Handling

Create (or append to) `~/.gdbinit` in your home directory:

```
handle SIGPIPE nostop noprint pass
handle SIG32  nostop noprint pass
handle SIG33  nostop noprint pass
handle SIG34  nostop noprint pass
```

These lines prevent GDB from stopping on signals that aMule uses internally (broken pipes, threading signals), which would otherwise interrupt normal execution.

### Step 4 — Run aMule Under GDB

```sh
gdb build/amule
(gdb) run
```

Use aMule normally until it crashes. Once it crashes, at the `(gdb)` prompt run:

```sh
(gdb) bt
(gdb) bt full
(gdb) thread apply all bt
```

Copy the complete output of all three commands and paste it into the issue.

### What to Look For in a Backtrace

The quality of a backtrace depends on whether the binary contains debug symbols. Here are examples of each quality level:

**Unusable — no debug symbols (stripped binary):**

```
#0  0x000000000057b790 in ?? ()
#1  0x000000000051e66b in ?? ()
#2  0x000000000051edb6 in ?? ()
```

**Partial — symbols present but no line numbers:**

```
#0  0x1003f604 in CUpDownClient::ClearDownloadBlockRequests ()
#1  0x10044978 in CUpDownClient::Disconnected ()
#2  0x1004d958 in CClientList::ProcessDirectCallbackList ()
```

**Full — symbols + line numbers + local variables (the ideal):**

```
#0  0x000000000046fcab in CUpDownClient::ClearDownloadBlockRequests (this=0x45bf9e0)
    at BaseClient.cpp:1175
#1  0x00000000004d1480 in CUpDownClient::SetDownloadState (this=0x45bf9e0, byNewState=1 '\001')
    at DownloadClient.cpp:541
#2  0x00000000004703bd in CUpDownClient::Disconnected (this=0x45bf9e0,
    strReason=@0x7ffffc74e2b0, bFromSocket=false)
    at BaseClient.cpp:1239
```

Always aim for the full form by building with `-DCMAKE_BUILD_TYPE=Debug`.

## Generating a Backtrace from a Core File

If aMule was **not** running under GDB when it crashed but your system is configured to generate core files, you can still obtain a backtrace.

First, ensure core files are enabled in your shell by adding this to `~/.bashrc` (or equivalent):

```sh
ulimit -c unlimited
```

After a crash, a file named `core` or `core.<pid>` will appear in the working directory. Load it into GDB:

```sh
gdb /path/to/amule /path/to/core.<pid>
```

Then issue `bt` and `bt full` as usual.

### Common Pitfalls

**`-fomit-frame-pointer`**: On x86, this compiler flag frees an extra register but often prevents GDB from parsing the executable correctly. Check your `CFLAGS`/`CXXFLAGS` and remove it.

**`-fPIE`**: If compiling with `-fPIE`, add `-nopie` to `LDFLAGS` for the link step.

**Stripped binaries**: Stripping removes all debug info. Do not use the `install-strip` make target or the `-Wl,-s` / `-Wl,-S` linker flags when producing a binary intended for debugging.

## Using ABRT on Fedora

Fedora includes the Automatic Bug Reporting Tool (ABRT), which can generate backtraces automatically. To use it with aMule:

- Fedora 14 or newer is required.
- aMule must be installed from RPMFusion, or compiled with debug information using Fedora's wxGTK libraries.
- In `/etc/abrt/abrt.conf`, set `OpenGPGCheck = no`.

Select **"Local GNU Debugger"** as the analyser and **"Logger"** as the facility to write the backtrace report to a file you can attach to the issue.

## Using Valgrind for Memory Errors

Valgrind helps find memory leaks, invalid reads/writes, and use-after-free errors. See [Debugging with GDB and Valgrind](../developer/debugging.md) for the full workflow.

For a quick memory check:

```sh
valgrind --tool=memcheck --leak-check=full --num-callers=20 \
    build/amule
```

Valgrind output is very verbose. If aMule links against libraries that report known false positives, a suppression file can filter them. See the debugging page for details.

## Reading the Log File

aMule writes diagnostic output to `~/.aMule/logfile`. Check this file for error messages and warnings immediately before the crash. Lines containing `ERROR`, `FATAL`, or `ASSERT` are especially relevant.
