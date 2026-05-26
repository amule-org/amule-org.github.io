---
id: index
title: Solución de problemas
---

# Solución de problemas

Soluciones a los problemas más comunes al ejecutar aMule.

| Sección | Contenido |
|---|---|
| [Problemas comunes](./common-problems.md) | Uso de CPU, Low ID, descargas perdidas, permisos, descriptores de archivo, cuelgues y más |
| [Velocidades de descarga lentas](./slow-speeds.md) | Lista de verificación de configuración, soluciones a la congestión ADSL, limitaciones inherentes a la red, aMule ralentizando otras aplicaciones |
| [Archivos y servidores falsos](./fake-files-and-servers.md) | Detección de contenido falso, identificación y evitación de servidores maliciosos, prueba de puertos |
| [Solución de problemas de acceso remoto](./remote-access.md) | Errores de conexión de `amulecmd`, problemas de conexión y autenticación de `amuleweb` |

---

## Diagnóstico rápido

**Tengo una Low ID**
→ El puerto TCP 4662 no es accesible desde internet. Ver [Problemas comunes → Low ID](./common-problems.md#amule-connects-to-a-server-but-always-gets-a-low-id-why) y [Probar tus puertos](./fake-files-and-servers.md#testing-your-ports).

**Las descargas son muy lentas**
→ Revisa la [lista de verificación de velocidades lentas](./slow-speeds.md#configuration-issues). La causa más frecuente es un límite de subida por debajo de 10 KBps.

**aMule ralentiza todo en mi ordenador**
→ El límite de subida o el número de conexiones es demasiado alto. Ver [aMule ralentiza todo lo demás](./slow-speeds.md#amule-makes-everything-else-slow).

**No encuentro mis archivos descargados**
→ Busca en `~/.aMule/Incoming` (o `~/Library/Application Support/aMule/Incoming` en macOS). Activa "Mostrar archivos ocultos" en tu gestor de archivos.

**Kademlia dice "con firewall" aunque tengo una High ID**
→ Tu router está reasignando el puerto UDP 4672. Ver [Red Kademlia → Resolver el estado con firewall](../ed2k/kademlia.md).

**Los resultados de búsqueda contienen muchos archivos sospechosos**
→ Es posible que estés conectado a un servidor falso. Ver [Servidores falsos](./fake-files-and-servers.md#fake-servers).

**amuled no deja conectar a amulecmd**
→ Las Conexiones Externas no están habilitadas o la contraseña EC no está configurada. Ver [Solución de problemas de acceso remoto → amulecmd](./remote-access.md#i-cannot-connect-to-amuled--it-doesnt-seem-to-be-listening-whats-wrong).
