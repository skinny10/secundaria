import { useCallback, useSyncExternalStore } from 'react'

export type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'nexusedu:theme'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === 'dark' || stored === 'light') return stored
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

let theme: ThemeMode = getInitialTheme()
const listeners = new Set<() => void>()

function applyTheme(next: ThemeMode) {
  theme = next
  if (typeof document !== 'undefined') {
    const root = document.documentElement
    if (next === 'dark') {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.removeAttribute('data-theme')
    }
  }
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(STORAGE_KEY, next)
  }
  listeners.forEach((notificar) => notificar())
}

function subscribe(notificar: () => void) {
  listeners.add(notificar)
  return () => {
    listeners.delete(notificar)
  }
}

function getSnapshot(): ThemeMode {
  return theme
}

if (typeof window !== 'undefined') {
  applyTheme(theme)
}

export function useTheme() {
  const current = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const setTheme = useCallback((next: ThemeMode) => {
    applyTheme(next)
  }, [])

  const toggle = useCallback(() => {
    applyTheme(theme === 'dark' ? 'light' : 'dark')
  }, [])

  return { theme: current, toggle, setTheme }
}
