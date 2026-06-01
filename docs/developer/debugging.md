---
id: debugging
title: Debugging
---

GDB and Valgrind are the two main tools for diagnosing crashes and memory errors in aMule. This page explains how to build aMule with debug symbols and how to use both tools effectively.

## aMule's Built-in Crash Backtrace

Before reaching for GDB, check what aMule already gives you. When aMule hits a fatal error (a crash) or a failed assertion, it **automatically writes a symbolized backtrace** to its `logfile` and to stderr — no debugger required. This is often enough to identify the faulty function, and it is the trace to paste when [filing a bug report](../contributing/bug-report.md).

The output looks like this:

```
--------------------------------------------------------------------------------
A fatal error has occurred and aMule has crashed.
...
----------------------------=| BACKTRACE FOLLOWS: |=----------------------------
Current version is: aMule 3.0.0
Running on: Linux ...

[backtrace with function names and source locations]
--------------------------------------------------------------------------------
```

**Getting a high-quality backtrace.** The amount of detail depends on what was available when aMule was compiled:

- Build with debug symbols (see below) so frames carry function names and line numbers.
- On Linux, install **`binutils-dev`** (`binutils-devel` on Fedora/openSUSE) before compiling. aMule's build auto-detects it (`HAVE_BFD`) and uses libbfd to resolve `function` + `file:line` for each frame, correctly translating addresses back through position-independent-executable (PIE) relocation.
- Without libbfd, aMule falls back to `execinfo` plus the `addr2line` utility, which still gives usable — if coarser — output.
- On Windows the backtrace is produced via `wxStackWalker`; on macOS via `dladdr`.

The GDB and Valgrind sections below are for when the built-in backtrace is not enough — live state inspection, memory corruption, use-after-free, leaks, or crashes that need a debugger attached at the moment of failure.

## Building aMule with Debug Symbols

A release build strips debug information to reduce binary size. To get meaningful debugging output, build in **Debug** mode. For the full dependency list and platform-specific build instructions, see the [Compilation guide](compilation/index.md).

```sh
cmake -B build \
    -DCMAKE_BUILD_TYPE=Debug \
    -DBUILD_MONOLITHIC=YES \
    -DBUILD_DAEMON=YES \
    -DBUILD_TESTING=YES
cmake --build build -j"$(nproc)"
```

The resulting binaries in `build/` contain full symbol information (function names, line numbers, local variable names). They are significantly larger than release builds — this is expected. A Debug build also defines the `__DEBUG__` preprocessor macro, which enables aMule's per-category runtime debug logging (see [Runtime Debug Logging](#runtime-debug-logging) below).

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
```

Verify installation:

```sh
which gdb
gdb --version
```

### Configuring GDB Signal Handling

aMule ignores `SIGPIPE` (so a dropped network socket doesn't kill the process) and installs handlers for `SIGINT`/`SIGTERM` (clean shutdown) and for `SIGSEGV`/`SIGBUS` (used to guard access to memory-mapped files). In addition, the glibc/NPTL threading layer that aMule runs on top of uses real-time signals (`SIG32`–`SIG34`) for its own bookkeeping. GDB stops on all of these by default, which would interrupt normal aMule execution. Configure GDB to pass the threading signals through by creating `~/.gdbinit`:

```
handle SIGPIPE nostop noprint pass
handle SIG32  nostop noprint pass
handle SIG33  nostop noprint pass
handle SIG34  nostop noprint pass
```

These settings are loaded automatically every time GDB starts.

### Running aMule Under GDB

```sh
gdb --args build/amule --disable-fatal
(gdb) run
```

The `--disable-fatal` (`-d`) switch is important here: by default aMule installs its own fatal-exception handler (`wxHandleFatalExceptions`), which catches the crash, prints the [built-in backtrace](#amules-built-in-crash-backtrace), and exits — so GDB never sees the signal. With `--disable-fatal`, aMule leaves the fault uncaught and GDB stops exactly at the point of the crash. Add `--log-stdout` (`-o`) if you also want aMule's log messages printed to the terminal during the session.

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

If aMule was not running under GDB when it crashed but the system generated a core dump, you can load it afterwards.

**On systemd-based distributions (most modern Linux),** the kernel pipes core dumps to `systemd-coredump`, which stores them compressed (zstd) under `/var/lib/systemd/coredump/` and indexes them in the journal. Retrieve them with `coredumpctl` — no `ulimit` needed:

```sh
coredumpctl list amule        # list captured crashes
coredumpctl gdb amule         # open the most recent core in GDB
```

`coredumpctl gdb` (equivalently `coredumpctl debug`) extracts the core, locates the matching executable, and launches GDB on it; then issue `bt`, `bt full`, etc. as usual.

**On systems without systemd-coredump,** enable plain core files by adding `ulimit -c unlimited` to `~/.bashrc` (or equivalent), then load the file manually:

```sh
gdb /path/to/amule /path/to/core.<pid>
```

(When `systemd-coredump` is active it intercepts the dump, so the legacy `ulimit -c` / `core.<pid>`-in-cwd path does not apply.)

### Build Settings That Degrade Debugging

Modern GDB (≥ 7.8) handles position-independent executables transparently and unwinds the stack from DWARF/`.eh_frame` data rather than frame pointers, so `-fPIE`/`-nopie` and `-fomit-frame-pointer` are **no longer issues** — aMule's own backtrace also relocates PIE addresses for you. The settings that still hurt are those that remove or obscure debug information:

| Setting | Effect | Fix |
|---|---|---|
| Stripped binary (`install-strip`, `-Wl,-s` / `-Wl,-S`) | Removes all debug symbols — backtraces show only addresses | Do not strip; debug from `build/` or keep a `.debug` file |
| Missing `-g` | No symbol/line information at all | Build with `-DCMAKE_BUILD_TYPE=Debug` (adds `-g`) |
| High optimization (`-O2` / `-O3`) | Functions get inlined and locals report `<optimized out>` | The Debug build uses `-O0`/`-Og`; prefer it when stepping through code |

### macOS: Use LLDB Instead of GDB

On macOS the supported debugger is **LLDB**, which ships with the Xcode Command Line Tools (`xcode-select --install`). GDB does **not** work for native debugging on Apple Silicon (arm64) and requires manual code-signing even on Intel, so `brew install gdb` is not recommended there. See [Building on macOS](compilation/macos.md) for the macOS toolchain setup.

LLDB takes the same role as GDB in this guide — run aMule under it with:

```sh
lldb -- build/amule --disable-fatal
(lldb) run
```

The commands used throughout this page map to LLDB as follows:

| GDB | LLDB |
|---|---|
| `run` | `run` |
| `bt` | `bt` (alias of `thread backtrace`) |
| `bt full` | `bt` then `frame variable` |
| `thread apply all bt` | `thread backtrace all` |
| `frame N` | `frame select N` |
| `info locals` | `frame variable` |
| `print expr` | `print expr` / `p expr` |
| `list` | `list` |

### GDB GUI Front Ends

GDB has a command-line interface that is efficient and usable remotely over SSH. If you prefer a graphical view:

- **[KDbg](https://www.kdbg.org/)** — KDE-based GDB front end.
- **[DDD](https://www.gnu.org/software/ddd/)** — Data Display Debugger.
- **[VS Code](https://code.visualstudio.com/)** with the C/C++ extension — integrates GDB transparently.
- **[CLion](https://www.jetbrains.com/clion/)** — full IDE with built-in GDB/LLDB integration.

GUI front ends are especially convenient for inspecting multiple variables simultaneously. That said, learning the GDB command line pays off quickly: it works everywhere, including remote terminal sessions.

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

- `--leak-check=full` — show a detailed report for each leak. Note this respects the default `--show-leak-kinds=definite,possible`, so it reports *definitely* and *possibly* lost blocks only. Add `--show-leak-kinds=all` to also include *reachable* and *indirectly lost* blocks.
- `--num-callers=20` — show 20 frames in each error report (default is 12; 20 gives better context).
- `--error-exitcode=1` — exit with a non-zero code if any errors were found (useful in CI).

These options are unchanged in the current Valgrind release (3.27.x).

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
    build/amule --enable-stdin
```

