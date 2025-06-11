import fetchCategoriesWithLanguages from '@features/snippets/services/fetch-categories-with-languages'
import fetchLanguages from '@features/snippets/services/fetch-languages'

const createSnippetLoader = async () => {
  const [categoriesWithLanguages, languages] = await Promise.all([
    fetchCategoriesWithLanguages(),
    fetchLanguages()
  ])

  return {
    categoriesWithLanguages,
    languages
  }
}

export default createSnippetLoader
