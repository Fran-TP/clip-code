import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { BundledTheme } from 'shiki'

type ThemeMode = 'light' | 'dark' | 'system'

const DARK_EDITOR_THEME: BundledTheme = 'github-dark-default'
const LIGHT_EDITOR_THEME: BundledTheme = 'github-light-default'

/** Both themes that Shiki must pre-load in createHighlighter */
export const SHIKI_THEMES = [DARK_EDITOR_THEME, LIGHT_EDITOR_THEME] as const

const STORAGE_KEY_MODE = 'clip-code-theme-mode'

const getSystemPreference = (): 'dark' | 'light' =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

const getResolvedTheme = (mode: ThemeMode): 'dark' | 'light' =>
  mode === 'system' ? getSystemPreference() : mode

const getEditorTheme = (resolved: 'dark' | 'light'): BundledTheme =>
  resolved === 'dark' ? DARK_EDITOR_THEME : LIGHT_EDITOR_THEME

interface ThemeContextProps {
  mode: ThemeMode
  resolved: 'dark' | 'light'
  editorTheme: BundledTheme
  setMode: (mode: ThemeMode) => void
  cycleMode: () => void
}

const ThemeContext = createContext<ThemeContextProps | null>(null)

const applyThemeClass = (resolved: 'dark' | 'light') => {
  const root = document.documentElement
  root.classList.add('theme-transition')
  root.classList.toggle('dark', resolved === 'dark')
  requestAnimationFrame(() => {
    setTimeout(() => root.classList.remove('theme-transition'), 300)
  })
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    const stored = localStorage.getItem(STORAGE_KEY_MODE) as ThemeMode | null
    return stored ?? 'dark'
  })

  const resolved = getResolvedTheme(mode)
  const editorTheme = getEditorTheme(resolved)

  // Apply dark/light class on mount and when resolved changes
  useEffect(() => {
    applyThemeClass(resolved)
  }, [resolved])

  // Listen for system preference changes when mode is 'system'
  useEffect(() => {
    if (mode !== 'system') return

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = () => applyThemeClass(getSystemPreference())

    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [mode])

  const setMode = useCallback((newMode: ThemeMode) => {
    setModeState(newMode)
    localStorage.setItem(STORAGE_KEY_MODE, newMode)
  }, [])

  const cycleMode = useCallback(() => {
    const order: ThemeMode[] = ['dark', 'light', 'system']
    const nextIndex = (order.indexOf(mode) + 1) % order.length
    setMode(order[nextIndex])
  }, [mode, setMode])

  const value = useMemo<ThemeContextProps>(
    () => ({ mode, resolved, editorTheme, setMode, cycleMode }),
    [mode, resolved, editorTheme, setMode, cycleMode]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
