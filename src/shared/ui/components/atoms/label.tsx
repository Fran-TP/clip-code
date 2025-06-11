import clsx from 'clsx'

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({
  children,
  htmlFor,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('text-sm font-medium dark:text-gray-200', className)}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
