import { db } from '@lib/constants/db-config'
import type { Languages } from '@lib/types'

const fetchLanguages = (): Promise<Languages[]> => {
  const result = db.select<Languages[]>(`
   SELECT l.language_id languageId, l.name language
   FROM languages l
 `)

  return result
}

export default fetchLanguages
