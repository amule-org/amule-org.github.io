---
id: ed2k-links
title: eD2k Links
---

An **eD2k link** is a URI that refers to a file, server, or server list in the eD2k network. aMule can process these links to add downloads to the queue, add servers to the server list, or import full server lists.

## Link Format

All eD2k links share the same basic structure: fields separated by pipe characters (`|`), with `ed2k://` as the protocol prefix.

```
ed2k://|TYPE|FIELDS|/
```

The pipe character (`|`) acts as a field delimiter. Always wrap an eD2k URL in double quotes on the command line to prevent the shell from interpreting `|` and `&` as special characters.

---

## File Links

A file link adds a file to your download queue.

### Basic syntax

```
ed2k://|file|NAME|SIZE|MD4-HASH|/
```

| Field | Description |
|---|---|
| `file` | Literal — indicates this is a file link |
| `NAME` | Filename (only informational; identity is determined by hash + size) |
| `SIZE` | File size in bytes |
| `MD4-HASH` | 32-character hex MD4 hash of the file |

### Optional fields

Additional fields can be appended after the MD4 hash (before the closing `/`):

| Field | Format | Description |
|---|---|---|
| Part hashes | `p=HASH1:HASH2:...` | MD4 hash of each chunk in order |
| Root Hash | `h=ROOTHASH` | AICH Root Hash (see [AICH](aich.md)) |
| URL sources | `s=URL` | Direct HTTP/FTP URL for the file (aMule silently ignores this) |

Sources are appended **after** the closing slash, in a separate field:

```
ed2k://|file|NAME|SIZE|MD4-HASH|/|sources,IP:PORT,IP:PORT,...|/
```

A hostname may be used instead of a raw IP address for sources.

### Examples

```
# Minimal file link
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|/

# With part hashes
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|p=HASH1:HASH2:HASH3|/

# With AICH Root Hash
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|h=AICHHASH|/

# With pre-seeded sources
ed2k://|file|example.zip|2407949|CC8C3B104AD58678F69858F1F9B736E9|/|sources,192.0.2.1:4662,198.51.100.5:4662|/
```

### Why the filename is irrelevant to identity

On the eD2k network, a file is identified **solely by its MD4 hash and its size**. Two files with the same name but different content have different hashes and are treated as completely different files. Two files with different names but identical content and size will be treated as the same file.

---

## Server Links

A server link adds a single server to your server list.

```
ed2k://|server|IP|PORT|/
```

| Field | Description |
|---|---|
| `server` | Literal — indicates this is a server link |
| `IP` | IP address of the server |
| `PORT` | Port where the server accepts eD2k connections |

### Example

```
ed2k://|server|195.245.244.243|4661|/
```

---

## Serverlist Links

A serverlist link imports a complete server list from a remote URL.

```
ed2k://|serverlist|ADDRESS|/
```

| Field | Description |
|---|---|
| `serverlist` | Literal — indicates this is a server list link |
| `ADDRESS` | Full URL to the server list file (including filename) |

If you already have a server list, the remote servers are merged into it. If you have no existing server list, the imported list replaces it.

---

## The `ed2k` Command

aMule installs a small utility called **`ed2k`** that allows you to add downloads from the command line or from a web browser. It communicates with aMule by writing to the **ED2KLinks file** (`~/.aMule/ED2KLinks`) — **not** through the External Connections interface.

### Usage

```bash
ed2k "ed2k://|file|NAME|SIZE|HASH|/"
```

The double quotes are required so the shell does not interpret the pipe characters (`|`) and ampersands (`&`) as special commands.

### Finding the `ed2k` binary

| Installation method | Typical path |
|---|---|
| Self-compiled aMule | `/usr/local/bin/ed2k` |
| Package-installed (most distros) | `/usr/bin/ed2k` |
| SuSE packages | `/usr/local/bin/ed2k` |
| Windows | `C:\Program Files\aMule\ed2k.exe` |

To find it on your system:
```bash
which ed2k
```

On Debian/Ubuntu you must install the **`amule-utils`** package (and also **`amule-ed2k`** on Debian) to get the `ed2k` utility.

---

## Browser Configuration — Local Handling

These configurations make the browser launch the local `ed2k` tool when you click an eD2k link. Replace `/path/to/ed2k` with your actual binary path.

### GNU/Linux

#### Firefox 2, 3, and later

**Per-user configuration:**

