import DeleteSnippetModal from '@features/snippets/components/delete-snippet-modal'
import EmptyState from '@features/snippets/components/empty-state'
import SnippetCard from '@features/snippets/components/snippet-card'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import SnippetsSkeleton from '@features/snippets/skeletons/snippets-skeleton'
import MasonryLayout from '@shared/ui/components/atoms/masonry'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer-hook'

const SnippetList: React.FC = () => {
  const { isEmpty, isLoading, parsedSnippets, handleNextPage, hasMore } = useParsedSnippets()
  const [ref, { entry }] = useIntersectionObserver({ rootMargin: '100px' })
  const isVisible = entry?.isIntersecting

  useEffect(() => {
    if (isVisible && !isLoading) {
      handleNextPage()
    }
  }, [handleNextPage, isVisible, isLoading])

  if (!isLoading && isEmpty) {
    return <EmptyState />
  }

  return (
    <>
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
          {isLoading && hasMore ? (
            <div className="mt-10 text-center text-gray-600 text-sm">Loading more photos...</div>
          ) : null}
        </>
      ) : isLoading ? (
        <SnippetsSkeleton />
      ) : null}
      {!isLoading && hasMore ? <div id="visor" ref={ref} /> : null}
      <DeleteSnippetModal />
    </>
  )
}

export default SnippetList
