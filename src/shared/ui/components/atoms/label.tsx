import clsx from 'clsx'

interface LabelProps extends React.HTMLProps<HTMLLabelElement> {}

const Label: React.FC<LabelProps> = ({ children, htmlFor, className, ...props }: LabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={clsx('font-medium text-sm text-text-primary', className)}
      {...props}
    >
      {children}
    </label>
  )
}

export default Label
