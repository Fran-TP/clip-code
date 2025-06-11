import { fetchSnippets } from '@features/snippets/services/snippet-service'

const loaderHome = async () => {
  try {
    const snippets = await fetchSnippets()
    return { snippets }
  } catch (error) {
    console.log('Error loading snippets:', error)
    throw Response.json({ message: 'Failed to load snippets' }, { status: 500 })
  }
}

export default loaderHome
