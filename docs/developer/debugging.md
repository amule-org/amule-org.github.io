---
id: debugging
title: Debugging with GDB and Valgrind
---

GDB and Valgrind are the two main tools for diagnosing crashes and memory errors in aMule. This page explains how to build aMule with debug symbols and how to use both tools effectively.

## Building aMule with Debug Symbols

A release build strips debug information to reduce binary size. To get meaningful debugging output, build in **Debug** mode:

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
```

The resulting binaries in `build/` contain full symbol information (function names, line numbers, local variable names). They are significantly larger than release builds — this is expected.

:::tip Running Without Installing
All built binaries can be run directly from `build/` during development:
```sh
./build/amule
./build/amuled
```
:::

## Debugging with GDB

### Installing GDB

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

Verify installation:

```sh
which gdb
gdb --version
```

### Configuring GDB Signal Handling

aMule uses several real-time signals internally (for threading) and catches `SIGPIPE` (for network sockets). GDB stops on all signals by default, which would interrupt normal aMule execution. Configure GDB to pass these signals through by creating `~/.gdbinit`:

```
handle SIGPIPE nostop noprint pass
handle SIG32  nostop noprint pass
handle SIG33  nostop noprint pass
handle SIG34  nostop noprint pass
```

These settings are loaded automatically every time GDB starts.

### Running aMule Under GDB

```sh
gdb build/amule
(gdb) run
```

Use aMule normally. If it crashes, GDB intercepts the signal and drops to the `(gdb)` prompt. Generate a backtrace immediately:

```sh
(gdb) bt
(gdb) bt full
(gdb) thread apply all bt
```

- `bt` — shows the call stack (function names + line numbers if debug symbols present).
- `bt full` — shows the call stack **plus** the values of all local variables in each frame. This is very verbose; use it when asked to or when you need to inspect state.
- `thread apply all bt` — applies `bt` to every thread. Essential for multi-threaded crashes.

### Useful GDB Commands

| Command | Description |
|---|---|
| `bt` | Backtrace: call stack from the current position |
| `bt full` | Backtrace with local variables in every frame |
| `thread apply all bt` | Backtrace of all threads |
| `up N` | Move up N stack frames (e.g. `up 5`) |
| `down N` | Move down N stack frames |
| `frame N` | Jump directly to frame N |
| `info locals` | Print all local variables of the current frame |
| `print expr` | Print an expression (e.g. `print *client`, `print m_sourceCount`) |
| `list` | Print 10 lines of source code around the current line |
| `help CMD` | In-GDB help for a command |

Example: inspecting a crash in `CUpDownClient::Disconnected`:

```sh
(gdb) bt
#0  0x00000000004703bd in CUpDownClient::Disconnected (this=0x45bf9e0,
    strReason=@0x7ffffc74e2b0, bFromSocket=false)
    at BaseClient.cpp:1239
#1  0x00000000004d1480 in CUpDownClient::SetDownloadState (...)
    at DownloadClient.cpp:541
...

(gdb) frame 0
(gdb) info locals
(gdb) print this->m_clientState
```

### Analyzing a Core File

If aMule was not running under GDB when it crashed but the system generated a core file, load it into GDB:

```sh
gdb /path/to/amule /path/to/core.<pid>
```

Then issue `bt` and `bt full` as usual.

To enable core file generation, add `ulimit -c unlimited` to `~/.bashrc` (or equivalent).

### Common Build Pitfalls That Break GDB

| Flag | Effect | Fix |
|---|---|---|
| `-fomit-frame-pointer` | Prevents GDB from parsing the stack on x86 | Remove from `CFLAGS`/`CXXFLAGS` |
| `-fPIE` without `-nopie` | Position-independent executable; GDB needs `-nopie` at link time | Add `-nopie` to `LDFLAGS` |
| Stripped binary (`install-strip`) | Removes all debug symbols | Do not use `install-strip` or `-Wl,-s` / `-Wl,-S` when debugging |

## Debugging with Valgrind

Valgrind's **memcheck** tool detects:

- Invalid reads and writes (out-of-bounds access, use-after-free)
- Use of uninitialized values
- Memory leaks
- Incorrect heap operations (`malloc`/`free` mismatches)

### Installing Valgrind

```sh
# Debian / Ubuntu
sudo apt install valgrind

