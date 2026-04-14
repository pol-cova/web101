import type { CourseMdxSlug } from "@/lib/course-mdx-registry"

export type CourseStepInteractive =
  | {
      kind: "clone-repo"
      templateRepoUrl: string
      visualAid: {
        src: string
        alt: string
        caption: string
      }
      preamble: string[]
      githubWorkflowSteps: string[]
      cdExample: string
      cloneCommand: string
      postCloneCommands: Array<{
        id: string
        caption: string
        command: string
      }>
      epilogue: string[]
    }
  | {
      kind: "single-command"
      preamble: string[]
      command: string
      afterNotes: string[]
    }

/** Diagramas embebidos en lecciones de solo lectura (ver `components/course-reading/`). */
export type CourseReadingDiagram = "api-bridge" | "http-roundtrip"

export type CourseReadingSnippet = {
  /** Ruta de archivo o título del bloque (p. ej. app/api/hello/route.ts) */
  file?: string
  code: string
}

export type CourseStepReading = {
  lead: string[]
  sections: Array<{
    heading: string
    body: string[]
    /** Código de ejemplo bajo el texto de la sección */
    snippet?: CourseReadingSnippet
  }>
  diagram?: CourseReadingDiagram
  /** Pie de figura bajo el diagrama */
  diagramCaption?: string
}

export type CourseStep = {
  id: string
  title: string
  summary: string
  interactive?: CourseStepInteractive
  reading?: CourseStepReading
  /** Contenido en `content/course/...mdx` (ver `courseMdxBySlug`). Tiene prioridad sobre `reading`. */
  readingMdxSlug?: CourseMdxSlug
}

export type CourseSection = {
  id: string
  /** Título largo (página / SEO) */
  title: string
  /** Etiqueta corta en la barra lateral */
  navLabel: string
  description?: string
  steps: CourseStep[]
}

export const DEFAULT_CLONE_COMMAND =
  "git clone https://github.com/pol-cova/template-web101.git"

export const TEMPLATE_REPO_URL = "https://github.com/pol-cova/template-web101"

