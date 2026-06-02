---
id: index
title: Utilities
---

Besides the main client and its [interfaces](../interfaces/index.md), aMule ships several **standalone utilities** that cover specific tasks: adding eD2k links to a running instance, generating eD2k links for local files, and displaying aMule statistics. They run independently of the main client (some need no running aMule instance at all) and are available in `--disable-monolithic` builds.

| Utility | Description |
|---|---|
| [`ed2k`](./ed2k.md) | Command-line handler that adds `ed2k://` links to a running aMule instance through the `ED2KLinks` file. It is also the binary web browsers invoke when the user clicks an `ed2k://` link. |
| [`alc` / `alcc`](./alc-alcc.md) | ALinkCreator — generates eD2k links for files on your local filesystem. `alc` is graphical, `alcc` is command-line. Both work without a running aMule instance. |
| [`wxcas` / `cas`](./wxcas-cas.md) | Statistics tools that read aMule's online signature file (`amulesig.dat`) and report its status. `wxcas` is graphical; `cas` outputs console text, a PNG image, or an HTML page. |

:::note
aMule also ships [`fileview`](../../developer/file-formats/fileview.md), a console tool that dumps the decoded contents of aMule's binary data files (`server.met`, `nodes.dat`, `*.part.met`, …). It is a developer diagnostic tool, so it is documented in the Developer Guide.
:::
