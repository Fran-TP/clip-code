import { OPTIONS } from '@lib/constants/monacoConfig'
import Editor, { type Monaco, type BeforeMount } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import { useEffect, useRef } from 'react'
import { type BundledLanguage, createHighlighter } from 'shiki'

interface EditorCodeProps {
  language: BundledLanguage
}

const highlighter = createHighlighter({
  themes: ['github-dark-default'],
  langs: ['javascript', 'typescript']
})

const EditorCode: React.FC<EditorCodeProps> = ({ language }) => {
  const initializedRef = useRef(false)
  const monacoRef = useRef<Monaco | null>(null)

  const handleEditorDidMount: BeforeMount = async monaco => {
    if (initializedRef.current) return

    console.log('Initializing Monaco Editor...')

    monacoRef.current = monaco

    shikiToMonaco(await highlighter, monaco)
  }

  useEffect(() => {
    if (!initializedRef.current) return

    console.log('Loading additional language:', language)
    const loadAdditionalLanguage = async () => {
      const instanceHighlighter = await highlighter
      const loadLanguage = instanceHighlighter.getLoadedLanguages()

      if (!loadLanguage.includes(language)) {
        instanceHighlighter.loadLanguage(language)

        shikiToMonaco(instanceHighlighter, monacoRef.current)
      }
    }

    loadAdditionalLanguage()

    return () => {
      initializedRef.current = true
    }
  }, [language])

  return (
    <Editor
      className="h-full"
      defaultLanguage="javascript"
      defaultValue="// your code here"
      theme="github-dark-default"
      beforeMount={handleEditorDidMount}
      options={OPTIONS}
    />
  )
}

export default EditorCode
