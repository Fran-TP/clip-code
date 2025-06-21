import DeleteSnippetModal from '@features/snippets/components/delete-snippet-modal'
import EmptyState from '@features/snippets/components/empty-state'
import SnippetCard from '@features/snippets/components/snippet-card'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import SnippetsSkeleton from '@features/snippets/skeletons/snippets-skeleton'
import MasonryLayout from '@shared/ui/components/atoms/masonry'

const SnippetList: React.FC = () => {
  const { isEmpty, isLoading, parsedSnippets } = useParsedSnippets()

  if (isLoading) {
    return <SnippetsSkeleton />
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Snippets</h1>
      {!isEmpty ? (
        <>
          <MasonryLayout items={parsedSnippets}>
            {item => (
              <SnippetCard
                key={item.snippetId}
                snippetId={item.snippetId}
                title={item.title}
                code={item.code}
                isFavorite={item.isFavorite}
                rawCode={item.rawCode}
              />
            )}
          </MasonryLayout>
          <div id="observer-target" />
        </>
      ) : (
        <EmptyState />
      )}
      <DeleteSnippetModal />
    </>
  )
}

export default SnippetList
