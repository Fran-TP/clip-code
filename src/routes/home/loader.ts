import { fetchPaginatedSnippets } from '@features/snippets/services/snippet-service'

const loaderHome = async () => {
  try {
    const { snippets, hasMore, nextCursor } = await fetchPaginatedSnippets(null, 15)
    console.log({ snippets, hasMore, nextCursor })
    return { snippets, hasMore, nextCursor }
  } catch (error) {
    console.log('Error loading snippets:', error)
    throw Response.json({ message: 'Failed to load snippets' }, { status: 500 })
  }
}

export default loaderHome
