import { db } from '@lib/constants/db-config'
import type { Snippet } from '@lib/types'

export const fetchSnippets = async (): Promise<Snippet[]> => {
  try {
    const result = await db.select<Snippet[]>(`
      SELECT s.snippet_id AS snippetId, s.title, s.description, s.code, s.is_favorite AS isFavorite, s.created_at AS createdAt, l.language_id AS fkLanguageId
      FROM snippets s
      JOIN languages l ON s.fk_language_id = l.language_id
      ORDER BY created_at DESC;
    `)

    console.log('Fetched snippets:', result)

    return result
  } catch (error) {
    console.error('Error fetching snippets:', error)
    throw error
  }
}

export const createSnippet = async (snippet: Snippet): Promise<boolean> => {
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

export const deleteSnippet = async (snippetId: string): Promise<boolean> => {
  try {
    const result = await db.execute(
      'DELETE FROM snippets WHERE snippet_id = $1',
      [snippetId]
    )

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
