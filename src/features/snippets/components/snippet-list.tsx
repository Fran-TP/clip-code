import DeleteSnippetModal from '@features/snippets/components/delete-snippet-modal'
import EmptyState from '@features/snippets/components/empty-state'
import SnippetCard from '@features/snippets/components/snippet-card'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import MasonryLayout from '@shared/ui/components/atoms/masonry'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer-hook'

const SnippetList: React.FC = () => {
  const {
    handleNextPage,
    state: { isLoading, isEmpty, hasMore, snippets }
  } = useParsedSnippets()
  const [visorRef, { entry }] = useIntersectionObserver({ rootMargin: '100px' })
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
      <MasonryLayout items={snippets}>
        {item => <SnippetCard {...item} key={item.snippetId} />}
      </MasonryLayout>

      {isLoading && hasMore && (
        <div className="mt-10 text-center text-gray-600 text-sm">Loading more snippets...</div>
      )}

      {!isLoading && hasMore && (
        <div id="visor" ref={visorRef} className="border-2 border-red-500" />
      )}

      <DeleteSnippetModal />
    </>
  )
}

export default SnippetList
