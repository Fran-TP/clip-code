import { db } from '@lib/constants/dbConfig'

export interface Snippet {
	snippetId?: string
	title: string
	description: string
	code: string
	isFavorite?: boolean
	createdAt?: Date
	fkLanguageId: string
}

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
