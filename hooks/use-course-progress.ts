"use client"

import * as React from "react"

import { loadCourseProgress } from "@/lib/course-progress-storage"

/** Misma referencia cuando no hay datos; exigido por useSyncExternalStore. */
const EMPTY_STATE: Record<string, boolean> = {}

let snapshot: Record<string, boolean> = EMPTY_STATE

function recordsEqual(
  a: Record<string, boolean>,
  b: Record<string, boolean>
): boolean {
  if (a === b) return true
  const keysA = Object.keys(a)
  const keysB = Object.keys(b)
  if (keysA.length !== keysB.length) return false
  for (const k of keysA) {
    if (a[k] !== b[k]) return false
  }
  return true
}

/** Lee localStorage y actualiza `snapshot` solo si cambió el contenido. */
function syncSnapshotFromStorage(): boolean {
  const nextRaw = loadCourseProgress()
  const next =
    Object.keys(nextRaw).length === 0 ? EMPTY_STATE : { ...nextRaw }
  if (recordsEqual(snapshot, next)) return false
  snapshot = next
  return true
}

let clientHydrated = false

function subscribe(onChange: () => void) {
  const handler = () => {
    if (syncSnapshotFromStorage()) onChange()
  }

  syncSnapshotFromStorage()
  window.addEventListener("storage", handler)
  window.addEventListener("course-progress-updated", handler)
  return () => {
    window.removeEventListener("storage", handler)
    window.removeEventListener("course-progress-updated", handler)
  }
}

function getSnapshot() {
  if (typeof window !== "undefined" && !clientHydrated) {
    clientHydrated = true
    syncSnapshotFromStorage()
  }
  return snapshot
}

function getServerSnapshot() {
  return EMPTY_STATE
}

export function useCourseProgress() {
  return React.useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
