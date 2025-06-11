import type { Languages } from '@features/snippets/types'
import { db } from '@shared/config/db-config'

const fetchLanguages = (): Promise<Languages[]> => {
  const result = db.select<Languages[]>(`
   SELECT l.language_id languageId, l.name language
   FROM languages l
 `)

  return result
}

export default fetchLanguages
