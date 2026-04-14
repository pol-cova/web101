import createMDX from "@next/mdx"

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
}

// Sin remarkPlugins aquí: Turbopack exige opciones serializables; GFM va en `CourseMarkdown` (react-markdown).
const withMDX = createMDX({})

export default withMDX(nextConfig)
