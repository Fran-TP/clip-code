import { useModal } from '@features/snippets/context/modal-context'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import Modal from '@shared/ui/components/atoms/modal'
import { X } from 'lucide-react'
import type { FC } from 'react'

const DeleteSnippetModal: FC = () => {
  const { closeModal, isModalOpen, handleConfirmDelete, snippetToDelete } =
    useModal()
  const { setParsedSnippets } = useParsedSnippets()

  return (
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
            setParsedSnippets(prev =>
              prev.filter(
                snippet => snippet.snippetId !== snippetToDelete?.snippetId
              )
            )

            handleConfirmDelete()
          }}
        >
          Delete
        </button>
      </div>
    </Modal>
  )
}

export default DeleteSnippetModal
