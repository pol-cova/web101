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
export type CourseReadingDiagram =
  | "api-bridge"
  | "http-roundtrip"
  | "ondevice-vs-cloud"
  | "framework-decision"
  | "vision-pipeline"
  | "foundation-models-arch"
  | "combined-pipeline"

export type CourseReadingSnippet = {
  /** Ruta de archivo o título del bloque (p. ej. ContentView.swift) */
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
  "git clone https://github.com/apple/swift-playgrounds.git"

export const TEMPLATE_REPO_URL = "https://github.com/apple/swift-playgrounds"

export const courseSections: CourseSection[] = [
  {
    id: "overview",
    navLabel: "Overview",
    title: "Parte 1 — Overview de los frameworks",
    description:
      "Conoce los cuatro pilares de IA on-device de Apple y aprende a elegir el framework correcto para tu hackathon.",
    steps: [
      {
        id: "intro-frameworks",
        title: "Vision, Natural Language, Core ML y Foundation Models",
        summary:
          "Qué hace cada framework, en qué casos brilla y cómo se relacionan entre sí.",
        reading: {
          lead: [
            "Apple ofrece cuatro frameworks principales para inteligencia artificial directamente en el dispositivo. No necesitas servidor ni API key externa: todo ocurre en el chip de tu iPhone, iPad o Mac.",
            "Cada framework resuelve un tipo de problema distinto. Saber cuál usar es la primera decisión técnica que los jueces valorarán en tu proyecto.",
          ],
          sections: [
            {
              heading: "Vision",
              body: [
                "Analiza imágenes y video. Reconoce texto (OCR), rostros, objetos, códigos de barras y escenas. Todo en tiempo real usando la cámara o fotos de la galería.",
                "Ideal para: accesibilidad visual, escaneo de documentos, realidad aumentada, control por gestos.",
              ],
              snippet: {
                file: "Vision Overview",
                code: `import Vision

let request = VNRecognizeTextRequest { request, error in
    guard let observations = request.results as? [VNRecognizedTextObservation] else { return }
    for observation in observations {
        print(observation.topCandidates(1).first?.string ?? "")
    }
}`,
              },
            },
            {
              heading: "Natural Language",
              body: [
                "Procesa texto: detecta idioma, etiqueta partes de la oración, extrae nombres de personas y lugares, y analiza sentimientos (positivo, negativo, neutral).",
                "Ideal para: moderación de contenido, resúmenes automáticos, asistentes conversacionales, análisis de feedback.",
              ],
              snippet: {
                file: "NaturalLanguage Overview",
                code: `import NaturalLanguage

let tagger = NLTagger(tagSchemes: [.sentimentScore])
tagger.string = "Me encanta esta app, es increíble"
let (sentiment, _) = tagger.tag(at: tagger.string!.startIndex, unit: .paragraph, scheme: .sentimentScore)
print(sentiment?.rawValue ?? "0") // "1.0" = muy positivo`,
              },
            },
            {
              heading: "Core ML",
              body: [
                "Ejecuta modelos de machine learning personalizados (convertidos desde TensorFlow, PyTorch o creados con Create ML). Clasificación de imágenes, detección de sonidos, predicción numérica, etc.",
                "Ideal para: modelos entrenados con datos propios, detección específica de objetos, predicciones de uso personal.",
              ],
              snippet: {
                file: "CoreML Overview",
                code: `import CoreML

let model = try! MyCustomClassifier(configuration: MLModelConfiguration())
let prediction = try! model.prediction(input: MyCustomClassifierInput(image: pixelBuffer))
print(prediction.classLabel)`,
              },
            },
            {
              heading: "Foundation Models (iOS 26+)",
              body: [
                "Modelos de lenguaje grandes (LLM) que corren localmente. Generan texto, responden preguntas, extraen estructuras y llaman a herramientas personalizadas — todo sin enviar datos a la nube.",
                "Ideal para: asistentes inteligentes offline, generación de contenido privado, extracción estructurada de datos, brainstorming.",
              ],
              snippet: {
                file: "FoundationModels Overview",
                code: `import FoundationModels

let session = LanguageModelSession()
let response = try await session.respond(to: "Resume este texto en una frase")
print(response.content)`,
              },
            },
          ],
        },
      },
      {
        id: "human-centered",
        title: "Por qué la IA on-device encaja con Human Centered AI",
        summary:
          "Privacidad, latencia cero, accesibilidad y autonomía del usuario como valores de diseño.",
        reading: {
          lead: [
            "Human Centered AI no es solo que la IA sea 'inteligente'; es que respete al usuario. La IA on-device de Apple está diseñada desde la arquitectura para cumplir ese principio.",
          ],
          diagram: "ondevice-vs-cloud",
          diagramCaption: "Comparativa: IA on-device mantiene todo en el dispositivo (privacidad, latencia cero, offline) vs IA en la nube que requiere conexión y envía datos a servidores remotos.",
          sections: [
            {
              heading: "Privacidad por diseño",
              body: [
                "Los datos nunca salen del dispositivo. Una app de salud mental puede analizar el estado emocional del usuario sin enviar sus diarios a un servidor. Eso es confianza real.",
                "En el hackathon, destacar que tu solución no requiere conexión ni almacena datos personales en la nube es un diferenciador fuerte.",
              ],
            },
            {
              heading: "Latencia cero y accesibilidad",
              body: [
                "Funciona en aviones, zonas rurales o situaciones de baja conectividad. Un asistente visual para personas con discapacidad visual no puede depender de una API remota que falle.",
                "La respuesta inmediata también mejora la percepción de fluidez: el usuario siente que la app 'entiende' al instante.",
              ],
            },
            {
              heading: "Autonomía y control",
              body: [
                "El usuario conserva el control total. No hay términos de servicio de terceros, no hay costos por uso de API, no hay riesgo de que el proveedor cambie el modelo o cierre el acceso.",
                "Esto alinea con la ética del Human Centered AI: la tecnología debe empoderar, no crear dependencias invisibles.",
              ],
            },
          ],
        },
      },
      {
        id: "elegir-framework",
        title: "Cómo elegir el framework correcto según el problema",
        summary:
          "Matriz de decisión práctica para no perder tiempo en el hackathon.",
        reading: {
          lead: [
            "El tiempo en un hackathon es oro. Esta guía te ayuda a decidir en menos de 60 segundos qué framework usar según el problema que quieras resolver.",
          ],
          diagram: "framework-decision",
          diagramCaption: "Árbol de decisión: según el tipo de entrada (imagen o texto) y el objetivo (analizar o generar), elige el framework más adecuado.",
          sections: [
            {
              heading: "¿Tu entrada es una imagen o video?",
              body: [
                "Usa **Vision**. Si necesitas reconocer texto, rostros, objetos o analizar escenas, Vision tiene request optimizadas y listas para usar.",
                "Solo usa Core ML si Vision no cubre tu caso específico (por ejemplo, una clasificación médica con un modelo entrenado por ti).",
              ],
            },
            {
              heading: "¿Tu entrada es texto y necesitas entenderlo?",
              body: [
                "Usa **Natural Language** para análisis léxico básico: sentimiento, idioma, entidades. Es rápido, no consume batería y no requiere configuración.",
                "Si necesitas generar texto nuevo, resumir largo o razonar sobre el contenido, salta directamente a **Foundation Models** (iOS 26+).",
              ],
            },
            {
              heading: "¿Necesitas generar contenido o razonar?",
              body: [
                "Usa **Foundation Models**. Es el único framework que genera lenguaje nuevo, estructura datos libres y puede llamar a herramientas personalizadas.",
                "Ten en cuenta: requiere iOS 26+ y un dispositivo eligible. Si tu hackathon exige compatibilidad con versiones anteriores, combina Natural Language + Core ML como respaldo.",
              ],
            },
            {
              heading: "¿Tienes un modelo propio entrenado?",
              body: [
                "Usa **Core ML**. Convierte tu modelo desde PyTorch o TensorFlow usando coremltools, o entrénalo directamente con Create ML en Xcode.",
                "Core ML también sirve para combinar resultados: por ejemplo, usar Vision para detectar objetos y luego un modelo custom para clasificar su estado.",
              ],
            },
          ],
        },
      },
    ],
  },
  {
    id: "hands-on",
    navLabel: "Hands-on",
    title: "Parte 2 — Demos en vivo",
    description:
      "Tres proyectos prácticos con código real: reconocimiento visual, análisis de sentimientos y generación on-device.",
    steps: [
      {
        id: "vision-texto-objetos",
        title: "Vision: reconocimiento de texto y objetos",
        summary:
          "Crea una app que lee texto en tiempo real desde la cámara y detecta objetos comunes.",
        readingMdxSlug: "hands-on/vision-texto-objetos",
      },
      {
        id: "nl-sentimientos",
        title: "Natural Language: análisis de sentimientos",
        summary:
          "Clasifica el tono de cualquier texto en positivo, negativo o neutral con NLTagger.",
        readingMdxSlug: "hands-on/nl-sentimientos",
      },
      {
        id: "foundation-generacion",
        title: "Foundation Models: generación de lenguaje on-device",
        summary:
          "Construye un asistente que genera respuestas, estructura datos y llama herramientas sin salir del dispositivo.",
        readingMdxSlug: "hands-on/foundation-generacion",
      },
    ],
  },
  {
    id: "estrategia",
    navLabel: "Estrategia",
    title: "Parte 3 y 4 — Estrategia, Q&A y Recursos",
    description:
      "Cómo combinar frameworks, presentar tu elección técnica y seguir aprendiendo después del taller.",
    steps: [
      {
        id: "combinar-frameworks",
        title: "Cómo combinar frameworks para soluciones más sólidas",
        summary:
          "Patrones de integración: Vision + Core ML, Natural Language + Foundation Models, y pipelines multi-etapa.",
        reading: {
          lead: [
            "La magia sucede cuando combinas frameworks. Un solo framework resuelve una tarea; varios bien conectados resuelven un problema real de usuario.",
          ],
          diagram: "combined-pipeline",
          diagramCaption: "Dos patrones comunes: Vision detecta una región y Core ML la clasifica; Natural Language analiza sentimiento y Foundation Models genera una respuesta contextual.",
          sections: [
            {
              heading: "Vision + Core ML: ver y entender",
              body: [
                "Usa Vision para detectar la región de interés (por ejemplo, un rostro o un objeto) y pasa ese recorte a un modelo Core ML personalizado para clasificación específica.",
                "Ejemplo hackathon: app para agricultores. Vision detecta la hoja de una planta; Core ML clasifica si tiene una enfermedad específica entrenada con tu dataset.",
              ],
              snippet: {
                file: "Vision + CoreML Pipeline",
                code: `let visionRequest = VNDetectRectanglesRequest { request, error in
    guard let rect = request.results?.first as? VNRectangleObservation else { return }
    // Recortar la región detectada
    let cropped = cropImage(image, to: rect.boundingBox)
    // Pasar al modelo Core ML
    let prediction = try? self.classifier.prediction(image: cropped)
}`,
              },
            },
            {
              heading: "Natural Language + Foundation Models: del análisis a la acción",
              body: [
                "Usa Natural Language para el preprocesamiento rápido (detectar idioma, limpiar entidades) y Foundation Models para la generación de respuesta o la toma de decisiones complejas.",
                "Ejemplo hackathon: diario emocional. Natural Language detecta el sentimiento de cada entrada; Foundation Models genera un resumen semanal con consejos personalizados.",
              ],
              snippet: {
                file: "NL + FoundationModels Pipeline",
                code: `// Paso 1: Análisis rápido con NL
let tagger = NLTagger(tagSchemes: [.sentimentScore])
tagger.string = userDiaryEntry
let (score, _) = tagger.tag(at: startIndex, unit: .paragraph, scheme: .sentimentScore)

// Paso 2: Generación con Foundation Models
let session = LanguageModelSession()
let response = try await session.respond(to: "Basado en este diario con sentimiento \(score!), escribe un consejo breve.")`,
              },
            },
            {
              heading: "Pipeline multi-etapa",
              body: [
                "No temas encadenar tres o más frameworks si cada etapa tiene un propósito claro. Documenta el flujo con un diagrama simple; los jueces valoran la claridad arquitectónica.",
                "Ejemplo: Cámara → Vision (detectar texto) → Natural Language (sentimiento del texto) → Foundation Models (generar respuesta contextual) → UI.",
              ],
            },
          ],
        },
      },
      {
        id: "presentar-jueces",
        title: "Cómo presentar la elección de IA ante los jueces",
        summary:
          "Cómo justificar tu stack técnico, destacar la privacidad y demostrar que entiendes los trade-offs.",
        reading: {
          lead: [
            "Los jueces no solo miran si funciona; miran si entiendes por qué elegiste esa tecnología. Una justificación sólida puede elevar un proyecto funcional a uno ganador.",
          ],
          sections: [
            {
              heading: "Justifica el 'porqué on-device'",
              body: [
                "No digas solo 'usamos IA'. Dí 'elegimos IA on-device porque nuestros usuarios manejan datos sensibles de salud/seguridad/finanzas y no pueden depender de conexión a internet'.",
                "Menciona números concretos: latencia de 50ms vs 800ms de una API remota, cero costos por petición, funcionamiento offline en zonas rurales.",
              ],
            },
            {
              heading: "Demuestra que conoces los límites",
              body: [
                "Reconocer limitaciones muestra madurez técnica. Por ejemplo: 'Foundation Models requiere iOS 26, así que para iOS 25 usamos Natural Language como fallback'.",
                "Si usas Core ML, menciona cómo entrenaste o convertiste el modelo. Si usas Vision, explica por qué no usaste una solución de terceros.",
              ],
            },
            {
              heading: "Conecta con el impacto humano",
              body: [
                "Vuelve al Human Centered AI. ¿Tu app empodera a una comunidad subatendida? ¿Protege datos vulnerables? ¿Funciona en contextos de baja conectividad?",
                "Los jueces recuerdan historias, no solo benchmarks. Termina tu demo con una frase sobre el usuario, no sobre el modelo.",
              ],
            },
          ],
        },
      },
      {
        id: "recursos",
        title: "Recursos para seguir aprendiendo después del taller",
        summary:
          "Documentación oficial, sample code, videos de WWDC y herramientas de conversión de modelos.",
        reading: {
          lead: [
            "El taller es solo el inicio. Estos recursos te permitirán profundizar, resolver dudas específicas y mantenerte actualizado cuando Apple lance nuevas capacidades.",
          ],
          sections: [
            {
              heading: "Documentación oficial",
              body: [
                "[Apple Machine Learning](https://developer.apple.com/machine-learning/resources/) — Punto de partida oficial: guías, modelos pre-entrenados y sample code.",
                "[Vision Framework](https://developer.apple.com/documentation/vision/) — Referencia completa de requests, observaciones y best practices.",
                "[Foundation Models](https://developer.apple.com/documentation/foundationmodels/) — Documentación de LanguageModelSession, @Generable, tool calling y snapshot streaming.",
                "[Natural Language](https://developer.apple.com/documentation/naturallanguage/) — NLTagger, NLModel y NLEmbedding.",
                "[Core ML](https://developer.apple.com/documentation/coreml/) — Carga, compilación y ejecución de modelos. Incluye guía de conversión desde PyTorch/TensorFlow.",
              ],
            },
            {
              heading: "Sample code y tutoriales",
              body: [
                "**Recognizing Text in Images** — Demo oficial de Vision + OCR con VNRecognizeTextRequest.",
                "**Building a Classifier with Create ML** — Entrena un modelo de clasificación de imágenes sin escribir código de ML.",
                "**Integrating a Core ML Model into Your App** — Flujo completo desde el modelo .mlmodel hasta la predicción en SwiftUI.",
                "**Structured Output with Generable** — Ejemplo de Foundation Models extrayendo datos tipados de texto libre.",
              ],
            },
            {
              heading: "Herramientas de conversión",
              body: [
                "**coremltools** — Convierte modelos PyTorch, TensorFlow y ONNX a Core ML. Incluye cuantización para reducir tamaño.",
                "**Create ML** — Entrena modelos directamente en Xcode con datos en formato JSON o carpetas de imágenes.",
                "**ML Compute** — Acelera el entrenamiento en Mac con Apple Silicon usando la GPU unificada.",
              ],
            },
          ],
        },
      },
      {
        id: "qa",
        title: "Preguntas y respuestas",
        summary:
          "Respuestas a las dudas más frecuentes antes de empezar a codear en el hackathon.",
        reading: {
          lead: [
            "Estas son las preguntas que suelen aparecer en los primeros 30 minutos de un hackathon. Si tienes una duda nueva, pregúntala en el canal del evento.",
          ],
          sections: [
            {
              heading: "¿Funciona en el simulador?",
              body: [
                "Vision y Natural Language funcionan perfectamente en el simulador de Xcode. Core ML también, aunque el rendimiento no refleja el hardware real.",
                "Foundation Models (iOS 26+) requiere un dispositivo físico eligible con Apple Intelligence habilitada. En el simulador puedes compilar, pero no ejecutar peticiones reales.",
              ],
            },
            {
              heading: "¿Puedo usar mis propios modelos?",
              body: [
                "Sí, con Core ML. Entrénalos con Create ML o conviértelos con coremltools. Asegúrate de que el input/output del modelo coincida exactamente con lo que espera tu app.",
                "Para Vision, también puedes usar modelos personalizados con VNCoreMLRequest si tu modelo está en formato .mlmodel.",
              ],
            },
            {
              heading: "¿Cuánto consume la batería?",
              body: [
                "La IA on-device está optimizada para el Neural Engine de Apple Silicon. Vision y Natural Language tienen impacto mínimo. Foundation Models es más intensivo, pero sigue siendo más eficiente que mantener una conexión de red constante.",
                "Tip: procesa en lotes cuando sea posible y evita analizar cada frame de video si no es necesario (usa sampling cada N frames).",
              ],
            },
            {
              heading: "¿Qué pasa si mi dispositivo no es eligible para Foundation Models?",
              body: [
                "Diseña un fallback desde el principio. Usa Natural Language para análisis de texto y Core ML para tareas específicas. Esa decisión arquitectónica demuestra pensamiento realista ante los jueces.",
                "Siempre verifica availability antes de crear un LanguageModelSession. Muestra un mensaje claro al usuario, no un crash silencioso.",
              ],
              snippet: {
                file: "Availability Check",
                code: `switch SystemLanguageModel.default.availability {
case .available:
    ContentView()
case .unavailable(.deviceNotEligible):
    Text("Este dispositivo no soporta Foundation Models.")
case .unavailable(.appleIntelligenceNotEnabled):
    Text("Activa Apple Intelligence en Ajustes.")
default:
    Text("Modelo no disponible.")
}`,
              },
            },
          ],
        },
      },
    ],
  },
]

/** Lista plana de pasos (por si hace falta para metadatos o tests). */
export const courseSteps = courseSections.flatMap((s) => s.steps)
