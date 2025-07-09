import { useModal } from '@features/snippets/context/modal-context'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import Modal from '@shared/ui/components/atoms/modal'
import { X } from 'lucide-react'
import type { FC } from 'react'

const DeleteSnippetModal: FC = () => {
  const { closeModal, isModalOpen, handleConfirmDelete, snippetToDelete } = useModal()
  const { setParsedSnippets, state } = useParsedSnippets()

  return (
    <Modal isOpen={isModalOpen} onClose={closeModal} className="w-96 divide-y-2 divide-gray-800">
      <header className="flex items-center justify-between bg-base px-4 py-3 text-gray-200">
        <h3 id="modal-title" className="font-semibold text-lg">
          Delete Snippet?
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-md opacity-70 outline-2 outline-transparent outline-offset-3 transition-colors duration-200 hover:opacity-100 focus-visible:outline-gray-700"
          aria-label="Close modal"
          onClick={closeModal}
        >
          <X className="size-5" />
        </button>
      </header>
      <p id="modal-description" className="px-3 py-3 text-gray-400 text-sm">
        This action cannot be undone.
      </p>
      <div className="flex items-center justify-end gap-2 p-3.5">
        <button
          type="button"
          className="cursor-pointer rounded-md border-2 border-gray-800 px-3 py-1 text-sm outline-2 outline-transparent outline-offset-3 transition-color duration-200 focus-visible:outline-gray-700"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-red-600 px-3 py-1 text-sm outline-2 outline-transparent outline-offset-3 transition-colors duration-200 focus-visible:outline-gray-700"
          onClick={() => {
            const { snippets } = state
            setParsedSnippets(
              snippets.filter(snippet => snippet.snippetId !== snippetToDelete?.snippetId)
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
