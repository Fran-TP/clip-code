import { db } from '@shared/config/db-config'

const updateFavoriteSnippet = async (snippetId: number, isFavorite: boolean) => {
  try {
    const result = await db.execute(
      `
     UPDATE snippets
      SET is_favorite = ?
      WHERE snippet_id = ?
      `,
      [Number(isFavorite), snippetId]
    )

    if (result.rowsAffected === 0) {
      return {
        success: false,
        message: 'Snippet not found or no changes made',
        snippetId
      }
    }

    return {
      success: true,
      message: 'Snippet updated successfully',
      snippetId,
      isFavorite
    }
  } catch (error) {
    console.error('Error updating favorite snippet:', error)
    throw error
  }
}

export default updateFavoriteSnippet
