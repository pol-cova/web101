# Contenido del curso (MDX)

Las lecciones largas pueden vivir aquí como archivos `**.mdx**` en lugar de strings en `lib/course-data.ts`.

## Cómo añadir una lección en MDX

1. Crea un archivo, por ejemplo `content/course/api/mi-leccion.mdx`.
2. Regístralo en `**lib/course-mdx-registry.tsx**` en el objeto `courseMdxBySlug` (clave única, p. ej. `api/mi-leccion`).
3. En `**lib/course-data.ts**`, en el paso correspondiente, pon `**readingMdxSlug: "api/mi-leccion"**` y **quita** el bloque `reading` si existía.

Los estilos base de títulos, párrafos y código vienen de `**mdx-components.tsx`** en la raíz del proyecto.

## Texto corto en `course-data.ts`

Para párrafos definidos en TypeScript, `**CourseMarkdown`** usa `react-markdown` + **remark-gfm**: puedes escribir negritas, `código`, enlaces, etc., y se renderizan bien sin mostrar los caracteres crudos.