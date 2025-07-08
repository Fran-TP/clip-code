import DeleteSnippetModal from '@features/snippets/components/delete-snippet-modal'
import EmptyState from '@features/snippets/components/empty-state'
import SnippetCard from '@features/snippets/components/snippet-card'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import SnippetsSkeleton from '@features/snippets/skeletons/snippets-skeleton'
import useIntersectionObserver from '@shared/hooks/use-intersetion-observer'
import MasonryLayout from '@shared/ui/components/atoms/masonry'
import { useEffect, useRef } from 'react'

const SnippetList: React.FC = () => {
  const {
    handleNextPage,
    state: { isLoading, isInitialLoading, isEmpty, hasMore, snippets, error }
  } = useParsedSnippets()

  const targetRef = useRef<HTMLDivElement | null>(null)
  const { isIntersecting: isVisible } = useIntersectionObserver(targetRef, {
    rootMargin: '200px',
    threshold: 0
  })

  useEffect(() => {
    if (isVisible && !isLoading) {
      handleNextPage()
    }
  }, [handleNextPage, isVisible, isLoading])

  if (error) {
    return (
      <div className="mt-10 text-center text-red-500">
        <p>Error loading snippets: {error.message}</p>
      </div>
    )
  }

  if (isEmpty) {
    return <EmptyState />
  }

  return (
    <>
      {isInitialLoading && <SnippetsSkeleton />}

      <MasonryLayout items={snippets}>
        {item => <SnippetCard {...item} key={item.snippetId} />}
      </MasonryLayout>

      {isLoading && hasMore && (
        <div className="mt-10 text-center text-gray-600 text-sm">Loading more snippets...</div>
      )}

      {!isLoading && hasMore && !isInitialLoading && (
        <div id="visor" ref={targetRef} className="border-2 border-red-500" />
      )}

      <DeleteSnippetModal />
    </>
  )
}

export default SnippetList
