---
id: index
title: FAQ
---

# FAQ

Preguntas frecuentes sobre aMule, organizadas por tema.

| Sección | Contenido |
|---|---|
| [FAQ General](./general.md) | Interfaz de usuario, gestión de archivos, créditos, configuración, estadísticas, UPnP |
| [FAQ de Red y Conectividad](./network.md) | Protocolo eD2k, Kademlia, puertos, IDs, overhead de protocolo, configuración del navegador para ed2k:// |
| [FAQ de Acceso Remoto](./remote-access.md) | Resumen de `amuled` y configuración como servicio, scripting y programación de `amulecmd`, `amulegui`, `amuleweb` |

---

## Respuestas rápidas a las preguntas más comunes

**¿Dónde están mis archivos descargados?**
Por defecto en `~/.aMule/Incoming`. En macOS: `~/Library/Application Support/aMule/Incoming`.

**¿Por qué tengo una Low ID?**
→ El puerto TCP 4662 no es accesible desde internet. Ver [Red eD2k → ID alta e ID baja](../ed2k/ed2k-network.md) y [Probar tus puertos](../troubleshooting/fake-files-and-servers.md#testing-your-ports).

**Las descargas son muy lentas**
→ Revisa la [lista de verificación de velocidades lentas](../troubleshooting/slow-speeds.md#configuration-issues). La causa más frecuente es un límite de subida por debajo de 10 KBps.

**¿Qué puertos usa aMule?**
TCP 4662 (transferencias de archivos), UDP 4665 (búsquedas globales), UDP 4672 (Kademlia / valoración de cola), TCP 4711 (`amuleweb`), TCP 4712 (Conexiones Externas). Ver [Red eD2k → Puertos](../ed2k/ed2k-network.md).

**¿Cómo ejecuto aMule sin interfaz gráfica?**
Usa `amuled` (el daemon) y contrólalo con `amulecmd`, `amuleweb` o `amulegui`. Ver [FAQ de Acceso Remoto](./remote-access.md).

**¿Cómo cambio de eMule sin perder mis créditos?**
Copia `cryptkey.dat`, `clients.met`, `preferences.dat`, `preferencesKad.dat`, `key_index.dat`, `load_index.dat` y `src_index.dat` del directorio de configuración de eMule a `~/.aMule`. Ver [FAQ General → Cambiar de eMule](./general.md#how-can-i-switch-from-emule-to-amule-without-losing-my-credits).
