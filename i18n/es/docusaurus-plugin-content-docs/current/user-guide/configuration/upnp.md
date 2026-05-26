---
id: upnp
title: UPnP (Universal Plug and Play)
---

**Universal Plug and Play (UPnP)** permite que aMule configure automáticamente el reenvío de puertos en tu router, siempre que el router soporte UPnP. Cuando UPnP está disponible y funciona correctamente, no es necesario reenviar los puertos manualmente como se describe en [Cortafuegos y configuración del router](firewall.md).

El soporte UPnP se introdujo en aMule CVS alrededor de diciembre de 2006 y está disponible en todas las versiones desde 2.2.x en adelante.

---

## Requisitos

UPnP en aMule requiere la biblioteca externa **libupnp**.

| Versión de aMule | Versión de libupnp requerida |
|---|---|
| Hasta 2.2.0 | 1.4.1 (recomendada) |
| 2.2.1 y posteriores | 1.6.x |

### Instalación de libupnp

**Desde el código fuente:** Descarga el tarball desde la [página del proyecto libupnp en SourceForge](https://sourceforge.net/projects/pupnp/).

**Desde paquetes de distribución:**

| Distribución | Método |
|---|---|
| Ubuntu | Incluido en los repositorios oficiales (`apt-get install libupnp-dev`) |
| Fedora Core 4, 5, 6 | Incluido en Fedora Extras |
| OpenSUSE 10.2 | Disponible en el repositorio de Gerd78 |
| Slackware 12.x | Disponible en [slacky.eu](http://www.slacky.eu/) |

---

## Activar UPnP en aMule

UPnP se activa y configura en **Preferencias → Conexión**. Cuando libupnp está instalado y aMule está compilado con soporte UPnP, la opción UPnP aparece en la pestaña de preferencias de Conexión.

Si UPnP funciona correctamente, aMule registrará automáticamente los mapeos de puerto para los puertos TCP y UDP en tu router. Puedes verificar la conectividad en la [página de prueba de puertos](https://www.amule.org/testport.php).

---

## UPnP y cortafuegos personales

Si tu equipo ejecuta un cortafuegos de software (por ejemplo iptables), UPnP también requiere abrir puertos en el cortafuegos local. Consulta la sección [Cortafuegos — UPnP](firewall.md#kademlia-y-upnp) para las reglas iptables necesarias:

- TCP entrante en el puerto UPnP (por defecto 50000, configurable)
- UDP entrante desde el puerto 1900 de tu router (anuncios SSDP)

---

## Problemas conocidos

- UPnP requiere que el router soporte y tenga activado el protocolo UPnP. No todos los routers lo soportan, y algunos requieren que se active en la configuración del router.
- Algunos routers reasignan el puerto UDP de origen en los paquetes salientes incluso con UPnP activo. Si Kademlia sigue mostrando «behind firewall» después de activar UPnP, consulta la página [Cortafuegos](firewall.md#kademlia-y-upnp) para la regla `no nat` de pf (OpenBSD) o el equivalente para tu router.
- Si experimentas problemas con UPnP, usa el reenvío manual de puertos descrito en [Cortafuegos y configuración del router](firewall.md).
