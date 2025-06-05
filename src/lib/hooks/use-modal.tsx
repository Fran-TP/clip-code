import { useState } from 'react'

export const useModal = () => {
  const [isModalOpen, setIsOpenModal] = useState(false)

  const handleOpenModal = () => {
    setIsOpenModal(true)
  }
  const handleCloseModal = () => {
    setIsOpenModal(false)
  }

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal
  }
}
