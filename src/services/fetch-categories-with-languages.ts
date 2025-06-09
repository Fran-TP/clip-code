import { db } from '@lib/constants/db-config'
import type {
  CategoriesWithLanguages,
  CategoriesWithLanguagesMap
} from '@lib/types'

const fetchCategoriesWithLanguages =
  async (): Promise<CategoriesWithLanguagesMap> => {
    const result = await db.select<CategoriesWithLanguages[]>(`
    SELECT c.category_id categoryId, c.name category,l.language_id languageId, l.name language
      FROM languages_categories lc
        JOIN main.categories c on c.category_id = lc.fk_category_id
        JOIN main.languages l on l.language_id = lc.fk_language_id;
  `)

    const groupedByCategories = Object.groupBy(
      result,
      ({ category }) => category
    )

    return groupedByCategories
  }

export default fetchCategoriesWithLanguages
