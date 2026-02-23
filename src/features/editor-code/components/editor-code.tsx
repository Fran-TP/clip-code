import {
  OPTIONS,
  initializeMonacoEditor,
  loadAdditionalLanguage
} from '@features/editor-code/config/monaco-config'
import Editor, { type Monaco, type BeforeMount } from '@monaco-editor/react'
import { useFormSnippet } from '@shared/context/snippet-form-context'
import { useTheme } from '@shared/context/theme-context'
import { useEffect, useRef, useState } from 'react'
import { createHighlighter } from 'shiki'

const highlighter = createHighlighter({
  themes: ['github-dark-default', 'github-light-default'],
  langs: ['javascript', 'typescript']
})

const EditorCode: React.FC = () => {
  const [isLoadingEditor, setIsLoadingEditor] = useState(false)
  const { formSnippet, setFormSnippet } = useFormSnippet()
  const { editorTheme } = useTheme()

  const initializedMonacoEditor = useRef(false)
  const monacoRef = useRef<Monaco | null>(null)
  const editorThemeRef = useRef(editorTheme)
  editorThemeRef.current = editorTheme

  const handleEditorDidMount: BeforeMount = async monaco => {
    if (initializedMonacoEditor.current) return

    initializeMonacoEditor(monaco, highlighter, editorThemeRef.current)

    monacoRef.current = monaco
    initializedMonacoEditor.current = true
  }

  // Load language on change
  useEffect(() => {
    if (!initializedMonacoEditor.current || !monacoRef.current) return

    setIsLoadingEditor(true)

    loadAdditionalLanguage(monacoRef.current, formSnippet.language, highlighter).finally(() => {
      setIsLoadingEditor(false)
    })
  }, [formSnippet.language])

  // Explicitly apply theme when it changes (shikiToMonaco monkey-patches setTheme)
  useEffect(() => {
    if (!monacoRef.current) return
    monacoRef.current.editor.setTheme(editorTheme)
  }, [editorTheme])

  return (
    <div className="flex flex-1 flex-col">
      {isLoadingEditor ? (
        <div className="flex h-full animate-pulse bg-bg-code" />
      ) : (
        <Editor
          language={formSnippet.language}
          loading={<div className="flex h-full animate-pulse bg-bg-code" />}
          value={formSnippet.code}
          onChange={value => {
            setFormSnippet(prev => ({
              ...prev,
              code: value || ''
            }))
          }}
          theme={editorTheme}
          beforeMount={handleEditorDidMount}
          options={OPTIONS}
        />
      )}
    </div>
  )
}

export default EditorCode
