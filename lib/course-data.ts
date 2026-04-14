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

export type CourseStep = {
  id: string
  title: string
  summary: string
  interactive?: CourseStepInteractive
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
    title: "Parte 2 — Tu primer endpoint de API",
    description:
      "Pasas de la interfaz a una ruta en el servidor que devuelve JSON: mismo proyecto Next.js sirviendo front y API.",
    steps: [
      {
        id: "primer-endpoint",
        title: "Construir tu primer endpoint de API",
        summary:
          "Crear una ruta de API con el App Router y responder JSON desde el servidor.",
      },
    ],
  },
  {
    id: "deploy",
    navLabel: "Vercel",
    title: "Parte 3 — De GitHub a Vercel",
    description:
      "Cierras el ciclo fullstack: el mismo código en un repositorio y una URL pública en producción.",
    steps: [
      {
        id: "vercel",
        title: "Desplegar en Vercel",
        summary:
          "Conectar el repositorio con Vercel, revisar el build y obtener tu sitio en línea.",
      },
    ],
  },
]

/** Lista plana de pasos (por si hace falta para metadatos o tests). */
export const courseSteps = courseSections.flatMap((s) => s.steps)
