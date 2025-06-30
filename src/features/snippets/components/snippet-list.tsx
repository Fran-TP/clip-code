import DeleteSnippetModal from '@features/snippets/components/delete-snippet-modal'
import EmptyState from '@features/snippets/components/empty-state'
import SnippetCard from '@features/snippets/components/snippet-card'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import SnippetsSkeleton from '@features/snippets/skeletons/snippets-skeleton'
import MasonryLayout from '@shared/ui/components/atoms/masonry'
import { useEffect } from 'react'
import { useIntersectionObserver } from 'react-intersection-observer-hook'

const SnippetList: React.FC = () => {
  const { isEmpty, isLoading, parsedSnippets, handleNextPage } = useParsedSnippets()
  const [ref, { entry }] = useIntersectionObserver({ rootMargin: '100px' })
  const isVisible = entry?.isIntersecting
  console.info('isVisible', isVisible, parsedSnippets)

  useEffect(() => {
    if (isVisible) {
      handleNextPage()
    }
  }, [handleNextPage, isVisible])

  if (isLoading) {
    return <SnippetsSkeleton />
  }

  return (
    <>
      <h1 className="mb-4 font-bold text-3xl">Snippets</h1>
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
          <div ref={ref} id="observer-target" />
        </>
      ) : (
        <EmptyState />
      )}
      <DeleteSnippetModal />
    </>
  )
}

export default SnippetList
