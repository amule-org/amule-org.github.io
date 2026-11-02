---
id: remote-access
title: Remote Access
---

Problems connecting to aMule remotely via [`amuleapi`](../interfaces/amuleapi/index.md), [`amulecmd`](../interfaces/amulecmd.md) or [`amuleweb`](../interfaces/amuleweb.md). For an overview of the remote-control tools, see the [Remote Access FAQ](../faq.md#remote-access).

## `amulecmd`

### I cannot connect to `amuled` — it doesn't seem to be listening. What's wrong?

You have probably not enabled **External Connections**. Open aMule (or [`amulegui`](../interfaces/gui/amulegui.md)), go to [**Preferences → Remote Controls**](../interfaces/gui/preferences.md#remote-controls), check **Accept External Connections**, and set a password. The setting is stored in the [`[ExternalConnect]` section of `~/.aMule/amule.conf`](../configuration/config-files/amule-conf.md#externalconnect-section).

You can also generate the `ECPassword` hash manually:

```bash
echo -n 'yourpassword' | md5sum | cut -d ' ' -f 1
```

Paste the resulting MD5 hash as the value of `ECPassword` in `~/.aMule/amule.conf`. See [`amulecmd` → Configuration](../interfaces/amulecmd.md#configuration) for the full setup.

**Connecting from another machine?** By default, a new configuration listens for EC connections only on the local machine (`ECAddress=127.0.0.1`), so only local tools can connect; a configuration created by an older version keeps its previous value (usually empty = all interfaces). For remote access, set `ECAddress` to the machine's LAN IP address, or leave it empty to listen on all interfaces. Also make sure the EC port (`4712` by default) is reachable: see [Ports used by aMule](../configuration/network-connectivity.md#ports-used-by-amule) and the [Firewall](../configuration/firewall.md) guide.

## Remote connections

### Why does connecting fail with "Could not resolve … to an IPv4 address."?

The host you gave has no IPv4 (A) record: the remote tools ([`amulegui`](../interfaces/gui/amulegui.md), [`amuleapi`](../interfaces/amuleapi/index.md), [`amulecmd`](../interfaces/amulecmd.md), [`amuleweb`](../interfaces/amuleweb.md)) resolve the core's hostname to IPv4 only (see [IPv4 only](../configuration/network-connectivity.md#ipv4-only)). Use the core's IPv4 address instead, or a hostname that resolves to it. `localhost` always works: it resolves to `127.0.0.1`.

### Why does the remote GUI or the Web UI refuse to change the download or shared folders?

A remote client ([`amulegui`](../interfaces/gui/amulegui.md), the [`amuleapi`](../interfaces/amuleapi/index.md) Web UI or another EC client) can only set the Incoming, Temporary, shared and category folders inside a list of allowed folders kept on the machine that runs the core. The list is **empty by default**, so every remote folder change is refused until you add folders to it: `amulegui` shows *The daemon refused these folders because they are outside the folders it allows*, and `amuleapi` answers `403 path_not_allowed`. Folders already configured keep working.

Add the folders under **Folders remote clients may use** in [**Preferences → Remote Controls**](../interfaces/gui/preferences.md#remote-controls) of the monolithic aMule, or, for `amuled`, in its `allowed-remote-dirs.dat` file followed by a restart. See [Changing Folders from a Remote Client](../configuration/directories.md#changing-folders-from-a-remote-client).

### Why can't I change some preferences from the remote GUI or the Web UI?

Some settings only make sense on the machine that runs the core, so remote clients cannot change them: the `ffprobe` path, the online-signature folder and **Follow symbolic links in shared folders**. `amulegui` shows them read-only, and `amuleapi` refuses a change to any of them with `400 read_only_field`. Change them in the local aMule window or in [`amule.conf`](../configuration/config-files/amule-conf.md).

## `amuleapi`

### Why do my changes in the Web UI fail with 403 behind a reverse proxy?

`amuleapi` refuses changes that come from another origin (another site, or another port of the same host) with `403 forbidden` (*cross-origin request refused*). Older browsers are checked against the `Host` header, so a reverse proxy that sends `amuleapi` its own address as `Host` must pass the name the browser used in `X-Forwarded-Host`, for example in nginx:

```nginx
proxy_set_header X-Forwarded-Host $http_host;
```

See the [`amuleapi` security model](../interfaces/amuleapi/index.md#security-model).

## `amuleweb`

### Why can't guests log in to `amuleweb`?

A guest password alone does not let a guest log in: guest access must also be turned on, with **Enable Low rights User** in [**Preferences → Remote Controls → Web server parameters**](../interfaces/gui/preferences.md#web-server-parameters) when aMule starts `amuleweb`, or with `--allow-guest` when you start it yourself. When a guest password is set but guest access is off, `amuleweb` prints *a guest password is set, but guest access is disabled* at startup. Guests are read-only and cannot add downloads.

### Why is `amuleweb` failing to connect?

Verify that the [`amuleweb`](../interfaces/amuleweb.md) binary and the [`amuled`](../interfaces/amuled.md)/[`amule`](../interfaces/gui/amule.md) binary come from **the same release**. `amuleweb` and aMule binaries from different releases negotiate the [EC protocol](../../developer/ec-protocol.md) version on connect, and a mismatch is rejected with *"Invalid protocol version."*

If both binaries match, the failure is usually a wrong EC password, host, or port, or External Connections not being enabled on the aMule side — check the [amulecmd connection answer above](#i-cannot-connect-to-amuled--it-doesnt-seem-to-be-listening-whats-wrong) and follow the [`amuleweb` step-by-step setup](../interfaces/amuleweb.md#step-by-step-setup).

### Why do I always get "No password specified, login will not be allowed."?

This message means the **legacy WebUI has no admin password and no guest password set** — it is about the web server login, not the [EC password](../configuration/config-files/amule-conf.md#externalconnect-section) used to reach `amuled`. Without at least one password, `amuleweb` refuses every login.

To fix it, set the legacy WebUI admin password:

- When running `amuleweb` standalone, pass `--admin-pass` (or write it to the config first with `--write-config`). See [Password Setup](../interfaces/amuleweb.md#password-setup) and the [Step-by-Step Setup](../interfaces/amuleweb.md#step-by-step-setup).
- When `amuleweb` is launched automatically by the monolithic [`amule`](../interfaces/gui/amule.md), set it in [**Preferences → Remote Controls → Web server parameters**](../interfaces/gui/preferences.md#web-server-parameters).

After saving, check the [`[WebServer]` section of `~/.aMule/remote.conf`](../configuration/config-files/remote-conf.md#webserver-section) and verify that `AdminPassword` (and `GuestPassword`, if you allow guest access) contain a **hashed 32-character hexadecimal string**, not a plaintext password and not an empty value.

### Why does the legacy WebUI keep going back to the login page?

Try **deleting the cookies** for the `amuleweb` domain in your browser. `amuleweb` tracks logins with an `amuleweb_session_id` session cookie, and a stale or corrupted cookie from a previous session can cause this loop.

If clearing cookies does not help and the loop happens from the very first login attempt, the cause is usually a missing legacy WebUI password rather than the cookie — see [the answer above](#why-do-i-always-get-no-password-specified-login-will-not-be-allowed). Refer to the [`amuleweb`](../interfaces/amuleweb.md) documentation for full setup details.
