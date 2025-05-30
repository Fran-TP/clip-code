import {
  OPTIONS,
  initializeMonacoEditor,
  loadAdditionalLanguage
} from '@lib/constants/monacoConfig'
import { useEditorCode } from '@lib/context/editorCodeContext'
import Editor, { type Monaco, type BeforeMount } from '@monaco-editor/react'
import { useEffect, useRef, useState } from 'react'
import { createHighlighter } from 'shiki'

const highlighter = createHighlighter({
  themes: ['github-dark-default'],
  langs: ['javascript', 'typescript']
})

interface EditorCodeProps {
  form: {
    title: string
    description: string
    code: string
  }
  setForm: React.Dispatch<
    React.SetStateAction<{
      title: string
      description: string
      code: string
    }>
  >
}

const EditorCode: React.FC<EditorCodeProps> = ({ form, setForm }) => {
  const [isLoadingEditor, setIsLoadingEditor] = useState(false)
  const { selectedLanguage: language } = useEditorCode()

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

    loadAdditionalLanguage(monacoRef.current, language, highlighter)
      .then(() => {
        setIsLoadingEditor(true)
      })
      .finally(() => {
        setIsLoadingEditor(false)
      })
  }, [language])

  return isLoadingEditor ? (
    <div className="animate-pulse flex h-full bg-base" />
  ) : (
    <Editor
      className="h-full"
      language={language}
      loading={<div className="animate-pulse flex h-full bg-base" />}
      value={form.code || '// your code here'}
      onChange={value => {
        setForm(prev => ({
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
