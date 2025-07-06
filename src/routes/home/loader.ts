import { fetchPaginatedSnippets } from '@features/snippets/services/snippet-service'

const HomeLoader = async () => {
  try {
    const snippetsPromise = fetchPaginatedSnippets(null, 15)

    return snippetsPromise
  } catch (error) {
    throw Response.json({ message: 'Failed to load snippets' }, { status: 500 })
  }
}

export default HomeLoader
