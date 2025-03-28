import Editor, { type BeforeMount } from '@monaco-editor/react'
import { shikiToMonaco } from '@shikijs/monaco'
import { createHighlighter } from 'shiki'
import { OPTIONS } from '@lib/constants/monacoConfig'

const EditorCode = () => {
  const handleEditorDidMount: BeforeMount = async monaco => {
    const highlighter = await createHighlighter({
      themes: ['github-dark-default'],
      langs: ['javascript', 'typescript']
    })

    shikiToMonaco(highlighter, monaco)
  }

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
