import clsx from 'clsx'

interface IconButtonProps extends React.ComponentProps<'button'> {}

const IconButton: React.FC<IconButtonProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button
      type="button"
      className={clsx(
        'group p-2 cursor-pointer border-2 border-gray-800 rounded-sm outline-base hover:bg-gray-900 transition-colors duration-200 inline-flex items-center',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
