# Plan de reestructuración de la documentación

## Contexto

La documentación actual (un único `docsSidebar` con 8 grupos) mezcla tres audiencias.
El objetivo es separarla en **tres categorías de nivel superior dentro de un único sidebar**:

1. **Manual de Usuario** — instalar, configurar, usar y resolver problemas (usuarios básicos
   y expertos). Organizado en capas **Núcleo / Interfaces / Utilidades** porque los módulos
   comparten GUI y configuración.
2. **Guía de Desarrollador** — protocolo EC, compilación, referencia de formatos binarios,
   estilo de código, depuración, testing, contribución.
3. **Redes P2P (eD2k & Kademlia)** — protocolo y referencia histórica, sin mezclar con la
   implementación concreta de aMule.

**Nota i18n importante:** `i18n/es/docusaurus-plugin-content-docs/current/` solo contiene
`index.md`; el resto del contenido en español cae a inglés (sin traducir). Por tanto, mover
ficheros en `docs/` **no** requiere mover espejos en español. La única tarea i18n por fase es
actualizar las etiquetas de categoría en
`i18n/es/docusaurus-plugin-content-docs/current.json` (sus claves derivan del label inglés del
sidebar, así que cambian al renombrar/reorganizar categorías).

## Principio de fases

**Cada fase es ejecutable de forma independiente y deja `npm run build` en verde.** Si una fase
mueve ficheros, esa misma fase incluye: el `git mv`, la actualización de `sidebars.ts`, la
corrección de todos los enlaces internos afectados, y la actualización de `current.json`. Las
**fases 1–3 solo mueven ficheros** (sin partir contenido). Las **divisiones de ficheros** se
hacen en fases posteriores (4–6).

La red de seguridad es el verificador de enlaces rotos (`onBrokenLinks: 'throw'`): tras cada
fase, el build falla si queda algún enlace apuntando a una ruta antigua.

---

## Estructura objetivo (al terminar todas las fases)

```
Overview                          docs/index.md
Quick Start                       docs/quickstart-guide.md

▾ Manual de Usuario               docs/manual/
  Instalación                       installation/
  ▾ Núcleo aMule                    core/
      Conseguir High ID               get-high-id.md
      Carpetas · Firewall · UPnP · Proxy · IP Filter · Eventos
      ▾ Ficheros de configuración     core/config-files/
          Resumen de ficheros y carpetas   index.md
          amule.conf · remote.conf
  ▾ Interfaces                      interfaces/
      (intro: habilitar External Connections + contraseña)   index.md
      ▾ GUI (amule + amulegui)      interfaces/gui/
          amule · amulegui · Preferencias · Skins
          ▾ Uso                     interfaces/gui/usage/  (15 páginas)
      Daemon (amuled) · Web (amuleweb) · Línea de comandos (amulecmd)
  ▾ Utilidades                      utilities/
      alc / alcc · ed2k · cas / wxcas · amulesig.dat · Ficheros CAS
  Migración · Resolución de problemas · FAQ

▾ Guía de Desarrollador           docs/development/
  Arquitectura · Estilo de código · Depuración · Testing · Protocolo EC
  ▾ Compilación (windows · macos · linux · bsd)
  ▾ Referencia de formatos binarios   development/file-formats/
      Resumen (preferences.dat, preferencesKad.dat, cryptkey.dat, known.met,
               known2_64.met, canceled.met, key_index/load_index)
      server.met · nodes.dat · clients.met · emfriends.met · part.met
  ▾ Contribuir (bug-reports · translations · documentation)

▾ Redes P2P (eD2k & Kademlia)     docs/ed2k/  (sin mover)
  index · ed2k-network · ed2k-servers · ed2k-clients · ed2k-links
  kademlia · high-id-low-id · aich · secure-user-identification · concepts · other-networks
```

---

## Fase 1 — Redes P2P: reetiquetar (sin mover ficheros)

La fase más aislada. Los ficheros `ed2k/*` permanecen en su sitio.

- `sidebars.ts`: renombrar la categoría `eD2k & Kademlia` → **`P2P Networks (eD2k & Kademlia)`**.
- `current.json`: renombrar la clave de label a la nueva categoría → es: **`Redes P2P (eD2k y Kademlia)`**.
- Sin moves, sin cambios de enlaces.

**Verificación:** `npm run build` verde. La tercera categoría ya aparece con su nombre final.

---

## Fase 2 — Guía de Desarrollador: consolidar (solo moves)

- `git mv contributing/{index,bug-reports,translations,documentation}.md` → `development/contributing/`
- `git mv user-guide/amule-files/{server-met,nodes-dat,clients-met,emfriends-met,part-met}.md`
  → `development/file-formats/`
- `sidebars.ts`:
  - Renombrar categoría `Development` → **`Developer Guide`**.
  - Anidar `Contributing` como subcategoría de Developer Guide (ya no es de nivel superior).
  - Añadir subcategoría **`Binary File Formats`** con los 5 ficheros movidos
    (`link: {type:'generated-index'}` de momento; el `index.md` propio se crea en la Fase 4).
- **Enlaces a corregir** (apuntan a ficheros movidos):
  - Referencias a `contributing/...` (p. ej. `troubleshooting/remote-access.md` → bug-reports;
    `faq/*`, `development/debugging.md`).
  - Referencias a `amule-files/{server-met,...}` desde `user-guide/amule-files/index.md` y otros
    (reapuntar a `../../development/file-formats/...`).
- `current.json`: actualizar labels de `Development`/`Contributing`.