1. Type `about:config` in the address bar.
2. Right-click → **New → Boolean** → name: `network.protocol-handler.external.ed2k` → value: `true`
3. Right-click → **New → String** → name: `network.protocol-handler.app.ed2k` → value: `/usr/bin/ed2k`
4. *Firefox 3+ only:* Right-click → **New → Boolean** → name: `network.protocol-handler.expose.ed2k` → value: `false`

After saving, click an eD2k link. Firefox will ask which application to use — choose the `ed2k` binary.

> **Ubuntu Lucid users:** Set the value to `ed2k` (without path) instead of `/usr/bin/ed2k`.

**System-wide configuration (requires root):**

Open `/usr/share/firefox/greprefs/all.js` (or `/usr/local/share/firefox/greprefs/all.js`) in a text editor and append:

```javascript
// ED2K link handling
pref("network.protocol-handler.external.ed2k", true);
pref("network.protocol-handler.app.ed2k", "/path/to/ed2k");
```

For Firefox 3+, also add:
```javascript
pref("network.protocol-handler.expose.ed2k", false);
```

After saving, restart the browser.

**Adding multiple downloads at once:**

Set up Firefox as above, then install the **FireMule** extension for Firefox.

#### Iceweasel

Follow the Firefox per-user configuration above, then also add:

- Right-click → **New → Boolean** → name: `network.protocol-handler.warn-external.ed2k` → value: `true`

