import clsx from 'clsx'

interface InputProps extends React.HTMLProps<HTMLInputElement> {}

const Input: React.FC<InputProps> = ({ className, ...props }) => {
  return (
    <input
      type="text"
      className={clsx(
        'bg-gray-950 border-2 border-gray-800 h-10 px-3 py-2 rounded-sm outline-2 outline-transparent focus-visible:outline-cyan-500 transition-colors duration-200',
        className
      )}
      {...props}
    />
  )
}

export default Input
