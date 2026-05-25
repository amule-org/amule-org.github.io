---
id: alc-alcc
title: alc / alcc — Generador de enlaces eD2k
---

ALinkCreator es una herramienta que genera enlaces ed2k para archivos de tu sistema de archivos local. Soporta todos los valores opcionales de enlaces ed2k y es muy rápido al calcular el hash de archivos. Se distribuye en dos variantes:

| Binario | Interfaz |
|---|---|
| `alc` | Gráfica (con ventana) |
| `alcc` | Línea de comandos (solo texto) |

Ambas variantes calculan el hash ed2k completo de un archivo — incluyendo hashes de partes — y muestran el enlace ed2k completo. Funcionan independientemente de una instancia de aMule en ejecución y son compatibles con compilaciones `--disable-monolithic`.

## Instalación

La mayoría de las distribuciones incluyen ALinkCreator en sus paquetes de aMule:

```bash
# Debian/Ubuntu:
apt install amule-utils

# Fedora/RHEL:
dnf install amule

# Arch:
pacman -S amule
```

`alcc` está normalmente en el paquete `amule-utils` en sistemas basados en Debian.

## Compilación

ALinkCreator se compila como parte de la compilación principal de aMule usando las opciones de CMake:

**Versión GUI (`alc`):**

```sh
cmake -B build -DBUILD_ALC=YES
cmake --build build -j"$(nproc)"
sudo cmake --install build
```

**Versión consola (`alcc`):**

```sh
cmake -B build -DBUILD_ALCC=YES
cmake --build build -j"$(nproc)"
sudo cmake --install build
```

Ambas opciones pueden combinarse con cualquier otra opción CMake de aMule. Para la instalación de dependencias y la referencia completa de opciones, consulta la documentación de Compilación.

## Uso

### alcc — Interfaz de Línea de Comandos

```
alcc [opciones] <archivo> [<archivo> ...]
```

Opciones comunes:

| Opción | Descripción |
|---|---|
| `-t <texto>` | Añade un título legible al enlace (por defecto: nombre del archivo) |
| `-f` | Incluye hash AICH de tamaño completo (para archivos ≥ 9 MB) |
| `-m <url>` | Añade URL fuente HTTP/FTP al enlace |
| `-h` | Muestra la ayuda |

### alc — Interfaz Gráfica

Lanza `alc` directamente (sin argumentos). La interfaz gráfica te permite arrastrar y soltar archivos o usar el explorador de archivos integrado para seleccionarlos.

## Formato del Enlace de Salida

```
ed2k://|file|<nombre>|<tamaño>|<hash_md4>|h=<hash_aich>|/
```

Ejemplo:

```
ed2k://|file|mi-archivo.iso|734003200|C3B4D2A5F9E8B1C6D0A4E7F2B3C5D8A9|/
```

Pega el enlace en aMule (**Archivo → Pegar enlace eD2k**) o en un navegador web para iniciar la descarga.
