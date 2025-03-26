import Label from '@components/atoms/label'
import Input from '@components/atoms/input'
import EditorCode from '@components/molecules/editor-code'

const CreateSnippet: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create Snippet</h1>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-gray-800 rounded-md p-4 flex flex-col gap-4 bg-base">
          <h2 className="text-xl font-semibold">Snippet Details</h2>
          <form className="space-y-4">
            <Label htmlFor="title" className="flex flex-col gap-3">
              Title
              <Input
                id="title"
                type="text"
                name="title"
                placeholder="Title of the snippet"
                autoComplete="off"
              />
            </Label>
            <Label htmlFor="description" className="flex flex-col gap-3">
              Description
              <textarea
                id="description"
                name="description"
                placeholder="Description of the snippet"
                className="border-2 border-gray-800 field-sizing-content resize-none px-3 bg-gray-950 py-2 rounded-sm outline-2 outline-transparent focus-visible:outline-cyan-500 transition-colors duration-200"
              />
            </Label>
            <button
              type="submit"
              className="border-2 border-cyan-500 rounded-md bg-base cursor-pointer"
            >
              Create Snippet
            </button>
          </form>
        </div>
        <div className="border-2 border-gray-800 overflow-clip rounded-md flex flex-col">
          <div className="p-2">
            <span className="text-sm font-bold">Code Snippet</span>
          </div>
          <EditorCode />
        </div>
      </div>
    </>
  )
}

export default CreateSnippet