:::caution stdin must stay open
aMule closes `stdin` on startup. Valgrind's `--gen-suppressions=yes` prompt is interactive and reads from `stdin`, so you must pass aMule the `--enable-stdin` (`-i`) switch — otherwise the prompt cannot be answered. This switch exists specifically for this Valgrind workflow.
:::

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
    build/amule --enable-stdin
```

On first runs, use `--gen-suppressions=yes` (together with aMule's `--enable-stdin`) to build up the suppression file. Once the file is stable, remove `--gen-suppressions=yes` and use `--error-exitcode=1` to detect regressions.

## Runtime Debug Logging

Not every problem is a crash. For diagnosing protocol issues, transfer stalls, Kademlia behavior, or external-connection errors, aMule's per-category debug log is usually faster than a debugger.

aMule defines around 40 debug categories — for example `logClient`, `logPartFile`, `logServer`, `logKadMain`, `logEC` — each covering one subsystem. Each category can be enabled or disabled independently at runtime:

- In the **GUI**, enable the **Verbose** option in *Preferences → Debugging*, then tick the individual categories you want.
- In [`amule.conf`](/docs/manual/configuration/config-files/amule-conf#debugging), set `VerboseDebug=1` in the `[eMule]` section (and `VerboseDebugLogfile=1` to also route the output to the `logfile`). The per-category switches live in the `[Debug]` section.

:::note Debug builds only
The verbose debug log lines are compiled in only when aMule is built with `__DEBUG__` (a **Debug** build — see [above](#building-amule-with-debug-symbols)). In a release build these categories produce no output, and the `[Debug]` section of `amule.conf` is ignored.
:::

## Fedora: Core Dumps

On modern Fedora the developer-facing way to get a backtrace from a crash is `coredumpctl`, exactly as described in [Analyzing a Core File](#analyzing-a-core-file):

```sh
coredumpctl gdb amule
```

Install the debug symbols when prompted (`dnf debuginfo-install amule`, or build with debug information) so the backtrace is fully symbolized, then attach it to your [bug report](../contributing/bug-report.md).

Fedora also still ships **ABRT** for automatic crash reporting (the `gnome-abrt` GUI / `abrt-cli`), which can collect and report crashes of installed packages; for hand debugging a build from `build/`, `coredumpctl` is simpler.

## Gentoo: Splitdebug Build

On Gentoo, the recommended approach for debugging is:

1. Add `-ggdb3` to `CFLAGS`/`CXXFLAGS` and `FEATURES="splitdebug"` in `/etc/portage/make.conf`. Make sure `nostrip` is **not** in `FEATURES` — `splitdebug` works by copying the debug info out and then stripping the binary, so `nostrip` cancels it out. Optionally add `compressdebug` to shrink the saved symbols.
2. Emerge aMule with `USE="debug" emerge net-p2p/amule` (the `debug` USE flag is supported by the `net-p2p/amule` ebuild).
3. After building, you can safely remove `-ggdb3` and `splitdebug` from `make.conf`.

`splitdebug` keeps the debug symbols in separate `.debug` files under `/usr/lib/debug` and links each binary to them via a `.gnu_debuglink` ELF section, which GDB locates automatically.
