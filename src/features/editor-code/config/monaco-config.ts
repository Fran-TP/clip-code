import type { EditorProps, Monaco } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import type { BundledLanguage, BundledTheme, HighlighterGeneric } from 'shiki'

export const OPTIONS: EditorProps['options'] = {
  fontSize: 15,
  fontFamily: 'var(--font-JetBrainsMono)',
  fontLigatures: true,
  padding: {
    top: 10
  },
  tabSize: 2,
  wordWrap: 'on',
  minimap: {
    enabled: false
  },
  bracketPairColorization: {
    enabled: true
  },
  cursorBlinking: 'expand',
  formatOnPaste: true,
  suggest: {
    showFields: false,
    showFunctions: false
  }
}

export const initializeMonacoEditor = async (
  monaco: Monaco,
  highlighter: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>>,
  activeTheme: BundledTheme
) => {
  const instanceHighlighter = await highlighter

  // shikiToMonaco registers themes and defaults to the first one (github-dark-default).
  // We must re-apply the correct theme immediately after.
  shikiToMonaco(instanceHighlighter, monaco)
  monaco.editor.setTheme(activeTheme)
}

export const loadAdditionalLanguage = async (
  monaco: Monaco,
  language: BundledLanguage,
  highlighter: Promise<HighlighterGeneric<BundledLanguage, BundledTheme>>
) => {
  const instanceHighlighter = await highlighter
  const loadedLanguages = instanceHighlighter.getLoadedLanguages()

  if (!loadedLanguages.includes(language)) {
    await instanceHighlighter.loadLanguage(language)

    monaco.languages.register({ id: language })

    shikiToMonaco(instanceHighlighter, monaco)
  }
}
