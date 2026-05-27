---
id: events
title: Eventos
---

Los eventos son acciones que aMule puede ejecutar automáticamente cuando ocurren ciertos sucesos. Se configuran en la pestaña **Eventos** del cuadro de diálogo [Preferencias](preferences.md), o — al ejecutar `amuled` — en la sección `[UserEvents]` de `amule.conf`.

## Tipos de eventos

Se soportan cuatro eventos:

| Evento | Disparador |
|---|---|
| **Descarga completada** | Un archivo termina de descargarse. |
| **Nueva sesión de chat** | Otro usuario inicia una sesión de chat contigo. |
| **Sin espacio en disco** | aMule se queda sin espacio en disco en la partición usada para archivos temporales. |
| **Error al completar** | aMule no puede mover un archivo completado del directorio temporal al directorio de descargas (normalmente por falta de espacio en disco). |

## Tipos de comando

Para cada evento puedes especificar dos comandos independientes:

| Tipo | Ejecutado por |
|---|---|
| **Comando del núcleo** | Cualquier versión de aMule con núcleo: `amuled` o `amule` monolítico. |
| **Comando de interfaz gráfica** | Cualquier versión de aMule con GUI: `amulegui` o `amule` monolítico. |

Al ejecutar `amule` monolítico, ambos comandos se ejecutan si ambos están especificados.

## Variables

Cada evento expone un conjunto de variables que se sustituyen en la cadena de comando antes de su ejecución:

### Descarga completada

| Variable | Valor |
|---|---|
| `%FILE` | Ruta completa y nombre del archivo descargado. |
| `%NAME` | Solo el nombre del archivo (sin ruta). |
| `%HASH` | Hash eD2k del archivo descargado. |
| `%SIZE` | Tamaño en bytes. |
| `%DLACTIVETIME` | Tiempo total que la descarga estuvo activa. |

### Nueva sesión de chat

| Variable | Valor |
|---|---|
| `%SENDER` | Nombre de usuario de la persona que inicia el chat. |

### Sin espacio en disco

| Variable | Valor |
|---|---|
| `%PARTITION` | Partición que está llena. |

### Error al completar

| Variable | Valor |
|---|---|
| `%FILE` | Ruta completa y nombre del archivo que no pudo moverse. |

## Sintaxis de los comandos

Un comando puede ser un comando de shell simple, compuesto, o la ruta a un script seguida de parámetros opcionales:

```sh
MiScript.sh %NAME %FILE %HASH %SIZE "%DLACTIVETIME"
```

Si el valor de una variable puede contener espacios (por ejemplo `%NAME`, `%FILE`, `%DLACTIVETIME`), enciérrala entre comillas:

```sh
MiScript.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

Dentro de un script de shell, las variables se reciben como parámetros posicionales `$1`, `$2`, `$3`, etc. El script debe estar en `$PATH` o especificarse con su ruta completa.

Si un comando falla por cualquier motivo, el fallo queda registrado en [el archivo de log de aMule](../amule-files/index.md).

## Ejemplos

### Linux — correo simple cuando el disco está lleno

```sh
echo "Error de aMule: %PARTITION está llena." | mail -s Aviso tumail@dominio.com
```

### Linux — notificación por correo al completar una descarga (usando `mail`)

Script de **Ezeltje** del foro de aMule. Introduce tu dirección de correo y guarda el script en algún directorio de `$PATH`. Luego establece el comando del núcleo para *Descarga completada* como:

```sh
doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
```

```bash
#!/bin/bash
# doneDL.sh - envía un correo al completar una descarga de aMule
# Llámalo así: doneDL.sh "%NAME" "%FILE" %HASH %SIZE "%DLACTIVETIME"
#
# Introduce tu dirección de correo aquí:
eMail=

NameShort=$1
NameLong=$2
Hash=$3
Size=$4
DLtime=$5

{
    echo aMule ha completado esta descarga:
    echo -----------------------------------
    echo
    echo Archivo: "$NameLong"
    echo Hash: $Hash
    echo -n "Hora: "
    date | awk '{print $4 " " $5}'
    echo -n Tamaño: $Size bytes
    if [ $Size -gt 102400 ]; then
        echo " ("$(($(($Size / 1024)) / 1024)) "Mb)"
    fi
    if [ ! -z "$DLtime" ]; then
        echo "Tiempo activo de descarga: $DLtime"
    fi
    echo
    echo --------------------------------------------------------------------
    echo -n "Memoria residente: "
    echo $(ps u -C amule --no-headers | awk '{print $6}') kB
    echo -n "Memoria virtual: "
    echo $(ps u -C amule --no-headers | awk '{print $5}') kB
    echo --------------------------------------------------------------------
} | mail -s "$NameShort" $eMail
```

Consulta la [versión en inglés](../../user-guide/configuration/events.md) para ejemplos adicionales con `sendmail`, `ssmtp` y notificaciones de escritorio via NotifyOSD.

### Windows — notificación emergente en LAN

En una red LAN con Windows, usa el servicio integrado Windows Messenger para enviar un mensaje emergente a cualquier equipo de la red.

En **Preferencias → Eventos → Descarga completada**, activa **Habilitar ejecución de comandos en la interfaz gráfica** y establece el comando:

```
net send NombreEquipo %NAME ha terminado de descargarse.
```

Sustituye `NombreEquipo` por el nombre del equipo que debe recibir el mensaje.

**Activa el servicio Windows Messenger en cada equipo** que deba recibir mensajes:

1. Abre **Panel de control → Herramientas administrativas → Servicios**.
2. Busca **Alerter** y ponlo en **Automático**, luego haz clic en **Iniciar**.
3. Busca **Messenger** y ponlo en **Automático**, luego haz clic en **Iniciar**.
4. Repite en cada equipo de la LAN que deba recibir mensajes.
