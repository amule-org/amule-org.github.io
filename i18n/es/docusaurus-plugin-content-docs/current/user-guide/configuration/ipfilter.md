---
id: ipfilter
title: Filtro de IP
---

El filtro de IP bloquea todo el tráfico hacia y desde una lista configurable de direcciones IP y rangos de IP. Las IPs bloqueadas no pueden subir datos a ti ni descargar de ti.

El filtro se lee de dos archivos en `~/.aMule/`:

| Archivo | Descripción |
|---|---|
| `ipfilter.dat` | Lista de filtro principal. Se descarga de fuentes externas o se mantiene manualmente. |
| `ipfilter_static.dat` | Lista de filtro estática. Siempre activa, independientemente de la lista dinámica. Sus entradas no se pueden anular. |

Para más información sobre los formatos de archivo, consulta [Archivos de aMule](../amule-files/index.md).

El `ipfilter.dat` de aMule es 100% compatible con el de eMule.

---

## Activar y configurar el filtro de IP

El filtro de IP se controla en **Preferencias → Seguridad → Filtrado de IP**:

| Ajuste | Descripción |
|---|---|
| **Activar filtrado de IP** | Activar o desactivar el filtro. |
| **Nivel de filtrado** | Nivel de acceso del filtro (0–255). Las entradas en `ipfilter.dat` con nivel de acceso inferior a este valor son bloqueadas. Valores comunes: `0` = solo las IPs más peligrosas; `127` = equilibrado; `255` = paranoico. |
| **Filtrar siempre IPs de LAN** | Bloquear siempre IPs que afirmen pertenecer a una red local. |
| **Actualizar automáticamente ipfilter al iniciar** | Descargar una versión actualizada de `ipfilter.dat` desde la URL indicada cada vez que aMule se inicia. |
| **URL** | URL del archivo `ipfilter.dat` para la actualización automática. |
| **Actualizar ahora** | Descargar el filtro desde la URL inmediatamente. |
| **Recargar lista** | Recargar `ipfilter.dat` desde disco y verificar todas las conexiones activas. |

En versiones de aMule anteriores a 2.0.0-rc8, las opciones de filtrado de IP se encuentran en **Preferencias → Servidor** en lugar de **Preferencias → Seguridad**.

---

## Usar un ipfilter.dat del sistema

Por defecto aMule carga `~/.aMule/ipfilter.dat`. Si activas **Usar ipfilter.dat del sistema si está disponible** (en **Preferencias → Seguridad**), aMule buscará también `/usr/share/amule/ipfilter.dat` si la carga del archivo local falla. Esto permite que el archivo del sistema sea mantenido por un gestor de paquetes o cron.

Esta opción está desactivada por defecto en la versión estable 2.2.2.

---

## Fuentes de filtros de IP

La única fuente actualmente mantenida es la lista del proyecto eMule Security. aMule la descarga y descomprime automáticamente:

```
https://upd.emule-security.org/ipfilter.zip
```

Introduce esta URL en **Preferencias → Seguridad → Filtrado de IP → URL**. Para más detalles sobre el formato del archivo y la configuración, consulta [Archivos de aMule → ipfilter.dat](../amule-files/index.md).

---

## Filtro de IP integrado en aMule

Independientemente del contenido de `ipfilter.dat`, aMule siempre filtra los siguientes rangos de IP definidos en el [RFC 3330](https://www.rfc-editor.org/rfc/rfc3330). Representan direcciones reservadas, privadas o de uso especial que nunca deberían aparecer como peers de eD2k:

```
0.0.0.0/8         Red "this"                           [RFC1700, página 4]
10.0.0.0/8        Redes de uso privado                 [RFC1918]
14.0.0.0/8        Redes de datos públicos              [RFC1700, página 181]
24.0.0.0/8        Redes de televisión por cable
39.0.0.0/8        Reservado, pendiente de asignación   [RFC1797]
127.0.0.0/8       Loopback                             [RFC1700, página 5]
128.0.0.0/16      Reservado, pendiente de asignación
169.254.0.0/16    Link Local
172.16.0.0/12     Redes de uso privado                 [RFC1918]
191.255.0.0/16    Reservado, pendiente de asignación
192.0.0.0/24      Reservado, pendiente de asignación
192.0.2.0/24      Red de prueba (Test-Net)
192.88.99.0/24    6to4 Relay Anycast                   [RFC3068]
192.168.0.0/16    Redes de uso privado                 [RFC1918]
198.18.0.0/15     Pruebas de rendimiento de dispositivos
                  de interconexión de red              [RFC2544]
223.255.255.0/24  Reservado, pendiente de asignación
224.0.0.0/4       Multicast                            [RFC3171]
240.0.0.0/4       Reservado para uso futuro            [RFC1700, página 4]
```

Para dejar de filtrar estos rangos, desmarca **Preferencias → Seguridad → Filtrado de IP → Filtrar siempre IPs malas**. En versiones anteriores a 2.0.0-rc8, esta opción está en **Preferencias → Servidor → Filtrar siempre IPs malas**.
