import clsx from 'clsx'
import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

interface ModalProps extends React.HTMLProps<HTMLDialogElement> {
  isOpen: boolean
  onClose(): void
}

const Modal: React.FC<ModalProps> = ({
  children,
  className,
  isOpen,
  onClose
}) => {
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
      className={clsx(
        'm-auto bg-gray-950 text-gray-200 rounded-2xl border-2 border-gray-800 backdrop:backdrop-blur-sm overlay',
        className
      )}
    >
      {children}
    </dialog>,
    document.body
  )
}

export default Modal