# Fedora / RHEL
sudo dnf install valgrind

# Arch / Manjaro
sudo pacman -S valgrind
```

Valgrind is Linux-only (not available on macOS or Windows).

### Running aMule Under Valgrind

```sh
valgrind \
    --tool=memcheck \
    --leak-check=full \
    --num-callers=20 \
    --error-exitcode=1 \
    build/amule
```

- `--leak-check=full` — report all memory leaks, not just definite ones.
- `--num-callers=20` — show 20 frames in each error report (default is 12; 20 gives better context).
- `--error-exitcode=1` — exit with a non-zero code if any errors were found (useful in CI).

### Attaching GDB to a Valgrind Session

Valgrind can pause execution at the point of an error and wait for GDB to attach. This lets you inspect the program state at the exact moment of the invalid operation:

```sh
valgrind \
    --tool=memcheck \
    --vgdb=yes \
    --vgdb-error=1 \
    build/amule
```

When Valgrind detects the first error, it prints a message with a connection command:

```
==12345== (action at err time): vgdb me ...
==12345== (use the vgdb command to connect a debugger to this process)
```

In a second terminal, run:

```sh
gdb build/amule
(gdb) target remote | vgdb --pid=12345
```

You can now use all standard GDB commands to inspect the state.

### Building Suppression Files

Some Valgrind errors originate in third-party libraries (wxWidgets, OpenSSL, X11) rather than aMule itself. A **suppression file** tells Valgrind to ignore known false positives.

**Step 1** — Run with suppression generation enabled:

```sh
valgrind \
    --tool=memcheck \
    --gen-suppressions=yes \
    build/amule
```

When Valgrind finds an error, it will ask:

```
==12345== LEAK SUMMARY: ...
==12345==
==12345== ---- Print suppression ? --- [Return/N/n/Y/y/C/c] ----
```

Press `y` to print the suppression block. Copy it to a file (e.g. `amule.supp`) and give it a name:

```
{
   libX11_known_leak
   Memcheck:Leak
   ...
}
```

**Step 2** — Use the suppression file on subsequent runs:

```sh
valgrind \
    --tool=memcheck \
    --leak-check=full \
    --suppressions=amule.supp \
    build/amule
```

### Recommended Full Invocation

```sh
valgrind \
    -v \
    --tool=memcheck \
    --leak-check=full \
    --num-callers=20 \
    --suppressions=amule.supp \
    --gen-suppressions=yes \
    build/amule
```

On first runs, use `--gen-suppressions=yes` to build up the suppression file. Once the file is stable, remove `--gen-suppressions=yes` and use `--error-exitcode=1` to detect regressions.

## GDB GUI Front Ends

GDB has a command-line interface that is efficient and usable remotely over SSH. If you prefer a graphical view:

- **[KDbg](https://www.kdbg.org/)** — KDE-based GDB front end.
- **[DDD](https://www.gnu.org/software/ddd/)** — Data Display Debugger.
- **[VS Code](https://code.visualstudio.com/)** with the C/C++ extension — integrates GDB transparently.
- **[CLion](https://www.jetbrains.com/clion/)** — full IDE with built-in GDB/LLDB integration.

GUI front ends are especially convenient for inspecting multiple variables simultaneously. That said, learning the GDB command line pays off quickly: it works everywhere, including remote terminal sessions.

## Fedora: Automatic Bug Reporting Tool (ABRT)

Fedora includes ABRT, which can automatically generate backtraces for system-installed packages. To use it with aMule:

1. aMule must be installed from RPMFusion, or compiled with debug information using Fedora's wxGTK libraries.
2. In `/etc/abrt/abrt.conf`, set `OpenGPGCheck = no`.
3. After a crash, open the ABRT notification. Select **"Local GNU Debugger"** as the analyser and **"Logger"** as the output facility to write the backtrace to a file.
4. Attach the file to the GitHub issue.

## Gentoo: Splitdebug Build

On Gentoo, the recommended approach for debugging is:

1. Add `-ggdb` to `CFLAGS` and `FEATURES="splitdebug"` in `/etc/portage/make.conf`.
2. Emerge aMule with `USE="debug" emerge amule`.
3. After building, you can safely remove `-ggdb` and `splitdebug` from `make.conf`.

The split-debug packages keep debug symbols in a separate `.debug` directory, which GDB locates automatically.
