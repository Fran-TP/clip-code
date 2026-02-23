import clsx from 'clsx'

interface IconButtonProps extends React.ComponentProps<'button'> {}

const IconButton: React.FC<IconButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={clsx(
        'group inline-flex cursor-pointer items-center rounded-sm border-2 border-border-primary p-2 outline-base transition-colors duration-200 hover:bg-bg-hover',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default IconButton
