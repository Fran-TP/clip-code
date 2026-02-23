import { fetchPaginatedSnippets } from '@features/snippets/services/snippet-service'

const HomeLoader = async () => {
  try {
    const snippets = await fetchPaginatedSnippets(null, 15)

    return snippets
  } catch (error) {
    throw Response.json({ message: 'Failed to load snippets' }, { status: 500 })
  }
}

export default HomeLoader