This forces Iceweasel to ask you which application to use (required for Iceweasel's behaviour).

#### Opera

Go to **Tools → Preferences → Programs → Add...**

- **Protocol:** `ed2k`
- **Open with another application:** `/path/to/ed2k`

![Opera preferences — Programs tab](/img/docs/Opera_preferences_programs.png)

![Opera protocols — ed2k entry](/img/docs/Opera_protocols_ed2k.png)

#### Konqueror

Find the KDE protocol directory:
```bash
find /usr -name "*.protocol"
# or
find /opt -name "*.protocol"
```

Create a file named `ed2k.protocol` in that directory:

```ini
[Protocol]
exec=/path/to/ed2k "%u"
protocol=ed2k
input=none
output=none
helper=true
listing=false
reading=false
writing=false
makedir=false
deleting=false
```

Restart Konqueror. A security warning may appear — this is normal; click OK. If the link is not processed after confirming, right-click the link and choose to open it in a new window/tab.

#### Galeon

Run these three commands to create the required GConf keys:

```bash
gconftool-2 -t string -s /desktop/gnome/url-handlers/ed2k/command "/usr/bin/ed2k \"%s\""
gconftool-2 -t bool   -s /desktop/gnome/url-handlers/ed2k/enabled true
gconftool-2 -t bool   -s /desktop/gnome/url-handlers/ed2k/needs_terminal false
```

Replace `/usr/bin/ed2k` with your actual path.

To uninstall:
```bash
gconftool-2 -u /desktop/gnome/url-handlers/ed2k --recursive-unset
```

#### Links / ELinks

Patch `url.c` — add the `ed2k` entry alongside `telnet` and `tn3270`:

```c
{"ed2k", 0, NULL, ed2k_func, 0, 0, 0},
```

In `links.h`, declare the function:
```c
void ed2k_func(struct session *, unsigned char *);
```

In `mailto.c`, implement it:
```c
void ed2k_func(struct session *ses, unsigned char *url) {
    tn_func(ses, url, options_get("network_program_ed2k"),
            TEXT(T_ED2K), TEXT(T_BAD_ED2K_URL));
}
```

In `options_register.c`, register the option:
```c
register_option_char("network_program_ed2k", TEXT(T_ED2K_PROG), NULL, 2);
```

In `intl/*.lng`, add after `T_TN3270_PROG`:
```
T_ED2K_PROG, "ed2k program",
```

After after `T_TN3270`:
```
T_ED2K, "ed2k",
```

And after `T_BAD_TN3270_URL`:
```
T_BAD_ED2K_URL, "Bad ed2k url",
```

Because Links slightly malforms URLs, create a wrapper script at `/usr/bin/ed2k4links.sh`:

```bash
#!/bin/bash
ed2k $(echo "ed2k://$1" | sed s/_/\|/g)
```

```bash
chmod a+x /usr/bin/ed2k4links.sh
```

In Links go to **Options → Network Options → Mail and Telnet Programs** and set the ed2k handler to:
```
ed2k4links.sh %
```

The `%` character is required.

### Windows

To make Windows recognise the `ed2k://` protocol, add entries to the registry. Create a file named `ed2k.reg` with the following content:

```reg
REGEDIT4

[HKEY_CLASSES_ROOT\ed2k]
@="URL: ed2k Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\ed2k\DefaultIcon]
@="C:\\Program Files\\aMule\\amulegui.exe"

[HKEY_CLASSES_ROOT\ed2k\shell]
@="open"

[HKEY_CLASSES_ROOT\ed2k\shell\open]

[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\ed2k\" \"%1\""
```

Double-click the `.reg` file to import it. Internet Explorer will then recognise ed2k links without further configuration.

If your aMule configuration directory is in a non-default location (e.g. `D:\amule\config`), pass it with the `-c` flag:

```reg
[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\ed2k\" -c d:\\amule\\config \"%1\""
```

### macOS

1. Run aMule at least once to register it with the OS.
2. Open Safari (even if you normally use another browser).
3. Navigate to a page containing an eD2k link.
4. **Drag the link** to Safari's address bar.
5. The OS will display a dialog asking whether to allow the helper program — allow it.

**Safari:** You must drag the link to the address bar each time. Safari does not process non-Apple protocol links when clicked.

**Firefox on macOS:** After the initial OS dialog, clicking links will work automatically.

---

## Browser Configuration — Remote Handling

Remote handling allows you to click an eD2k link in a browser anywhere in the world and have it added to aMule running on your home machine. This works via **aMuleCMD** instead of the local `ed2k` command. aMule must be running with External Connections enabled.

### Linux

Instead of calling `ed2k`, use `amulecmd`:

```bash
/path/to/amulecmd -h SERVER_IP -P PASSWORD -c "Add %u"
```

Replace `SERVER_IP` with your home machine's IP (or DNS name) and `PASSWORD` with the External Connections password set in **Preferences → Remote Controls**.

**Firefox note:** Firefox cannot launch a command with arguments directly. Create a shell script:

```bash
#!/bin/bash
/path/to/amulecmd -h SERVER_IP -P PASSWORD -c "Add $1"
```

Make it executable (`chmod +x`) and point Firefox's ed2k handler to this script.

### Windows — 32-bit

Create `C:\Program Files\aMule\ed2k_remote.bat`:

```bat
@echo off
set link=%1
for /f "useback tokens=*" %%a in ('%link%') do set link=%%~a
"c:\Program Files\aMule\amulecmd.exe" /h SERVER /P PASSWORD /c "add %link%"
```

Replace `SERVER` and `PASSWORD` with your data.

Create `ed2k_remote.reg`:

```reg
REGEDIT4

[HKEY_CLASSES_ROOT\ed2k]
@="URL: ed2k Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\ed2k\DefaultIcon]
@="C:\\Program Files\\aMule\\amulegui.exe"

[HKEY_CLASSES_ROOT\ed2k\shell]
@="open"

[HKEY_CLASSES_ROOT\ed2k\shell\open]

[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files\\aMule\\ed2k_remote.bat\" \"%1\""
```

### Windows — 64-bit

Create `C:\Program Files (x86)\aMule\ed2k_remote.bat`:

```bat
@echo off
set link=%1
for /f "useback tokens=*" %%a in ('%link%') do set link=%%~a
"c:\Program Files (x86)\aMule\amulecmd.exe" /h SERVER /P PASSWORD /c "add %link%"
```

Create `ed2k_remote_64.reg`:

```reg
REGEDIT4

[HKEY_CLASSES_ROOT\ed2k]
@="URL: ed2k Protocol"
"URL Protocol"=""

[HKEY_CLASSES_ROOT\ed2k\DefaultIcon]
@="C:\\Program Files (x86)\\aMule\\amulegui.exe"

[HKEY_CLASSES_ROOT\ed2k\shell]
@="open"

[HKEY_CLASSES_ROOT\ed2k\shell\open]

[HKEY_CLASSES_ROOT\ed2k\shell\open\command]
@="\"C:\\Program Files (x86)\\aMule\\ed2k_remote.bat\" \"%1\""
```

### Windows — Browser-specific notes

| Browser | Action required |
|---|---|
| **Internet Explorer** | Registry changes above are sufficient |
| **Safari** | Uses registry settings like IE |
| **Chrome** | Uses registry settings; asks for confirmation once — tick "Don't ask again" |
| **Firefox** | After registry + batch file, clicking an ed2k link asks to confirm — tick "Remember" |
| **Opera** | Go to **Preferences → Programs → Add...** and enter the `ed2k` protocol pointing to the `.bat` file |

![Firefox ed2k confirmation dialog](/img/docs/Firefox_ed2k_link.png)

![Firefox with ed2k link handling — Firefox 3 example](/img/docs/Ed2k-ff3.png)