**Verificación:** `npm run build` verde; las 5 páginas de formato binario y Contribuir cuelgan de
Developer Guide.

---

## Fase 3 — Manual de Usuario: crear `docs/manual/` (solo moves)

Mueve **todo** el contenido de usuario a `docs/manual/` conservando los ficheros enteros
(las divisiones de `amule-files/index.md`, `get-high-id` y EC se hacen en fases posteriores).

Moves (`git mv`):

| Origen | Destino |
|---|---|
| `user-guide/installation/index.md` | `manual/installation/index.md` |
| `user-guide/configuration/{get-high-id,download-folders,firewall,upnp,proxy,ipfilter,events}.md` | `manual/core/` |
| `user-guide/amule-files/{amule-conf,remote-conf}.md` | `manual/core/config-files/` |
| `user-guide/amule-files/index.md` | `manual/core/config-files/index.md` (entero, aún con specs binarias) |
| `user-guide/amule-components/{amule,amulegui}.md` | `manual/interfaces/gui/` |
| `user-guide/configuration/{preferences,skins}.md` | `manual/interfaces/gui/` |
| `user-guide/usage/*.md` (incl. `index.md`) | `manual/interfaces/gui/usage/` |
| `user-guide/amule-components/index.md` | `manual/interfaces/index.md` |
| `user-guide/amule-components/{amuled,amuleweb,amulecmd}.md` | `manual/interfaces/` |
| `user-guide/amule-components/{alc-alcc,cas-wxcas}.md` | `manual/utilities/` |
| `user-guide/amule-components/ed2k-cli.md` | `manual/utilities/ed2k.md` |
| `user-guide/amule-files/{amulesig-dat,cas}.md` | `manual/utilities/` |
| `user-guide/migration/*.md` | `manual/migration/` |
| `troubleshooting/*.md` | `manual/troubleshooting/` |
| `faq/*.md` | `manual/faq/` |

- `sidebars.ts`: construir la categoría completa **`User Manual`** (Núcleo / Interfaces /
  Utilidades / Migración / Troubleshooting / FAQ). Eliminar las categorías sueltas antiguas
  (User Guide, Troubleshooting, FAQ de nivel superior). **El sidebar queda en su forma final de 3
  categorías.**
- **Enlaces a corregir:** todas las rutas relativas entre los ficheros movidos y hacia/desde
  `ed2k/*` y `development/*` (decenas). Apoyarse en el build para detectarlas.
- `current.json`: añadir/renombrar labels de las nuevas categorías (User Manual, aMule Core,
  Configuration files, Interfaces, GUI, Usage, Utilities) y eliminar las obsoletas.

**Verificación:** `npm run build` verde; el sidebar muestra exactamente Overview + Quick Start +
3 categorías.

---

## Fase 4 — División: extraer formatos binarios

Primera **división de contenido**. Partir `manual/core/config-files/index.md`:

- **Permanece en el Manual** (`manual/core/config-files/index.md`): tabla "All files at a glance",
  directorios y descripciones de ficheros de **texto editables** (`staticservers.dat`,
  `addresses.dat`, `shareddir*.dat`, `ipfilter.dat`, `ipfilter_static.dat`, `ED2KLinks`,
  `onlinesig.dat`, `muleLock`, `logfile`, `lastversion`, `last_version_check`, deprecados).
- **Se mueve a la Guía de Desarrollador** (`development/file-formats/index.md`): specs binarias
  inline (`preferences.dat`, `preferencesKad.dat`, `cryptkey.dat`, `known.met`, `known2_64.met`,
  `canceled.met`, `key_index.dat`/`load_index.dat`, `GeoLite2-Country.mmdb`). Sustituye al
  `generated-index` provisional de la Fase 2.
- En la tabla resumen del Manual, **enlazar** las entradas binarias a sus páginas en la Guía de
  Desarrollador.

**Verificación:** `npm run build` verde; `Binary File Formats` tiene índice propio con contenido.

---

## Fase 5 — Divisiones y deduplicaciones restantes

- **High ID:** dejar en `manual/core/get-high-id.md` solo el "cómo conseguir High ID en aMule"
  (puertos, port forwarding); mover la teoría del protocolo a `ed2k/high-id-low-id.md` y enlazar.
- **Acceso remoto:** consolidar `manual/troubleshooting/remote-access.md` +
  `manual/faq/remote-access.md` en una sola página (solapamiento del audit).
- **EC:** confirmar separación — pasos de usuario para habilitar EC en `manual/interfaces/index.md`;
  especificación del protocolo en `development/ec-protocol.md` (enlazadas).
- **Redes P2P:** revisar `ed2k/*` para que el comportamiento específico de aMule se enlace al
  Manual en vez de describirse como si fuera el protocolo.

**Verificación:** `npm run build` verde; sin redundancias entre Manual y Redes P2P.

---

## Fase 6 — Pulido de índices y verificación final

- Redactar `index.md` con introducción para las categorías nuevas: `manual/index.md`,
  `manual/core/index.md`, `manual/interfaces/gui/index.md`, `manual/interfaces/gui/usage/index.md`,
  `manual/utilities/index.md`.
- Verificación final:
  1. `npm run build` sin errores ni warnings.
  2. `npm run serve`: sidebar con 3 categorías; la búsqueda (solo en build de producción)
     encuentra páginas por su nuevo path.
  3. `grep -rn "user-guide/\|amule-components\|amule-files" docs/ i18n/` no devuelve enlaces vivos.
```
