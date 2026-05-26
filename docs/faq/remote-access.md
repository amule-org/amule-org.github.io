---
id: remote-access
title: Remote Access FAQ
---

# Remote Access FAQ

Frequently asked questions about running aMule without a graphical interface and controlling it remotely via `amuled`, `amulecmd`, `amulegui`, and `amuleweb`.

---

## aMule Daemon (amuled)

### What is amuled?

`amuled` is a full-featured aMule that runs without any user interface. It has reduced memory and CPU requirements and can run on a headless server with no X display. It is controlled remotely via [`amuleweb`](/docs/user-guide/amule-components/amuleweb), [`amulecmd`](/docs/user-guide/amule-components/amulecmd), or [`amulegui`](/docs/user-guide/amule-components/amulegui) over the External Connections (EC) protocol.

:::caution
Do not set **Max Connections** higher than **1024** when using amuled. wxBase cannot handle more than 1024 simultaneous connections.
:::

See the [amuled documentation](/docs/user-guide/amule-components/amuled) for setup, configuration, and service installation details.

### How do I set up amuled as a system service?

See [Running as a System Service](/docs/user-guide/amule-components/amuled#running-as-a-system-service) in the amuled documentation for init scripts covering systemd, Debian/Ubuntu, Red Hat/Fedora, Gentoo, and SUSE/openSUSE.

---

## `amulecmd`

### How do I schedule actions or write scripts with amulecmd?

See [Scheduling with Cron](/docs/user-guide/amule-components/amulecmd#scheduling-with-cron) and [Useful Scripts](/docs/user-guide/amule-components/amulecmd#useful-scripts) in the `amulecmd` documentation.

---

## `amulegui`

### Is there a remote graphical client for amuled?

Yes. `amulegui` has been available since aMule 2.0.0-rc7. It provides the same interface as the monolithic `amule` client and connects to `amuled` over the EC protocol.

See the [`amulegui` documentation](/docs/user-guide/amule-components/amulegui) for compilation, setup, and connection instructions.

---

## `amuleweb`

### What is `amuleweb`?

`amuleweb` is a built-in web server that provides a browser-based interface for controlling aMule or amuled remotely. It listens for HTTP connections on port 4711 (default) and communicates with aMule over the EC protocol on port 4712.

See the [`amuleweb` documentation](/docs/user-guide/amule-components/amuleweb) for detailed setup instructions.

### How do I set up `amuleweb` with aMule v1?

**aMule v1 is strongly discouraged** — its `amuleweb` implementation has known security vulnerabilities. Upgrade to aMule v2 and follow the [`amuleweb` setup guide](/docs/user-guide/amule-components/amuleweb#step-by-step-setup).

### What should I see when `amuleweb` is running correctly?

After launching `amuleweb` in a terminal, you should see output like:

```
Web Server: Started
WSThread: Thread started
WSThread: created service
WSThread: created socket listening on :4711
amuleweb$
```

Then open a browser and navigate to `http://localhost:4711` (or the remote host's address).

### Can I run `amuleweb` as a daemon (background process)?

Since aMule 2.0.0-rc6, `amuleweb` supports the `--quiet` (`-q`) flag, which suppresses the interactive prompt and allows easy backgrounding:

```bash
amuleweb --quiet &
```

On older releases, run it inside a `screen` session:

```bash
screen -d -m -S amulewebsession amuleweb -p 7000 -pw yourpassword
```

Where `-p 7000` is the EC port and `-pw yourpassword` is your EC password. To reattach:

```bash
screen -r amulewebsession
```

