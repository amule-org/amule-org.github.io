---
id: documentation
title: Contribuir a la Documentación
---

La documentación del sitio web de aMule está internacionalizada a través del sistema i18n de Docusaurus. Las contribuciones de documentación son bienvenidas — desde correcciones de erratas hasta nuevas páginas completas.

## Estructura del Repositorio

```
amule-org.github.io/
├── docs/                    # Documentación en inglés (fuente de referencia)
├── i18n/                    # Traducciones
│   ├── es/                  # Español
│   │   └── docusaurus-plugin-content-docs/current/
│   └── ...
├── src/
│   ├── pages/index.tsx      # Página de inicio
│   └── components/          # Componentes de la página de inicio
├── static/img/              # Imágenes
└── docusaurus.config.ts     # Configuración del sitio
```

## Añadir o Editar Contenido en Inglés

1. Haz un fork de [amule-org.github.io](https://github.com/amule-org/amule-org.github.io).
2. Crea o edita un archivo Markdown en `docs/`.
3. Ejecuta el servidor de desarrollo: `npm run start`.
4. Verifica los cambios en `http://localhost:3000`.
5. Ejecuta `npm run build` para verificar que no hay enlaces rotos.
6. Abre un pull request.

## Añadir o Actualizar Traducciones

Las traducciones de la documentación van en `i18n/<locale>/docusaurus-plugin-content-docs/current/`, reflejando la estructura de `docs/`.

Los strings de la UI (navbar, sidebar, componentes de la página de inicio) van en `i18n/<locale>/code.json`.

Pasos para actualizar una traducción existente:

1. Ejecuta `npm run write-translations -- --locale <code>` para añadir nuevas claves.
2. Traduce las entradas nuevas en `i18n/<locale>/code.json`.
3. Actualiza los archivos `.md` modificados en `i18n/<locale>/docusaurus-plugin-content-docs/current/`.

## Compilación Local

```sh
# Instalar dependencias
npm install

# Servidor de desarrollo (solo inglés)
npm run start

# Servidor de desarrollo (español)
npm run start -- --locale es

# Compilación completa (todos los idiomas)
npm run build

# Vista previa de la compilación
npm run serve
```

## Pautas de Escritura

- Usa Markdown estándar.
- Incluye ejemplos de código prácticos con bloques de código correctamente etiquetados por lenguaje.
- Las imágenes van en `static/img/docs/` y se referencian como `/img/docs/<archivo>`.
- Los nuevos archivos de documentación deben añadirse al sidebar en `sidebars.ts`.
