import EditorCode from '@components/molecules/editor-code'
import FormSnippet from '@components/molecules/form-snippet'
import { useEditorCode } from '@lib/context/editorCodeContext'
import fetchCategoriesWithLanguages from '@services/fetchCategoriesWithLanguages'
import fetchLanguages from '@services/fetchLanguages'
import { useState } from 'react'

export const createSnippetLoader = async () => {
  const [categoriesWithLanguages, languages] = await Promise.all([
    fetchCategoriesWithLanguages(),
    fetchLanguages()
  ])

  return {
    categoriesWithLanguages,
    languages
  }
}

const CreateSnippet: React.FC = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    code: ''
  })
  const { selectedLanguage } = useEditorCode()
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create Snippet</h1>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-gray-800 rounded-md p-4 flex flex-col gap-4 bg-base">
          <h2 className="text-xl font-semibold">Snippet Details</h2>
          <FormSnippet form={form} setForm={setForm} />
        </div>
        <div className="border-2 border-gray-800 overflow-clip rounded-md flex flex-col">
          <div className="p-2 flex gap-2 items-center">
            <span className="text-sm">Language</span>
            <span className="text-sm font-bold text-gray-500">
              {selectedLanguage}
            </span>
          </div>
          <EditorCode form={form} setForm={setForm} />
        </div>
      </div>
    </>
  )
}

export default CreateSnippet
