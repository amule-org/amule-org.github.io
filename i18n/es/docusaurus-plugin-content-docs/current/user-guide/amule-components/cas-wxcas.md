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

Ejecutar `cas` sin argumentos imprime una línea de estado similar a:

```
aMule CVS has been running for 1 D 00 h
fALSO is on Max[PT] Sado [81.84.97.64:4661] with HighID
Total Download: 171.36 GB, Upload 188.96 GB
Session Download: 475.42 MB, Upload 832.46 MB
Download : 2.3 kB/s, Upload : 10.0 kB/s
Sharing : 98 file(s), Clients on queue: 237
```

### Generación de Imagen

Cuando se ejecuta con el flag `-o`, `cas` genera una imagen PNG ([`~/.aMule/aMule-online-sign.png`](../amule-files/cas.md)) escribiendo texto de estadísticas sobre una imagen de fondo configurable.

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
source_image /usr/share/pixmaps/stat.png

# *_line - x,y,habilitado (1=habilitado, 0=deshabilitado)
# Cada línea corresponde a una línea de texto de estadísticas.
first_line  23,19,1
second_line 23,36,1
third_line  23,54,1
fourth_line 23,72,1
fifth_line  23,89,1
sixth_line  23,106,1
```

**Rutas del sistema por defecto** que `cas` busca:

| Recurso | Ruta por defecto |
|---|---|
| Fuente | `/usr/share/fonts/corefonts/times.ttf` |
| Imagen de fondo | `/usr/share/pixmaps/stat.png` |
| Plantilla HTML | `/usr/share/pixmaps/tmp.html` |

### Página HTML de Estadísticas

Ejecuta `cas` con el flag HTML para generar [`~/.aMule/aMule-online-sign.html`](../amule-files/cas.md), una página completa de estadísticas.

### Problemas Conocidos

- La cadena de tiempo de actividad en la salida de consola está internacionalizada por aMule (refleja el idioma configurado en aMule). No existe ninguna solución alternativa en el momento de redactar este texto.

## WxCAS — Estadísticas Gráficas

`wxcas` proporciona una ventana gráfica que muestra las mismas estadísticas que `cas`. Está dirigido a usuarios de escritorio que quieren monitorizar el estado de aMule sin una terminal.

Lanza con:

```bash
wxcas
```

`wxcas` consulta `amulesig.dat` periódicamente y refresca la pantalla automáticamente.

**Ruta de salida por defecto:** `~/aMule-online-sign.png` (o `.jpg`/`.bmp` según la configuración). Esto es distinto del valor por defecto de `cas`, que es `~/.aMule/aMule-online-sign.png`.

## Resolución de Problemas

### `can't open file '/home/user/.aMule/amulesig.dat'`

aMule no ha generado el archivo de firma. Solución:

1. En aMule: **Preferencias → Firma Online → Habilitar Firma Online**.
2. Asegúrate de que aMule está realmente en ejecución y conectado (el archivo solo se escribe mientras aMule está activo).
3. Si el archivo aún no aparece, comprueba que `~/.aMule/` tiene permisos de escritura.
