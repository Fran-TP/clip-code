import MasonryLayout from '@components/atoms/masonry'
import SnippetCard from '@components/molecules/snippet-card'
import SnippetsSkeleton from '@components/skeletons/snippets-skeleton'
import { useParsedSnippets } from '@lib/hooks/useParsedSnippets'
import type { Snippet } from '@lib/types'
import { fetchSnippets } from '@services/snippet-service'
import { useLoaderData } from 'react-router'

export const loaderHome = async () => {
  const snippets = await fetchSnippets()

  return { snippets }
}

const Home: React.FC = () => {
  const { snippets } = useLoaderData<{
    snippets: Snippet[]
  }>()
  const { parsedSnippets, hasParsedSnippets } = useParsedSnippets({ snippets })

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Snippets</h1>
      {hasParsedSnippets ? (
        <MasonryLayout items={parsedSnippets}>
          {item => (
            <SnippetCard
              key={item.snippetId}
              title={item.title}
              code={item.code}
              rawCode={item.rawCode}
            />
          )}
        </MasonryLayout>
      ) : (
        <SnippetsSkeleton />
      )}
    </>
  )
}

export default Home
