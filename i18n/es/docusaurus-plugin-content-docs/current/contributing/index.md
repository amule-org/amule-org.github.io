---
id: index
title: Contribuir
---

aMule es un proyecto dirigido por la comunidad. Las contribuciones de cualquier tipo son bienvenidas: parches de código, informes de bugs, traducciones, mejoras de documentación y pruebas.

## Formas de Contribuir

### Código

Envía un pull request en [GitHub](https://github.com/amule-org/amule):

1. Haz un fork del repositorio y crea una rama de funcionalidad.
2. Sigue la guía de estilo de código.
3. Mantén los cambios enfocados — un cambio lógico por pull request.
4. Asegúrate de que el proyecto compila sin advertencias en al menos una plataforma soportada.
5. Escribe una descripción clara que explique qué hace el cambio y por qué.

Todos los pull requests son compilados y probados automáticamente por el pipeline de CI en Ubuntu, macOS y Windows (MSYS2). Un PR que rompa alguna de estas compilaciones no será fusionado.

### Informes de Bugs

Abre un issue en el [gestor de issues de GitHub](https://github.com/amule-org/amule/issues).

Al reportar un bug, incluye siempre:

- Versión de aMule (`amule --version`)
- Sistema operativo y versión
- Pasos para reproducir el problema
- Cualquier salida de log relevante de `~/.aMule/logfile`
- Un backtrace de GDB si el problema involucra un crash

Para instrucciones detalladas sobre cómo generar un backtrace útil, consulta la página de [Informes de Bugs](bug-reports.md).

### Traducciones

aMule usa GNU gettext para la internacionalización. Las traducciones son archivos `.po` en `po/` y traducciones de páginas man en `docs/man/po/`.

Consulta la guía completa de [Traducciones](translations.md) para:

- Actualizar una traducción existente
- Añadir un nuevo idioma
- Traducir páginas man con po4a
- Referencia de especificadores de formato y códigos de escape

### Documentación

Mejora o amplía este sitio web de documentación. Consulta la guía de [Documentación](documentation.md) para la estructura del repositorio, las pautas de escritura y el flujo de trabajo de PR.

### Testing

- Prueba los candidatos a release y reporta regresiones en el gestor de issues.
- Ejecuta la suite de tests unitarios: `cmake -DBUILD_TESTING=YES -B build && cmake --build build && ctest --test-dir build`.
- Ayuda a mantener la cobertura de tests añadiendo tests unitarios para el nuevo código.

---

## Revisión de Código

Todas las contribuciones pasan por revisión de código antes de ser fusionadas. Los revisores verifican:

- Corrección: ¿el cambio hace lo que dice?
- Estilo de código: ¿sigue la guía de estilo?
- Cobertura de tests: ¿incluye tests donde sea apropiado?
- Compatibilidad: ¿compila en todas las plataformas soportadas?
- Documentación: ¿están documentadas las nuevas funcionalidades u opciones?

Los comentarios de los revisores deben abordarse en commits de seguimiento en la misma rama.

---

## Comunicación

- **GitHub Issues**: informes de bugs, solicitudes de funcionalidades y preguntas técnicas específicas.
- **GitHub Discussions**: preguntas generales, ayuda de uso y debates más largos.
- **Pull Requests**: contribuciones de código, documentación y traducción.
