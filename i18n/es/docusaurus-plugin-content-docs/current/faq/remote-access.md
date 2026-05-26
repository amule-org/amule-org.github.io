---
id: remote-access
title: FAQ de Acceso Remoto
---

# FAQ de Acceso Remoto

Preguntas frecuentes sobre la ejecución de aMule sin interfaz gráfica y su control remoto mediante `amuled`, `amulecmd`, `amulegui` y `amuleweb`.

---

## aMule Daemon (amuled)

### ¿Qué es amuled?

`amuled` es un aMule completo que se ejecuta sin ninguna interfaz de usuario. Tiene menores requisitos de memoria y CPU y puede ejecutarse en un servidor sin pantalla sin ningún display X. Se controla remotamente mediante [`amuleweb`](/docs/user-guide/amule-components/amuleweb), [`amulecmd`](/docs/user-guide/amule-components/amulecmd) o [`amulegui`](/docs/user-guide/amule-components/amulegui) a través del protocolo de Conexiones Externas (EC).

:::caution
No establezcas **Máx. Conexiones** por encima de **1024** cuando uses amuled. wxBase no puede gestionar más de 1024 conexiones simultáneas.
:::

Consulta la [documentación de amuled](/docs/user-guide/amule-components/amuled) para ver los detalles de instalación, configuración y servicio del sistema.

### ¿Cómo configuro amuled como servicio del sistema?

Consulta la [documentación de amuled](/docs/user-guide/amule-components/amuled) donde encontrarás scripts de inicio para systemd, Debian/Ubuntu, Red Hat/Fedora, Gentoo y SUSE/openSUSE.

---

## `amulecmd`

### ¿Cómo programo acciones o escribo scripts con amulecmd?

Consulta la [documentación de `amulecmd`](/docs/user-guide/amule-components/amulecmd) para ver ejemplos de cron y scripts útiles.

---

## `amulegui`

### ¿Hay un cliente gráfico remoto para amuled?

Sí. `amulegui` está disponible desde aMule 2.0.0-rc7. Proporciona la misma interfaz que el cliente monolítico `amule` y se conecta a `amuled` mediante el protocolo EC.

Consulta la [documentación de `amulegui`](/docs/user-guide/amule-components/amulegui) para instrucciones de compilación, configuración y conexión.

---

## `amuleweb`

### ¿Qué es `amuleweb`?

`amuleweb` es un servidor web integrado que proporciona una interfaz basada en navegador para controlar aMule o amuled remotamente. Escucha conexiones HTTP en el puerto 4711 (por defecto) y se comunica con aMule mediante el protocolo EC en el puerto 4712.

Consulta la [documentación de `amuleweb`](/docs/user-guide/amule-components/amuleweb) para instrucciones detalladas de configuración.

### ¿Cómo configuro `amuleweb` con aMule v1?

**aMule v1 está fuertemente desaconsejado** — su implementación de `amuleweb` tiene vulnerabilidades de seguridad conocidas. Actualiza a aMule v2 y consulta la [documentación de `amuleweb`](/docs/user-guide/amule-components/amuleweb).

### ¿Qué debería ver cuando `amuleweb` está funcionando correctamente?

Tras iniciar `amuleweb` en un terminal, deberías ver una salida como esta:

```
Web Server: Started
WSThread: Thread started
WSThread: created service
WSThread: created socket listening on :4711
amuleweb$
```

Luego abre un navegador y navega a `http://localhost:4711` (o la dirección del host remoto).

### ¿Puedo ejecutar `amuleweb` como daemon (proceso en segundo plano)?

Desde aMule 2.0.0-rc6, `amuleweb` soporta el flag `--quiet` (`-q`), que suprime el prompt interactivo y facilita la ejecución en segundo plano:

```bash
amuleweb --quiet &
```

En versiones anteriores, ejecutarlo dentro de una sesión de `screen`:

```bash
screen -d -m -S amulewebsession amuleweb -p 7000 -pw tucontraseña
```

Donde `-p 7000` es el puerto EC y `-pw tucontraseña` es tu contraseña EC. Para reconectarte:

```bash
screen -r amulewebsession
```

