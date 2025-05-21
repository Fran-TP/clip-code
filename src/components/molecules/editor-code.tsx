import { OPTIONS } from '@lib/constants/monacoConfig'
import { useEditorCode } from '@lib/context/editorCodeContext'
import Editor, { type Monaco, type BeforeMount } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import { useEffect, useRef, useState } from 'react'
import { createHighlighter } from 'shiki'

const highlighter = createHighlighter({
  themes: ['github-dark-default'],
  langs: ['javascript', 'typescript']
})

const EditorCode: React.FC = () => {
  const [isLoadingEditor, setIsLoadingEditor] = useState(false)
  const { selectedLanguage: language } = useEditorCode()

  const initializedMonacoEditor = useRef(false)
  const monacoRef = useRef<Monaco | null>(null)

  const handleEditorDidMount: BeforeMount = async monaco => {
    if (initializedMonacoEditor.current) return

    console.log('Initializing Monaco Editor...')

    shikiToMonaco(await highlighter, monaco)

    monacoRef.current = monaco
    initializedMonacoEditor.current = true
    console.log(initializedMonacoEditor.current)
  }

  useEffect(() => {
    if (!initializedMonacoEditor.current) return

    setIsLoadingEditor(true)
    const loadAdditionalLanguage = async () => {
      const instanceHighlighter = await highlighter
      const loadLanguage = instanceHighlighter.getLoadedLanguages()
      console.log(loadLanguage)

      if (!loadLanguage.includes(language)) {
        await instanceHighlighter.loadLanguage(language)

        monacoRef.current?.languages.register({ id: language })

        shikiToMonaco(instanceHighlighter, monacoRef.current)
      }

      setIsLoadingEditor(false)
    }

    loadAdditionalLanguage()
  }, [language])

  return isLoadingEditor ? (
    <div className="animate-pulse flex h-full bg-base" />
  ) : (
    <Editor
      className="h-full"
      language={language}
      loading={<div className="animate-pulse flex h-full bg-base" />}
      defaultValue="// your code here"
      theme="github-dark-default"
      beforeMount={handleEditorDidMount}
      options={OPTIONS}
    />
  )
}

export default EditorCode
