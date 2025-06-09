import {
  OPTIONS,
  initializeMonacoEditor,
  loadAdditionalLanguage
} from '@lib/constants/monaco-config'
import { useFormSnippet } from '@lib/context/form-snippet-context'
import Editor, { type Monaco, type BeforeMount } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { createHighlighter } from 'shiki'

const highlighter = createHighlighter({
  themes: ['github-dark-default'],
  langs: ['javascript', 'typescript']
})

const EditorCode: React.FC = () => {
  const [isLoadingEditor, setIsLoadingEditor] = useState(false)
  const { formSnippet, setFormSnippet } = useFormSnippet()

  const initializedMonacoEditor = useRef(false)
  const monacoRef = useRef<Monaco | null>(null)

  const handleEditorDidMount: BeforeMount = async monaco => {
    if (initializedMonacoEditor.current) return

    initializeMonacoEditor(monaco, highlighter)

    monacoRef.current = monaco
    initializedMonacoEditor.current = true
  }

  useEffect(() => {
    if (!initializedMonacoEditor.current || !monacoRef.current) return

    loadAdditionalLanguage(monacoRef.current, formSnippet.language, highlighter)
      .then(() => {
        setIsLoadingEditor(true)
      })
      .finally(() => {
        setIsLoadingEditor(false)
      })
  }, [formSnippet.language])

  return isLoadingEditor ? (
    <div className="animate-pulse flex h-full bg-base" />
  ) : (
    <Editor
      language={formSnippet.language}
      loading={<div className="animate-pulse flex h-full bg-base" />}
      value={formSnippet.code}
      onChange={value => {
        setFormSnippet(prev => ({
          ...prev,
          code: value || ''
        }))
      }}
      theme="github-dark-default"
      beforeMount={handleEditorDidMount}
      options={OPTIONS}
    />
  )
}

export default EditorCode
