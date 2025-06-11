import type { Snippet } from '@features/snippets/types'
import { db } from '@shared/config/db-config'

export const fetchSnippets = async (): Promise<Snippet[]> => {
  try {
    const result = await db.select<Snippet[]>(`
      SELECT s.snippet_id AS snippetId, s.title, s.description, s.code, s.is_favorite AS isFavorite, s.created_at AS createdAt, l.language_id AS fkLanguageId
      FROM snippets s
      JOIN languages l ON s.fk_language_id = l.language_id
      ORDER BY created_at DESC;
    `)

    return result
  } catch (error) {
    throw new Error('Failed to fetch snippets')
  }
}

type SnippetToCreate = Omit<Snippet, 'snippetId' | 'createdAt' | 'isFavorite'>

export const createSnippet = async (
  snippet: SnippetToCreate
): Promise<boolean> => {
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