export const courseSections: CourseSection[] = [
  {
    id: "setup",
    navLabel: "Entorno local",
    title: "Parte 1 — Del repositorio al proyecto en marcha",
    description:
      "Obtienes el código, instalas dependencias y compruebas que la aplicación arranca en tu ordenador.",
    steps: [
      {
        id: "entorno",
        title: "Clonar, entrar en la carpeta e instalar",
        summary:
          "Bajar la plantilla desde GitHub, situarte en la carpeta del proyecto y ejecutar npm install.",
        interactive: {
          kind: "clone-repo",
          templateRepoUrl: TEMPLATE_REPO_URL,
          visualAid: {
            src: "/template.png",
            alt: "Captura del repositorio template-web101 en GitHub, mostrando el botón verde Use this template junto al nombre del repo",
            caption:
              "En la página de la plantilla, el botón «Use this template» está arriba a la derecha (junto al contador de estrellas). Sirve para crear tu propio repositorio copiando todo el código del curso.",
          },
          preamble: [
            "Este curso usa una plantilla de GitHub: ya trae Next.js, la carpeta del proyecto y Prisma configurado. No hace falta crear el proyecto desde cero.",
            "Si es la primera vez que usas GitHub, mira la imagen de abajo antes de la terminal: verás exactamente qué botón pulsar.",
            "Necesitarás Node.js en tu equipo (versión LTS recomendada). Si aún no lo tienes, instálalo desde nodejs.org y vuelve aquí.",
          ],
          githubWorkflowSteps: [
            "Abre el enlace «Ver plantilla en GitHub» (se abre en una pestaña nueva).",
            "Pulsa el botón verde «Use this template» y elige «Create a new repository».",
            "Pon un nombre a tu copia (por ejemplo mi-web101), decide si será público o privado y créalo.",
            "Cuando exista tu repo, podrás clonarlo: en la página del repo, botón verde «Code» → copia la URL HTTPS y úsala con git clone en la terminal (más abajo).",
          ],
          cdExample: "cd ~/Desktop",
          cloneCommand: DEFAULT_CLONE_COMMAND,
          postCloneCommands: [
            {
              id: "cd-template",
              caption:
                "Entra en la carpeta del proyecto clonado. Si usaste la URL de la plantilla, la carpeta se llama template-web101.",
              command: "cd template-web101",
            },
            {
              id: "npm-install",
              caption:
                "Instala las dependencias del proyecto. Espera a que termine antes de seguir (puede tardar un minuto).",
              command: "npm install",
            },
          ],
          epilogue: [
            "Pega el comando de clonación en la terminal y pulsa Intro. Se creará una carpeta con el código del proyecto.",
            "Si creaste tu repo con «Use this template», clona la URL de tu repo en lugar de la de arriba; la carpeta tendrá el nombre que elegiste en GitHub (usa cd con ese nombre en lugar de template-web101).",
          ],
        },
      },
      {
        id: "dev-server",
        title: "Ver el proyecto en el navegador",
        summary:
          "Arrancar el servidor de desarrollo y abrir la app en localhost para confirmar que todo funciona.",
        interactive: {
          kind: "single-command",
          preamble: [
            "Deja la terminal en la carpeta del proyecto (la misma donde ejecutaste npm install).",
            "El siguiente comando inicia el servidor de desarrollo de Next.js. Cópialo, pégalo en la terminal y pulsa Intro.",
          ],
          command: "npm run dev",
          afterNotes: [
            "Abre el navegador en http://localhost:3000 (es el puerto habitual). Deberías ver la aplicación.",
            "Para parar el servidor, vuelve a la terminal y pulsa Ctrl+C (o Cmd+C en Mac).",
          ],
        },
      },
    ],
  },
  {
    id: "api",
    navLabel: "API en Next.js",
    title: "Parte 2 — Conceptos, API, datos y Prisma",
    description:
      "HTTP y tu primer endpoint; luego un modelo tipo POS, el esquema en Prisma, el cliente y un CRUD sencillo sobre productos.",
    steps: [
      {
        id: "que-es-api",
        title: "¿Qué es una API?",
        summary:
          "Una forma sencilla de ver las APIs web: la capa que entiende pedidos y devuelve datos sin que tu interfaz se líe con los detalles del servidor.",
        reading: {
          lead: [
            "Una API (Application Programming Interface) es, en la práctica, el contrato entre tu aplicación y el servidor: tú preguntas de forma estandarizada y recibes una respuesta que el navegador o la app saben interpretar.",
            "No hace falta memorizar la sigla. Piensa en una puerta de entrada: tu pantalla no va directamente a la base de datos; alguien en medio organiza permisos, formato y reglas de negocio.",
          ],
          sections: [
            {
              heading: "Analogía rápida: el restaurante",
              body: [
                "Tú (el cliente) pides un plato al camarero. El camarero no cocina: lleva el pedido a cocina y trae lo que corresponde.",
                "La API hace de camarero entre tu app y el servidor: traduce «quiero los datos del usuario» en lo que el backend entiende y te devuelve el resultado en un formato acordado (muchas veces JSON).",
              ],
            },
            {
              heading: "En una app web real",
              body: [
                "La interfaz (botones, formularios) dice qué quieres. La API decide cómo obtenerlo de forma segura: consultas a base de datos, validación, errores claros si algo falla.",
                "Ventaja: puedes cambiar el diseño de la web sin reescribir toda la lógica del servidor, mientras el contrato de la API se mantiene.",
              ],
            },
            {
              heading: "Y Next.js en todo esto",
              body: [
                "En este curso, la API vive en el mismo proyecto que la web: rutas que responden JSON y páginas que los consumen. Un solo repositorio, menos fricción al aprender.",
              ],
            },
          ],
          diagram: "api-bridge",
          diagramCaption:
            "Flujo simplificado: la interfaz pide a la API; la API habla con los datos o servicios internos y devuelve una respuesta ordenada.",
        },
      },
      {
        id: "http-basico",
        title: "Conceptos básicos de HTTP",
        summary:
          "Petición y respuesta, métodos como GET o POST, códigos de estado y por qué JSON es el formato habitual en APIs modernas.",
        reading: {
          lead: [
            "HTTP es el protocolo que usa el navegador (y muchas apps) para hablar con un servidor: cada acción es una petición y casi siempre recibes una respuesta.",
            "No tienes que saber todo el estándar de memoria. Con cuatro ideas (petición/respuesta, método, código de estado y cuerpo en JSON) ya puedes seguir el curso con claridad.",
          ],
          sections: [
            {
              heading: "Petición y respuesta",
              body: [
                "Una petición lleva, entre otras cosas, una URL (a qué recurso llamas) y un método (qué tipo de acción es: leer, crear, etc.).",
                "La respuesta incluye un código de estado (resumen en un número: ¿todo bien?, ¿no encontrado?, ¿error del servidor?) y a menudo un cuerpo con datos, por ejemplo JSON.",
              ],
            },
            {
              heading: "Métodos que verás al principio",
              body: [
                "GET — «trae esto». Se usa para leer datos. No debería cambiar nada en el servidor por sí solo (por eso puedes refrescar o compartir el enlace).",
                "POST — «envía esto». Se usa para crear algo o enviar un formulario; el cuerpo de la petición lleva la información.",
              ],
            },
            {
              heading: "Códigos de estado (una pista rápida)",
              body: [
                "2xx — salió bien (el clásico 200 OK).",
                "4xx — problema con lo que pidió el cliente (404 no existe ese recurso, 400 datos inválidos, etc.).",
                "5xx — problema en el servidor (500 error interno).",
                "En el navegador, las herramientas de desarrollo (pestaña **Network**) te muestran método, URL, código y cuerpo: es tu mejor amiga para depurar.",
              ],
            },
            {
              heading: "JSON",
              body: [
                "JSON es un formato de texto para datos estructurados (objetos y listas). Es ligero y casi todo el mundo lo entiende: por eso las APIs REST suelen responder JSON.",
                "Ejemplo mínimo: `{ \"hola\": \"mundo\" }`. En la siguiente lección verás JSON real saliendo de tu propio endpoint en Next.js.",
              ],
            },
          ],
          diagram: "http-roundtrip",
          diagramCaption:
            "Idea visual: el cliente envía una petición (por ejemplo GET); el servidor responde con un código (200) y un cuerpo en JSON.",
        },
      },
      {
        id: "primer-endpoint",
        title: "Construir tu primer endpoint de API",
        summary:
          "Dónde colocar las rutas en app/api, cómo se traduce la carpeta a la URL y el contenido mínimo de route.ts para devolver JSON.",
        readingMdxSlug: "api/primer-endpoint",
      },
      {
        id: "er-pos-simple",
        title: "Modelo de datos sencillo: un POS",
        summary:
          "Qué es un diagrama entidad-relación y cómo se ve un proyecto POS (punto de venta) con pocas tablas enlazadas.",
        readingMdxSlug: "api/er-pos-simple",
      },
      {
        id: "prisma-esquema-tpv",
        title: "Definir el esquema con Prisma",
        summary:
          "schema.prisma, SQLite en local y la primera migración que crea las tablas del modelo.",
        readingMdxSlug: "api/prisma-esquema-tpv",
      },
      {
        id: "prisma-cliente",
        title: "Generar y reutilizar el cliente de Prisma",
        summary:
          "Cliente tipado, una sola instancia en desarrollo y los comandos generate y Studio.",
        readingMdxSlug: "api/prisma-cliente",
      },
      {
        id: "primer-crud-productos",
        title: "Tu primer CRUD: productos por API",
        summary:
          "Listar y crear productos desde route.ts con validación mínima del cuerpo JSON.",
        readingMdxSlug: "api/primer-crud-productos",
      },
    ],
  },
]

/** Lista plana de pasos (por si hace falta para metadatos o tests). */
export const courseSteps = courseSections.flatMap((s) => s.steps)
