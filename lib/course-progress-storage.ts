export const COURSE_PROGRESS_STORAGE_KEY = "ai-taller-course-steps-completed"

export function loadCourseProgress(): Record<string, boolean> {
  if (typeof window === "undefined") return {}
  try {
    const raw = localStorage.getItem(COURSE_PROGRESS_STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw) as unknown
    if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
      return parsed as Record<string, boolean>
    }
  } catch {
    /* ignore */
  }
  return {}
}

export function notifyCourseProgressChanged() {
  if (typeof window === "undefined") return
  window.dispatchEvent(new CustomEvent("course-progress-updated"))
}
