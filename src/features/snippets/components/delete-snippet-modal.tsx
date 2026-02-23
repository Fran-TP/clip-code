import { useModal } from '@features/snippets/context/modal-context'
import { useParsedSnippets } from '@features/snippets/context/parsed-snippet-context'
import Modal from '@shared/ui/components/atoms/modal'
import { X } from 'lucide-react'
import type { FC } from 'react'

const DeleteSnippetModal: FC = () => {
  const { closeModal, isModalOpen, handleConfirmDelete, snippetToDelete } = useModal()
  const { setParsedSnippets, state } = useParsedSnippets()

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      className="w-96 divide-y-2 divide-border-primary"
    >
      <header className="flex items-center justify-between bg-bg-card px-4 py-3 text-text-primary">
        <h3 id="modal-title" className="font-semibold text-lg">
          Delete Snippet?
        </h3>
        <button
          type="button"
          className="cursor-pointer rounded-md opacity-70 outline-2 outline-transparent outline-offset-3 transition-colors duration-200 hover:opacity-100 focus-visible:outline-focus-ring"
          aria-label="Close modal"
          onClick={closeModal}
        >
          <X className="size-5" />
        </button>
      </header>
      <p id="modal-description" className="px-3 py-3 text-sm text-text-secondary">
        This action cannot be undone.
      </p>
      <div className="flex items-center justify-end gap-2 p-3.5">
        <button
          type="button"
          className="cursor-pointer rounded-md border-2 border-border-primary px-3 py-1 text-sm outline-2 outline-transparent outline-offset-3 transition-colors duration-200 focus-visible:outline-focus-ring"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          type="button"
          className="cursor-pointer rounded-md bg-danger px-3 py-1 text-sm text-text-inverse outline-2 outline-transparent outline-offset-3 transition-colors duration-200 focus-visible:outline-focus-ring"
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
