import { deleteSnippet } from '@features/snippets/services/snippet-service'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { toast } from 'sonner'

interface SnippetToDelete {
  snippetId: number
  title: string
}

interface ModalContextProps {
  isModalOpen: boolean
  showModal: (snippetToDelete: SnippetToDelete) => () => void
  closeModal: () => void
  handleConfirmDelete: () => void
  snippetToDelete: SnippetToDelete | null
}

interface ModalProviderProps {
  children: React.ReactNode
}

const modalContext = createContext<ModalContextProps | null>(null)

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [snippetToDelete, setSnippetToDelete] = useState<SnippetToDelete | null>(null)

  const handleOpenModal = useCallback(
    (snippetToDelete: SnippetToDelete) => () => {
      setSnippetToDelete(snippetToDelete)
      setIsModalOpen(true)
    },
    []
  )

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handleConfirmDelete = useCallback(async () => {
    if (!snippetToDelete) return

    toast.promise(deleteSnippet(snippetToDelete.snippetId), {
      loading: 'Deleting snippet...',
      success: async () => {
        handleCloseModal()
        return 'Snippet deleted successfully'
      },
      error: () => {
        return 'Error deleting snippet'
      }
    })
  }, [snippetToDelete, handleCloseModal])

  const value = useMemo<ModalContextProps>(
    () => ({
      isModalOpen,
      showModal: handleOpenModal,
      closeModal: handleCloseModal,
      handleConfirmDelete,
      snippetToDelete
    }),
    [isModalOpen, handleOpenModal, handleCloseModal, handleConfirmDelete, snippetToDelete]
  )

  return <modalContext.Provider value={value}>{children}</modalContext.Provider>
}

export const useModal = () => {
  const context = useContext(modalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}
