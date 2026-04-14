import { CourseAppSidebar } from "@/components/course-app-sidebar"
import { CourseLayoutHeader } from "@/components/course-layout-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function CursoLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider defaultOpen={false}>
      <CourseAppSidebar />
      <SidebarInset className="min-w-0">
        <CourseLayoutHeader />
        <div className="flex min-w-0 flex-1 flex-col">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
