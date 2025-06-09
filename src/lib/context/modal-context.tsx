import { deleteSnippet } from '@services/snippet-service'
import { createContext, useContext, useState } from 'react'
import { toast } from 'sonner'

type SnippetToDelete = {
  snippetId: string
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
  const [snippetToDelete, setSnippetToDelete] =
    useState<SnippetToDelete | null>(null)

  const handleOpenModal = (snippetToDelete: SnippetToDelete) => () => {
    setSnippetToDelete(snippetToDelete)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleConfirmDelete = async () => {
    if (!snippetToDelete) return

    toast.promise(deleteSnippet(snippetToDelete.snippetId), {
      loading: 'Deleting snippet...',
      success: async () => {
        handleCloseModal()
        return 'Snippet deleted successfully'
      },
      error: error => {
        console.error(error)
        return 'Error deleting snippet'
      }
    })
  }

  return (
    <modalContext.Provider
      value={{
        isModalOpen,
        showModal: handleOpenModal,
        closeModal: handleCloseModal,
        handleConfirmDelete,
        snippetToDelete
      }}
    >
      {children}
    </modalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(modalContext)

  if (!context) {
    throw new Error('useModal must be used within a ModalProvider')
  }

  return context
}
