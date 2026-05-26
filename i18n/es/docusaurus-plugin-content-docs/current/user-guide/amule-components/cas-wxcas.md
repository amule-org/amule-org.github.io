---
id: cas-wxcas
title: cas / wxcas — Herramientas de Estadísticas
---

wxCAS y CAS son herramientas de estadísticas externas que leen el archivo de firma online de aMule (`~/.aMule/amulesig.dat`) y producen salida de estado en varios formatos. Se distribuyen con aMule y sirven a los usuarios que quieren incrustar estadísticas de aMule en un sitio web, firma de foro o panel de terminal.

| Binario | Interfaz | Salida |
|---|---|---|
| `cas` | Línea de comandos | Texto en consola, imagen PNG, página HTML |
| `wxcas` | Gráfica (wxWidgets) | Visualización gráfica de los mismos datos |

## Prerrequisitos

Ambas herramientas leen `~/.aMule/amulesig.dat`, que aMule solo genera cuando la **Firma Online** está habilitada:

1. Abre aMule → **Preferencias → Firma Online**.
2. Marca **Habilitar Firma Online**.
3. Reinicia aMule (o espera al siguiente ciclo de actualización).

`amulesig.dat` se actualiza periódicamente mientras aMule está en ejecución. El archivo debe existir para que `cas` o `wxcas` produzcan cualquier salida.

Para ver la especificación completa del formato de `amulesig.dat`, consulta [amulesig.dat](../amule-files/amulesig-dat.md).

## CAS — C aMule Statistics

`cas` lee `amulesig.dat` y puede producir:

- Un resumen de texto formateado en la consola.
- Una imagen PNG con estadísticas superpuestas sobre una plantilla de fondo.
- Una página HTML con todas las estadísticas.

### Ejemplo de Salida en Consola

Ejecutar `cas` sin argumentos imprime un resumen de estado similar a:

```
aMule 2.3.3 has been running for 1 D 00 h
user is connected to server.example.com [81.84.97.64:4661] with HighID | Kad: ok
Total Download: 171.36 GB, Upload: 188.96 GB
Session Download: 475.42 MB, Upload: 832.46 MB
Download: 2.3 kB/s, Upload: 10.0 kB/s
Sharing: 98 file(s), Clients on queue: 237
Time: Jan 01 2024, 12:00
```

### Opciones de Línea de Comandos

| Opción | Descripción |
|---|---|
| `-o`, `--picture` | Genera la imagen de estadísticas (requiere libgd en tiempo de compilación) |
| `-p`, `--html` | Genera una página HTML de estadísticas (e imagen si libgd está disponible) |
| `-c`, `--config-dir DIR` | Usa `DIR` en lugar del directorio de configuración de aMule por defecto |
| `-h`, `--help` | Muestra información de uso |

Tanto `-o` como `-p` aceptan un argumento de ruta opcional para sobreescribir la ubicación de salida por defecto.

### Generación de Imagen

Cuando se ejecuta con el flag `-o`, `cas` genera una imagen PNG ([`~/.aMule/aMule-online-sign.png`](../amule-files/cas.md)) escribiendo texto de estadísticas sobre una imagen de fondo configurable. Esta opción solo está disponible si `cas` se compiló con soporte de **libgd**.

La configuración se almacena en [`~/.aMule/casrc`](../amule-files/cas.md).

### Archivo de Configuración [`casrc`](../amule-files/cas.md)

`casrc` usa un formato clave-valor. Ejemplo con todas las opciones reconocidas:

```
# cas config file

# font - ruta completa a un archivo de fuente TrueType
font /usr/share/fonts/corefonts/times.ttf

# font_size - tamaño de fuente en puntos
font_size 10.5

# source_image - imagen de fondo sobre la que superponer el texto
source_image /usr/share/cas/stat.png

# *_line - x,y,habilitado (1=habilitado, 0=deshabilitado)
# Cada línea corresponde a una línea de texto de estadísticas.
first_line   23,17,1
second_line  23,34,1
third_line   23,51,1
fourth_line  23,68,1
fifth_line   23,85,1
sixth_line   23,102,1
seventh_line 23,119,1

template /usr/share/cas/tmp.html

# img_type - 0 = PNG, cualquier otro valor = JPG
img_type 0
```

