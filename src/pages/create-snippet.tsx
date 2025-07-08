import EditorCode from '@features/editor-code/components/editor-code'
import FormSnippet from '@features/snippets/components/form-snippet'
import { useFormSnippet } from '@shared/context/snippet-form-context'

const CreateSnippet: React.FC = () => {
  const { formSnippet } = useFormSnippet()

  return (
    <>
      <h1 className="mb-4 font-bold text-3xl">Create Snippet</h1>
      <div className="grid flex-1 grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2 rounded-md border-2 border-gray-800 bg-base px-4 py-2">
          <h2 className="font-semibold text-xl">Snippet Details</h2>
          <FormSnippet />
        </div>
        <div className="flex flex-col overflow-clip rounded-md border-2 border-gray-800">
          <div className="flex items-center gap-2 p-2">
            <span className="text-sm">Language</span>
            <span className="font-bold text-gray-500 text-sm">{formSnippet.language}</span>
          </div>
          <EditorCode />
        </div>
      </div>
    </>
  )
}

export default CreateSnippet
