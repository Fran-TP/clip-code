import MasonryLayout from '@components/atoms/masonry'
import Modal from '@components/atoms/modal'
import SnippetCard from '@components/molecules/snippet-card'
import SnippetsSkeleton from '@components/skeletons/snippets-skeleton'
import { useModal } from '@lib/context/modal-context'
import { useParsedSnippets } from '@lib/hooks/use-parsed-snippets'
import { fetchSnippets } from '@services/snippet-service'
import { X } from 'lucide-react'
import { isRouteErrorResponse, useRouteError } from 'react-router'

export const loaderHome = async () => {
  try {
    const snippets = await fetchSnippets()
    return { snippets }
  } catch (error) {
    console.log('Error loading snippets:', error)
    throw Response.json({ message: 'Failed to load snippets' }, { status: 500 })
  }
}

export function ErrorBoundary() {
  const error = useRouteError()

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold text-red-600">
          Error {error.status}
        </h1>
        <p className="mt-2 text-gray-700">
          {error.data?.message ?? 'Something went wrong.'}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-red-600">Unexpected Error</h1>
      <p className="mt-2 text-gray-700">
        {(error as Error)?.message ?? 'Unknown error occurred.'}
      </p>
    </div>
  )
}

const EmptyState = () => (
  <div className="flex flex-col items-center justify-center flex-1">
    <h1 className="text-3xl font-bold mb-4">No Snippets Found</h1>
    <p className="text-gray-500">Create your first snippet!</p>
  </div>
)

const Home: React.FC = () => {
  const { isEmpty, isLoading, parsedSnippets, setParsedSnippets } =
    useParsedSnippets()
  const { isModalOpen, closeModal, handleConfirmDelete, snippetToDelete } =
    useModal()

  if (isLoading) {
    return <SnippetsSkeleton />
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Snippets</h1>
      {!isEmpty ? (
        <MasonryLayout items={parsedSnippets}>
          {item => (
            <SnippetCard
              key={item.snippetId}
              snippetId={item.snippetId}
              title={item.title}
              code={item.code}
              rawCode={item.rawCode}
            />
          )}
        </MasonryLayout>
      ) : (
        <EmptyState />
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        className="divide-y-2 divide-gray-800 w-96"
      >
        <header className="flex justify-between items-center bg-base text-gray-200 px-4 py-3">
          <h3 id="modal-title" className="text-lg font-semibold">
            Delete Snippet?
          </h3>
          <button
            type="button"
            className="opacity-70 hover:opacity-100 rounded-md outline-2 outline-transparent outline-offset-3 focus-visible:outline-gray-700 transition-colors duration-200 cursor-pointer"
            aria-label="Close modal"
            onClick={closeModal}
          >
            <X className="size-5" />
          </button>
        </header>
        <p id="modal-description" className="px-3 py-3 text-sm text-gray-400">
          This action cannot be undone.
        </p>
        <div className="flex justify-end items-center gap-2 p-3.5">
          <button
            type="button"
            className="text-sm border-2 border-gray-800 px-3 py-1 rounded-md outline-2 outline-transparent outline-offset-3 focus-visible:outline-gray-700 cursor-pointer transition-color duration-200"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="text-sm bg-red-600 px-3 py-1 rounded-md cursor-pointer outline-2 outline-transparent outline-offset-3 focus-visible:outline-gray-700 transition-colors duration-200"
            onClick={() => {
              handleConfirmDelete()
              setParsedSnippets(prev =>
                prev.filter(
                  snippet => snippet.snippetId !== snippetToDelete?.snippetId
                )
              )
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