**Rutas del sistema por defecto** que `cas` usa al crear un nuevo `casrc`:

| Recurso | Ruta por defecto |
|---|---|
| Fuente | `/usr/share/fonts/corefonts/times.ttf` |
| Imagen de fondo | `/usr/share/cas/stat.png` |
| Plantilla HTML | `/usr/share/cas/tmp.html` |

### Página HTML de Estadísticas

Ejecuta `cas` con el flag `-p`/`--html` para generar [`~/.aMule/aMule-online-sign.html`](../amule-files/cas.md), una página completa de estadísticas.

### Problemas Conocidos

- La cadena de tiempo de actividad en la salida de consola está internacionalizada por aMule (refleja el idioma configurado en aMule). No existe ninguna solución alternativa en el momento de redactar este texto.

## WxCAS — Estadísticas Gráficas

`wxcas` proporciona una ventana gráfica que muestra las mismas estadísticas que `cas`. Está dirigido a usuarios de escritorio que quieren monitorizar el estado de aMule sin una terminal.

Lanza con:

```bash
wxcas
```

`wxcas` no acepta argumentos de línea de comandos; toda la configuración se realiza desde su diálogo de Preferencias.

`wxcas` consulta `amulesig.dat` periódicamente y refresca la pantalla automáticamente. La ventana principal muestra:

- **Panel aMule**: las mismas siete líneas de estado que `cas` (versión/tiempo activo, conexión al servidor, totales, totales de sesión, tasas actuales, archivos compartidos/cola, hora local).
- **Panel de récords de descarga**: tasa de descarga máxima de la sesión actual y el récord histórico de todas las sesiones anteriores.
- **Panel de sistema** (solo Linux): promedios de carga del sistema (1, 5, 15 minutos) y tiempo de actividad del sistema.

### Generación de Imagen

`wxcas` puede generar automáticamente una imagen de estadísticas en cada ciclo de refresco. Formatos soportados: PNG, JPG, BMP. El directorio de salida es configurable.

**Ruta de salida por defecto:** `~/aMule-online-sign.{png,jpg,bmp}` (según el formato configurado). Esto es distinto del valor por defecto de `cas`, que es `~/.aMule/aMule-online-sign.png`.

### Subida FTP

Cuando la generación automática de imagen está habilitada, `wxcas` puede subir la imagen a un servidor FTP a un intervalo configurable. Configura la URL FTP, la ruta, el nombre de usuario y la contraseña desde **Preferencias**.

### Preferencias

Ajustes principales disponibles en el diálogo de Preferencias:

| Ajuste | Descripción | Valor por defecto |
|---|---|---|
| Directorio de amulesig.dat | Directorio donde aMule escribe `amulesig.dat` | `~/.aMule` |
| Tasa de refresco | Frecuencia de relectura de `amulesig.dat`, en segundos (1–3600) | `5` |
| Generar imagen de estadísticas | Guardar automáticamente una imagen de estadísticas en cada refresco | deshabilitado |
| Formato de imagen | PNG, JPG o BMP | PNG |
| Directorio de imagen | Dónde guardar la imagen generada automáticamente | `~/` |
| Subida FTP | Subir periódicamente la imagen a un servidor FTP | deshabilitado |
| Tasa de actualización FTP | Intervalo de subida en minutos (1–1440) | `10` |

## Resolución de Problemas

### `can't open file '/home/user/.aMule/amulesig.dat'`

aMule no ha generado el archivo de firma. Solución:

1. En aMule: **Preferencias → Firma Online → Habilitar Firma Online**.
2. Asegúrate de que aMule está realmente en ejecución y conectado (el archivo solo se escribe mientras aMule está activo).
3. Si el archivo aún no aparece, comprueba que `~/.aMule/` tiene permisos de escritura.
