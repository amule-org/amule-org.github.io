---
id: bug-report
title: Bug Reports
---

Bug reports are a vital contribution to aMule. A problem cannot be fixed if it is not reported, and the faster and more accurately a bug is described, the sooner it can be resolved. This page explains, in plain terms, what to include in a report and how to find the information the developers need — **no programming or debugging experience required.**

## Where to File a Bug Report

Open an issue on the [aMule GitHub issue tracker](https://github.com/amule-org/amule/issues). You will need a GitHub account.

Before opening a new issue, search the existing issues to avoid duplicates, and give your report a clear, descriptive title.

:::tip aMule asks you to report crashes
When aMule crashes, it prints a message that already points you here and to the issue tracker, followed by a **backtrace**. That backtrace is one of the most valuable things you can include — see [If aMule Crashes](#if-amule-crashes-copy-the-automatic-backtrace) below.
:::

## What to Include in Every Report

A useful bug report contains at minimum:

| Field | How to obtain |
|---|---|
| **aMule version** | Run `amule --version` in a terminal. It prints something like `aMule 3.0.0 (OS: Linux)`. |
| **Operating system and version** | e.g. Windows 11, macOS 14.5, Ubuntu 24.04, Fedora 40 |
| **Steps to reproduce** | The exact sequence of actions that triggers the bug |
| **Expected behaviour** | What you expected to happen |
| **Actual behaviour** | What actually happened |
| **Log file** | Relevant lines from the aMule log — see [Finding the Log File](#finding-the-log-file) |
| **Crash backtrace** | For crashes and freezes — see [If aMule Crashes](#if-amule-crashes-copy-the-automatic-backtrace) |

Be as specific as possible. "aMule crashed" is not a useful report. "aMule crashed reproducibly when clicking the search button while connected to Kad, after approximately 20 seconds of searching, on Ubuntu 24.04 with aMule 3.0.0" is.

## Finding the Log File

aMule writes diagnostic output to a file named `logfile` inside its [configuration folder](../manual/configuration/config-files/index.md#platform-paths). Its location depends on your operating system:

| Platform | Log file path |
|---|---|
| **Windows** | `%APPDATA%\aMule\logfile` (typically `C:\Users\<you>\AppData\Roaming\aMule\logfile`) |
| **macOS** | `~/Library/Application Support/aMule/logfile` |
| **Linux / Unix / BSD** | `~/.aMule/logfile` |

A few useful notes:

- The remote GUI ([`amulegui`](../manual/interfaces/gui/amulegui.md)) uses a separate file named `remotelogfile` in the same folder.
- Each time aMule starts, it renames the previous log to `logfile.bak`, so the log from the session that crashed may be in the `.bak` file.
- When reviewing the log, the lines that matter most are those containing `ERROR`, `FATAL`, or `ASSERT`, especially the ones immediately before the problem occurred. Copy those lines (with a bit of surrounding context) into your report.

## If aMule Crashes: Copy the Automatic Backtrace

When aMule crashes, it **automatically writes a backtrace** — a snapshot of what the program was doing at the moment it failed — to the [log file](#finding-the-log-file), and to the terminal if you launched aMule from one. You do **not** need any special tools to obtain it; you just need to copy it.

The backtrace is wrapped in an easily recognizable block:

```
--------------------------------------------------------------------------------
A fatal error has occurred and aMule has crashed.
Please assist us in fixing this problem by reporting the backtrace below as a
GitHub issue, including as much information as possible regarding the
circumstances of this crash. Issue tracker:
    https://github.com/amule-org/amule/issues
----------------------------=| BACKTRACE FOLLOWS: |=----------------------------
Current version is: aMule 3.0.0
Running on: Linux ...

[the backtrace lines]
--------------------------------------------------------------------------------
```

**What to do:** open the log file, find this block, and copy **everything** from `A fatal error has occurred` down to the closing line of dashes. Paste it into your issue inside a code block (wrap it in triple backticks ` ``` ` so it stays readable).

### How Good Is Your Backtrace?

The usefulness of a backtrace depends on how aMule was built. If you installed aMule from your distribution's package manager, it usually contains enough information to show function names. Here is what each quality level looks like, from best to worst:

**Full — function names, file names, and line numbers (ideal):**

```
#0  0x000000000046fcab in CUpDownClient::ClearDownloadBlockRequests (this=0x45bf9e0)
    at BaseClient.cpp:1175
#1  0x00000000004d1480 in CUpDownClient::SetDownloadState (this=0x45bf9e0, byNewState=1 '\001')
    at DownloadClient.cpp:541
#2  0x00000000004703bd in CUpDownClient::Disconnected (this=0x45bf9e0,
    strReason=@0x7ffffc74e2b0, bFromSocket=false)
    at BaseClient.cpp:1239
```

**Partial — function names but no line numbers:**

```
#0  0x1003f604 in CUpDownClient::ClearDownloadBlockRequests ()
#1  0x10044978 in CUpDownClient::Disconnected ()
#2  0x1004d958 in CClientList::ProcessDirectCallbackList ()
```

**Least useful — only memory addresses:**

```
#0  0x000000000057b790 in ?? ()
#1  0x000000000051e66b in ?? ()
#2  0x000000000051edb6 in ?? ()
```

Copy whatever you get — even a partial backtrace helps. If you only see addresses and question marks (`?? ()`), mention that in the issue: the developers may ask you to generate a more detailed one, or to install a version with debug information.

## Advanced: Generating a Full Backtrace Yourself

If you are comfortable using a terminal and want to give the developers the most detailed information possible — running aMule under a debugger (GDB or LLDB), analyzing a core dump with `coredumpctl`, or checking for memory errors with Valgrind — see the developer guide:

➡️ **[Debugging with GDB and Valgrind](../developer/debugging.md)**

This is entirely optional. For most reports, the automatic backtrace and the log file are enough.
