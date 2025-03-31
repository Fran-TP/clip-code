import { db } from '@lib/constants/dbConfig'

const fetchLanguages = async () => {
  const result = await db.select(`
    SELECT c.name categoryName, l.name langName FROM languages_categories lc
      JOIN main.categories c on c.category_id = lc.fk_category_id
      JOIN main.languages l on l.language_id = lc.fk_language_id;
  `)
}

export default fetchLanguages
