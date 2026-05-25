---
id: translations
title: Traducciones
---

aMule tiene tres áreas que se pueden traducir: las cadenas de la interfaz de la aplicación, las páginas man y la documentación del sitio web.

## Traducciones del Código

Las cadenas de la interfaz de aMule se gestionan con [GNU gettext](https://www.gnu.org/software/gettext/). Las traducciones se almacenan como archivos `.po` en `po/` y se compilan en catálogos binarios `.mo` en tiempo de compilación.

### Comprobar el Estado de la Traducción

```sh
msgfmt --statistics po/es.po -o /dev/null
```

### Actualizar una Traducción Existente

```sh
./scripts/update-po.sh
```

Luego abre el archivo `.po` en Poedit, rellena o corrige los campos `msgstr` y envía los cambios.

### Añadir un Nuevo Idioma

1. Crea el archivo `.po` inicial desde la plantilla:

   ```sh
   msginit --input=po/amule.pot --locale=xx --output=po/xx.po
   ```

2. Añade el código de idioma a `po/LINGUAS`.
3. Traduce las cadenas en `po/xx.po`.
4. Verifica que el archivo compila sin errores.
5. Envía un pull request con `po/xx.po` y el `po/LINGUAS` actualizado.

### Marcar Cadenas para Traducción en C++

| Macro | Caso de uso |
|---|---|
| `_("text")` | Lo más común — traduce una cadena |
| `wxTRANSLATE("text")` | Marca una cadena para extracción sin traducirla en ese punto |
| `wxPLURAL("one item", "%d items", n)` | Formas plurales |

## Traducciones de Páginas Man

Las páginas man de aMule también se pueden traducir usando [po4a](https://po4a.org/). Los archivos de traducción viven en `docs/man/po/`.

## Traducciones de la Documentación

La documentación del sitio web (este sitio) está internacionalizada a través del sistema i18n de Docusaurus. Las traducciones cubren dos áreas: cadenas de la UI almacenadas en `i18n/<locale>/code.json`, y páginas de documentación almacenadas como archivos Markdown en `i18n/<locale>/docusaurus-plugin-content-docs/current/`.
