import clsx from 'clsx'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      type="button"
      className={clsx(
        'button-raised bg-cyan-500 text-gray-200 rounded-xl cursor-pointer hover:bg-cyan-600 transition-colors duration-200',
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
