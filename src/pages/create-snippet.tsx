import EditorCode from '@components/molecules/editor-code'
import FormSnippet from '@components/molecules/form-snippet'
import { db } from '@lib/constants/dbConfig'

export const createSnippetLoader = async () => {
  const categoriesWithLanguages = await db.select<
    { categoryName: string; langName: string }[]
  >(`
    SELECT c.name categoryName, l.name langName FROM languages_categories lc
      JOIN main.categories c on c.category_id = lc.fk_category_id
      JOIN main.languages l on l.language_id = lc.fk_language_id;
  `)

  const languages = await db.select(`
    SELECT l.language_id langId, l.name langName
    FROM languages l
  `)

  return {
    categoriesWithLanguages: Object.groupBy(
      categoriesWithLanguages,
      ({ categoryName }) => categoryName
    ),
    languages
  }
}

const CreateSnippet: React.FC = () => {
  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Create Snippet</h1>
      <div className="grid flex-1 grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border-2 border-gray-800 rounded-md p-4 flex flex-col gap-4 bg-base">
          <h2 className="text-xl font-semibold">Snippet Details</h2>
          <FormSnippet />
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
