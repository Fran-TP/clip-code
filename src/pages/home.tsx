import MasonryLayout from '@components/atoms/masonry'
import Modal from '@components/atoms/modal'
import SnippetCard from '@components/molecules/snippet-card'
import SnippetsSkeleton from '@components/skeletons/snippets-skeleton'
import { useModal } from '@lib/hooks/use-modal'
import { useParsedSnippets } from '@lib/hooks/useParsedSnippets'
import type { Snippet } from '@lib/types'
import { deleteSnippet, fetchSnippets } from '@services/snippet-service'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useLoaderData } from 'react-router'
import { toast } from 'sonner'

export const loaderHome = async () => {
  const snippets = await fetchSnippets()

  return { snippets }
}

const Home: React.FC = () => {
  const { snippets } = useLoaderData<{
    snippets: Snippet[]
  }>()
  const { parsedSnippets, hasParsedSnippets, setParsedSnippets } =
    useParsedSnippets({ snippets })
  const { isModalOpen, handleCloseModal, handleOpenModal } = useModal()
  const [snippetToDelete, setSnippetToDelete] = useState<Snippet | null>(null)
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
              onOpenModal={() => {
                setSnippetToDelete(item)
                handleOpenModal()
              }}
            />
          )}
        </MasonryLayout>
      ) : (
        <SnippetsSkeleton />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        className="divide-y-2 divide-gray-800 w-96"
      >
        <header className="flex justify-between items-center bg-base text-gray-200 px-4 py-3">
          <h3 className="text-lg font-semibold">Delete Snippet?</h3>
          <button
            type="button"
            className="opacity-70 hover:opacity-100 transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
            onClick={handleCloseModal}
          >
            <X className="size-5" />
          </button>
        </header>

        <p className="px-3 py-3 text-sm text-gray-400">
          This action cannot be undone.
        </p>
        <div className="flex justify-end items-center gap-2 p-3.5">
          <button
            type="button"
            className="text-sm border-2 border-gray-800 px-3 py-1 rounded-md cursor-pointer"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-sm bg-red-600 px-3 py-1 rounded-md cursor-pointer"
            onClick={async () => {
              if (!snippetToDelete) return

              await deleteSnippet(snippetToDelete.snippetId)
              setParsedSnippets(prev =>
                prev.filter(
                  snippet => snippet.snippetId !== snippetToDelete.snippetId
                )
              )
              handleCloseModal()
              toast.success('Snippet deleted successfully!')
            }}
          >
            Delete
          </button>
        </div>
      </Modal>
    </>
  )
}

export default Home
