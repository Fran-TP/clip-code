import type { EditorProps } from '@monaco-editor/react'

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
