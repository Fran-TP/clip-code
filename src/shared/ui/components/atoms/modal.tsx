import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps extends React.HTMLProps<HTMLDialogElement> {
  isOpen: boolean
  onClose(): void
}

const Modal: React.FC<ModalProps> = ({ children, className, isOpen, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement | null>(null)

  useEffect(() => {
    if (!dialogRef.current) return

    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  return createPortal(
    <dialog
      ref={dialogRef}
      onClose={onClose}
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={clsx(
        'overlay m-auto rounded-2xl border-2 border-gray-800 bg-gray-950 text-gray-200 backdrop:backdrop-blur-sm',
        className
      )}
    >
      {children}
    </dialog>,
    document.body
  )
}

export default Modal
