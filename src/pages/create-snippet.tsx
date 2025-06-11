import EditorCode from '@features/editor-code/components/editor-code'
import FormSnippet from '@features/snippets/components/form-snippet'
import fetchCategoriesWithLanguages from '@features/snippets/services/fetch-categories-with-languages'
import fetchLanguages from '@features/snippets/services/fetch-languages'
import { useFormSnippet } from '@shared/context/snippet-form-context'

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
  const { formSnippet } = useFormSnippet()

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create Snippet</h1>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-gray-800 rounded-md px-4 py-2 flex flex-col gap-2 bg-base">
          <h2 className="text-xl font-semibold">Snippet Details</h2>
          <FormSnippet />
        </div>
        <div className="border-2 border-gray-800 overflow-clip rounded-md flex flex-col">
          <div className="p-2 flex gap-2 items-center">
            <span className="text-sm">Language</span>
            <span className="text-sm font-bold text-gray-500">
              {formSnippet.language}
            </span>
          </div>
          <EditorCode />
        </div>
      </div>
    </>
  )
}

export default CreateSnippet
