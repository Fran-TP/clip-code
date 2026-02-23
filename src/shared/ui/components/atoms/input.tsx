import clsx from 'clsx'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      type="text"
      className={clsx(
        'h-10 rounded-sm border-2 border-border-primary bg-bg-input px-3 py-2 text-sm outline-2 outline-transparent transition-colors duration-200 focus-visible:outline-accent',
        className
      )}
      {...props}
    />
  )
}

export default Input
