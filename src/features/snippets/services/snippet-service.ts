import type { ParsedSnippet, Snippet } from '@features/snippets/types'
import { db } from '@shared/config/db-config'
import { parseSnippets } from '../utils/parse-snippets'

export const fetchSnippets = async (): Promise<Snippet[]> => {
  try {
    const result = await db.select<Snippet[]>(`
      SELECT s.snippet_id AS snippetId, s.title, s.description, s.code, s.is_favorite AS isFavorite, s.created_at AS createdAt, l.language_id AS fkLanguageId
      FROM snippets s
      JOIN languages l ON s.fk_language_id = l.language_id
      ORDER BY created_at DESC;
    `)

    const [count] = await db.select<{ totalSnippets: number }[]>(
      'SELECT COUNT(*) totalSnippets FROM snippets WHERE snippets.snippet_id < 0'
    )

    console.log('Total snippets:', count)

    return result
  } catch (error) {
    throw new Error('Failed to fetch snippets')
  }
}

type SnippetToCreate = Omit<Snippet, 'snippetId' | 'createdAt' | 'isFavorite'>

export const createSnippet = async (snippet: SnippetToCreate): Promise<boolean> => {
  try {
    const result = await db.execute(
      'INSERT INTO snippets(title, description, code, fk_language_id) VALUES ($1, $2, $3, $4)',
      [snippet.title, snippet.description, snippet.code, snippet.fkLanguageId]
    )

    return result.rowsAffected > 0
  } catch (error) {
    console.error('Error creating snippet:', error)
    throw error
  }
}

export const deleteSnippet = async (snippetId: number): Promise<boolean> => {
  try {
    const result = await db.execute('DELETE FROM snippets WHERE snippet_id = $1', [snippetId])

    return result.rowsAffected > 0
  } catch (error) {
    let errorMessage = 'Error deleting snippet:'

    if (error instanceof Error) {
      errorMessage += ` ${error.message}`

      throw new Error(errorMessage)
    }

    throw new Error(`${errorMessage} unknown error`)
  }
}

interface FetchPagintedSnippetsReturn {
  snippets: ParsedSnippet[]
  hasMore: boolean
  nextCursor: number | null
}
export const fetchPaginatedSnippets = async (
  cursor: number | null,
  limit: number
): Promise<FetchPagintedSnippetsReturn> => {
  try {
    const query = `
      SELECT s.snippet_id AS snippetId, s.title, s.description, s.code, s.is_favorite AS isFavorite, s.created_at AS createdAt, l.language_id AS fkLanguageId
      FROM snippets s
      JOIN languages l ON s.fk_language_id = l.language_id
      ${cursor ? 'WHERE s.snippet_id < $1' : ''}
      ORDER BY s.snippet_id DESC
      LIMIT ${cursor ? '$2' : '$1'};
    `

    const params = cursor ? [cursor, limit] : [limit]
    const result = await db.select<Snippet[]>(query, params)
    const parsedSnippets = await parseSnippets(result)
    const hasMore = result.length === limit
    const nextCursor = result.length > 0 ? (result.at(-1)?.snippetId as number) : null

    return {
      snippets: parsedSnippets,
      hasMore,
      nextCursor
    }
  } catch (error) {
    console.error('Error fetching paginated snippets:', error)
    throw new Error('Failed to fetch paginated snippets')
  }
}
