---
id: bug-report
title: Reporte de errores
---

Los reportes de errores son una contribución muy valiosa para aMule. Un problema no se puede arreglar si no se reporta, y cuanto más rápido y con mayor precisión se describa un error, antes se podrá solucionar. Esta página explica, en términos sencillos, qué incluir en un informe y cómo encontrar la información que los desarrolladores necesitan, **sin necesidad de tener experiencia en programación o depuración.**

## Dónde reportar un error

Abre una incidencia en el [sistema de seguimiento de incidencias de GitHub](https://github.com/amule-org/amule/issues). Necesitarás una cuenta de GitHub.

Antes de abrir una nueva incidencia, busca entre las existentes para evitar duplicados, y asigna un título claro y descriptivo a tu reporte.

:::tip aMule te pide que reportes los cierres inesperados
Cuando aMule se cierra inesperadamente, muestra un mensaje que ya te apunta a esta página y al sistema de incidencias, seguido de un **rastreo de pila**. Ese rastreo es una de las cosas más valiosas que puedes incluir; consulta [Si aMule se cierra inesperadamente](#si-amule-se-cierra-inesperadamente-copia-el-rastreo-de-pila-automatico) más abajo.
:::

## Información que incluir en cada reporte

Un informe de errores útil incluye como mínimo:

| Campo | Cómo obtenerlo |
|---|---|
| **Versión de aMule** | Lanza `amule --version` en la terminal. Te mostrará algo como `aMule 3.0.0 (OS: Linux)`. |
| **Sistema Operativo y Versión** | Ej. Windows 11, macOS 14.5, Ubuntu 24.04, Fedora 40 |
| **Pasos para reproducirlo** | La secuencia exacta de acciones que provocan el error |
| **Comportamiento esperado** | Qué esperabas que sucediera |
| **Comportamiento real** | Qué sucedió en realidad |
| **Archivo de log** | Líneas relevantes del log de aMule — ver [Buscando el archivo de trazas](#buscando-el-archivo-de-trazas) |
| **Rastreo de pila** | Para cierres inesperados y bloqueos — ver [Si aMule se cierra inesperadamente](#Si-aMule-se-cierra-inesperadamente-Copia-el-rastreo-de-pila-automático) |

Sé lo más específico posible. "aMule se cerró inesperadamente" no es un reporte útil. "aMule se cerró inesperadamente de forma reproducible al hacer clic en el botón de búsqueda mientras estaba conectado a Kad, después de aproximadamente 20 segundos de búsqueda, en Ubuntu 24.04 con aMule 3.0.0" sí lo es.

## Buscando el archivo de trazas

aMule escribe información diagnóstica en un archivo llamado `logfile` dentro de su [carpeta de configuración](../manual/configuration/config-files/index.md#platform-paths). Su ubicación depende de tu sistema operativo:

| Plataforma | Ruta del archivo de trazas |
|---|---|
| **Windows** | `%APPDATA%\aMule\logfile` (típicamente `C:\Users\<you>\AppData\Roaming\aMule\logfile`) |
| **macOS** | `~/Library/Application Support/aMule/logfile` |
| **Linux / Unix / BSD** | `~/.aMule/logfile` |

Algunas notas útiles:

- La interfaz remota ([`amulegui`](../manual/interfaces/gui/amulegui.md)) usa un archivo separado llamado `remotelogfile` en la misma carpeta.
- Cada vez que aMule se inicia, renombra el log anterior a `logfile.bak`, por lo que el log de la sesión que falló puede estar en el archivo `.bak`.
- Al revisar el log, las líneas que más importan son aquellas que contienen `ERROR`, `FATAL` o `ASSERT`, especialmente las que preceden inmediatamente al problema. Copia esas líneas (con un poco de contexto) en tu reporte.

## Si aMule se cierra inesperadamente: Copia el rastreo de pila automático

Cuando aMule se cierra inesperadamente, escribe **automáticamente un rastreo de pila** — una instantánea de lo que estaba haciendo el programa en el momento en que falló — en el [archivo de trazas](#Buscando-el-archivo-de-trazas), y en la terminal si lanzaste aMule desde terminal. **No necesitas ninguna herramienta especial** para obtenerlo; solo necesitas copiarlo.

El rastreo de pila está envuelto en un bloque fácil de reconocer:

```
--------------------------------------------------------------------------------
A fatal error has occurred and aMule has crashed.
Please assist us in fixing this problem by reporting the backtrace below as a
GitHub issue, including as much information as possible regarding the
circumstances of this crash. Issue tracker:
    https://github.com/amule-org/amule/issues
----------------------------=| BACKTRACE FOLLOWS: |=----------------------------
Current version is: aMule 3.0.0
Running on: Linux ...

[the backtrace lines]
--------------------------------------------------------------------------------
```

**Qué hacer:** abre el archivo de trazas, busca este bloque y copia **todo** desde `A fatal error has occurred` hasta la línea final de guiones. Pégalo en tu incidencia dentro de un bloque de código (envuélvelo en triple acento grave ``` ``` para que se mantenga legible).

### ¿Qué tan bueno es tu rastreo de pila?

La utilidad de un rastreo de pila depende de cómo se compiló aMule. Si instalaste aMule desde el gestor de paquetes de tu distribución, normalmente contiene información suficiente para mostrar los nombres de las funciones. Este es el aspecto de cada nivel de calidad, del mejor al peor:

**Completo — nombres de funciones, nombres de archivo y números de línea (ideal):**

```
#0  0x000000000046fcab in CUpDownClient::ClearDownloadBlockRequests (this=0x45bf9e0)
    at BaseClient.cpp:1175
#1  0x00000000004d1480 in CUpDownClient::SetDownloadState (this=0x45bf9e0, byNewState=1 '\001')
    at DownloadClient.cpp:541
#2  0x00000000004703bd in CUpDownClient::Disconnected (this=0x45bf9e0,
    strReason=@0x7ffffc74e2b0, bFromSocket=false)
    at BaseClient.cpp:1239
```

**Parcial — nombres de funciones pero sin números de línea:**

```
#0  0x1003f604 in CUpDownClient::ClearDownloadBlockRequests ()
#1  0x10044978 in CUpDownClient::Disconnected ()
#2  0x1004d958 in CClientList::ProcessDirectCallbackList ()
```

**Menos útil — solo direcciones de memoria:**

```
#0  0x000000000057b790 in ?? ()
#1  0x000000000051e66b in ?? ()
#2  0x000000000051edb6 in ?? ()
```

Copia lo que obtengas; incluso un rastreo de pila parcial ayuda. Si solo ves direcciones y signos de interrogación (`?? ()`), menciónalo en la incidencia: los desarrolladores pueden pedirte que generes uno más detallado o que instales una versión con información de depuración.

## Avanzado: Generar un rastreo de pila completo tú mismo

Si te sientes cómodo usando una terminal y quieres proporcionar a los desarrolladores la información más detallada posible —ejecutando aMule bajo un depurador (GDB o LLDB), analizando un volcado de memoria con `coredumpctl` o comprobando si hay errores de memoria con Valgrind— consulta la guía para desarrolladores:

➡️ **[Depurando con GDB y Valgrind](../developer/debugging.md)**

Esto es totalmente opcional. Para la mayoría de los reportes, el rastreo de pila automático y el archivo de trazas son suficientes.
